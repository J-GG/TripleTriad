require(["assets/js/view.js"]);
require(["assets/js/settings.js"]);
require(["assets/js/events.js"]);
require(["assets/js/controller.js"]);
require(["assets/js/models/GameState.js"]);
require(["assets/js/models/Board.js"]);
require(["assets/js/models/CardOnBoard.js"]);
require(["assets/js/models/Card.js"]);
require(["assets/js/models/Player.js"]);
require(["assets/js/models/PlayerInGame.js"]);
require(["assets/js/models/CardDB.js"]);


require(["node_modules/jquery/dist/jquery.min.js", "node_modules/js-logging/js-logging.browser.js", "node_modules/handlebars/dist/handlebars.min.js"], function (jquery, Logging, HandlebarsR) {
    $(function () {
        Handlebars = HandlebarsR;
        logger = Logging.colorConsole();

        logger.setLevel("debug");

        let game = new Game();
        let view = new View(game);
        Events.subscribe(view, view.getEvents());

        game.start();
    });
});