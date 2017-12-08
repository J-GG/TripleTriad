'use strict';

/**
 * The application of rules.
 * @author Jean-Gabriel Genest
 * @since 17.11.04
 * @version 17.11.10
 */
define([cardGame.gamePath + "js/models/Settings.js"], function (Settings) {
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

        initContext(row, col) {
            this.row = row;
            this.col = col;
            this.cardUp = this.board.getCardAbove(row, col);
            this.cardRight = this.board.getCardOnTheRight(row, col);
            this.cardDown = this.board.getCardBelow(row, col);
            this.cardLeft = this.board.getCardOnTheLeft(row, col);
        }

        /**
         * Apply the rules according to the selected rules defined in the Settings.
         * @param board Board where the card is played
         * @param row Row where the card is played on the board
         * @param col Column where the card is played on the board
         * @since 17.11.04
         */
        apply(board, row, col) {
            this.step = 0;
            this.board = board;
            this.card = board.getCardOnBoard(row, col);
            this.initContext(row, col);

            if (this.card === undefined) {
                logger.warning("There is no card on the board at the coordinates [row: " + row + "; col: " + col + "]");
                return;
            }

            let flipped = [];

            if (Settings.isRuleEnabled(Rules.getRules().SAME)) {
                flipped = this.sameRule();
                this.flip(flipped, Rules.getRules().SAME);
            }

            if (Settings.isRuleEnabled(Rules.getRules().PLUS)) {
                let flippedPlus = this.plusRule();
                this.flip(flippedPlus, Rules.getRules().PLUS);
                flipped = flipped.concat(flippedPlus);
            }

            this.flip(this.simpleRule(), Rules.getRules().SIMPLE);

            if (Settings.isRuleEnabled(Rules.getRules().WAR)) {
                this.flip(this.warRule(), Rules.getRules().WAR);
            }

            if (Settings.isRuleEnabled(Rules.getRules().COMBO)) {
                for (let i = 0; i < flipped.length; i++) {
                    let coordinate = board.getCardCoordinate(flipped[i]);
                    this.card = flipped[i];
                    this.initContext(coordinate.row, coordinate.col);

                    let flippedCombo = this.simpleRule();
                    flipped = flipped.concat(flippedCombo);
                    this.flip(flippedCombo, Rules.getRules().COMBO);
                }
            }
        }

        /**
         * Flip the list of cards.
         * @param flippedCards Cards to flip
         * @param rule Rule which flipped the card.
         * @since 17.11.12
         */
        flip(flippedCards, rule) {
            logger.debug("Apply " + rule + " rule [card: " + this.card.getCard().getName() + "; row: " + this.row + "; col:" + this.col + "]");

            for (let i = flippedCards.length - 1; i >= 0; i--) {
                flippedCards[i].flip(this.card.getOwner(), this.card, rule, this.step);
                logger.info("Rule " + rule + " : (step " + this.step + ") " + this.card.getCard().getName() + " flips " + flippedCards[i].getCard().getName());
            }
        }

        /**
         * Returns the cards which could be flipped by the card if it was played on the board at the coordinates.
         * It's only based on the simple rule.
         * @param board Board where the card is played
         * @param card Card which should be tested
         * @param row Row where the card is played on the board
         * @param col Column where the card is played on the board
         * @since 17.11.14
         * @returns {Array}
         */
        testSimpleRule(board, card, row, col) {
            this.step = 0;
            this.board = board;
            this.card = card;
            this.initContext(row, col);

            return this.simpleRule();
        }

        /**
         * Returns the cards which could be flipped by the card if it was played on the board at the coordinates.
         * It's based on all the rules which are enabled.
         * @param board Board where the card is played
         * @param card Card which should be tested
         * @param row Row where the card is played on the board
         * @param col Column where the card is played on the board
         * @since 17.11.14
         * @returns {Array}
         */
        testAllRules(board, card, row, col) {
            this.step = 0;
            this.board = board;
            this.card = card;
            this.initContext(row, col);

            let flipped = [];
            let flippedComboApplied = [];

            if (Settings.isRuleEnabled(Rules.getRules().SAME)) {
                flippedComboApplied = flippedComboApplied.concat(this.sameRule());
            }

            if (Settings.isRuleEnabled(Rules.getRules().PLUS)) {
                flippedComboApplied = flippedComboApplied.concat(this.plusRule());
            }

            flipped = flipped.concat(this.simpleRule());

            if (Settings.isRuleEnabled(Rules.getRules().WAR)) {
                flipped = flipped.concat(this.warRule());
            }

            if (Settings.isRuleEnabled(Rules.getRules().COMBO)) {
                for (let i = 0; i < flippedComboApplied.length; i++) {
                    let coordinate = board.getCardCoordinate(flippedComboApplied[i]);
                    this.card = flippedComboApplied[i];
                    this.initContext(coordinate.row, coordinate.col)

                    let flippedCombo = this.simpleRule();
                    flippedComboApplied = flippedComboApplied.concat(flippedCombo);
                }
            }

            flipped = flipped.concat(flippedComboApplied);
            return flipped;
        }

        /**
         * Apply the simple rule.
         * @returns {Array} The list of flipped cards
         * @since 17.11.06
         */
        simpleRule() {
            let flipped = [];

            if (this.cardUp && this.cardUp.getOwner() !== this.card.getOwner() && this.cardUp.getCard().getDown() < this.card.getCard().getUp()) {
                flipped.push(this.cardUp);
            }
            if (this.cardDown && this.cardDown.getOwner() !== this.card.getOwner() && this.cardDown.getCard().getUp() < this.card.getCard().getDown()) {
                flipped.push(this.cardDown);
            }
            if (this.cardLeft && this.cardLeft.getOwner() !== this.card.getOwner() && this.cardLeft.getCard().getRight() < this.card.getCard().getLeft()) {
                flipped.push(this.cardLeft);
            }
            if (this.cardRight && this.cardRight.getOwner() !== this.card.getOwner() && this.cardRight.getCard().getLeft() < this.card.getCard().getRight()) {
                flipped.push(this.cardRight);
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