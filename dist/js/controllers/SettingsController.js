'use strict';

/**
 * Controller for the settings.
 * @author Jean-Gabriel Genest
 * @since 17.10.30
 * @version 17.10.30
 */
define(["../models/Settings"], function (Settings) {
    return (function () {

        /**
         * URL of the template.
         * @type {string}
         * @version 17.10.30
         */
        let TEMPLATE = 'js/views/settings-screen/settings-screen.html';

        /**
         * URL of the script.
         * @type {string}
         * @version 17.10.30
         */
        let SCRIPT = 'js/views/settings-screen/settings-screen.js';

        return {

            /**
             * Load and display the template and the script.
             * @since 17.10.30
             */
            settings() {
                $.get(TEMPLATE, function (source) {
                    let template = Handlebars.compile(source);
                    let data = {
                        player1: Settings.getPlayer1Name(),
                        player2: Settings.getPlayer2Name(),
                        audio: Settings.isAudioEnabled(),
                        open: Settings.isOpenEnabled(),
                        war: Settings.isWarEnabled(),
                        same: Settings.isSameEnabled(),
                        plus: Settings.isPlusEnabled(),
                        combo: Settings.isComboEnabled()
                    };

                    $("#" + cardGame.container).html(template(data));
                    $.getScript(SCRIPT);
                });
            }
        }
    })();
});