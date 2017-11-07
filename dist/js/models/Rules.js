'use strict';

/**
 * The application of rules.
 * @author Jean-Gabriel Genest
 * @since 17.11.04
 * @version 17.11.06
 */
define(["js/models/Settings"], function (Settings) {
    return class Rules {

        /**
         * Enumeration to list all the rules.
         * @returns {{SIMPLE: string, OPEN: string, WAR: string, SAME: string, PLUS: string, COMBO: string}}
         * @since 17.11.04
         */
        static getRules() {
            return {
                SIMPLE: "SIMPLE",
                OPEN: "OPEN",
                WAR: "WAR",
                SAME: "SAME",
                PLUS: "PLUS",
                COMBO: "COMBO"
            };
        }

        /**
         * Apply the rules according to the selected rules defined in the Settings.
         * @param board Board where the card is played
         * @param row Row where the card is played on the board
         * @param col Column where the card is played on the board
         * @since 17.11.04
         */
        apply(board, row, col) {
            this.step = 1;
            this.board = board;
            this.row = row;
            this.col = col;
            this.card = board.getCardOnBoard(row, col);
            this.cardUp = this.board.getCardAbove(row, col);
            this.cardRight = this.board.getCardOnTheRight(row, col);
            this.cardDown = this.board.getCardBelow(row, col);
            this.cardLeft = this.board.getCardOnTheLeft(row, col);

            if (this.card === undefined) {
                logger.warning("There is no card on the board at the coordinates [row: " + row + "; col: " + col + "]");
                return;
            }

            let flipped = [];
            this.simpleRule();
            if (Settings.isWarEnabled()) {
                this.warRule();
            }
            if (Settings.isSameEnabled()) {
                flipped = flipped.concat(this.sameRule());
            }
            if (Settings.isPlusEnabled()) {
                flipped = flipped.concat(this.plusRule());
            }

            if (Settings.isComboEnabled()) {
                for (let i = 0; i < flipped.length; i++) {
                    let coordinate = board.getCardCoordinate(flipped[i]);
                    this.card = flipped[i];
                    this.row = coordinate.row;
                    this.col = coordinate.col;
                    this.cardUp = this.board.getCardAbove(this.row, this.col);
                    this.cardRight = this.board.getCardOnTheRight(this.row, this.col);
                    this.cardDown = this.board.getCardBelow(this.row, this.col);
                    this.cardLeft = this.board.getCardOnTheLeft(this.row, this.col);

                    flipped = flipped.concat(this.simpleRule(true));
                }
            }
        }

        /**
         * Apply the simple rule.
         * @param isCombo Whether the rule is applied as a combo as a simple rule. True if it's a combo
         * @returns {Array} The list of flipped cards
         * @since 17.11.06
         */
        simpleRule(isCombo) {
            let flipped = [];
            let rule = isCombo ? Rules.getRules().COMBO : Rules.getRules().SIMPLE;

            logger.debug("Try " + rule + " rule [card: " + this.card.getCard().getName() + "; row: " + this.row + "; col:" + this.col + "]");

            if (this.cardUp && this.cardUp.getOwner() !== this.card.getOwner() && this.cardUp.getCard().getDown() < this.card.getCard().getUp()) {
                flipped.push(this.cardUp);
            }
            if (this.cardDown && this.cardDown.getOwner() !== this.card.getOwner() && this.cardDown.getCard().getUp() < this.card.getCard().getDown()) {
                flipped.push(this.cardDown);
                this.cardDown.flip(this.card.getOwner(), this.card, rule, this.step);
            }
            if (this.cardLeft && this.cardLeft.getOwner() !== this.card.getOwner() && this.cardLeft.getCard().getRight() < this.card.getCard().getLeft()) {
                flipped.push(this.cardLeft);
            }
            if (this.cardRight && this.cardRight.getOwner() !== this.card.getOwner() && this.cardRight.getCard().getLeft() < this.card.getCard().getRight()) {
                flipped.push(this.cardRight);
            }

            for (let i = flipped.length - 1; i >= 0; i--) {
                flipped[i].flip(this.card.getOwner(), this.card, rule, this.step);
                logger.info("Rule " + rule + " : (step " + this.step + ") " + this.card.getCard().getName() + " flips " + flipped[i].getCard().getName());
            }

            if (flipped.length > 0) {
                this.step++;
            }

            return flipped;
        }

        /**
         * Apply the same rule.
         * @returns {Array} The list of flipped cards
         * @since 17.11.06
         */
        sameRule() {
            logger.debug("Try " + Rules.getRules().SAME + " rule [card: " + this.card.getCard().getName() + "; row: " + this.row + "; col:" + this.col + "]");

            let flipped = [];
            let cardsCouldBeFlipped = [];
            let sameCards = 0;

            if (this.cardUp && this.cardUp.getCard().getDown() === this.card.getCard().getUp()) {
                sameCards++;
                if (this.cardUp.getOwner() !== this.card.getOwner()) {
                    cardsCouldBeFlipped.push(this.cardUp);
                }
            }
            if (this.cardDown && this.cardDown.getCard().getUp() === this.card.getCard().getDown()) {
                sameCards++;
                if (this.cardDown.getOwner() !== this.card.getOwner()) {
                    cardsCouldBeFlipped.push(this.cardDown);
                }
            }
            if (this.cardLeft && this.cardLeft.getCard().getRight() === this.card.getCard().getLeft()) {
                sameCards++;
                if (this.cardLeft.getOwner() !== this.card.getOwner()) {
                    cardsCouldBeFlipped.push(this.cardLeft);
                }
            }
            if (this.cardRight && this.cardRight.getCard().getLeft() === this.card.getCard().getRight()) {
                sameCards++;
                if (this.cardRight.getOwner() !== this.card.getOwner()) {
                    cardsCouldBeFlipped.push(this.cardRight);
                }
            }

            if (sameCards >= 2 && cardsCouldBeFlipped.length >= 1) {
                for (let i = cardsCouldBeFlipped.length - 1; i >= 0; i--) {
                    flipped.push(cardsCouldBeFlipped[i]);
                    cardsCouldBeFlipped[i].flip(this.card.getOwner(), this.card, Rules.getRules().SAME, this.step);
                    logger.info("Rule " + Rules.getRules().SAME + " : (step " + this.step + ") " + this.card.getCard().getName() + " flips " + cardsCouldBeFlipped[i].getCard().getName());
                }
                this.step++;
            }

            return flipped;
        }

        /**
         * Apply the war rule.
         * @returns {Array} The list of flipped cards
         * @since 17.11.06
         */
        warRule() {
            logger.debug("Try " + Rules.getRules().WAR + " rule [card: " + this.card.getCard().getName() + "; row: " + this.row + "; col:" + this.col + "]");

            let flipped = [];
            let sum = this.card.getCard().getUp() + this.card.getCard().getRight() + this.card.getCard().getDown() + this.card.getCard().getLeft();

            if (this.cardUp && this.cardUp.getOwner() !== this.card.getOwner() && this.cardUp.getCard().getDown() === this.card.getCard().getUp()) {
                let sumUp = this.cardUp.getCard().getUp() + this.cardUp.getCard().getRight() + this.cardUp.getCard().getDown() + this.cardUp.getCard().getLeft();
                if (sumUp < sum) {
                    flipped.push(this.cardUp);
                }
            }
            if (this.cardDown && this.cardDown.getOwner() !== this.card.getOwner() && this.cardDown.getCard().getUp() === this.card.getCard().getDown()) {
                let sumDown = this.cardDown.getCard().getUp() + this.cardDown.getCard().getRight() + this.cardDown.getCard().getDown() + this.cardDown.getCard().getLeft();
                if (sumDown < sum) {
                    flipped.push(this.cardDown);
                }
            }
            if (this.cardLeft && this.cardLeft.getOwner() !== this.card.getOwner() && this.cardLeft.getCard().getRight() === this.card.getCard().getLeft()) {
                let sumLeft = this.cardLeft.getCard().getUp() + this.cardLeft.getCard().getRight() + this.cardLeft.getCard().getDown() + this.cardLeft.getCard().getLeft();
                if (sumLeft < sum) {
                    flipped.push(this.cardLeft);
                }
            }
            if (this.cardRight && this.cardRight.getOwner() !== this.card.getOwner() && this.cardRight.getCard().getLeft() === this.card.getCard().getRight()) {
                let sumRight = this.cardRight.getCard().getUp() + this.cardRight.getCard().getRight() + this.cardRight.getCard().getDown() + this.cardRight.getCard().getLeft();
                if (sumRight < sum) {
                    flipped.push(this.cardRight);
                }
            }

            for (let i = flipped.length - 1; i >= 0; i--) {
                flipped[i].flip(this.card.getOwner(), this.card, Rules.getRules().WAR, this.step);
                logger.info("Rule " + Rules.getRules().WAR + " : (step " + this.step + ") " + this.card.getCard().getName() + " flips " + flipped[i].getCard().getName());
            }

            if (flipped.length > 0) {
                this.step++;
            }

            return flipped;
        }

        /**
         * Apply the plus rule.
         * @returns {Array} The list of flipped cards
         * @since 17.11.06
         */
        plusRule() {
            logger.debug("Try " + Rules.getRules().PLUS + " rule [card: " + this.card.getCard().getName() + "; row: " + this.row + "; col:" + this.col + "]");

            let flipped = [];
            let sums = [];

            if (this.cardUp) {
                let sum = this.cardUp.getCard().getDown() + this.card.getCard().getUp();
                sums[sum] = sums[sum] || [];
                sums[sum].push(this.cardUp);
            }
            if (this.cardDown) {
                let sum = this.cardDown.getCard().getUp() + this.card.getCard().getDown();
                sums[sum] = sums[sum] || [];
                sums[sum].push(this.cardDown);
            }
            if (this.cardLeft) {
                let sum = this.cardLeft.getCard().getRight() + this.card.getCard().getLeft();
                sums[sum] = sums[sum] || [];
                sums[sum].push(this.cardLeft);
            }
            if (this.cardRight) {
                let sum = this.cardRight.getCard().getLeft() + this.card.getCard().getRight();
                sums[sum] = sums[sum] || [];
                sums[sum].push(this.cardRight);
            }

            for (let sum in sums) {
                if (sums[sum].length >= 2) {
                    for (let i = 0; i < sums[sum].length; i++) {
                        let card = sums[sum][i];
                        if (card.getOwner() !== this.card.getOwner()) {
                            flipped.push(card);
                            card.flip(this.card.getOwner(), this.card, Rules.getRules().PLUS, this.step);
                            logger.info("Rule " + Rules.getRules().PLUS + " : (step " + this.step + ") "
                                + this.card.getCard().getName() + " flips " + card.getCard().getName()
                                + " (sum : " + sum + " with " + sums[sum].map(card => card.getCard().getName()).join(', ') + ")");

                        }
                    }
                }
            }

            if (flipped.length > 0) {
                this.step++;
            }

            return flipped;
        }
    };
});