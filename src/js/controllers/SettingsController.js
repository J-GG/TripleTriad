'use strict';

/**
 * Controller for the settings.
 * @author Jean-Gabriel Genest
 * @since 17.10.30
 * @version 17.11.02
 */
define([cardGame.gamePath + "js/views/settings-screen/SettingsScreenScript.js",
    cardGame.gamePath + "js/models/Settings.js",
    cardGame.gamePath + "js/models/Rules.js"], function (SettingsScreenScript, Settings, Rules) {
    return (function () {

        /**
         * URL of the template.
         * @type {string}
         * @since 17.10.30
         */
        let TEMPLATE = cardGame.gamePath + 'js/views/settings-screen/settings-screen.html';

        return {

            /**
             * Load and display the template and the script.
             * @since 17.10.30
             */
            settings() {
                $.get(TEMPLATE, function (source) {
                    let template = Handlebars.compile(source);
                    let data = {
                        i18n: cardGame.i18n,
                        player1: Settings.getPlayer1Name(),
                        player2: Settings.getPlayer2Name(),
                        audio: Settings.isAudioEnabled(),
                        lang: Settings.getLanguage(),
                        difficulty: Settings.getDifficulty(),
                        open: Settings.isRuleEnabled(Rules.getRules().OPEN),
                        war: Settings.isRuleEnabled(Rules.getRules().WAR),
                        same: Settings.isRuleEnabled(Rules.getRules().SAME),
                        plus: Settings.isRuleEnabled(Rules.getRules().PLUS),
                        combo: Settings.isRuleEnabled(Rules.getRules().COMBO)
                    };

                    cardGame.$container.find(" .board__game-area").html(template(data));
                    SettingsScreenScript.manageSettings();
                });
            }
        }
    })();
});