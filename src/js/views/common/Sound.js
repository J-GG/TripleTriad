'use strict';

/**
 * Manage the sounds of the game.
 * @author Jean-Gabriel Genest
 * @since 17.11.12
 * @version 17.11.12
 */
define([cardGame.gamePath + "js/models/Settings.js"], function (Settings) {
    return (function () {

        /**
         * The association of the key with the id of the sound in the view.
         * @since 17.11.12
         */
        let sounds = {
            GAME: "cardGameGameMusic",
            VICTORY: "cardGameVictoryMusic",
            MOVE_CARD: "moveCardSound",
            FLIP_CARD: "flipCardSound",
            SELECT: "selectSound",
            CANCEL: "cancelSound",
            SPECIAL: "specialSound",
            SELECTOR: "selectorSound"
        };

        return {
            /**
             * Return the list of keys.
             * @returns {*} The method corresponding to the key
             * @since 17.11.12
             */
            getKeys() {
                return sounds;
            },

            /**
             * Stop all the sounds.
             * @since 17.11.12
             */
            stopAll() {
                let audio = document.getElementsByTagName('audio');
                for (let i = 0; i < audio.length; i++) {
                    audio[i].pause();
                }
            },

            /**
             * Stop all the sounds and play the specified one.
             * @param sound The key associated with the sound to play
             * @since 17.11.12
             */
            stopAllAndPlay(sound){
                this.stopAll();
                this.play(sound);
            },

            /**
             * Play the specified sound.
             * @param sound The key associated with the sound to play
             * @since 17.11.12
             */
            play(sound){
                if (!Object.values(sounds).includes(sound)) {
                    logger.warning("The sound for " + sound + " could not be found");
                    return;
                }

                if (Settings.isAudioEnabled()) {
                    let soundElement = document.getElementById(sound);
                    if (soundElement !== null) {
                        soundElement.currentTime = 0;
                        soundElement.play();
                    }
                }
            }
        }
    })();
});