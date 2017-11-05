/**
 * A Card.
 * @author Jean-Gabriel Genest
 * @since 17.10.22
 * @version 17.10.22
 */
define([], function () {
    return class Card {

        /**
         * Construct a Card.
         * @param name The name of the card
         * @param level The level of the card
         * @param up The power of the top side of the card
         * @param right The power of the right side of the card
         * @param down The power of the bottom side of the card
         * @param left The power of the left side of the card
         * @since 17.10.22
         */
        constructor(name, level, up, right, down, left) {
            if (typeof name !== "string") {
                throw new TypeError("Expected String type");
            }
            if (!(Number.isInteger(level) || Number.isInteger(up) || Number.isInteger(right) || Number.isInteger(down) || Number.isInteger(left))) {
                throw new TypeError("Expected Integer");
            }
            this.name = name;
            this.level = level;
            this.up = up;
            this.right = right;
            this.down = down;
            this.left = left;
        }

        /**
         * Get the name of the card
         * @returns {string}
         * @since 17.10.22
         */
        getName() {
            return this.name;
        }

        /**
         * Get the level of the card
         * @returns {number}
         * @since 17.10.22
         */
        getLevel() {
            return this.level;
        }

        /**
         * Get the power of the top side of the card
         * @returns {number}
         * @since 17.10.22
         */
        getUp() {
            return this.up;
        }

        /**
         * Get the power of the right side of the card
         * @returns {number}
         * @since 17.10.22
         */
        getRight() {
            return this.right;
        }

        /**
         * Get the power of the bottom side of the card
         * @returns {number}
         * @since 17.10.22
         */
        getDown() {
            return this.down;
        }

        /**
         * Get the power of the left side of the card
         * @returns {number}
         * @since 17.10.22
         */
        getLeft() {
            return this.left;
        }
    }
});