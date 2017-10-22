class GameState {
    constructor() {
        this.board = new Board(3, 3);
    }

    setPlayers(players) {
        this.players = players;
        for (let i = 0; i < players.length; i++) {
            if (players[i].getBoard() !== this.board) {
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
        for (let i = 0; i < this.players.length; i++) {
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
        if (!this.isGameOver()) {
            return undefined;
        }

        let score = 0, winners = [];
        for (let i = 0; i < this.players.length; i++) {
            if (this.players[i].getScore() > score) {
                winners = [];
                score = this.players[i].getScore();
                winners.push(this.players[i]);
            } else if (this.players[i].getScore() === score) {
                winners.push(this.players[i]);
            }
        }

        return winners;
    }
}
