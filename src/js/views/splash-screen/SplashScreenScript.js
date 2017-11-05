'use strict';

/**
 * Show and manage the main menu.
 * @author Jean-Gabriel Genest
 * @since 17.10.30
 * @version 17.10.30
 */
define(["js/views/common/Common", "js/toolbox/Key"], function (Common, Key) {
    return {
        showMenu() {
            setTimeout(function () {
                cardGame.$container.find(".splash-screen__menu").removeClass("splash-screen__menu--hidden");
                Common.linearChoice({}, function (e) {
                    switch (e.key) {
                        case Key.ENTER:
                            switch (e.choice) {
                                case 1:
                                    Routes.get("play")();
                                    break;
                                default:
                                    Routes.get("settings")();
                                    break;
                            }
                            break;
                    }
                });
            }, 1500);
        }
    }
});