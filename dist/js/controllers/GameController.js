'use strict';

/**
 * Controller for the game.
 * @author Jean-Gabriel Genest
 * @since 17.10.30
 * @version 17.11.01
 */
define(["js/views/game/GameScript", "js/models/Settings", "js/models/GameEngine"], function (GameScript, Settings, GameEngine) {
    return (function () {

        /**
         * URL of the template.
         * @type {string}
         * @since 17.10.30
         */
        let TEMPLATE = 'js/views/game/game.html';

        /**
         * The game engine.
         * @type {GameEngine}
         * @since 17.11.04
         */
        let gameEngine;

        return {

            /**
             * Load and display the template and the script.
             * @since 17.10.30
             */
            play() {
                let data = {
                    player1: Settings.getPlayer1Name(),
                    player2: Settings.getPlayer2Name()
                };

                $.get(TEMPLATE, function (source) {
                    let template = Handlebars.compile(source);
                    cardGame.$container.find(".board__game-area").html(template(data));
                    Routes.get(Routes.getKeys().START_GAME)();
                });
            },

            /**
             * Initialize and start the game.
             * @since 17.11.04
             */
            startGame() {
                gameEngine = new GameEngine();
                let gameState = gameEngine.initGame();
                GameScript.startGame(gameState);
            },

            /**
             * Play the card at the coordinates on the board.
             * @param card The card played
             * @param coordinates The coordinate of the card
             * @version 17.11.04
             */
            playCard(card, ...coordinates) {
                let params = gameEngine.playCard(card, ...coordinates);
                GameScript.playCard(...params);
            },

            /**
             * End the player's turn. If the game is not over, a new turn starts. Otherwise, the game ends.
             * @version 17.11.04
             */
            endTurn() {
                let gameState = gameEngine.endTurn();
                if (gameState.isGameOver()) {
                    GameScript.gameOver(gameState);
                } else {
                    GameScript.newTurn(gameState);
                }
            }
        }
    })();
});