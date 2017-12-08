'use strict';

/**
 * Controller for the final screen.
 * @author Jean-Gabriel Genest
 * @since 17.11.04
 * @version 17.11.04
 */
define([cardGame.gamePath + "js/views/final-screen/FinalScreenScript.js"], function (FinalScreenScript) {
    return (function () {

        /**
         * URL of the template
         * @type {string}
         * @since 17.10.30
         */
        let TEMPLATE = cardGame.gamePath + 'js/views/final-screen/final-screen.html';

        return {

            /**
             * Load and display the template and the script.
             * @since 17.11.04
             */
            finalScreen(onePlayer) {
                let data = {
                    i18n: cardGame.i18n
                };

                $.get(TEMPLATE, function (source) {
                    let template = Handlebars.compile(source);
                    cardGame.$container.find(".board__game-area").html(template(data));
                    FinalScreenScript.showFinalScreen(onePlayer);
                });
            }
        }
    })();
});