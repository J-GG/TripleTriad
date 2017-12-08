'use strict';

/**
 * Controller for the game.
 * @author Jean-Gabriel Genest
 * @since 17.10.30
 * @version 17.11.01
 */
define([cardGame.gamePath + "js/views/game/GameScript.js",
    cardGame.gamePath + "js/models/Settings.js",
    cardGame.gamePath + "js/models/GameEngine.js"], function (GameScript, Settings, GameEngine) {
    return (function () {

        /**
         * URL of the template.
         * @type {string}
         * @since 17.10.30
         */
        let TEMPLATE = cardGame.gamePath + 'js/views/game/game.html';

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
            play(onePlayer) {

                let data = {
                    player1: Settings.getPlayer1Name(),
                    player2: onePlayer === true ? undefined : Settings.getPlayer2Name(),
                    onePlayer: onePlayer === true,
                    gamePath: cardGame.gamePath
                };

                $.get(TEMPLATE, function (source) {
                    let template = Handlebars.compile(source);
                    cardGame.$container.find(".board__game-area").html(template(data));
                    Routes.get(Routes.getKeys().START_GAME)(onePlayer);
                });
            },

            /**
             * Initialize and start the game.
             * @since 17.11.04
             */
            startGame(onePlayer) {
                gameEngine = new GameEngine();
                let gameState = gameEngine.initGame(onePlayer);
                GameScript.startGame(gameState);
            },

            /**
             * A player plays the card at the coordinates on the board.
             * @param card The card played
             * @param coordinates The coordinate of the card
             * @version 17.11.04
             */
            playerPlaysCard(card, ...coordinates) {
                let params = gameEngine.playerPlaysCard(card, ...coordinates);
                GameScript.playCard(...params);
            },

            /**
             * Make the AI play a card.
             * @version 17.11.11
             */
            AIPlaysCard() {
                let params = gameEngine.AIPlaysCard();
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