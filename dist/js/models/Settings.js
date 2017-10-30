'use strict';

/**
 * Singleton storing and retrieving the settings defined by the user (players' name, audio and rules).
 * @author Jean-Gabriel Genest
 * @since 17.10.30
 * @version 17.10.30
 */
define([], function () {
    return (function () {
        //Set the default values
        let player1Name = "Player 1", player2Name = "Player 2";
        let audioEnabled = true, open = false, war = false, same = false, plus = false, combo = false;
        
        logger.debug("Settings initialization");

        //Get the values from the local storage if they exist
        if (typeof(Storage) !== "undefined") {
            player1Name = window.localStorage.getItem("player1Name") ? localStorage.getItem("player1Name").substring(0, 10) : player1Name;
            player2Name = window.localStorage.getItem("player2Name") ? localStorage.getItem("player2Name").substring(0, 10) : player2Name;
            audioEnabled = window.localStorage.getItem("audioEnabled") === "true";
            open = window.localStorage.getItem("open") === 'true';
            war = window.localStorage.getItem("war") === 'true';
            same = window.localStorage.getItem("same") === 'true';
            plus = window.localStorage.getItem("plus") === 'true';
            combo = window.localStorage.getItem("combo") === 'true';

            logger.debug("Settings loaded from local storage");
        }

        //Return the setters and getters
        return {
            getPlayer1Name() {
                return player1Name;
            },
            setPlayer1Name(name) {
                player1Name = name.substring(0, 10);
                window.localStorage.setItem("player1Name", name);
            },
            getPlayer2Name() {
                return player2Name;
            },
            setPlayer2Name(name) {
                player2Name = name.substring(0, 10);
                window.localStorage.setItem("player2Name", name);
            },
            isAudioEnabled() {
                return audioEnabled;
            },
            enableAudio() {
                audioEnabled = true;
                window.localStorage.setItem("audioEnabled", 'true');
            },
            disableAudio() {
                audioEnabled = false;
                window.localStorage.setItem("audioEnabled", 'false');
            },
            isOpenEnabled() {
                return open;
            },
            enableOpen() {
                open = true;
                window.localStorage.setItem("open", 'true');
            },
            disableOpen() {
                open = false;
                window.localStorage.setItem("open", 'false');
            },
            isSameEnabled() {
                return same;
            },
            enableSame() {
                same = true;
                window.localStorage.setItem("same", 'true');
            },
            disableSame() {
                same = false;
                window.localStorage.setItem("same", 'false');
            },
            isWarEnabled() {
                return war;
            },
            enableWar() {
                war = true;
                window.localStorage.setItem("war", 'true');
            },
            disableWar() {
                war = false;
                window.localStorage.setItem("war", 'false');
            },
            isPlusEnabled() {
                return plus;
            },
            enablePlus() {
                plus = true;
                window.localStorage.setItem("plus", 'true');
            },
            disablePlus() {
                plus = false;
                window.localStorage.setItem("plus", 'false');
            },
            isComboEnabled() {
                return combo;
            },
            enableCombo() {
                combo = true;
                window.localStorage.setItem("combo", 'true');
            },
            disableCombo() {
                combo = false;
                window.localStorage.setItem("combo", 'false');
            }
        }

    })();
});