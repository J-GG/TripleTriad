'use strict';

/**
 * Update the settings.
 * @author Jean-Gabriel Genest
 * @since 17.10.30
 * @version 17.11.21
 */
define([cardGame.gamePath + "js/views/common/Common.js",
        cardGame.gamePath + "js/models/Settings.js",
        cardGame.gamePath + "js/toolbox/Key.js",
        cardGame.gamePath + "js/models/Rules.js",
        cardGame.gamePath + "js/views/common/Sound.js"],
    function (Common, Settings, Key, Rules, Sound) {
        return {
            manageSettings() {
                Common.linearChoice({unbindOnEnter: false}, function (e) {
                    let $description = cardGame.$container.find("#rule-description");
                    $description.html("");
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
                                    Sound.play(Sound.getKeys().SELECT);
                                    cardGame.$container.find("#setting-language .message__check").each(function () {
                                        $(this).toggleClass("message__check--enabled");
                                    });
                                    break;

                                case 5:
                                    Sound.play(Sound.getKeys().SELECT);
                                    let $difficulties = cardGame.$container.find("#setting-difficulty .message__check");
                                    let $selectedDifficulty = $difficulties.filter(".message__check--enabled");
                                    let $nextSelectedDifficulty = $selectedDifficulty.next().length !== 0 ?
                                        $selectedDifficulty.next() : $difficulties.first();

                                    $difficulties.removeClass("message__check--enabled");
                                    $nextSelectedDifficulty.addClass("message__check--enabled");
                                    break;

                                case 6:
                                case 7:
                                case 8:
                                case 9:
                                case 10:
                                    let description = $(cardGame.$container.find(".select-choices__choice")[e.choice - 1]).data("description");
                                    $description.html(description);

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

                                    //Language
                                    Settings.setLanguage(cardGame.$container.find("#setting-language .message__check--enabled").data("langCode"));

                                    //Difficulty
                                    Settings.setDifficulty(cardGame.$container.find("#setting-difficulty .message__check--enabled").data("difficulty"));

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
                                    require([cardGame.gamePath + "js/lang/i18n_" + Settings.getLanguage() + ".js"], function (i18n) {
                                        window.cardGame.i18n = i18n;
                                        Routes.get(Routes.getKeys().DEFAULT)();
                                    });
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

                            switch (e.choice) {
                                case 6:
                                case 7:
                                case 8:
                                case 9:
                                case 10:
                                    let description = $(cardGame.$container.find(".select-choices__choice")[e.choice - 1]).data("description");
                                    $description.html(description);
                                    break;
                                default:
                                    $description.text("");
                                    break;
                            }
                            break;
                    }
                });
            }
        }
    });