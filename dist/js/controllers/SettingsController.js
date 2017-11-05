'use strict';

/**
 * Controller for the settings.
 * @author Jean-Gabriel Genest
 * @since 17.10.30
 * @version 17.11.02
 */
define(["js/views/settings-screen/SettingsScreenScript", "../models/Settings"], function (SettingsScreenScript, Settings) {
    return (function () {

        /**
         * URL of the template.
         * @type {string}
         * @since 17.10.30
         */
        let TEMPLATE = 'js/views/settings-screen/settings-screen.html';

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

                    cardGame.$container.find(" .board__game-area").html(template(data));
                    SettingsScreenScript.manageSettings();
                });
            }
        }
    })();
});