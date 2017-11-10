'use strict';

/**
 * Entry point of the card game.
 * @author Jean-Gabriel Genest
 * @since 17.10.30
 * @version 17.11.10
 */
define(["js/views/base/Base",
    "../../node_modules/jquery/dist/jquery.min",
    "../../node_modules/handlebars/dist/handlebars.min",
    "../../node_modules/js-logging/js-logging.browser"], function (baseScript, jquery, handlebars, logging) {

    /**
     * URL of the template
     * @type {string}
     * @since 17.10.30
     */
    let TEMPLATE = 'js/views/base/base.html';

    return {

        /**
         * Start the game with customized options:
         *  - container: Id of the container where the game will be displayed
         * @param options Options to start the game as a literal object.
         * @since 17.10.30
         */
        start(options) {
            window.logger = logging.colorConsole();
            logger.setLevel("debug");
            window.Handlebars = handlebars;

            //Game options
            window.cardGame = {};
            window.cardGame.$container = $("#card-game");

            if (options !== undefined) {
                if (options.container !== undefined) {
                    let $tmpContainer = $("#" + options.container);
                    if ($tmpContainer.length > 0) {
                        cardGame.$container = $tmpContainer;
                    } else {
                        throw "Container [options.container: " + cardGame.$container + "] can't be found";
                    }
                }
            }

            //Load the minimal view
            $.get(TEMPLATE, function (source) {
                let template = Handlebars.compile(source);
                cardGame.$container.html(template);
                baseScript.initViews();
            });

            //Launch the game
            logger.debug("Game launching in [container: " + cardGame.$container + "]");
            require(["js/toolbox/Routes"], function (Routes) {
                window.Routes = Routes;
                Routes.get(Routes.getKeys().DEFAULT)()
            });
        }
    };
});
