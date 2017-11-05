'use strict';

/**
 * Update the settings.
 * @author Jean-Gabriel Genest
 * @since 17.10.30
 * @version 17.11.02
 */
define(["js/views/common/Common", "js/models/Settings", "js/toolbox/Key"], function (Common, Settings, Key) {
    return {
        manageSettings() {
            Common.linearChoice({unbindOnEnter: false}, function (e) {
                switch (e.key) {
                    case Key.ENTER:
                        switch (e.choice) {
                            case 1:
                            case 2:
                                cardGame.$container.find("#setting-player-" + e.choice + " input").focus();
                                break;

                            case 3:
                                cardGame.$container.find("#setting-audio .message__check").each(function () {
                                    $(this).toggleClass("message__check--enabled");
                                });
                                break;

                            case 4:
                            case 5:
                            case 6:
                            case 7:
                            case 8:
                                $(cardGame.$container.find(".select-choices__choice")[e.choice - 1]).parent().toggleClass("message__check--enabled");
                                break;

                            default:
                                //Player's name
                                Settings.setPlayer1Name(cardGame.$container.find("#setting-player-1 input").val());
                                Settings.setPlayer2Name(cardGame.$container.find("#setting-player-2 input").val());

                                //Audio
                                if (cardGame.$container.find("#setting-audio-on").hasClass("message__check--enabled")) {
                                    Settings.enableAudio();
                                } else {
                                    Settings.disableAudio();
                                }

                                //Rules
                                if (cardGame.$container.find("#rule-open").hasClass("message__check--enabled")) {
                                    Settings.enableOpen();
                                } else {
                                    Settings.disableOpen();
                                }

                                if (cardGame.$container.find("#rule-war").hasClass("message__check--enabled")) {
                                    Settings.enableWar();
                                } else {
                                    Settings.disableWar();
                                }

                                if (cardGame.$container.find("#rule-same").hasClass("message__check--enabled")) {
                                    Settings.enableSame();
                                } else {
                                    Settings.disableSame();
                                }

                                if (cardGame.$container.find("#rule-plus").hasClass("message__check--enabled")) {
                                    Settings.enablePlus();
                                } else {
                                    Settings.disablePlus();
                                }

                                if (cardGame.$container.find("#rule-combo").hasClass("message__check--enabled")) {
                                    Settings.enableCombo();
                                } else {
                                    Settings.disableCombo();
                                }

                                cardGame.$container.off("keydown");
                                logger.info("Settings updated");
                                Routes.get("default")();
                                break;
                        }
                        break;

                    case Key.ESCAPE:
                        cardGame.$container.off("keydown");
                        Routes.get("default")();
                        break;

                    case Key.UP:
                    case Key.DOWN:
                        $("input").blur();
                        cardGame.$container.find(".board").focus();
                        break;

                    default:
                        break;

                }
            });
        }
    }
});