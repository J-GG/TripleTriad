class Game {
	start() {
		logger.info("Game launching");
		this.gameState = new GameState();

		logger.debug("Notify event : START");
		Events.notify("START");
	}

	initGame(playersName) {
		//Get players' identity
		var players = [];
		for (var i = playersName.length - 1; i >= 0; i--) {
			players[i] = new PlayerInGame(playersName[i]);
		}
		logger.info("Players " + players.map(player => player.getName()).join(", ") + " are playing");
		this.gameState.setPlayers(players);

		this.drawCards();
	}

	drawCards() {
		//Draw the players' cards
		for(var i = 0, nbPlayers = this.gameState.getPlayers().length; i < nbPlayers; i++) {
			var deck = [];
			for(var j = 0; j < 5; j++) {
				deck.push(CardDB.getRandomCard());
			}

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
		Events.notify("END.TURN", this.gameState);
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
			logger.info("The game is over. Winner(s) : " + this.gameState.getWinner().join(","));
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
	apply(board, row, col) {
		var card = board.getCardOnBoard(row, col);
		if(row - 1 >= 0) {
			var cardUp = board.getCardOnBoard(row - 1, col);
			if(cardUp !== false && cardUp.getCard().getDown() < card.getCard().getUp()) {
				cardUp.flip(card.getOwner());
				logger.info(card.getCard().getName() + " flips " + cardUp.getCard().getName() + " (" + cardUp.getCard().getUp() + " > " + card.getCard().getDown() + ")");
			}
		}
		if(row + 1 <= 2) {
			var cardDown = board.getCardOnBoard(row + 1, col);
			if(cardDown !== false && cardDown.getCard().getUp() < card.getCard().getDown()) {
				cardDown.flip(card.getOwner());
				logger.info(card.getCard().getName() + " flips " + cardDown.getCard().getName() + " (" + cardDown.getCard().getDown() + " > " + card.getCard().getUp() + ")");
			}
		}
		if(col - 1 >= 0) {
			var cardLeft = board.getCardOnBoard(row, col - 1);
			if(cardLeft !== false && cardLeft.getCard().getRight() < card.getCard().getLeft()) {
				cardLeft.flip(card.getOwner());
				logger.info(card.getCard().getName() + " flips " + cardLeft.getCard().getName() + " (" + cardLeft.getCard().getLeft() + " > " + card.getCard().getRight() + ")");
			}
		}
		if(col + 1 <= 2) {
			var cardRight = board.getCardOnBoard(row, col + 1);
			if(cardRight !== false && cardRight.getCard().getLeft() < card.getCard().getRight()) {
				cardRight.flip(card.getOwner());
				logger.info(card.getCard().getName() + " flips " + cardRight.getCard().getName() + " (" + cardRight.getCard().getRight() + " > " + card.getCard().getLeft() + ")");
			}
		}
	}
}