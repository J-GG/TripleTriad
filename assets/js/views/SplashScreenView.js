class SplashScreenView {
    static show(view) {
        $.get('templates/splash-screen/splash-screen.html', function (source) {
            let template = Handlebars.compile(source);
            $(".board__game-area").html(template);

            setTimeout(function () {
                $(".splash-screen__menu").removeClass("splash-screen__menu--hidden");
                view.choiceDialog($(".splash-screen__menu"), 1, 2, 2, function (gameState, choice) {
                    if (choice === 1) {
                        $(".board__game-area").text("");
                        view.initGame();
                    } else {
                        view.settings();
                    }
                });

            }, 1500);
        });
    }
}