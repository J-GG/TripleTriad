'use strict';

define([], function () {
    /**
     * The AI.
     * @author Jean-Gabriel Genest
     * @since 17.11.11
     * @version 17.11.11
     */
    return class AI {

        /**
         * Returns a card among the player's cards and a case among the empty cases on the board.
         * @param gameState The state of the game
         * @returns {{card, coordinates}} An object representing the Card and the coordinates on the board
         * @since 17.11.11
         */
        chooseCardAndCase(gameState) {
            return this.chooseCardAndCaseRandomly(gameState);
        }

        /**
         * Returns a random card among the player's cards and a random case among the empty cases on the board.
         * @param gameState The state of teh game
         * @returns {{card, coordinates}} An object representing the Card and the coordinates on the board
         * @since 17.11.11
         */
        chooseCardAndCaseRandomly(gameState) {
            let cardAndCoordinates = {};

            let emptyCases = gameState.getBoard().getEmptyCases();
            let randomCard = Math.floor(Math.random() * (gameState.getPlayerPlaying().getDeck().length));
            let randomCase = Math.floor(Math.random() * (emptyCases.length));

            cardAndCoordinates.card = gameState.getPlayerPlaying().getCard(randomCard);
            cardAndCoordinates.coordinates = emptyCases[randomCase];

            return cardAndCoordinates;
        }

    }
});