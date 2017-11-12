'use strict';

/**
 * Singleton storing and retrieving the settings defined by the user (players' name, audio and rules).
 * @author Jean-Gabriel Genest
 * @since 17.10.30
 * @version 17.11.10
 */
define([], function () {
    return (function () {
        //List the available languages
        let availableLangs = ["en", "fr"];

        //Set the default values
        let settings = {
            player1Name: "Player 1",
            player2Name: "Player 2",
            audio: true,
            lang: window.navigator.userLanguage || window.navigator.language
        };
        logger.debug("Settings initialization");


        //Get the values from the local storage if they exist
        if (typeof(Storage) !== "undefined") {
            let storedSettings = window.localStorage.getItem("settings");
            if (storedSettings !== null) {
                Object.assign(settings, JSON.parse(storedSettings));
            }
            logger.debug("Settings loaded from local storage");
        }

        if (!availableLangs.includes(settings.lang)) {
            settings.lang = availableLangs[0];
        }
        require(["js/lang/i18n_" + settings.lang], function (i18n) {
            window.cardGame.i18n = i18n;
        });

        //Return the setters and getters
        return {
            save() {
                window.localStorage.setItem("settings", JSON.stringify(settings));
            },
            enableRule(rule) {
                settings[rule] = true;
            },
            disableRule(rule) {
                settings[rule] = false;
            },
            isRuleEnabled(rule) {
                return settings[rule] ? settings[rule] : false;
            },
            getPlayer1Name() {
                return settings.player1Name;
            },
            setPlayer1Name(name) {
                settings.player1Name = name.substring(0, 10);
            },
            getPlayer2Name() {
                return settings.player2Name;
            },
            setPlayer2Name(name) {
                settings.player2Name = name.substring(0, 10);
            },
            isAudioEnabled() {
                return settings.audio;
            },
            enableAudio() {
                settings.audio = true;
            },
            disableAudio() {
                settings.audio = false;
            },
            setLanguage(lang){
                if (!availableLangs.includes(lang)) {
                    settings.lang = lang;
                }
            }
        }

    })();
});