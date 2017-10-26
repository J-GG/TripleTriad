class SettingsView {
    static show(view) {
        //Get and show settings template
        $.get('templates/settings/settings.html', function (source) {
            let template = Handlebars.compile(source);
            $(".board__game-area").html(template({
                player1: Settings.getPlayer1Name(),
                player2: Settings.getPlayer2Name(),
                audio: Settings.isAudioEnabled(),
                open: Settings.isOpenEnabled(),
                war: Settings.isWarEnabled(),
                same: Settings.isSameEnabled(),
                plus: Settings.isPlusEnabled(),
                combo: Settings.isComboEnabled(),
            }));
        });

        let choice = 0;
        $(document).keydown(function (e) {
            let previousChoice = choice;
            switch (e.which) {
                case 27: //Esc
                    $(document).off("keydown");
                    view.splashScreen();
                    break;

                case 38: //Up
                    $("#setting-player-1 input").blur();
                    $("#setting-player-2 input").blur();
                    choice - 1 >= 0 ? choice-- : choice;
                    break;

                case 40: //Down
                    $("#setting-player-1 input").blur();
                    $("#setting-player-2 input").blur();
                    choice + 1 <= 8 ? choice++ : choice;
                    break;

                case 13: //Enter
                    switch (choice) {
                        case 0:
                            $("#setting-player-1 input").focus();
                            break;

                        case 1:
                            $("#setting-player-2 input").focus();
                            break;

                        case 2:
                            $("#setting-sound .message__check").each(function () {
                                $(this).toggleClass("message__check--enabled");
                            });
                            break;

                        case 3:
                            $("#rule-open").toggleClass("message__check--enabled");
                            break;

                        case 4:
                            $("#rule-war").toggleClass("message__check--enabled");
                            break;

                        case 5:
                            $("#rule-same").toggleClass("message__check--enabled");
                            break;

                        case 6:
                            $("#rule-plus").toggleClass("message__check--enabled");
                            break;

                        case 7:
                            $("#rule-combo").toggleClass("message__check--enabled");
                            break;

                        default:
                            //Player's name
                            Settings.setPlayer1Name($("#setting-player-1 input").val());
                            Settings.setPlayer2Name($("#setting-player-2 input").val());

                            //Audio
                            if ($("#setting-sound .message__check--enabled").text() === "ON") {
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
                            view.splashScreen();
                            break;
                    }
                    break;

                default:
                    return;
            }
            $(".cursor").removeClass("cursor--settings-" + previousChoice).addClass("cursor--settings-" + choice);
        });
    }
}