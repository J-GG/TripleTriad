class GameState {
	setPlayers(player1, player2) {
		this.player1 = player1;
		this.player2 = player2;
	}

	getPlayer1() {
		return this.player1;
	}

	getPlayer2() {
		return this.player2;
	}

	setPlayerToPlay(playerToPlay) {
		this.playerToPlay = playerToPlay;
	}

	getPlayerToPlay() {
		return this.playerToPlay;
	}
}

class Player {
	constructor(name) {
		this.name = name;
		this.deck = [];
	}

	setDeck(deck) {
		this.deck = deck;
	}

	getDeck() {
		return this.deck;
	}
}

class Card {
	constructor(name, up, right, bottom, down) {
		this.name = name;
		this.up = up;
		this.right = right;
		this.bottom = bottom;
		this.down = down;
	}

	getName() {
		return this.name;
	}
}

class CardDB {
	static initDB() {
		this.cardList = [];
		this.cardList.push(new Card("bitebug", 1, 3, 3, 5));
		this.cardList.push(new Card("funguar", 5, 1, 1, 3));
		this.cardList.push(new Card("geezard", 1, 4, 1, 5));
		this.cardList.push(new Card("redbat", 6, 1, 1, 2));
		this.cardList.push(new Card("blobra", 2, 3, 1, 5));
		this.cardList.push(new Card("gayla", 2, 1, 4, 4));
		this.cardList.push(new Card("gesper", 1, 5, 4, 1));
		this.cardList.push(new Card("fastitocalonef", 3, 5, 2, 1));
	}

	static getRandomCard() {
		if(this.cardList == undefined) {
			this.initDB();
		}
		return this.cardList[Math.floor(Math.random() * this.cardList.length)];
	}
}