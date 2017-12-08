'use strict';

/**
 * The engine/business logic of the game.
 * @author Jean-Gabriel Genest
 * @since 17.11.06
 * @version 17.11.11
 */
define([cardGame.gamePath + "js/models/GameState.js",
    cardGame.gamePath + "js/models/PlayerInGame.js",
    cardGame.gamePath + "js/models/Settings.js",
    cardGame.gamePath + "js/models/CardDB.js",
    cardGame.gamePath + "js/models/Rules.js",
    cardGame.gamePath + "js/models/AI.js"], function (GameState, PlayerInGame, Settings, CardDB, Rules, AI) {
    return class GameEngine {

        /**
         * Initialize a new game with the player(s).
         * @param onePlayer Whether one (against an AI) or two players play
         * @returns {*} The GameState
         * @since 17.11.07
         */
        initGame(onePlayer) {
            this.gameState = new GameState(onePlayer, 3, 3);
            let players = [new PlayerInGame(Settings.getPlayer1Name()), new PlayerInGame(Settings.getPlayer2Name())];

            logger.info(Settings.getPlayer1Name() + " and " + Settings.getPlayer2Name() + " are playing");
            this.gameState.setPlayers(players);

            return this.drawCards();
        }

        /**
         * Draw and assign 5 cards to each player.
         * @returns {*} The GameState
         * @since 17.11.07
         */
        drawCards() {
            //Draw the players' cards
            for (let i = 0, nbPlayers = this.gameState.getPlayers().length; i < nbPlayers; i++) {
                let deck = CardDB.getRandomCards(5);

                logger.info(this.gameState.getPlayer(i).getName() + " drawn " + deck.map(card => card.getName()).join(', '));
                this.gameState.getPlayer(i).setDeck(deck);
            }

            this.drawFirstPlayerPlaying();

            return this.gameState;
        }

        /**
         * Choose randomly the player who is going to start the game.
         * @since 17.11.07
         */
        drawFirstPlayerPlaying() {
            let nbPlayerToPlay = Math.floor(Math.random() * this.gameState.getPlayers().length);
            this.gameState.setPlayerPlaying(this.gameState.getPlayers()[nbPlayerToPlay]);

            logger.info(this.gameState.getPlayerPlaying().getName() + " starts");
        }

        /**
         * Play the card on the board and apply the rules.
         * @param card Card played by the player
         * @param args The coordinates on the board where the card is played
         * @returns {[*,*,*]} The GameState, the index of the played card and its coordinates
         * @since 17.11.07
         */
        playCard(card, ...args) {
            //Remove the card from the deck
            let indexCard = this.gameState.getPlayerPlaying().removeCard(card);
            logger.debug("[card: " + card.getName() + "; index:  " + indexCard + "]  removed from [player: " + this.gameState.getPlayerPlaying().getName() + "]'s deck");

            //Play the card on the board
            this.gameState.getBoard().playCardOnBoard(card, this.gameState.getPlayerPlaying(), ...args);
            logger.info(this.gameState.getPlayerPlaying().getName() + " plays " + card.getName() + " on " + args);

            //Apply the rules
            new Rules().apply(this.gameState.getBoard(), ...args);

            return [this.gameState, indexCard, ...args];
        }

        /**
         * Play the card on the board and apply the rules.
         * @param card Card played by the player
         * @param args The coordinates on the board where the card is played
         * @returns {[*,*,*]} The GameState, the index of the played card and its coordinates
         * @since 17.11.11
         */
        playerPlaysCard(card, ...args) {
            return this.playCard(card, ...args);
        }

        /**
         * Select a card, a case and play the card.
         * @returns {[*,*,*]} The GameState, the index of the played card and its coordinates
         * @since 17.11.11
         */
        AIPlaysCard() {
            let cardAndCoordinates = new AI().chooseCardAndCase(this.gameState, Settings.getDifficulty());
            return this.playCard(cardAndCoordinates.card, ...cardAndCoordinates.coordinates);
        }

        /**
         * Reset the "flipping state" of all the cards on the board.
         * Set the turn to the next player.
         * Check whether the game is over.
         * @returns {*} The GameState
         * @since 17.11.07
         */
        endTurn() {
            logger.info(this.gameState.getPlayerPlaying().getName() + " ended his turn");

            //Set the cards on board to unflipped
            for (let i = 0; i < this.gameState.getBoard().getRows(); i++) {
                for (let j = 0; j < this.gameState.getBoard().getCols(); j++) {
                    if (this.gameState.getBoard().getCardOnBoard(i, j) !== undefined) {
                        this.gameState.getBoard().getCardOnBoard(i, j).unflip();
                    }
                }
            }

            //End of the game or next player
            if (this.gameState.isGameOver()) {
                logger.info("The game is over. Winner(s) : " + this.gameState.getWinner().map(player => player.getName()).join(","));
                return this.gameState;
            } else {
                let nextPlayerToPlay;
                if (this.gameState.getIndexPlayerPlaying() < this.gameState.getPlayers().length - 1) {
                    nextPlayerToPlay = this.gameState.getPlayer(this.gameState.getIndexPlayerPlaying() + 1);
                } else {
                    nextPlayerToPlay = this.gameState.getPlayer(0);
                }
                this.gameState.setPlayerPlaying(nextPlayerToPlay);

                logger.info(nextPlayerToPlay.getName() + "'s turn");

                return this.gameState;
            }
        }

    };
});