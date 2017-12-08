'use strict';

/**
 * The board where cards are played.
 * @author Jean-Gabriel Genest
 * @since 17.10.22
 * @version 17.11.10
 */
define([cardGame.gamePath + "js/models/PlayerInGame.js",
    cardGame.gamePath + "js/models/Card.js",
    cardGame.gamePath + "js/models/CardOnBoard.js"], function (PlayerInGame, Card, CardOnBoard) {
    return class Board {

        /**
         * Construct an empty Board of the specified size.
         * @param nbRows The number of rows on the board
         * @param nbCols The number of cols on the board
         * @since 17.10.22
         */
        constructor(nbRows, nbCols) {
            if (nbRows <= 0) {
                throw new RangeError("The number of rows should be greater than 0");
            }
            if (nbCols <= 0) {
                throw new RangeError("The number of rows should be greater than 0");
            }
            this.rows = nbRows;
            this.cols = nbCols;
            this.board = [];
            for (let i = 0; i < this.rows; i++) {
                this.board[i] = [];
                for (let j = 0; j < this.cols; j++) {
                    this.board[i][j] = undefined;
                }
            }
        }

        /**
         * Enumeration to indicate the position of a card relative to another one.
         * @returns {{TOP: number, TOP_RIGHT: number, RIGHT: number, BOTTOM_RIGHT: number, BOTTOM: number, BOTTOM_LEFT: number, LEFT: number, TOP_LEFT: number}}
         * @since 17.11.04
         */
        static getCardPositions() {
            return {
                TOP: 0,
                TOP_RIGHT: 1,
                RIGHT: 2,
                BOTTOM_RIGHT: 3,
                BOTTOM: 4,
                BOTTOM_LEFT: 5,
                LEFT: 6,
                TOP_LEFT: 7
            };
        }

        /**
         * Get the number of rows on the board.
         * @returns {number} The number of rows on the board
         * @since 17.10.22
         */
        getRows() {
            return this.rows;
        }

        /**
         * Get the number of columns on the board.
         * @returns {number} The number of columns on the board
         * @since 17.10.22
         */
        getCols() {
            return this.cols;
        }

        /**
         * Add the card on the board at the specified position.
         * @param card CardOnBoard played and added on the board
         * @param playerPlaying PlayerInGame playing the card
         * @param row Row where the card is played
         * @param col Column where the card is played
         * @since 17.10.22
         */
        playCardOnBoard(card, playerPlaying, row, col) {
            if (typeof card !== "object" || !(card instanceof Card)) {
                throw new TypeError("Expected Card type");
            }
            if (typeof playerPlaying !== "object" || !(playerPlaying instanceof PlayerInGame)) {
                throw new TypeError("Expected PlayerInGame type");
            }
            if (row < 0 || row > this.rows) {
                throw new RangeError("The row should be between 0 and " + this.rows);
            }
            if (col < 0 || col > this.cols) {
                throw new RangeError("The column should be between 0 and " + this.cols);
            }

            if (this.board[row][col] !== undefined) {
                logger.warning("There is already a card on the board at this position");
            }
            this.board[row][col] = new CardOnBoard(card, playerPlaying);
        }

        /**
         * Get the card at the specified row and column.
         * @param row The row of the case
         * @param col The column of the case
         * @returns {*} The CardOnBoard at the specified row and column. Returns undefined if there is no card
         * @since 17.10.22
         */
        getCardOnBoard(row, col) {
            if (row < 0 || row > this.rows) {
                logger.warning("The row should be between 0 and " + this.rows + " but [row: " + row + "] found");
                return;
            }
            if (col < 0 || col > this.cols) {
                logger.warning("The column should be between 0 and " + this.cols + " but [col: " + col + "] found");
                return;
            }

            return this.board[row][col];
        }

        /**
         * Get the card above the specified row and column.
         * @param row The row of the case
         * @param col The column of the case
         * @returns {*} The CardOnBoard above the specified row and column. Returns undefined if there is no card or if it's outside the board
         * @since 17.10.22
         */
        getCardAbove(row, col) {
            return (row - 1 >= 0) ? this.board[row - 1][col] : undefined;
        }

        /**
         * Get the card on the right of the specified row and column.
         * @param row The row of the case
         * @param col The column of the case
         * @returns {*} The CardOnBoard on the right the specified row and column. Returns undefined if there is no card or if it's outside the board
         * @since 17.10.22
         */
        getCardOnTheRight(row, col) {
            return (col + 1 < this.cols) ? this.board[row][col + 1] : undefined;
        }

        /**
         * Get the card below the specified row and column.
         * @param row The row of the case
         * @param col The column of the case
         * @returns {*} The CardOnBoard below the specified row and column. Returns undefined if there is no card or if it's outside the board
         * @since 17.10.22
         */
        getCardBelow(row, col) {
            return (row + 1 < this.rows) ? this.board[row + 1][col] : undefined;
        }

        /**
         * Get the card on the left of the specified row and column.
         * @param row The row of the case
         * @param col The column of the case
         * @returns {*} The CardOnBoard on the left the specified row and column. Returns undefined if there is no card or if it's outside the board
         * @since 17.10.22
         */
        getCardOnTheLeft(row, col) {
            return (col - 1 >= 0) ? this.board[row][col - 1] : undefined;
        }

        /**
         * Get the coordinate of the card.
         * @param card CardOnBoard to look for
         * @returns {*} A object {row: row, col: col} containing the position of the card or undefined if it couldn't be found
         * @since 17.10.22
         */
        getCardCoordinate(card) {
            if (typeof card !== "object" || !(card instanceof CardOnBoard)) {
                logger.warning("Expected CardOnBoard type");
            }

            for (let i = 0; i < this.rows; i++) {
                for (let j = 0; j < this.cols; j++) {
                    if (this.board[i][j] === card) {
                        return {row: i, col: j};
                    }
                }
            }

            return undefined;
        }

        /**
         * Returns the relative position of card1 to card2.
         * @param card1 The card the position is being looked for
         * @param card2 The card of reference
         * @returns {number} A value among the position enumeration
         * @since 17.10.22
         */
        getRelativePositionOf(card1, card2) {
            if (typeof card1 !== "object" || !(card1 instanceof CardOnBoard)) {
                logger.warning("Expected CardOnBoard type");
            }
            if (typeof card2 !== "object" || !(card1 instanceof CardOnBoard)) {
                logger.warning("Expected CardOnBoard type but");
            }

            let card1Pos = this.getCardCoordinate(card1);
            let card2Pos = this.getCardCoordinate(card2);

            if (card1Pos === undefined || card2Pos === undefined) {
                logger.warning("[card1: " + card1.getCard().getName() + "] and/or [card2: " + card2.getCard().getName() + "] are not on the board");
                return;
            }

            let position;
            if (card1Pos.col === card2Pos.col && card1Pos.row < card2Pos.row) {
                position = Board.getCardPositions().TOP;
            } else if (card1Pos.col > card2Pos.col && card1Pos.row < card2Pos.row) {
                position = Board.getCardPositions().TOP_RIGHT;
            } else if (card1Pos.col > card2Pos.col && card1Pos.row === card2Pos.row) {
                position = Board.getCardPositions().RIGHT;
            } else if (card1Pos.col === card2Pos.col && card1Pos.row > card2Pos.row) {
                position = Board.getCardPositions().BOTTOM;
            } else if (card1Pos.col < card2Pos.col && card1Pos.row > card2Pos.row) {
                position = Board.getCardPositions().BOTTOM_LEFT;
            } else if (card1Pos.col < card2Pos.col && card1Pos.row === card2Pos.row) {
                position = Board.getCardPositions().LEFT;
            } else if (card1Pos.col < card2Pos.col && card1Pos.row < card2Pos.row) {
                position = Board.getCardPositions().TOP_LEFT;
            }

            logger.debug("[card1: " + card1.getCard().getName() + "; row: " + card1Pos.row + "; col: " + card1Pos.col + "]'s relative position to "
                + "[card2: " + card2.getCard().getName() + "; row: " + card2Pos.row + "; col: " + card2Pos.col + "] is "
                + Object.keys(Board.getCardPositions())[position]);

            return position;
        }

        /**
         * Get the number of cards on the board owned by the player.
         * @param player the PlayerInGame whose the score is wanted
         * @returns {number} Number of cards on the board owned by the player
         * @since 17.10.22
         */
        getPlayerScore(player) {
            if (typeof player !== "object" || !(player instanceof PlayerInGame)) {
                logger.warning("Expected PlayerInGame type");
            }

            let score = 0;
            for (let i = 0; i < this.rows; i++) {
                for (let j = 0; j < this.cols; j++) {
                    if (typeof this.board[i][j] === "object" && this.board[i][j].getOwner() === player) {
                        score++;
                    }
                }
            }

            return score;
        }

        /**
         * Whether all the cases of the board contain a card.
         * @returns {boolean} True if all the cases contain a card
         * @since 17.10.22
         */
        isComplete() {
            for (let i = 0; i < this.rows; i++) {
                for (let j = 0; j < this.cols; j++) {
                    if (this.board[i][j] === undefined) {
                        return false;
                    }
                }
            }

            return true;
        }

        /**
         * Get the list of cases where there is no card.
         * @returns {Array} The list of empty cases (array [row, column] format)
         * @since 17.11.11
         */
        getEmptyCases() {
            let emptyCases = [];
            for (let i = this.rows - 1; i >= 0; i--) {
                for (let j = this.cols - 1; j >= 0; j--) {
                    if (this.board[i][j] === undefined) {
                        emptyCases.push([i, j]);
                    }
                }
            }

            return emptyCases;
        }
    };
});