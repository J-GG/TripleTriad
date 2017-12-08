'use strict';

/**
 * A Player playing a game.
 * @author Jean-Gabriel Genest
 * @since 17.10.22
 * @version 17.10.22
 */
define([cardGame.gamePath + "js/models/Player.js",
    cardGame.gamePath + "js/models/Card.js"], function (Player, Card) {
    return class PlayerInGame extends Player {

        /**
         * Construct a player playing a game.
         * @param name The player's name
         * @since 17.10.22
         */
        constructor(name) {
            super(name);
            this.deck = [];
        }

        /**
         * Set the player's deck.
         * @param deck The player's deck
         * @since 17.10.22
         */
        setDeck(deck) {
            this.deck = deck;
        }

        /**
         * Get the player's deck.
         * @returns {Array|*} The player's deck
         * @since 17.10.22
         */
        getDeck() {
            return this.deck;
        }

        /**
         * Set the board on which the player is playing.
         * @param board The board on which the player is playing
         * @since 17.10.22
         */
        setBoard(board) {
            this.board = board;
        }

        /**
         * Get the board on which the player is playing.
         * @returns {*} The board on which the player is playing
         * @since 17.10.22
         */
        getBoard() {
            return this.board;
        }

        /**
         * Get the number of cards owned by the player (deck + on board).
         * @returns {number} The number of cards owned by the player (deck + on board)
         * @since 17.10.22
         */
        getScore() {
            return this.deck.length + this.board.getPlayerScore(this);
        }

        /**
         * Get the card in the deck at the given index.
         * @param index The index of the wanted card
         * @returns {*} The Card
         * @since 17.10.22
         */
        getCard(index) {
            if (index < 0) {
                logger.warning("The index should be greater than 0 but " + index + " found");
            }
            return this.deck[index];
        }

        /**
         * Remove the specified card from the deck.
         * @param cardToRemove The Card to remove from the deck
         * @returns {number} The index of the removed card or -1
         * @since 17.10.22
         */
        removeCard(cardToRemove) {
            if (typeof cardToRemove !== "object" || !(cardToRemove instanceof Card)) {
                logger.warning("Expected Card type");
            }
            let indexToRemove = this.deck.indexOf(cardToRemove);
            this.deck.splice(indexToRemove, 1);

            return indexToRemove;
        }
    }
});