'use strict';

define(["js/models/GameState",
    "js/models/PlayerInGame",
    "js/models/Settings",
    "js/models/CardDB",
    "js/Rules"], function (GameState, PlayerInGame, Settings, CardDB, Rules) {
    return class GameEngine {
        initGame() {
            this.gameState = new GameState(3, 3);
            let players = [new PlayerInGame(Settings.getPlayer1Name()), new PlayerInGame(Settings.getPlayer2Name())];

            logger.info(Settings.getPlayer1Name() + " and " + Settings.getPlayer2Name() + " are playing");
            this.gameState.setPlayers(players);

            return this.drawCards();
        }

        drawCards() {
            //Draw the players' cards
            for (let i = 0, nbPlayers = this.gameState.getPlayers().length; i < nbPlayers; i++) {
                let deck = CardDB.getRandomCards(5);

                logger.info(this.gameState.getPlayer(i).getName() + " drawn " + deck.map(card => card.getName()).join(', '));
                this.gameState.getPlayer(i).setDeck(deck);
            }

            this.drawFirstPlayerToPlay();

            return this.gameState;
        }

        drawFirstPlayerToPlay() {
            let nbPlayerToPlay = Math.floor(Math.random() * this.gameState.getPlayers().length);
            this.gameState.setPlayerPlaying(this.gameState.getPlayers()[nbPlayerToPlay]);

            logger.info(this.gameState.getPlayerPlaying().getName() + " starts");
        }

        playCard(card, ...args) {
            //Remove the card from the deck
            let indexCard = this.gameState.getPlayerPlaying().removeCard(card);
            logger.debug(card.getName() + " (index " + indexCard + ")  removed from " + this.gameState.getPlayerPlaying().getName() + "'s deck");

            //Play the card on the board
            this.gameState.getBoard().playCardOnBoard(card, this.gameState.getPlayerPlaying(), ...args);
            logger.info(this.gameState.getPlayerPlaying().getName() + " plays " + card.getName() + " on " + args);

            //Apply the rules
            new Rules().apply(this.gameState.getBoard(), ...args);

            return [this.gameState, indexCard, ...args];
        }

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