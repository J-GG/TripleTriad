'use strict';

/**
 * Singleton storing and retrieving the settings defined by the user (players' name, audio and rules).
 * @author Jean-Gabriel Genest
 * @since 17.10.30
 * @version 17.11.15
 */
define([], function () {
    return (function () {
        logger.debug("Settings initialization");

        let settings = {};

        //List the available languages and difficulties
        let availableLangs = ["en", "fr"];
        let difficulties = {
            EASY: "EASY",
            NORMAL: "NORMAL",
            HARD: "HARD"
        };

        let defaultLang = window.navigator.userLanguage || window.navigator.language;
        if (!availableLangs.includes(defaultLang)) {
            defaultLang = availableLangs[0];
        }

        //Get the values from the local storage if they exist
        if (typeof(Storage) !== "undefined") {
            let storedSettings = window.localStorage.getItem("settings");
            if (storedSettings !== null) {
                try {
                    storedSettings = JSON.parse(storedSettings);
                    Object.assign(settings, storedSettings);
                } catch (e) {
                    console.log(e)
                }
            }
            logger.debug("Settings loaded from local storage");
        }

        //Check the stored settings and assign the default value if necessary
        settings.player1Name = settings.player1Name ? settings.player1Name.substr(0, 10) : "Player 1";
        settings.player2Name = settings.player2Name ? settings.player2Name.substr(0, 10) : "Player 2";
        settings.audio = settings.audio === true;
        settings.lang = availableLangs.includes(settings.lang) ? settings.lang : defaultLang;
        settings.difficulty = Object.values(difficulties).includes(settings.difficulty) ? settings.difficulty : difficulties.NORMAL;

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
                return settings[rule] === true;
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
                if (availableLangs.includes(lang)) {
                    settings.lang = lang;
                }
            },
            getLanguage() {
                return settings.lang;
            },
            getDifficulties() {
                return difficulties;
            },
            setDifficulty(difficulty){
                if (Object.values(difficulties).includes(difficulty)) {
                    settings.difficulty = difficulty;
                }
            },
            getDifficulty() {
                return settings.difficulty;
            }
        }
    })();
});