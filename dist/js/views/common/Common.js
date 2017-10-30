'use strict';

/**
 * Common functions used in the views.
 * @author Jean-Gabriel Genest
 * @since 17.10.30
 * @version 17.10.30
 */
define([], function () {
    return {

        /**
         * Manage a list of choices offered to the user.
         * Show a cursor and deals with the up, down and enter keys.
         * The callback function is called whenever a key is down.
         * Options are:
         *  - defaultChoice: {@type Integer between 1 and the number of choices} set the option selected by default (default: 1)
         *  - unbindOnEnter: {@type boolean} whether the function should unbind the event when the enter key is pressed (default: true)
         * @param container Selector for the container
         * @param options Options as a literal object
         * @param callback Function to call
         * @since 17.10.30
         */
        linearChoice(container, options, callback) {
            let choicesContainer = $("#" + cardGame.container + " " + container);
            let choice = 1;
            let unbindOnEnter = true;

            //Find the maximum value
            let maxChoice = choicesContainer.find(".select-choices__choice").length;

            //Options
            if (typeof options === "object") {
                choice = options.defaultChoice !== undefined
                && Number.isInteger(options.defaultChoice)
                && options.defaultChoice > 0
                && options.defaultChoice <= maxChoice
                    ? options.defaultChoice : choice;
                unbindOnEnter = options.unbindOnEnter === false ? false : unbindOnEnter;
            }

            //Add a cursor at the default position
            let cursor = $("<div>", {class: "cursor select-choices--remove-margin-left"});
            choicesContainer.find(".select-choices").append(cursor);
            updateCursorPosition();

            $(document).keydown(function (e) {
                switch (e.which) {
                    case 38: //Up
                        choice - 1 > 0 ? choice-- : choice;
                        break;

                    case 40: //Down
                        choice + 1 <= maxChoice ? choice++ : choice;
                        break;

                    case 13: //Enter
                        if (unbindOnEnter) {
                            $(document).off("keydown");
                        }
                        break;
                    default:
                        break;
                }
                callback({key: e.which, choice: choice});
                updateCursorPosition();
            });

            //update the cursor at the correct position if the windows is resized
            $(window).resize(function () {
                updateCursorPosition();
            });

            /**
             * Update the position of the cursor based on the selected choice.
             * @since 17.10.30
             */
            function updateCursorPosition() {
                let tag = $(choicesContainer.find(".select-choices__choice")[choice - 1]);
                let tagHeight = tag.position().top
                    + (tag.height() + parseInt(tag.css('marginTop'), 10)
                    + parseInt(tag.css('paddingTop'), 10)
                    + parseInt(tag.css('marginBottom'), 10)
                    + parseInt(tag.css('paddingBottom'), 10)) / 2;
                cursor.css({
                    top: tagHeight - cursor.height() / 2,
                    left: tag.position().left
                });
            }
        }
    }
});