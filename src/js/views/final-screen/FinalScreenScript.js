'use strict';

/**
 * Manage the player's choice whether he wants to keep playing or not.
 * @author Jean-Gabriel Genest
 * @since 17.11.04
 * @version 17.11.12
 */
define([cardGame.gamePath + "js/views/common/Common.js",
    cardGame.gamePath + "js/toolbox/Key.js",
    cardGame.gamePath + "js/views/common/Sound.js"], function (Common, Key, Sound) {
    return {
        showFinalScreen(onePlayer) {
            cardGame.$container.find(".board__background").hide().fadeIn();
            Common.linearChoice({}, function (e) {
                switch (e.key) {
                    case Key.ENTER:
                        cardGame.$container.find(".board__background").fadeOut("slow", function () {
                            switch (e.choice) {
                                case 1:
                                    Routes.get(Routes.getKeys().PLAY)(onePlayer);
                                    break;

                                default:
                                    Routes.get(Routes.getKeys().DEFAULT)();
                                    break;
                            }
                        });
                        Sound.stopAll();
                        break;
                }
            });
        }
    }
});