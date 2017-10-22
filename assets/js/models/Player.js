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
