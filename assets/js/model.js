class GameState {
	constructor() {
		this.board = new Board();
	}

	setPlayers(players) {
		this.players = players;
		for(var i = 0; i < players.length; i++) {
			if(players[i].getBoard() !== this.board) {
				players[i].setBoard(this.board);
			}
		}
	}

	getPlayers() {
		return this.players;
	}

	getPlayer(index) {
		return this.players[index];
	}

	setPlayerToPlay(playerToPlay) {
		this.playerToPlay = playerToPlay;
	}

	getPlayerToPlay() {
		return this.playerToPlay;
	}

	getIndexPlayerToPlay() {
		for(var i = 0; i < this.players.length; i++) {
			if (this.playerToPlay === this.players[i]) {
				return i;
			}
		}
	}

	getBoard() {
		return this.board;
	}

	isGameOver() {
		return this.board.isComplete();
	}

	getWinner() {
		if(!this.isGameOver()) {
			return undefined;
		}

		var score = 0, winners = [];
		for(var i = 0; i < this.players.length; i++) {
			if (this.players[i].getScore() > score) {
				winners = [];
				score = this.players[i].getScore();
				winners.push(this.players[i]);
			} else if (this.players[i].getScore() == score)  {
				winners.push(this.players[i]);
			}
		}

		return winners;
	}
}

class Player {
	constructor(name) {
		this.name = name;
		this.cards = [];
	}

	getName() {
		return this.name;
	}

	setCards(cards) {
		this.cards = cards;
	}

	getCards() {
		return this.cards;
	}
}

class PlayerInGame extends Player {
	constructor(name) {
		super(name);
		this.deck = [];
	}

	setDeck(deck) {
		this.deck = deck;
	}

	getDeck() {
		return this.deck;
	}

	setBoard(board) {
		this.board = board;
	}

	getBoard() {
		return this.board;
	}

	getScore() {
		return this.deck.length + this.board.getPlayerScore(this);
	}

	getCard(index) {
		return this.deck[index];
	}

	removeCard(cardToRemove) {
		var indexToRemove = this.deck.indexOf(cardToRemove);
		this.deck.splice(indexToRemove, 1);

		return indexToRemove;
	}
}

class Card {
	constructor(name, up, right, down, left) {
		this.name = name;
		this.up = up;
		this.right = right;
		this.down = down;
		this.left = left;
	}

	getName() {
		return this.name;
	}

	getUp() {
		return this.up;
	}

	getRight() {
		return this.right;
	}

	getDown() {
		return this.down;
	}

	getLeft() {
		return this.left;
	}
}

class CardInGame {
	constructor(card, player) {
		this.card = card;
		this.player = player;
	}

	setCard(card) {
		this.card = card;
	}

	getCard() {
		return this.card;
	}

	setOwner(player) {
		this.player = player;
	}

	getOwner() {
		return this.player;
	}
}

class Board {
	constructor () {
		this.row = 3;
		this.col = 3;
		this.board = [];
		for (var i = 0; i < this.row; i++) {
			this.board[i] = [];
			for (var j = 0; j < this.col; j++) {
				this.board[i][j] = false;
			}	
		}
	}

	playCardOnBoard(card, playerToPlay, row, col) {
		this.board[row][col] = new CardInGame(card, playerToPlay);
	}

	getCardOnBoard(row, col) {
		return this.board[row][col];
	}

	getPlayerScore(player) {
		var score = 0;
		for (var i = 0; i < this.row; i++) {
			for (var j = 0; j < this.col; j++) {
				if(typeof this.board[i][j] === "object" && this.board[i][j].getOwner() == player) {
					score++;
				}
			}	
		}

		return score;
	}

	isComplete() {
		for (var i = 0; i < this.row; i++) {
			for (var j = 0; j < this.col; j++) {
				if(this.board[i][j] === false) {
					return false;
				}
			}
		}
		return true;
	}
}

class CardDB {
	static initDB() {
		this.cardList = [];
		this.cardList.push(new Card("Bite Bug", 1, 3, 3, 5));
		this.cardList.push(new Card("Funguar", 5, 1, 1, 3));
		this.cardList.push(new Card("Geezard", 1, 4, 1, 5));
		this.cardList.push(new Card("Redbat", 6, 1, 1, 2));
		this.cardList.push(new Card("Blobra", 2, 3, 1, 5));
		this.cardList.push(new Card("Gayla", 2, 1, 4, 4));
		this.cardList.push(new Card("Gesper", 1, 5, 4, 1));
		this.cardList.push(new Card("Fastitocalon-F", 3, 5, 2, 1));
		this.cardList.push(new Card("Blood Soul", 2, 1, 6, 1));
		this.cardList.push(new Card("Caterchipillar", 4, 2, 4, 3));
		this.cardList.push(new Card("Cockatrice", 2, 1, 2, 6));
		this.cardList.push(new Card("grat", 7, 1, 3, 1));
	}

	static getRandomCard() {
		if(this.cardList == undefined) {
			this.initDB();
		}
		var card = this.cardList[Math.floor(Math.random() * this.cardList.length)]; 
		return new Card(card.getName(), card.getUp(), card.getRight(), card.getDown(), card.getLeft());
	}
}