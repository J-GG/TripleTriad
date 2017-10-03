require(["node_modules/jquery/dist/jquery.min.js", "node_modules/js-logging/js-logging.browser.js"], function(jquery, Logging){
	$(function() {
		logger = Logging.colorConsole();
		logger.setLevel("debug");
		
		game = new Game();
		view = new View(game);
		Events.subscribe(view, view.getEvents());

		game.start();
	});
});