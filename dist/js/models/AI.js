'use strict';

define([cardGame.gamePath + "js/models/Settings.js",
        cardGame.gamePath + "js/models/Rules.js",
        cardGame.gamePath + "js/models/CardOnBoard.js",
        cardGame.gamePath + "js/models/GameState.js"],
    function (Settings, Rules, CardOnBoard, GameState) {
        /**
         * The AI.
         * @author Jean-Gabriel Genest
         * @since 17.11.11
         * @version 17.11.14
         */
        return class AI {

            /**
             * Returns a card among the player's cards and a case among the empty cases on the board.
             * @param gameState The state of the game
             * @param difficulty The level of difficulty of the AI
             * @returns {{card, coordinates}} An object representing the Card and the coordinates on the board
             * @since 17.11.11
             */
            chooseCardAndCase(gameState, difficulty) {
                if (typeof gameState !== "object" || !(gameState instanceof GameState)) {
                    logger.warning("Expected GameState type");
                }

                let cardAndCoordinates = {};
                switch (difficulty) {
                    case Settings.getDifficulties().EASY:
                        cardAndCoordinates = this.chooseCardAndCaseRandomly(gameState);
                        break;

                    case Settings.getDifficulties().NORMAL:
                        cardAndCoordinates = this.chooseCardAndCaseBasedOnRule(gameState, "testSimpleRule");
                        break;

                    case Settings.getDifficulties().HARD:
                        cardAndCoordinates = this.chooseCardAndCaseBasedOnRule(gameState, "testAllRules");
                        break;

                    default:
                        logger.debug("[difficulty: " + difficulty + "] does not exist");
                        break;
                }

                return cardAndCoordinates;
            }

            /**
             * Returns a random card among the player's cards and a random case among the empty cases on the board.
             * @param gameState The state of the game
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

            /**
             * Returns a card among the player's cards and a case among the empty cases on the board
             * based on the function referenced.
             * @param gameState The state of the game
             * @param fct Method of the Rules class to test the rules
             * @returns {{card, coordinates}} An object representing the Card and the coordinates on the board
             * @since 17.11.15
             */
            chooseCardAndCaseBasedOnRule(gameState, fct) {
                let cardAndCoordinates = {};

                let emptyCases = gameState.getBoard().getEmptyCases();
                let cards = gameState.getPlayerPlaying().getDeck();

                if (emptyCases.length === 9) {
                    return this.chooseCardAndCaseRandomly(gameState);
                }

                let maxFlipped = 0;
                for (let i = cards.length - 1; i >= 0; i--) {
                    emptyCases.forEach(function (emptyCase) {
                        let cardFlipped = new Rules()[fct](
                            gameState.getBoard(),
                            new CardOnBoard(cards[i], gameState.getPlayerPlaying()),
                            emptyCase[0],
                            emptyCase[1]
                        );
                        logger.debug("[card: " + cards[i].getName() + "; row: " + emptyCase[0] + "; col: " + emptyCase[1] + "] could flip " + cardFlipped.length + " cards");

                        if (cardFlipped.length > maxFlipped || cardAndCoordinates.card === undefined) {
                            maxFlipped = cardFlipped.length;
                            cardAndCoordinates.coordinates = [emptyCase[0], emptyCase[1]];
                            cardAndCoordinates.card = cards[i];
                        }
                    });
                }

                return cardAndCoordinates;
            }
        }
    });