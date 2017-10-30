'use strict';

/**
 * Update the settings.
 * @author Jean-Gabriel Genest
 * @since 17.10.30
 * @version 17.10.30
 */
require(["js/views/common/Common", "js/Routes", "js/models/Settings", "js/toolbox/Key"], function (Common, Routes, Settings, Key) {
    Common.linearChoice("#settings", {unbindOnEnter: false}, function (e) {
        switch (e.key) {
            case Key.ENTER: //Enter
                switch (e.choice) {
                    case 1:
                    case 2:
                        $("#setting-player-" + e.choice + " input").focus();
                        break;

                    case 3:
                        $("#setting-audio").find(".message__check").each(function () {
                            $(this).toggleClass("message__check--enabled");
                        });
                        break;

                    case 4:
                    case 5:
                    case 6:
                    case 7:
                    case 8:
                        $($("#settings").find(".select-choices__choice")[e.choice - 1]).parent().toggleClass("message__check--enabled");
                        break;

                    default:
                        //Player's name
                        Settings.setPlayer1Name($("#setting-player-1 input").val());
                        Settings.setPlayer2Name($("#setting-player-2 input").val());

                        //Audio
                        if ($("#setting-audio-on").hasClass("message__check--enabled")) {
                            Settings.enableAudio();
                        } else {
                            Settings.disableAudio();
                        }

                        //Rules
                        if ($("#rule-open").hasClass("message__check--enabled")) {
                            Settings.enableOpen();
                        } else {
                            Settings.disableOpen();
                        }

                        if ($("#rule-war").hasClass("message__check--enabled")) {
                            Settings.enableWar();
                        } else {
                            Settings.disableWar();
                        }

                        if ($("#rule-same").hasClass("message__check--enabled")) {
                            Settings.enableSame();
                        } else {
                            Settings.disableSame();
                        }

                        if ($("#rule-plus").hasClass("message__check--enabled")) {
                            Settings.enablePlus();
                        } else {
                            Settings.disablePlus();
                        }

                        if ($("#rule-combo").hasClass("message__check--enabled")) {
                            Settings.enableCombo();
                        } else {
                            Settings.disableCombo();
                        }

                        $(document).off("keydown");
                        Routes.get("default")();
                        break;
                }
                break;

            case Key.ESCAPE: //Esc
                $(document).off("keydown");
                Routes.get("default")();
                break;

            case Key.UP: //Up
            case Key.DOWN: //Down
                $("input").blur();
                break;

            default:
                break;

        }
    });
});