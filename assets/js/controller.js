class Game {

	start() {
		this.gameState = new GameState();

		//Notify the view
		initPlayersView(this, this.initPlayers);
	}

	initPlayers(player1Name, player2Name) {
		//Get players' identity
		var player1 = new Player(player1Name);
		var player2 = new Player(player2Name);
		this.gameState.setPlayers(player1, player2);

		this.drawCards();
	}

	drawCards() {
		//Draw the players' cards
		var deckPlayer1 = [], deckPlayer2 = [];
		for(var i = 0; i < 5; i++) {
			deckPlayer1.push(CardDB.getRandomCard());
			deckPlayer2.push(CardDB.getRandomCard());
		}
		this.gameState.getPlayer1().setDeck(deckPlayer1);
		this.gameState.getPlayer2().setDeck(deckPlayer2);

		//Notify the view
		drawCardsView(this, this.chooseFirstPlayerToPlay, deckPlayer1, deckPlayer2);
	}

	chooseFirstPlayerToPlay() {
		var playerToPlay = Math.random() <= 0.5 ? this.gameState.getPlayer1() : this.gameState.getPlayer2();
		this.gameState.setPlayerToPlay(playerToPlay);


		//Notify the view
		firstPlayerToPlayView(this, this.gameState);
	}
}