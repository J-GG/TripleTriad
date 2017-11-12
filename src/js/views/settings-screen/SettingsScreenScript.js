'use strict';

/**
 * Update the settings.
 * @author Jean-Gabriel Genest
 * @since 17.10.30
 * @version 17.11.12
 */
define(["js/views/common/Common", "js/models/Settings", "js/toolbox/Key", "js/models/Rules", "js/views/common/Sound"],
    function (Common, Settings, Key, Rules, Sound) {
        return {
            manageSettings() {
                Common.linearChoice({unbindOnEnter: false}, function (e) {
                    switch (e.key) {
                        case Key.ENTER:
                            switch (e.choice) {
                                case 1:
                                case 2:
                                    Sound.play(Sound.getKeys().SELECT);
                                    cardGame.$container.find("#setting-player-" + e.choice + " input").focus();
                                    break;

                                case 3:
                                    Sound.play(Sound.getKeys().SELECT);
                                    cardGame.$container.find("#setting-audio .message__check").each(function () {
                                        $(this).toggleClass("message__check--enabled");
                                    });
                                    break;

                                case 4:
                                case 5:
                                case 6:
                                case 7:
                                case 8:
                                    Sound.play(Sound.getKeys().SELECT);
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
                                        Settings.enableRule(Rules.getRules().OPEN);
                                    } else {
                                        Settings.disableRule(Rules.getRules().OPEN);
                                    }

                                    if (cardGame.$container.find("#rule-war").hasClass("message__check--enabled")) {
                                        Settings.enableRule(Rules.getRules().WAR);
                                    } else {
                                        Settings.disableRule(Rules.getRules().WAR);
                                    }

                                    if (cardGame.$container.find("#rule-same").hasClass("message__check--enabled")) {
                                        Settings.enableRule(Rules.getRules().SAME);
                                    } else {
                                        Settings.disableRule(Rules.getRules().SAME);
                                    }

                                    if (cardGame.$container.find("#rule-plus").hasClass("message__check--enabled")) {
                                        Settings.enableRule(Rules.getRules().PLUS);
                                    } else {
                                        Settings.disableRule(Rules.getRules().PLUS);
                                    }

                                    if (cardGame.$container.find("#rule-combo").hasClass("message__check--enabled")) {
                                        Settings.enableRule(Rules.getRules().COMBO);
                                    } else {
                                        Settings.disableRule(Rules.getRules().COMBO);
                                    }

                                    Settings.save();

                                    logger.info("Settings updated");
                                    e.unbind();
                                    Sound.play(Sound.getKeys().SPECIAL);
                                    Routes.get(Routes.getKeys().DEFAULT)();
                                    break;
                            }
                            break;

                        case Key.ESCAPE:
                            e.unbind();
                            Sound.play(Sound.getKeys().CANCEL);
                            Routes.get(Routes.getKeys().DEFAULT)();
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