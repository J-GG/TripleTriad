'use strict';

/**
 * Entry point of the card game.
 * @author Jean-Gabriel Genest
 * @since 17.10.30
 * @version 17.10.30
 */
require(["../../node_modules/jquery/dist/jquery.min",
        "../../node_modules/handlebars/dist/handlebars.min",
        "../../node_modules/js-logging/js-logging.browser"],
    function (jquery, handlebars, logging) {
        window.logger = logging.colorConsole();
        logger.setLevel("debug");
        window.Handlebars = handlebars;
    });

define(["./Routes"], function (Routes) {
    return {

        /**
         * Start the game with customized options:
         *  - container: Id of the container where the game will be displayed
         * @param options Options to start the game as a literal object.
         * @since 17.10.30
         */
        start(options) {
            //Game options
            window.cardGame = {};
            window.cardGame.container = 'card-game';

            if (options !== undefined) {
                if (options.container !== undefined && $("#" + options.container).length === 1) {
                    cardGame.container = options.container;
                }
            }

            logger.debug("Game launching in [container: " + cardGame.container + "]");

            //Start the game
            Routes.get("default")();
        }
    };
});
