'use strict';

/**
 * Show and manage the main menu.
 * @author Jean-Gabriel Genest
 * @since 17.10.30
 * @version 17.11.10
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
                                    Routes.get(Routes.getKeys().PLAY)(true);
                                    break;
                                case 2:
                                    Routes.get(Routes.getKeys().PLAY)();
                                    break;
                                default:
                                    Routes.get(Routes.getKeys().SETTINGS)();
                                    break;
                            }
                            break;
                    }
                });
            }, 1500);
        }
    }
});