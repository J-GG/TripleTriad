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
