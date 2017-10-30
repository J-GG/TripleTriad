'use strict';

/**
 * Controller for the splash screen.
 * @author Jean-Gabriel Genest
 * @since 17.10.30
 * @version 17.10.30
 */
define([], function () {
    return (function () {

        /**
         * URL of the template
         * @type {string}
         * @version 17.10.30
         */
        let TEMPLATE = 'js/views/splash-screen/splash-screen.html';

        /**
         * URL of the script
         * @type {string}
         * @version 17.10.30
         */
        let SCRIPT = 'js/views/splash-screen/splash-screen.js';

        return {

            /**
             * Load and display the template and the script.
             * @since 17.10.30
             */
            splashScreen() {
                $.get(TEMPLATE, function (source) {
                    let template = Handlebars.compile(source);
                    $("#" + cardGame.container).html(template);
                    $.getScript(SCRIPT);
                });
            }
        }
    })();
});