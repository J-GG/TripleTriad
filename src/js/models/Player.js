'use strict';

define([], function () {
    /**
     * A Player.
     * @author Jean-Gabriel Genest
     * @since 17.10.22
     * @version 17.10.22
     */
    return class Player {

        /**
         * Construct a Player.
         * @param name The player's name
         * @since 17.10.22
         */
        constructor(name) {
            if (typeof name !== "string") {
                throw new TypeError("Expected String type");
            }
            this.name = name;
            this.cards = [];
        }

        /**
         * Get the player's name.
         * @returns {*} The player's name
         * @since 17.10.22
         */
        getName() {
            return this.name;
        }

        /**
         * Set the player's cards
         * @param cards The player's cards
         * @since 17.10.22
         */
        setCards(cards) {
            this.cards = cards;
        }

        /**
         * Get the player's cards
         * @returns {Array|*} The player's cards
         * @since 17.10.22
         */
        getCards() {
            return this.cards;
        }
    }
});