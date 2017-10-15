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
		for(var i = 0, nbPlayers = this.gameState.getPlayers().length; i < nbPlayers; i++) {
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
		for(var i = 0; i < this.gameState.getBoard().getRows(); i++) {
			for(var j = 0; j < this.gameState.getBoard().getCols(); j++) {
				if(this.gameState.getBoard().getCardOnBoard(i, j) !== false) {
					this.gameState.getBoard().getCardOnBoard(i, j).unflip();
				}
			}
		}

		//End of the game or next player
		if(this.gameState.isGameOver()) {
			Events.notify("GAME.OVER", this.gameState);
			logger.info("The game is over. Winner(s) : " + this.gameState.getWinner().map(player => player.getName()).join(","));
		} else {
			var nextPlayerToPlay;
			if(this.gameState.getIndexPlayerToPlay() < this.gameState.getPlayers().length - 1) {
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
		this.step = 1;
		this.simpleRule();
		if(Settings.isSameEnabled()) {
			this.sameRule();
		}
		if(Settings.isWarEnabled()) {
			this.warRule();
		}
		if(Settings.isPlusEnabled()) {
			this.plusRule();
		}
	}

	simpleRule() {
		var flipped = false;
		if(this.row - 1 >= 0) {
			var cardUp = this.board.getCardOnBoard(this.row - 1, this.col);
			if(cardUp !== false && cardUp.getOwner() != this.card.getOwner() && cardUp.getCard().getDown() < this.card.getCard().getUp()) {
				flipped = true;
				cardUp.flip(this.card.getOwner(), this.card, "SIMPLE", this.step);
				logger.info("Rule Simple : (step " + this.step + ") "
					+ this.card.getCard().getName() + " flips " + cardUp.getCard().getName() + " (" + cardUp.getCard().getDown() + " < " + this.card.getCard().getUp() + ")");
			}
		}
		if(this.row + 1 <= 2) {
			var cardDown = this.board.getCardOnBoard(this.row + 1, this.col);
			if(cardDown !== false && cardDown.getOwner() != this.card.getOwner() && cardDown.getCard().getUp() < this.card.getCard().getDown()) {
				flipped = true;
				cardDown.flip(this.card.getOwner(), this.card, "SIMPLE", this.step);
				logger.info("Rule Simple : (step " + this.step + ") "
					+ this.card.getCard().getName() + " flips " + cardDown.getCard().getName() + " (" + cardDown.getCard().getUp() + " < " + this.card.getCard().getDown() + ")");
			}
		}
		if(this.col - 1 >= 0) {
			var cardLeft = this.board.getCardOnBoard(this.row, this.col - 1);
			if(cardLeft !== false && cardLeft.getOwner() != this.card.getOwner() && cardLeft.getCard().getRight() < this.card.getCard().getLeft()) {
				flipped = true;
				cardLeft.flip(this.card.getOwner(), this.card, "SIMPLE", this.step);
				logger.info("Rule Simple : (step " + this.step + ") "
					+ this.card.getCard().getName() + " flips " + cardLeft.getCard().getName() + " (" + cardLeft.getCard().getRight() + " < " + this.card.getCard().getLeft() + ")");
			}
		}
		if(this.col + 1 <= 2) {
			var cardRight = this.board.getCardOnBoard(this.row,this. col + 1);
			if(cardRight !== false && cardRight.getOwner() != this.card.getOwner() && cardRight.getCard().getLeft() < this.card.getCard().getRight()) {
				flipped = true;
				cardRight.flip(this.card.getOwner(), this.card, "SIMPLE", this.step);
				logger.info("Rule Simple : (step " + this.step + ") "
					+ this.card.getCard().getName() + " flips " + cardRight.getCard().getName() + " (" +cardRight.getCard().getLeft() + " <" + this.card.getCard().getRight() + ")");
			}
		}
		if(flipped) {
			this.step++;
		}
	}

	sameRule() {
		var cardsCouldBeFlipped = [];
		var sameCards = 0;
		if(this.row - 1 >= 0) {
			var cardUp = this.board.getCardOnBoard(this.row - 1, this.col);
			if(cardUp !== false && cardUp.getCard().getDown() == this.card.getCard().getUp()) {
				sameCards++;
				if(cardUp.getOwner() != this.card.getOwner()) {
					cardsCouldBeFlipped.push(cardUp);
				}
			}
		}
		if(this.row + 1 <= 2) {
			var cardDown = this.board.getCardOnBoard(this.row + 1, this.col);
			if(cardDown !== false && cardDown.getCard().getUp() == this.card.getCard().getDown()) {
				sameCards++;
				if(cardDown.getOwner() != this.card.getOwner()) {
					cardsCouldBeFlipped.push(cardDown);
				}
			}
		}
		if(this.col - 1 >= 0) {
			var cardLeft = this.board.getCardOnBoard(this.row, this.col - 1);
			if(cardLeft !== false && cardLeft.getCard().getRight() == this.card.getCard().getLeft()) {
				sameCards++;
				if(cardLeft.getOwner() != this.card.getOwner()) {
					cardsCouldBeFlipped.push(cardLeft);
				}
			}
		}
		if(this.col + 1 <= 2) {
			var cardRight = this.board.getCardOnBoard(this.row,this. col + 1);
			if(cardRight !== false && cardRight.getCard().getLeft() == this.card.getCard().getRight()) {
				sameCards++;
				if(cardRight.getOwner() != this.card.getOwner()) {
					cardsCouldBeFlipped.push(cardRight);
				}
			}
		}

		if(sameCards >= 2 && cardsCouldBeFlipped.length >= 1) {
			for (var i = cardsCouldBeFlipped.length - 1; i >= 0; i--) {
				cardsCouldBeFlipped[i].flip(this.card.getOwner(), this.card, "SAME", this.step);
				logger.info("Rule Same : (step " + this.step + ") "
					+ this.card.getCard().getName() + " flips " + cardsCouldBeFlipped[i].getCard().getName() 
					+ " (" + cardsCouldBeFlipped[i].getCard().getLeft() + " = " + this.card.getCard().getRight() + ")");

			}
			this.step++;
		}
	}

	warRule() {
		var flipped = false;
		var sum = this.card.getCard().getUp() + this.card.getCard().getRight() + this.card.getCard().getDown() + this.card.getCard().getLeft();
		if(this.row - 1 >= 0) {
			var cardUp = this.board.getCardOnBoard(this.row - 1, this.col);
			if(cardUp !== false && cardUp.getOwner() != this.card.getOwner() && cardUp.getCard().getDown() == this.card.getCard().getUp()) {
				var sumUp = cardUp.getCard().getUp() + cardUp.getCard().getRight() + cardUp.getCard().getDown() + cardUp.getCard().getLeft();
				if(sumUp < sum) {
					flipped = true;
					cardUp.flip(this.card.getOwner(), this.card, "WAR", this.step);
					logger.info("Rule WAR : (step " + this.step + ") "
						+ this.card.getCard().getName() + " flips " + cardUp.getCard().getName() + " (" + sumUp + " < " + sum + ")");
				}
			}
		}
		if(this.row + 1 <= 2) {
			var cardDown = this.board.getCardOnBoard(this.row + 1, this.col);
			if(cardDown !== false && cardDown.getOwner() != this.card.getOwner() && cardDown.getCard().getUp() == this.card.getCard().getDown()) {
				var sumDown = cardDown.getCard().getUp() + cardDown.getCard().getRight() + cardDown.getCard().getDown() + cardDown.getCard().getLeft();
				if(sumDown < sum) {
					flipped = true;
					cardDown.flip(this.card.getOwner(), this.card, "WAR", this.step);
					logger.info("Rule WAR : (step " + this.step + ") "
						+ this.card.getCard().getName() + " flips " + cardDown.getCard().getName() + " (" + sumUp + " < " + sum + ")");
				}
			}
		}
		if(this.col - 1 >= 0) {
			var cardLeft = this.board.getCardOnBoard(this.row, this.col - 1);
			if(cardLeft !== false && cardLeft.getOwner() != this.card.getOwner() && cardLeft.getCard().getRight() == this.card.getCard().getLeft()) {
				var sumLeft = cardLeft.getCard().getUp() + cardLeft.getCard().getRight() + cardLeft.getCard().getDown() + cardLeft.getCard().getLeft();
				if(sumLeft < sum) {
					flipped = true;
					cardLeft.flip(this.card.getOwner(), this.card, "WAR", this.step);
					logger.info("Rule WAR : (step " + this.step + ") "
						+ this.card.getCard().getName() + " flips " + cardLeft.getCard().getName() + " (" + sumLeft + " < " + sum + ")");
				}
			}
		}
		if(this.col + 1 <= 2) {
			var cardRight = this.board.getCardOnBoard(this.row,this. col + 1);
			if(cardRight !== false && cardRight.getOwner() != this.card.getOwner() && cardRight.getCard().getLeft() == this.card.getCard().getRight()) {
				var sumRight = cardRight.getCard().getUp() + cardRight.getCard().getRight() + cardRight.getCard().getDown() + cardRight.getCard().getLeft();
				if(sumRight < sum) {
					flipped = true;
					cardRight.flip(this.card.getOwner(), this.card, "WAR", this.step);
					logger.info("Rule WAR : (step " + this.step + ") "
						+ this.card.getCard().getName() + " flips " + cardRight.getCard().getName() + " (" + sumRight + " < " + sum + ")");
				}
			}
		}
		if(flipped) {
			this.step++;
		}
	}

	plusRule() {
		var sums = [];
		if(this.row - 1 >= 0) {
			var cardUp = this.board.getCardOnBoard(this.row - 1, this.col);
			if(cardUp !== false) {
				var sum = cardUp.getCard().getDown() + this.card.getCard().getUp();
				sums[sum] = sums[sum] || [];
				sums[sum].push(cardUp);
			}
		}
		if(this.row + 1 <= 2) {
			var cardDown = this.board.getCardOnBoard(this.row + 1, this.col);
			if(cardDown !== false) {
				var sum = cardDown.getCard().getUp() + this.card.getCard().getDown();
				sums[sum] = sums[sum] || [];
				sums[sum].push(cardDown);
			}
		}
		if(this.col - 1 >= 0) {
			var cardLeft = this.board.getCardOnBoard(this.row, this.col - 1);
			if(cardLeft !== false) {
				var sum = cardLeft.getCard().getRight() + this.card.getCard().getLeft();
				sums[sum] = sums[sum] || [];
				sums[sum].push(cardLeft);
			}
		}
		if(this.col + 1 <= 2) {
			var cardRight = this.board.getCardOnBoard(this.row,this. col + 1);
			if(cardRight !== false) {
				var sum = cardRight.getCard().getLeft() + this.card.getCard().getRight();
				sums[sum] = sums[sum] || [];
				sums[sum].push(cardRight);
			}
		}

		var cardFlipped = false;
		for(sum in sums) {
			if(sums[sum].length >= 2) {
				for(var i = 0; i < sums[sum].length; i++) {
					var card = sums[sum][i];
					if(card.getOwner() != this.card.getOwner()) {
						cardFlipped = true;
						card.flip(this.card.getOwner(), this.card, "PLUS", this.step);
						logger.info("Rule Plus : (step " + this.step + ") "
							+ this.card.getCard().getName() + " flips " + card.getCard().getName() 
							+ " (sum : " + sum + " with " + sums[sum].map(card => card.getCard().getName()).join(', ') + ")");

					}
				}
			}
		}

		if(cardFlipped) {
			this.step++;
		}
	}
}