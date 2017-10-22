class Game {
    start() {
        logger.info("Game launching");
        Events.notify("START");
    }

    initGame() {
        this.gameState = new GameState();
        var players = [new PlayerInGame(Settings.getPlayer1Name()), new PlayerInGame(Settings.getPlayer2Name())];

        logger.info(Settings.getPlayer1Name() + " and " + Settings.getPlayer2Name() + " are playing");
        this.gameState.setPlayers(players);

        this.drawCards();
    }

    drawCards() {
        //Draw the players' cards
        for (var i = 0, nbPlayers = this.gameState.getPlayers().length; i < nbPlayers; i++) {
            var deck = CardDB.getRandomCards(5);

            logger.info(this.gameState.getPlayer(i).getName() + " drawn " + deck.map(card => card.getName()).join(', '));
            this.gameState.getPlayer(i).setDeck(deck);
        }

        Events.notify("DRAW.CARDS", this.gameState);
    }

    drawFirstPlayerToPlay() {
        var nbPlayerToPlay = Math.floor(Math.random() * this.gameState.getPlayers().length);
        this.gameState.setPlayerToPlay(this.gameState.getPlayers()[nbPlayerToPlay]);

        logger.info(this.gameState.getPlayerToPlay().getName() + " starts");
        Events.notify("DRAW.FIRST.PLAYER", this.gameState);
    }

    playCard(card, ...args) {
        //Remove the card from the deck
        var indexCard = this.gameState.getPlayerToPlay().removeCard(card);
        logger.debug(card.getName() + " (index " + indexCard + ")  removed from " + this.gameState.getPlayerToPlay().getName() + "'s deck");

        //Play the card on the board
        this.gameState.getBoard().playCardOnBoard(card, this.gameState.getPlayerToPlay(), ...args);
        logger.info(this.gameState.getPlayerToPlay().getName() + " plays " + card.getName() + " on " + args);

        //Apply the rules
        new Rule().apply(this.gameState.getBoard(), ...args);

        Events.notify("CARD.PLAYED", this.gameState, indexCard, ...args);
    }

    endTurn() {
        logger.info(this.gameState.getPlayerToPlay().getName() + " ended his turn");

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
            Events.notify("GAME.OVER", this.gameState);
            logger.info("The game is over. Winner(s) : " + this.gameState.getWinner().map(player => player.getName()).join(","));
        } else {
            var nextPlayerToPlay;
            if (this.gameState.getIndexPlayerToPlay() < this.gameState.getPlayers().length - 1) {
                nextPlayerToPlay = this.gameState.getPlayer(this.gameState.getIndexPlayerToPlay() + 1);
            } else {
                nextPlayerToPlay = this.gameState.getPlayer(0);
            }
            this.gameState.setPlayerToPlay(nextPlayerToPlay);

            Events.notify("NEW.TURN", this.gameState);
            logger.info(nextPlayerToPlay.getName() + "'s turn");
        }
    }

}

class Rule {
    constructor() {
        this.step = 1;
    }

    /**
     * Apply the rules according to the selected rules defined in the Settings.
     * @param board Board where the card is played
     * @param row Row where the card is played on the board
     * @param col Column where the card is played on the board
     */
    apply(board, row, col) {
        this.board = board;
        this.row = row;
        this.col = col;
        this.card = board.getCardOnBoard(row, col);
        this.cardUp = this.board.getCardAbove(row, col);
        this.cardRight = this.board.getCardOnTheRight(row, col);
        this.cardDown = this.board.getCardBelow(row, col);
        this.cardLeft = this.board.getCardOnTheLeft(row, col);

        var flipped = [];
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
            console.log(flipped);
            for (var i = 0; i < flipped.length; i++) {
                console.log(flipped[i]);
                var coordinate = board.getCardCoordinate(flipped[i]);
                this.card = flipped[i];
                this.row = coordinate["row"];
                this.col = coordinate["col"];
                this.cardUp = this.board.getCardAbove(this.row, this.col);
                this.cardRight = this.board.getCardOnTheRight(this.row, this.col);
                this.cardDown = this.board.getCardBelow(this.row, this.col);
                this.cardLeft = this.board.getCardOnTheLeft(this.row, this.col);

                flipped = flipped.concat(this.simpleRule(true));
            }
        }
    }

    simpleRule(isCombo) {
        var flipped = [];
        var rule = isCombo ? "COMBO" : "SIMPLE";

        logger.debug("Apply " + rule + " rule [card: " + this.card.getCard().getName() + "; row: " + this.row + "; col:" + this.col + "]");

        if (this.cardUp && this.cardUp.getOwner() != this.card.getOwner() && this.cardUp.getCard().getDown() < this.card.getCard().getUp()) {
            flipped.push(this.cardUp);
        }
        if (this.cardDown && this.cardDown.getOwner() != this.card.getOwner() && this.cardDown.getCard().getUp() < this.card.getCard().getDown()) {
            flipped.push(this.cardDown);
            this.cardDown.flip(this.card.getOwner(), this.card, rule, this.step);
        }
        if (this.cardLeft && this.cardLeft.getOwner() != this.card.getOwner() && this.cardLeft.getCard().getRight() < this.card.getCard().getLeft()) {
            flipped.push(this.cardLeft);
        }
        if (this.cardRight && this.cardRight.getOwner() != this.card.getOwner() && this.cardRight.getCard().getLeft() < this.card.getCard().getRight()) {
            flipped.push(this.cardRight);
        }

        for (var i = flipped.length - 1; i >= 0; i--) {
            flipped[i].flip(this.card.getOwner(), this.card, rule, this.step);
            logger.info("Rule " + rule + " : (step " + this.step + ") " + this.card.getCard().getName() + " flips " + flipped[i].getCard().getName());
        }

        if (flipped.length > 0) {
            this.step++;
        }

        return flipped;
    }

    sameRule() {
        logger.debug("Apply SAME rule [card: " + this.card.getCard().getName() + "; row: " + this.row + "; col:" + this.col + "]");

        var flipped = [];
        var cardsCouldBeFlipped = [];
        var sameCards = 0;

        if (this.cardUp && this.cardUp.getCard().getDown() == this.card.getCard().getUp()) {
            sameCards++;
            if (this.cardUp.getOwner() != this.card.getOwner()) {
                cardsCouldBeFlipped.push(this.cardUp);
            }
        }
        if (this.cardDown && this.cardDown.getCard().getUp() == this.card.getCard().getDown()) {
            sameCards++;
            if (this.cardDown.getOwner() != this.card.getOwner()) {
                cardsCouldBeFlipped.push(this.cardDown);
            }
        }
        if (this.cardLeft && this.cardLeft.getCard().getRight() == this.card.getCard().getLeft()) {
            sameCards++;
            if (this.cardLeft.getOwner() != this.card.getOwner()) {
                cardsCouldBeFlipped.push(this.cardLeft);
            }
        }
        if (this.cardRight && this.cardRight.getCard().getLeft() == this.card.getCard().getRight()) {
            sameCards++;
            if (this.cardRight.getOwner() != this.card.getOwner()) {
                cardsCouldBeFlipped.push(this.cardRight);
            }
        }

        if (sameCards >= 2 && cardsCouldBeFlipped.length >= 1) {
            for (var i = cardsCouldBeFlipped.length - 1; i >= 0; i--) {
                flipped.push(cardsCouldBeFlipped[i]);
                cardsCouldBeFlipped[i].flip(this.card.getOwner(), this.card, "SAME", this.step);
                logger.info("Rule SAME : (step " + this.step + ") " + this.card.getCard().getName() + " flips " + cardsCouldBeFlipped[i].getCard().getName());
            }
            this.step++;
        }

        return flipped;
    }

    warRule() {
        logger.debug("Apply WAR rule [card: " + this.card.getCard().getName() + "; row: " + this.row + "; col:" + this.col + "]");

        var flipped = [];
        var sum = this.card.getCard().getUp() + this.card.getCard().getRight() + this.card.getCard().getDown() + this.card.getCard().getLeft();

        if (this.cardUp && this.cardUp.getOwner() != this.card.getOwner() && this.cardUp.getCard().getDown() == this.card.getCard().getUp()) {
            var sumUp = this.cardUp.getCard().getUp() + this.cardUp.getCard().getRight() + this.cardUp.getCard().getDown() + this.cardUp.getCard().getLeft();
            if (sumUp < sum) {
                flipped.push(this.cardUp);
            }
        }
        if (this.cardDown && this.cardDown.getOwner() != this.card.getOwner() && this.cardDown.getCard().getUp() == this.card.getCard().getDown()) {
            var sumDown = this.cardDown.getCard().getUp() + this.cardDown.getCard().getRight() + this.cardDown.getCard().getDown() + this.cardDown.getCard().getLeft();
            if (sumDown < sum) {
                flipped.push(this.cardDown);
            }
        }
        if (this.cardLeft && this.cardLeft.getOwner() != this.card.getOwner() && this.cardLeft.getCard().getRight() == this.card.getCard().getLeft()) {
            var sumLeft = this.cardLeft.getCard().getUp() + this.cardLeft.getCard().getRight() + this.cardLeft.getCard().getDown() + this.cardLeft.getCard().getLeft();
            if (sumLeft < sum) {
                flipped.push(this.cardLeft);
            }
        }
        if (this.cardRight && this.cardRight.getOwner() != this.card.getOwner() && this.cardRight.getCard().getLeft() == this.card.getCard().getRight()) {
            var sumRight = this.cardRight.getCard().getUp() + this.cardRight.getCard().getRight() + this.cardRight.getCard().getDown() + this.cardRight.getCard().getLeft();
            if (sumRight < sum) {
                flipped.push(this.cardRight);
            }
        }

        for (var i = flipped.length - 1; i >= 0; i--) {
            flipped[i].flip(this.card.getOwner(), this.card, "WAR", this.step);
            logger.info("Rule WAR : (step " + this.step + ") " + this.card.getCard().getName() + " flips " + flipped[i].getCard().getName());
        }

        if (flipped.length > 0) {
            this.step++;
        }

        return flipped;
    }

    plusRule() {
        logger.debug("Apply PLUS rule [card: " + this.card.getCard().getName() + "; row: " + this.row + "; col:" + this.col + "]");

        var flipped = [];
        var sums = [];

        if (this.cardUp) {
            var sum = this.cardUp.getCard().getDown() + this.card.getCard().getUp();
            sums[sum] = sums[sum] || [];
            sums[sum].push(this.cardUp);
        }
        if (this.cardDown) {
            var sum = this.cardDown.getCard().getUp() + this.card.getCard().getDown();
            sums[sum] = sums[sum] || [];
            sums[sum].push(this.cardDown);
        }
        if (this.cardLeft) {
            var sum = this.cardLeft.getCard().getRight() + this.card.getCard().getLeft();
            sums[sum] = sums[sum] || [];
            sums[sum].push(this.cardLeft);
        }
        if (this.cardRight) {
            var sum = this.cardRight.getCard().getLeft() + this.card.getCard().getRight();
            sums[sum] = sums[sum] || [];
            sums[sum].push(this.cardRight);
        }

        for (sum in sums) {
            if (sums[sum].length >= 2) {
                for (var i = 0; i < sums[sum].length; i++) {
                    var card = sums[sum][i];
                    if (card.getOwner() != this.card.getOwner()) {
                        flipped.push(card);
                        card.flip(this.card.getOwner(), this.card, "PLUS", this.step);
                        logger.info("Rule PLUS : (step " + this.step + ") "
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
}