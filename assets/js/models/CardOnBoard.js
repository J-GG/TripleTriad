class CardOnBoard {
    constructor(card, player) {
        this.card = card;
        this.player = player;
        this.flippedByCard = undefined;
        this.flippedByRule = [];
        this.flippedStep = undefined;
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
        return this.flippedByCard !== undefined;
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
