'use strict';

/**
 * Manage the player's choice whether he wants to keep playing or not.
 * @author Jean-Gabriel Genest
 * @since 17.11.04
 * @version 17.11.04
 */
define(["js/views/common/Common", "js/toolbox/Key"], function (Common, Key) {
    return {
        showFinalScreen() {
            cardGame.$container.find(".board__background").hide().fadeIn();
            Common.linearChoice({}, function (e) {
                switch (e.key) {
                    case Key.ENTER:
                        cardGame.$container.find(".board__background").fadeOut("slow", function () {
                            switch (e.choice) {
                                case 1:
                                    Routes.get("play")();
                                    break;

                                default:
                                    Routes.get("default")();
                                    break;
                            }
                        });
                        break;
                }
            });
        }
    }
});