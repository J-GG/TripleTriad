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
	constructor(name, level, up, right, down, left) {
		this.name = name;
		this.level = level;
		this.up = up;
		this.right = right;
		this.down = down;
		this.left = left;
	}

	getName() {
		return this.name;
	}

	getLevel() {
		return this.level;
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

class CardOnBoard {
	constructor(card, player) {
		this.card = card;
		this.player = player;
		this.flippedByCard = undefined;
		this.flippedByRule = [];
		this.flippedStep = undefined;
	}

	setCard(card) {
		this.card = card;
	}

	getCard() {
		return this.card;
	}

	getOwner() {
		return this.player;
	}

	flip(player, card, rule, step) {
		this.player = player;
		this.flippedByCard = card;
		this.flippedByRule = rule;
		this.flippedStep = step;
	}

	unflip() {
		this.flippedByCard = undefined;
		this.flippedByRule = [];
		this.flippedStep = undefined;
	}

	isFlipped() {
		return this.flippedByCard !== undefined ? true : false;
	}

	getFlippedByCard() {
		return this.flippedByCard;
	}

	getFlippedByRule() {
		return this.flippedByRule;
	}

	getFlippedStep() {
		return this.flippedStep
	}

}

class Board {
	constructor () {
		this.rows = 3;
		this.cols = 3;
		this.board = [];
		for (var i = 0; i < this.rows; i++) {
			this.board[i] = [];
			for (var j = 0; j < this.cols; j++) {
				this.board[i][j] = undefined;
			}	
		}
	}

	getRows() {
		return this.rows; 
	}

	getCols() {
		return this.cols;
	}

	playCardOnBoard(card, playerToPlay, row, col) {
		this.board[row][col] = new CardOnBoard(card, playerToPlay);
	}

	getCardOnBoard(row, col) {
		return this.board[row][col];
	}

	getCardAbove(row, col) {
		return (row - 1 >= 0) ? this.board[row - 1][col] : undefined;
	}
	
	getCardOnTheRight(row, col) {
		return (col + 1 < this.cols) ? this.board[row][col + 1] : undefined;
	}

	getCardBelow(row, col) {
		return (row + 1 < this.rows) ? this.board[row + 1][col] : undefined;
	}

	getCardOnTheLeft(row, col) {
		return (col - 1 >= 0) ? this.board[row][col - 1] : undefined;
	}

	getCardCoordinate(card) {
		for (var i = 0; i < this.rows; i++) {
			for (var j = 0; j < this.cols; j++) {
				if(this.board[i][j] === card) {
					return {row: i, col: j};
				}
			}
		}

		return undefined;
	}

	/* Return the relative position of card1 to card2 among "UP, UPRIGHT, RIGHT, BOTTOMRIGHT, BOTTOM, BOTTOMLEFT, LEFT and UPLEFT" */
	getRelativePositionOf(card1, card2) {
		var card1Pos, card2Pos;
		for (var i = 0; i < this.rows; i++) {
			for (var j = 0; j < this.cols; j++) {
				if(this.board[i][j] === card1) {
					card1Pos = {row: i, col: j};
				} else if(this.board[i][j] === card2) {
					card2Pos = {row: i, col: j};
				}
			}
		}

		if(card1Pos === undefined || card2Pos === undefined) {
			logger.warning(card1.getCard().getName() + " and/or " + card2.getCard().getName() + " are not on the board");
			return;
		}

		var X = "", Y = "";
		if(card1Pos.col < card2Pos.col) {
			X = "LEFT";
		} else if(card1Pos.col > card2Pos.col) {
			X = "RIGHT";
		}

		if(card1Pos.row < card2Pos.row) {
			Y = "UP";
		} else if(card1Pos.row > card2Pos.row) {
			Y = "BOTTOM";
		}

		var position = X + Y;
		logger.debug(card1.getCard().getName() + "'s relative position to " + card2.getCard().getName() + " is " + position);

		return position;
	}

	getPlayerScore(player) {
		var score = 0;
		for (var i = 0; i < this.rows; i++) {
			for (var j = 0; j < this.cols; j++) {
				if(typeof this.board[i][j] === "object" && this.board[i][j].getOwner() == player) {
					score++;
				}
			}	
		}

		return score;
	}

	isComplete() {
		for (var i = 0; i < this.rows; i++) {
			for (var j = 0; j < this.cols; j++) {
				if(this.board[i][j] === undefined) {
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
		this.cardList.push(new Card("Bite Bug", 1, 1, 3, 3, 5));
		this.cardList.push(new Card("Funguar", 1, 5, 1, 1, 3));
		this.cardList.push(new Card("Geezard", 1, 1, 4, 1, 5));
		this.cardList.push(new Card("Redbat", 1, 6, 1, 1, 2));
		this.cardList.push(new Card("Blobra", 1, 2, 3, 1, 5));
		this.cardList.push(new Card("Gayla", 1, 2, 1, 4, 4));
		this.cardList.push(new Card("Gesper", 1, 1, 5, 4, 1));
		this.cardList.push(new Card("Fastitocalon-F", 1, 3, 5, 2, 1));
		this.cardList.push(new Card("Blood Soul", 1, 2, 1, 6, 1));
		this.cardList.push(new Card("Caterchipillar", 1, 4, 2, 4, 3));
		this.cardList.push(new Card("Cockatrice", 1, 2, 1, 2, 6));

		this.cardList.push(new Card("Dogememe", 1, 2, 2, 2, 2));
		this.cardList.push(new Card("Blogging Shiba", 1, 4, 2, 4, 10));
		this.cardList.push(new Card("Pandaminator", 1, 3, 3, 5, 2));

		this.cardList.push(new Card("Grat", 2, 7, 1, 3, 1));

		this.cardList.push(new Card("Biggs, Wedge", 5, 6, 6, 2, 7));

		this.cardList.push(new Card("Zell", 10, 8, 5, 10, 6));
		this.cardList.push(new Card("Rinoa", 10, 4, 10, 2, 10));
		this.cardList.push(new Card("Edea", 10, 10, 10, 3, 3));
		this.cardList.push(new Card("Seifer", 10, 6, 9, 10, 4));
		this.cardList.push(new Card("Squall", 10, 10, 4, 6, 9));

		this.LEVEL_MAX = 10;
	}

	static getRandomCards(number) {
		if(this.cardList == undefined) {
			this.initDB();
		}

		//The total weight of the cards is computed
		var sum = 0;
		for(var i = 0; i < this.cardList.length; i++) {
			sum += this.LEVEL_MAX + 1 - this.cardList[i].getLevel();
		}

		var cards = []
		
		draw_card:
		for(var i = 0; i < number; i++) {
			var randomNumber = Math.floor(Math.random() * (sum + 1)); 
			var seek = 0;
			for(var j = 0; j < this.cardList.length; j++) {
				var card = this.cardList[j];
				if(randomNumber <= seek + this.LEVEL_MAX + 1 - this.cardList[j].getLevel()) {
					cards.push(new Card(card.getName(), card.getLevel(), card.getUp(), card.getRight(), card.getDown(), card.getLeft()));
					continue draw_card;
				}

				seek += this.LEVEL_MAX + 1 - this.cardList[j].getLevel();
			}

			logger.error("No card has been drawn [Sum of weights : " + sum + "; random number : " + randomNumber + "]");
		}
	
		return cards;	
	}
}