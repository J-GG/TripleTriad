/**
 * The state of the game.
 * @author Jean-Gabriel Genest
 * @since 17.10.22
 * @version 17.11.11
 */
define([cardGame.gamePath + "js/models/Board.js",
    cardGame.gamePath + "js/models/PlayerInGame.js"], function (Board, PlayerInGame) {
    return class GameState {

        /**
         * Construct a GameState.
         * @param onePlayer Whether one (against an AI) or two players play
         * @param nbRows The number of rows on the board
         * @param nbCols The number of cols on the board
         * @since 17.10.22
         */
        constructor(onePlayer, nbRows, nbCols) {
            this.onePlayer = onePlayer === true;
            this.board = new Board(nbRows, nbCols);
        }

        /**
         * Set the playing players.
         * @param players The array of PlayerInGame playing the game
         * @since 17.10.22
         */
        setPlayers(players) {
            for (let i = 0; i < players.length; i++) {
                if (typeof players[i] !== "object" || !(players[i] instanceof PlayerInGame)) {
                    throw new TypeError("Expected PlayerInGame type");
                }
                if (players[i].getBoard() !== this.board) {
                    players[i].setBoard(this.board);
                }
            }
            this.players = players;
        }

        isOnePlayerGame() {
            return this.onePlayer;
        }

        /**
         * Get the playing players.
         * @returns {*} The array of PlayerInGame playing the game
         * @since 17.10.22
         */
        getPlayers() {
            return this.players;
        }

        /**
         * Get the player at the specified index.
         * @param index The index of the wanted PlayerInGame
         * @returns {*} The PlayerInGame at the specified index
         * @since 17.10.22
         */
        getPlayer(index) {
            if (this.players[index] === undefined) {
                logger.warning("There is no player at the index " + index);
                return;
            }
            return this.players[index];
        }

        /**
         * Set the player whose it's the turn.
         * @param playerPlaying The PlayerInGame whose it's the turn
         * @since 17.10.22
         */
        setPlayerPlaying(playerPlaying) {
            if (typeof playerPlaying !== "object" || !(playerPlaying instanceof PlayerInGame)) {
                throw new TypeError("Expected PlayerInGame type");
            }
            this.playerPlaying = playerPlaying;
        }

        /**
         * Get the player whose it's the turn.
         * @returns {*} The PlayerInGame whose it's the turn
         * @since 17.10.22
         */
        getPlayerPlaying() {
            return this.playerPlaying;
        }

        /**
         * Get the index of the player whose it's the turn.
         * @returns {number} The index f the player whose it's the turn
         * @since 17.10.22
         */
        getIndexPlayerPlaying() {
            for (let i = 0; i < this.players.length; i++) {
                if (this.playerPlaying === this.players[i]) {
                    return i;
                }
            }
        }

        /**
         * Get the board.
         * @returns {Board} The board
         * @since 17.10.22
         */
        getBoard() {
            return this.board;
        }

        /**
         * Whether the game is over or not.
         * @returns {boolean} True if the game is over
         * @since 17.10.22
         */
        isGameOver() {
            return this.board.isComplete();
        }

        /**
         * Get the winner(s) if the game is over.
         * @returns {*} The PlayerInGame who won the game. If the game is not over, undefined is returned
         * @since 17.10.22
         */
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
});