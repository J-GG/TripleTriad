class View {
	constructor(game) {
		this.game = game;
		this.events = {
			"START": "initGame",
			"DRAW.CARDS": "drawCards",
			"DRAW.FIRST.PLAYER": "drawFirstPlayerToPlay",
			"CARD.PLAYED": "playCard",
			"NEW.TURN": "chooseCardToPlay",
			"GAME.OVER": "gameOver"
		}
	}

	getEvents() {
		return this.events;
	}

	initGame () {
		var player1Name = "JG";
		var player2Name = "Cherise";

		var music = document.getElementById("music");
		music.currentTime = 0;
		//music.play();

		this.game.initGame([player1Name, player2Name]);
	}

	drawCards(gameState) {

		//Show players' name
		for (var i = 0; i < gameState.getPlayers().length; i++) {
				$(".board__game-area").append($("<div>", { class: "board__player-name-box board__player-name-box--player-" + (i + 1) }));
				$(".board__player-name-box--player-" + (i + 1)).append($("<div>", { class: "board__player-name-text", text: gameState.getPlayer(i).getName() }));
		}

		/* Show player's cards */
		for (var i = 0; i < gameState.getPlayers().length; i++) {
			var deck = gameState.getPlayer(i).getDeck();
			var color = i == 0 ? "blue" : "red";
			for (var j = deck.length - 1; j >= 0; j--) {
				$(".board__game-area").append($("<div>", {
					class: "card card--player-" + (i + 1) + " card--player-" + (i + 1) + "-appearance-deck-" + j, 
					style: "background-image:url('assets/img/cards/" + color + "/" + deck[j].getName().replace(/ /g,'').toLowerCase() + ".jpg');" 
				}));
			}

		}

		var self = this;
		setTimeout(function() {
			for (var i = 0; i < gameState.getPlayers().length; i++) {
				/* Display scores */
				$(".board__game-area").append($("<div>", {class: "score score--player-" + (i + 1)}));
				$(".score--player-" + (i + 1)).text(gameState.getPlayer(i).getScore());
				
				for (var j = 0; j < 5; j++) {
					/* Remove the classes for the animation and add the classes for the position */
					$(".card--player-" + (i + 1) + "-appearance-deck-" + j).addClass("card--deck-" + j)
						.removeClass("card--player-" + (i + 1) + "-appearance-deck-" + j);
				}
			}
			self.game.drawFirstPlayerToPlay();
		}, 750);
		
	}

	drawFirstPlayerToPlay(gameState) {
		var playerToPlay = gameState.getIndexPlayerToPlay() + 1;

		$(".board__game-area").append($("<div>", {class: "player-selector player-selector--draw player-selector--draw-player-" + playerToPlay}));
		
		var self = this;
		setTimeout(function() {
			$(".player-selector").removeClass("player-selector--draw player-selector--draw-player-" + playerToPlay)
			$(".board__game-area").append($("<div>", {class: "cursor"}));
			self.chooseCardToPlay(gameState, playerToPlay);
		}, 1750);
	}

	chooseCardToPlay(gameState, playerToPlay, selectedCard) {

		var playerToPlay = gameState.getIndexPlayerToPlay() + 1;
		if(selectedCard === undefined) {
			selectedCard = gameState.getPlayerToPlay().getDeck().length - 1;
		}

		$(".player-selector").removeClass().addClass("player-selector player-selector--turn player-selector--turn-player-" + playerToPlay);
		$(".cursor").removeClass().addClass("cursor cursor--player-" + playerToPlay + " cursor--card-" + selectedCard);

	   	this.updateSelectedCard(gameState, playerToPlay, selectedCard);

	   	var self = this;
		$(document).keydown(function(e) {
			var previousSelectedCard = selectedCard;
			switch(e.which) {
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
		if(previousSelectedCard != undefined) {
			var divpreviousSelectedCard = $(".card--player-" + playerToPlay + ".card--deck-" + previousSelectedCard);
	    	$(divpreviousSelectedCard).removeClass("card--selected-player-" + playerToPlay);
		}

	    var divselectedCard = $(".card--player-" + playerToPlay + ".card--deck-" + selectedCard);
	    $(divselectedCard).addClass("card--selected-player-" + playerToPlay);

	    //Show the name of the card
	    this.showCardNameMessage(gameState, gameState.getPlayerToPlay().getCard(selectedCard));
	}

	chooseCase(gameState, playerToPlay, selectedCard) {
		var currentRow = 1, currentCol = 1;
	    
	    //Move the cursor to the board
	    $(".cursor").addClass("cursor--row-" + currentRow + " cursor--col-" + currentCol);

	    //Hide the card name
    	if(gameState.getBoard().getCardOnBoard(currentRow, currentCol)) {
	    	this.showCardNameMessage(gameState, gameState.getBoard().getCardOnBoard(currentRow, currentCol).getCard());
		} else {
			$("#card-name-message").addClass("message--hidden").text();
		}

	    var self = this;
		$(document).keydown(function(e) {
			var previousRow = currentRow;
			var previousCol = currentCol;

			switch(e.which) {
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
		        	if(!gameState.getBoard().getCardOnBoard(currentRow, currentCol)) {
		        		$(document).off("keydown");
		        		self.game.playCard(gameState.getPlayerToPlay().getDeck()[selectedCard], currentRow, currentCol);
		        	}
		        	return;
		        	break;

		       	case 27: //Esc
		       		$(".cursor").removeClass("cursor--row-" + currentRow + " cursor--col-" + currentCol);
		       		$(document).off("keydown");
		       		self.chooseCardToPlay(gameState, playerToPlay, selectedCard);
		       		return;
		        	break;

		        default: 
		        	return;
			}

	    	$(".cursor").removeClass("cursor--row-" + previousRow + " cursor--col-" + previousCol)
	    		.addClass("cursor--row-" + currentRow + " cursor--col-" + currentCol);

	    	if(gameState.getBoard().getCardOnBoard(currentRow, currentCol)) {
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
		var playerToPlay = gameState.getIndexPlayerToPlay() + 1;

		/* Move the card from the deck to the board */
		$(".card--selected-player-" + playerToPlay).addClass("card--disappearance-deck-" + indexCardPlayed);

		setTimeout(function() {
			$(".card--selected-player-" + playerToPlay).removeClass("card--disappearance-deck-" + indexCardPlayed 
				+ " card--player-" + playerToPlay 
				+ " card--deck-" + indexCardPlayed 
				+ " card--selected-player-" + playerToPlay)
				.addClass("card--appearance-row-" + row + " card--col-" + col);

				setTimeout(function() {
					//Position the card on its case
					$(".card--appearance-row-" + row).removeClass("card--appearance-row-" + row)
						.addClass("card--row-" + row);

					//Flip the cards
					for(var i = 0; i < gameState.getBoard().getRows(); i++) {
						for(var j = 0; j < gameState.getBoard().getCols(); j++) {
							if(gameState.getBoard().getCardOnBoard(i, j) !== false && gameState.getBoard().getCardOnBoard(i, j).isFlipped()) {
								//Color of the player
								var color = gameState.getBoard().getCardOnBoard(i, j).getOwner() == gameState.getPlayer(0) ? "blue" : "red";
								//Add a back to the card
								$(".card.card--row-" + i + ".card--col-" + j).addClass("card--front card--front-X-row-" + i + "-col-" + j);
								$(".board__game-area").append($("<div>", { class: "card card--back card--back-X-row-" + i + "-col-" + j + " card--row-" + i + " card--col-" + j } ));

								(function(i, j) {
									setTimeout(function() {
										$(".card.card--front.card--row-" + i + ".card--col-" + j)
											.attr("style", "background-image:url('assets/img/cards/" + color + "/" 
												+ gameState.getBoard().getCardOnBoard(i, j).getCard().getName().replace(/ /g,'').toLowerCase() + ".jpg');");
									}, 250);
								})(i, j);

								(function(i, j) {
									setTimeout(function() {
										$(".card.card--front.card--row-" + i + ".card--col-" + j).removeClass("card--front card--front-X-row-" + i + "-col-" + j);
										$(".card.card--back.card--row-" + i + ".card--col-" + j).remove();

									}, 500);
								})(i, j);
							}
						}
					}

					//Update scores
					for (var i = 0; i < gameState.getPlayers().length; i++) {
						$(".score--player-" + (i + 1)).text(gameState.getPlayer(i).getScore());
					}

				}, 500);
		}, 250);

		/* Remove the classes positioning the cursor on the board */
		$(".cursor").addClass("cursor--hide");

		/* Lower the position of the cards above the one which has just been removed from the deck */
		for(var i = indexCardPlayed + 1; i < gameState.getPlayerToPlay().getDeck().length + 1; i++) {
			$(".card--player-" + playerToPlay + ".card--deck-" + i).removeClass("card--deck-" + i).
				addClass("card--deck-lower-" + (i - 1));

			(function(playerToPlay, i) {
				setTimeout(function() {
					$(".card--player-" + playerToPlay + ".card--deck-lower-" + (i - 1)).removeClass("card--deck-lower-" + (i - 1)).addClass("card--deck-" + (i - 1));
				}, 250);
			})(playerToPlay, i);
		}

		setTimeout(function() {
			this.game.endTurn();
		}, 1250);
		
	}

	gameOver(gameState) {
		$(".board__game-area").append($("<div>", {class: "board__game-over"}));

		if(gameState.getWinner().length > 1) {
			$(".board__game-over").text("Draw!");
		} else {
			$(".board__game-over").text(gameState.getWinner()[0].getName() + " Wins!");

			document.getElementById("music").pause();

			var victory = document.getElementById("victory");
			victory.currentTime = 0;
			victory.play();
		}

		var self = this;
		setTimeout(function() {
			self.finalScreen(gameState);
		}, 500);
	}

	finalScreen(gameState) {
		var self = this;
		$(".board__game-area").fadeOut(function() {
			$(this).html("").addClass("board__game-area--final-screen").fadeIn();
			$(".board__game-area").append($("<div>", {id: "play-again-message", class: "message message--info"}));
			$("#play-again-message").html("Do you want to play again ?<div class='message__choices'>Yes<br />No</div>");


			var choice = self.choiceDialog(gameState, $(".message__choices"), 1, 2, 2, function (gameState, choice) { 
				if(choice == 1) {
					document.getElementById("victory").pause();
					var music = document.getElementById("music");
					music.currentTime = 0;
					//music.play();

					$(".board__game-area").fadeOut(function() {
						$(this).html("").removeClass("board__game-area--final-screen").fadeIn();
						game.initGame(gameState.getPlayers().map(player => player.getName()));
					});
				}
			});
		});
	}

	choiceDialog(gameState, messageChoice, defaultChoice, maxChoice, escChoice, callback) {
		var choice = defaultChoice;
		$(messageChoice).append($("<div>", {class: "cursor cursor--choices cursor--choice-" + choice}));	
		$(document).keydown(function(e) {
			var previousChoice = choice;
			var end = false;

			switch(e.which) {
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