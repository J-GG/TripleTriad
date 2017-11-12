'use strict';

/**
 * Show and manage the main menu.
 * @author Jean-Gabriel Genest
 * @since 17.10.30
 * @version 17.11.12
 */
define(["js/views/common/Common", "js/toolbox/Key", "js/views/common/Sound"], function (Common, Key, Sound) {
    return {
        showMenu() {
            setTimeout(function () {
                cardGame.$container.find(".splash-screen__menu").removeClass("splash-screen__menu--hidden");
                Common.linearChoice({}, function (e) {
                    switch (e.key) {
                        case Key.ENTER:
                            switch (e.choice) {
                                case 1:
                                    Sound.play(Sound.getKeys().SPECIAL);
                                    Routes.get(Routes.getKeys().PLAY)(true);
                                    break;
                                case 2:
                                    Sound.play(Sound.getKeys().SPECIAL);
                                    Routes.get(Routes.getKeys().PLAY)();
                                    break;
                                default:
                                    Sound.play(Sound.getKeys().SELECT);
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