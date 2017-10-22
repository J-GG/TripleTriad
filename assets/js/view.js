require(["assets/js/views/SettingsView.js"]);
require(["assets/js/views/SplashScreenView.js"]);

class View {
    constructor(game) {
        this.game = game;
        this.events = {
            "START": "splashScreen",
            "DRAW.CARDS": "drawCards",
            "DRAW.FIRST.PLAYER": "drawFirstPlayerToPlay",
            "CARD.PLAYED": "playCard",
            "NEW.TURN": "newTurn",
            "GAME.OVER": "gameOver"
        }
    }

    getEvents() {
        return this.events;
    }

    splashScreen() {
        SplashScreenView.show(this);
    }

    settings() {
        SettingsView.show(this);
    }

    initGame() {
        $(".board__game-area").append($("<div>", {
            id: "card-name-message",
            class: "message message--info message--bottom message--hidden message--text-center"
        }));

        if (Settings.isAudioEnabled()) {
            let music = document.getElementById("music");
            music.currentTime = 0;
            music.play();
        }

        this.game.initGame();
    }

    drawCards(gameState) {

        //Show players' name
        for (let i = 0; i < gameState.getPlayers().length; i++) {
            $(".board__game-area").append($("<div>", {class: "player-name__box player-name__box--player-" + (i + 1)}));
            $(".player-name__box--player-" + (i + 1)).append($("<div>", {
                class: "player-name__text",
                text: gameState.getPlayer(i).getName()
            }));
        }

        /* Show player's cards */
        for (let i = 0; i < gameState.getPlayers().length; i++) {
            let deck = gameState.getPlayer(i).getDeck();
            let color = i === 0 ? "blue" : "red";
            for (let j = deck.length - 1; j >= 0; j--) {
                $(".board__game-area").append($("<div>", {
                    class: "card card--out-board card--player-" + (i + 1) + " card--player-" + (i + 1) + "-appearance-deck-" + j,
                    style: "background-image:url('assets/img/cards/" + color + "/" + deck[j].getName().replace(/ /g, '').toLowerCase() + ".jpg');"
                }));
            }
            if (!Settings.isOpenEnabled()) {
                $(".card.card--player-" + (i + 1)).attr("hiddenBackground", function () {
                    return $(this).css("background-image");
                }).css("background-image", "").addClass("card--back");
            }
        }

        const self = this;
        setTimeout(function () {
            for (let i = 0; i < gameState.getPlayers().length; i++) {
                /* Display scores */
                $(".board__game-area").append($("<div>", {class: "score score--player-" + (i + 1)}));
                $(".score--player-" + (i + 1)).text(gameState.getPlayer(i).getScore());

                for (let j = 0; j < 5; j++) {
                    /* Remove the classes for the animation and add the classes for the position */
                    $(".card--player-" + (i + 1) + "-appearance-deck-" + j).addClass("card--deck-" + j)
                        .removeClass("card--out-board card--player-" + (i + 1) + "-appearance-deck-" + j);
                }
            }
            self.game.drawFirstPlayerToPlay();
        }, 750);

    }

    drawFirstPlayerToPlay(gameState) {
        let playerToPlay = gameState.getIndexPlayerToPlay() + 1;

        $(".board__game-area").append($("<div>", {class: "player-selector player-selector--draw player-selector--draw-player-" + playerToPlay}));

        let self = this;
        setTimeout(function () {
            $(".player-selector").removeClass("player-selector--draw player-selector--draw-player-" + playerToPlay)
            $(".board__game-area").append($("<div>", {class: "cursor"}));
            $(".player-selector").removeClass().addClass("player-selector player-selector--turn player-selector--turn-player-" + playerToPlay);
            self.newTurn(gameState);
        }, 1750);
    }

    newTurn(gameState) {
        let playerToPlay = gameState.getIndexPlayerToPlay() + 1;

        const self = this;
        if (!Settings.isOpenEnabled()) {
            $(".cursor").addClass("cursor--hide");
            $(".board__game-area").append($("<div>", {class: "text-title"}));
            $(".text-title").text(gameState.getPlayerToPlay().getName() + "'s turn");

            $(document).keydown(function (e) {
                switch (e.which) {
                    case 13: //Enter
                        //Show the player's cards
                        $(".card.card--player-" + playerToPlay).css("background-image", function () {
                            return $(this).attr("hiddenBackground");
                        }).attr("hiddenBackground", "").removeClass("card--back");

                        $(".text-title").remove();
                        $(".cursor").removeClass("cursor--hide");
                        $(".board__game-area").append($("<div>", {class: "cursor"}));
                        $(document).off("keydown");
                        self.chooseCardToPlay(gameState);
                        break;

                    default:
                        return;
                }
            });
        } else {
            this.chooseCardToPlay(gameState);
        }
    }

    chooseCardToPlay(gameState, selectedCard) {
        let playerToPlay = gameState.getIndexPlayerToPlay() + 1;
        if (selectedCard === undefined) {
            selectedCard = gameState.getPlayerToPlay().getDeck().length - 1;
        }

        $(".player-selector").removeClass().addClass("player-selector player-selector--turn player-selector--turn-player-" + playerToPlay);
        $(".cursor").removeClass().addClass("cursor cursor--player-" + playerToPlay + " cursor--card-" + selectedCard);

        this.updateSelectedCard(gameState, playerToPlay, selectedCard);

        const self = this;
        $(document).keydown(function (e) {
            let previousSelectedCard = selectedCard;
            switch (e.which) {
                case 38: //Up
                    selectedCard + 1 < gameState.getPlayerToPlay().getDeck().length ? selectedCard++ : selectedCard;
                    self.updateSelectedCard(gameState, playerToPlay, selectedCard, previousSelectedCard);
                    break;

                case 40: //Down
                    selectedCard - 1 >= 0 ? selectedCard-- : selectedCard;
                    self.updateSelectedCard(gameState, playerToPlay, selectedCard, previousSelectedCard);
                    break;

                case 13: //Enter
                    $(".cursor").removeClass("cursor--player-" + playerToPlay).removeClass("cursor--card-" + selectedCard);
                    $(document).off("keydown");
                    self.chooseCase(gameState, playerToPlay, selectedCard);
                    break;

                default:
                    return;
            }
        });
    }

    updateSelectedCard(gameState, playerToPlay, selectedCard, previousSelectedCard) {
        //Move the cursor
        $(".cursor").removeClass("cursor--card-" + previousSelectedCard).addClass("cursor--card-" + selectedCard);

        //Shift the cards
        if (previousSelectedCard !== undefined) {
            let divpreviousSelectedCard = $(".card--player-" + playerToPlay + ".card--deck-" + previousSelectedCard);
            $(divpreviousSelectedCard).removeClass("card--selected-player-" + playerToPlay);
        }

        let divselectedCard = $(".card--player-" + playerToPlay + ".card--deck-" + selectedCard);
        $(divselectedCard).addClass("card--selected-player-" + playerToPlay);

        //Show the name of the card
        this.showCardNameMessage(gameState, gameState.getPlayerToPlay().getCard(selectedCard));
    }

    chooseCase(gameState, playerToPlay, selectedCard) {
        let currentRow = 1, currentCol = 1;

        //Move the cursor to the board
        $(".cursor").addClass("cursor--row-" + currentRow + " cursor--col-" + currentCol);

        //Hide the card name
        if (gameState.getBoard().getCardOnBoard(currentRow, currentCol)) {
            this.showCardNameMessage(gameState, gameState.getBoard().getCardOnBoard(currentRow, currentCol).getCard());
        } else {
            $("#card-name-message").addClass("message--hidden").text();
        }

        const self = this;
        $(document).keydown(function (e) {
            let previousRow = currentRow;
            let previousCol = currentCol;

            switch (e.which) {
                case 37: //Left
                    currentCol - 1 >= 0 ? currentCol-- : currentCol;
                    break;

                case 38: //Up
                    currentRow - 1 >= 0 ? currentRow-- : currentRow;
                    break;

                case 39: //Right
                    currentCol + 1 < 3 ? currentCol++ : currentCol;
                    break;

                case 40: //Down
                    currentRow + 1 < 3 ? currentRow++ : currentRow;
                    break;

                case 13: //Enter
                    if (!gameState.getBoard().getCardOnBoard(currentRow, currentCol)) {
                        $(document).off("keydown");
                        self.game.playCard(gameState.getPlayerToPlay().getDeck()[selectedCard], currentRow, currentCol);
                    }
                    return;
                    break;

                case 27: //Esc
                    $(".cursor").removeClass("cursor--row-" + currentRow + " cursor--col-" + currentCol);
                    $(document).off("keydown");
                    self.chooseCardToPlay(gameState, selectedCard);
                    return;
                    break;

                default:
                    return;
            }

            $(".cursor").removeClass("cursor--row-" + previousRow + " cursor--col-" + previousCol)
                .addClass("cursor--row-" + currentRow + " cursor--col-" + currentCol);

            if (gameState.getBoard().getCardOnBoard(currentRow, currentCol)) {
                self.showCardNameMessage(gameState, gameState.getBoard().getCardOnBoard(currentRow, currentCol).getCard());
            } else {
                $("#card-name-message").addClass("message--hidden").text();
            }
        });
    }

    showCardNameMessage(gameState, card) {
        $("#card-name-message").removeClass("message--hidden").text(card.getName());
    }

    playCard(gameState, indexCardPlayed, row, col) {
        let playerToPlay = gameState.getIndexPlayerToPlay() + 1;

        /* Move the card from the deck to the board */
        $(".card--selected-player-" + playerToPlay).addClass("card--disappearance-deck-" + indexCardPlayed);

        /* Remove the classes positioning the cursor on the board */
        $(".cursor").addClass("cursor--hide");

        /* Lower the position of the cards above the one which has just been removed from the deck */
        for (let i = indexCardPlayed + 1; i < gameState.getPlayerToPlay().getDeck().length + 1; i++) {
            $(".card--player-" + playerToPlay + ".card--deck-" + i).removeClass("card--deck-" + i).addClass("card--deck-lower-" + (i - 1));

            (function (playerToPlay, i) {
                setTimeout(function () {
                    $(".card--player-" + playerToPlay + ".card--deck-lower-" + (i - 1)).removeClass("card--deck-lower-" + (i - 1)).addClass("card--deck-" + (i - 1));
                }, 250);
            })(playerToPlay, i);
        }

        let self = this;
        setTimeout(function () {
            $(".card--selected-player-" + playerToPlay).removeClass("card--disappearance-deck-" + indexCardPlayed
                + " card--player-" + playerToPlay
                + " card--deck-" + indexCardPlayed
                + " card--selected-player-" + playerToPlay)
                .addClass("card--appearance-row-" + row + " card--col-" + col);

            setTimeout(function () {
                //Position the card on its case
                $(".card--appearance-row-" + row).removeClass("card--appearance-row-" + row)
                    .addClass("card--row-" + row);

                //Determine if cards have been flipped
                let steps = 0, nbRulesDisplayed = 0, rules = {};
                for (let i = 0; i < gameState.getBoard().getRows(); i++) {
                    for (let j = 0; j < gameState.getBoard().getCols(); j++) {
                        if (gameState.getBoard().getCardOnBoard(i, j) !== undefined && gameState.getBoard().getCardOnBoard(i, j).isFlipped()) {
                            if (gameState.getBoard().getCardOnBoard(i, j).getFlippedStep() > steps) {
                                steps = gameState.getBoard().getCardOnBoard(i, j).getFlippedStep();
                            }
                            if (gameState.getBoard().getCardOnBoard(i, j).getFlippedByRule() !== "SIMPLE") {
                                if (rules[gameState.getBoard().getCardOnBoard(i, j).getFlippedStep()] === undefined) {
                                    nbRulesDisplayed++;
                                }
                            }
                            rules[gameState.getBoard().getCardOnBoard(i, j).getFlippedStep()] = gameState.getBoard().getCardOnBoard(i, j).getFlippedByRule();
                        }
                    }
                }

                //Flip the cards
                function flipCard(step) {
                    //Show the rule applied
                    let delayed = 0;
                    if (rules[step] !== "SIMPLE") {
                        delayed = 1200;
                        $(".board__game-area").append($("<div>", {
                            class: "text-title text-title--slide",
                            text: rules[step]
                        }));
                    }

                    setTimeout(function () {
                        //Remove the text
                        $(".text-title").remove();

                        for (let i = 0; i < gameState.getBoard().getRows(); i++) {
                            for (let j = 0; j < gameState.getBoard().getCols(); j++) {
                                if (gameState.getBoard().getCardOnBoard(i, j) !== undefined && gameState.getBoard().getCardOnBoard(i, j).isFlipped()
                                    && gameState.getBoard().getCardOnBoard(i, j).getFlippedStep() === step) {
                                    let flippedCard = gameState.getBoard().getCardOnBoard(i, j);
                                    //Color of the player
                                    let color = flippedCard.getOwner() === gameState.getPlayer(0) ? "blue" : "red";
                                    //X or Y rotation
                                    let position = gameState.getBoard().getRelativePositionOf(flippedCard, flippedCard.getFlippedByCard());
                                    let rotation = "Y";
                                    if (position === Board.positions.BOTTOM || position === Board.positions.TOP) {
                                        rotation = "X";
                                    }

                                    //Add a back to the card
                                    $(".card.card--row-" + i + ".card--col-" + j).addClass("card--front card--front-" + rotation + "-row-" + i + "-col-" + j);
                                    $(".board__game-area").append($("<div>", {
                                        class: "card card--back card--back-" + rotation + "-row-" + i + "-col-" + j + " card--row-" + i + " card--col-" + j
                                    }));

                                    //Change the color of the card
                                    (function (i, j, flippedCard) {
                                        setTimeout(function () {
                                            $(".card.card--front.card--row-" + i + ".card--col-" + j)
                                                .attr("style", "background-image:url('assets/img/cards/" + color + "/"
                                                    + flippedCard.getCard().getName().replace(/ /g, '').toLowerCase() + ".jpg');");
                                        }, 250);
                                    })(i, j, flippedCard);

                                    (function (i, j) {
                                        //Remove the back
                                        setTimeout(function () {
                                            $(".card.card--front.card--row-" + i + ".card--col-" + j).removeClass("card--front card--front-" + rotation + "-row-" + i + "-col-" + j);
                                            $(".card.card--back.card--row-" + i + ".card--col-" + j).remove();
                                            if (step < steps) {
                                                flipCard(step + 1);
                                            }
                                        }, 500);
                                    })(i, j);
                                }
                            }
                        }
                    }, delayed);
                }

                if (steps >= 1) {
                    flipCard(1);
                }

                let timeOut = 200 + (steps * 500) + (nbRulesDisplayed * 1200);
                setTimeout(function () {
                    //Update scores
                    for (let i = 0; i < gameState.getPlayers().length; i++) {
                        $(".score--player-" + (i + 1)).text(gameState.getPlayer(i).getScore());
                    }

                    //Hide cards
                    if (!Settings.isOpenEnabled()) {
                        $(".card.card--player-" + playerToPlay).attr("hiddenBackground", function () {
                            return $(this).css("background-image");
                        }).css("background-image", "").addClass("card--back");

                    }

                    //End the turn
                    self.game.endTurn();
                }, timeOut);

            }, 500);
        }, 250);
    }

    gameOver(gameState) {
        $(".board__game-area").append($("<div>", {class: "text-title"}));

        if (gameState.getWinner().length > 1) {
            $(".text-title").text("Draw!");
        } else {
            $(".text-title").text(gameState.getWinner()[0].getName() + " Wins!");

            if (Settings.isAudioEnabled()) {
                document.getElementById("music").pause();

                let victory = document.getElementById("victory");
                victory.currentTime = 0;
                victory.play();
            }
        }

        const self = this;
        $(document).keydown(function (e) {
            switch (e.which) {
                case 13: //Enter
                    $(document).off("keydown");
                    self.finalScreen(gameState);
                    break;

                default:
                    return;
            }
        });
    }

    finalScreen(gameState) {
        const self = this;
        $(".board__game-area").fadeOut(function () {
            $(this).html("").addClass("board__game-area--final-screen").fadeIn();
            $(".board__game-area").append($("<div>", {id: "play-again-message", class: "message message--info"}));
            $("#play-again-message").html("Do you want to play again ?<div class='message__choices'>Yes<br />No</div>");


            self.choiceDialog($(".message__choices"), 1, 2, 2, function (gameState, choice) {
                if (choice === 1) {
                    if (Settings.isAudioEnabled()) {
                        document.getElementById("victory").pause();
                        let music = document.getElementById("music");
                        music.currentTime = 0;
                        music.play();
                    }

                    $(".board__game-area").fadeOut(function () {
                        $(this).html("").removeClass("board__game-area--final-screen").fadeIn();
                        self.game.initGame(gameState.getPlayers().map(player => player.getName()));
                    });
                } else {
                    if (Settings.isAudioEnabled()) {
                        document.getElementById("music").pause();
                        document.getElementById("victory").pause();
                    }
                    $(".board__game-area").fadeOut(function () {
                        $(this).html("").removeClass("board__game-area--final-screen").fadeIn();
                        self.splashScreen();
                    });
                }
            }, gameState);
        });
    }

    choiceDialog(messageChoice, defaultChoice, maxChoice, escChoice, callback, gameState) {
        let choice = defaultChoice;
        $(messageChoice).append($("<div>", {class: "cursor cursor--choices cursor--choice-" + choice}));
        $(document).keydown(function (e) {
            let previousChoice = choice;

            switch (e.which) {
                case 38: //Up
                    choice - 1 > 0 ? choice-- : choice;
                    break;

                case 40: //Down
                    choice + 1 <= maxChoice ? choice++ : choice;
                    break;

                case 13: //Enter
                    $(document).off("keydown");
                    callback(gameState, choice);
                    return;
                    break;

                case 27: //Esc
                    choice = escChoice;
                    break;

                default:
                    return;
            }

            $(".cursor").removeClass("cursor--choice-" + previousChoice).addClass("cursor--choice-" + choice);
        });
    }
}