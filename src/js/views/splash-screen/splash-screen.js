'use strict';

/**
 * Show and manage the main menu.
 * @author Jean-Gabriel Genest
 * @since 17.10.30
 * @version 17.10.30
 */
require(["js/views/common/Common", "js/Routes", "js/toolbox/Key"], function (Common, Routes, Key) {
    setTimeout(function () {
        $("#" + cardGame.container + " .splash-screen__menu").removeClass("splash-screen__menu--hidden");
        Common.linearChoice("#splash-screen", {}, function (e) {
            switch (e.key) {
                case Key.ENTER: //Enter
                    switch (e.choice) {
                        case 1:
                            Routes.get("default")();
                            break;
                        default:
                            Routes.get("settings")();
                            break;
                    }
            }
        });
    }, 1500);
});