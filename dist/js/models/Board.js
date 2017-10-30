/**
 * The board where cards are played.
 * @author Jean-Gabriel Genest
 * @since 17.10.22
 * @version 17.10.22
 */
class Board {

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
     * @param playerToPlay PlayerInGame playing the card
     * @param row Row where the card is played
     * @param col Column where the card is played
     * @since 17.10.22
     */
    playCardOnBoard(card, playerToPlay, row, col) {
        if (typeof card !== "object" || !(card instanceof Card)) {
            throw new TypeError("Expected Card type but " + card.constructor.name + " found");
        }
        if (typeof playerToPlay !== "object" || !(playerToPlay instanceof PlayerInGame)) {
            throw new TypeError("Expected PlayerInGame type but " + playerToPlay.constructor.name + " found");
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
        this.board[row][col] = new CardOnBoard(card, playerToPlay);
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
            logger.warning("The row should be between 0 and " + this.rows + " but " + row + " found");
        }
        if (col < 0 || col > this.cols) {
            logger.warning("The column should be between 0 and " + this.cols + " but " + col + " found");
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
            logger.warning("Expected CardOnBoard type but " + card.constructor.name + " found");
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
            logger.warning("Expected CardOnBoard type but " + card1.constructor.name + " found");
        }
        if (typeof card2 !== "object" || !(card1 instanceof CardOnBoard)) {
            logger.warning("Expected CardOnBoard type but " + card2.constructor.name + " found");
        }

        let card1Pos, card2Pos;
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                if (this.board[i][j] === card1) {
                    card1Pos = {row: i, col: j};
                } else if (this.board[i][j] === card2) {
                    card2Pos = {row: i, col: j};
                }
            }
        }

        if (card1Pos === undefined || card2Pos === undefined) {
            logger.warning(card1.getCard().getName() + " and/or " + card2.getCard().getName() + " are not on the board");
            return;
        }

        let position;
        if (card1Pos.col === card2Pos.col && card1Pos.row < card2Pos.row) {
            position = Board.positions.TOP;
        } else if (card1Pos.col > card2Pos.col && card1Pos.row < card2Pos.row) {
            position = Board.positions.TOP_RIGHT;
        } else if (card1Pos.col > card2Pos.col && card1Pos.row === card2Pos.row) {
            position = Board.positions.RIGHT;
        } else if (card1Pos.col === card2Pos.col && card1Pos.row > card2Pos.row) {
            position = Board.positions.BOTTOM;
        } else if (card1Pos.col < card2Pos.col && card1Pos.row > card2Pos.row) {
            position = Board.positions.BOTTOM_LEFT;
        } else if (card1Pos.col < card2Pos.col && card1Pos.row === card2Pos.row) {
            position = Board.positions.LEFT;
        } else if (card1Pos.col < card2Pos.col && card1Pos.row < card2Pos.row) {
            position = Board.positions.TOP_LEFT;
        }

        logger.debug(card1.getCard().getName() + "'s relative position to " + card2.getCard().getName() + " is " + Object.keys(Board.positions)[position]);

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
            logger.warning("Expected PlayerInGame type but " + player.constructor.name + " found");
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
}

/**
 * Enumeration to indicate the position of a card relative to another one
 * @type {{TOP: number, TOP_RIGHT: number, RIGHT: number, BOTTOM_RIGHT: number, BOTTOM: number, BOTTOM_LEFT: number, LEFT: number, TOP_LEFT: number}}
 * @since 17.10.22
 */
Board.positions = {
    TOP: 1,
    TOP_RIGHT: 2,
    RIGHT: 3,
    BOTTOM_RIGHT: 4,
    BOTTOM: 5,
    BOTTOM_LEFT: 6,
    LEFT: 7,
    TOP_LEFT: 8
};