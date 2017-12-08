'use strict';

/**
 * Entry point of the card game.
 * @author Jean-Gabriel Genest
 * @since 17.10.30
 * @version 17.12.08
 */
define([], function () {

    /**
     * URL of the base template
     * @type {string}
     * @since 17.10.30
     */
    let TEMPLATE = 'js/views/base/base.html';

    /**
     * URL of the loader template
     * @type {string}
     * @since 17.11.19
     */
    let TEMPLATE_LOADER = 'js/views/base/loader.html';

    return {
        /**
         * Start the game with customized options:
         *  - container: Id of the container where the game will be displayed
         *  - nodePath: Path to the node_modules folder containing the dependencies
         *  - gamePath: Path to the card game folder
         * @param options Options to start the game as a literal object.
         * @since 17.10.30
         */
        start(options) {
            //Game options
            window.cardGame = {};
            window.cardGame.nodePath = "./";
            window.cardGame.gamePath = "./";

            if (options !== undefined) {
                if (options.nodePath !== undefined) {
                    window.cardGame.nodePath = options.nodePath;
                }
                if (options.gamePath !== undefined) {
                    window.cardGame.gamePath = options.gamePath;
                }
            }

            require([cardGame.nodePath + "node_modules/jquery/dist/jquery.min",
                cardGame.nodePath + "node_modules/handlebars/dist/handlebars.min",
                cardGame.nodePath + "node_modules/js-logging/js-logging.browser"], function (jquery, handlebars, logging) {

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

                window.logger = logging.colorConsole();
                logger.setLevel("debug");
                window.Handlebars = handlebars;
                Handlebars.registerHelper('ifEquals', function (arg1, arg2, options) {
                    return (arg1 === arg2) ? options.fn(this) : options.inverse(this);
                });

                //Loader
                $.get(cardGame.gamePath + TEMPLATE_LOADER, function (source) {
                    let template = Handlebars.compile(source);
                    let data = {
                        gamePath: cardGame.gamePath
                    };
                    cardGame.$container.html(template(data));
                });

                //Launch the game
                logger.debug("Game launching in [container: " + cardGame.$container[0].id + "]");
                require([cardGame.gamePath + "js/views/base/Base.js",
                    cardGame.gamePath + "js/toolbox/Routes.js",
                    cardGame.gamePath + "js/models/Settings.js"], function (baseScript, Routes, Settings) {
                    require([cardGame.gamePath + "js/lang/i18n_" + Settings.getLanguage() + ".js"], function (i18n) {
                        window.cardGame.i18n = i18n;
                        window.Routes = Routes;

                        //Load the minimal view
                        $.get(cardGame.gamePath + TEMPLATE, function (source) {
                            let template = Handlebars.compile(source);
                            let data = {
                                i18n: cardGame.i18n,
                                gamePath: cardGame.gamePath
                            };

                            cardGame.$container.html(template(data));
                            baseScript.initViews();

                            Routes.get(Routes.getKeys().SPLASH_SCREEN)()
                        });
                    });
                });
            });
        }
    }
});
