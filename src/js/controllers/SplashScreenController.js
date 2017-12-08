'use strict';

/**
 * Controller for the splash screen.
 * @author Jean-Gabriel Genest
 * @since 17.10.30
 * @version 17.11.01
 */
define([cardGame.gamePath + "js/views/splash-screen/SplashScreenScript.js"], function (splashScreenScript) {
    return (function () {

        /**
         * URL of the template
         * @type {string}
         * @since 17.10.30
         */
        let TEMPLATE = cardGame.gamePath + 'js/views/splash-screen/splash-screen.html';

        return {

            /**
             * Load and display the template and the script.
             * @since 17.10.30
             */
            splashScreen() {
                let data = {
                    i18n: cardGame.i18n
                };

                $.get(TEMPLATE, function (source) {
                    let template = Handlebars.compile(source);
                    cardGame.$container.find(".board__game-area").html(template(data));
                    splashScreenScript.showMenu();
                });
            }
        }
    })();
});