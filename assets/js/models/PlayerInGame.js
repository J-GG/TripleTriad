require(["assets/js/models/Player.js"]);

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
        let indexToRemove = this.deck.indexOf(cardToRemove);
        this.deck.splice(indexToRemove, 1);

        return indexToRemove;
    }
}
