/**
 * A Card played on the board.
 * Contains a card and other information about its state on the board.
 * @author Jean-Gabriel Genest
 * @since 17.10.22
 * @version 17.10.22
 */
define([cardGame.gamePath + "js/models/Card.js",
    cardGame.gamePath + "js/models/PlayerInGame.js"], function (Card, PlayerInGame) {
    return class CardOnBoard {

        /**
         * Construct a CardOnBoard.
         * @param card The card
         * @param player The playerInGame owning the card
         * @since 17.10.22
         */
        constructor(card, player) {
            if (typeof card !== "object" || !(card instanceof Card)) {
                throw new TypeError("Expected Card type");
            }
            if (typeof player !== "object" || !(player instanceof PlayerInGame)) {
                throw new TypeError("Expected PlayerInGame type");
            }
            this.card = card;
            this.player = player;
            this.flippedByCard = undefined;
            this.flippedByRule = undefined;
            this.flippedStep = undefined;
        }

        /**
         * Get the Card.
         * @returns {Card} The Card
         * @since 17.10.22
         */
        getCard() {
            return this.card;
        }

        /**
         * Get the PlayerInGame.
         * @returns {*} The PlayerInGame
         * @since 17.10.22
         */
        getOwner() {
            return this.player;
        }

        /**
         * Flip the card.
         * @param player The playerInGame flipping this card
         * @param card The Card flipping this card
         * @param rule The rule responsible for flipping this card
         * @param step The step in the chain of flipping
         * @since 17.10.22
         */
        flip(player, card, rule, step) {
            this.player = player;
            this.flippedByCard = card;
            this.flippedByRule = rule;
            this.flippedStep = step;
        }

        /**
         * Unflip the card.
         * @since 17.10.22
         */
        unflip() {
            this.flippedByCard = undefined;
            this.flippedByRule = undefined;
            this.flippedStep = undefined;
        }

        /**
         * Whether the card has been flipped or not.
         * @returns {boolean} True is the card has been flipped
         * @since 17.10.22
         */
        isFlipped() {
            return this.flippedByCard !== undefined;
        }

        /**
         * Get the card which flipped this card.
         * @returns {undefined|*} The CardInGame which flipped the card or undefined
         * @since 17.10.22
         */
        getFlippedByCard() {
            return this.flippedByCard;
        }

        /**
         * Get the rule responsible for flipping the card.
         * @returns {*|undefined} The rule responsible for flipping the card
         * @since 17.10.22
         */
        getFlippedByRule() {
            return this.flippedByRule;
        }

        /**
         * Get the step in the flipping chain
         * @returns {undefined|*} The step in the flipping chain
         * @since 17.10.22
         */
        getFlippedStep() {
            return this.flippedStep
        }
    }
});