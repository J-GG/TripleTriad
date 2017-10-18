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
		$(".board__game-area").html("").append($("<div>", { class: "title-texte" } ));
		for(var i = 1; i <= 5; i++) {
			$(".board__game-area").append($("<div>", { class: "card card--back title-card-" + i }));
		}

		$(".board__game-area").append($("<div>", { class: "title-blink" }));

		var self = this;
		setTimeout(function() {
			$(".board__game-area").append($("<div>", { class: "title-menu" }));
			$(".title-menu").html("Play<br />Settings").append($("<div>", { class: "cursor cursor--choices cursor--choice-1" }));
			self.choiceDialog($(".title-menu"), 1, 2, 2, function (gameState, choice) { 
				if(choice == 1) {
					$(".board__game-area").text("");
					self.initGame();
				} else {
					self.settings();
				}
			});

		}, 1500);
	}

	settings() {
		$(".board__game-area").html("").append($("<div>", { class: "message message--settings" }));
		$(".message").html(
			"<div id='setting-player-1' class='message__setting'><span class='message__label'>Player 1</span>"
			+ "<span class='message__value'>"
			+ 	"<input type='text' class='message__input' maxlength='10' size='17' spellcheck='false' autocomplete='false' value='" + Settings.getPlayer1Name() + "' />"
			+ "</span></div><div id='setting-player-2' class='message__setting'>"
			+ "<span class='message__label'>Player 2</span>"
			+ "<span class='message__value'>"
			+ 	"<input type='text' class='message__input' maxlength='10' size='17' spellcheck='false' autocomplete='false' value='" + Settings.getPlayer2Name() + "' />"
			+ "</span></div><div id='setting-sound' class='message__setting'>"
			+ "<span class='message__label'>Sound</span>"
			+ "<span class='message__value'>"
			+ 	"<span class='message__check" + (Settings.isAudioEnabled() ? " message__check--enabled" : "") + "'>ON</span>"
			+   "<span class='message__check" + (!Settings.isAudioEnabled() ? " message__check--enabled" : "") + "'>OFF</span>"
			+ "</span></div>"
			+ "<div id='setting-rules' class='message__setting'>Rules"
			+ "<br /><span id='rule-open' class='message__label message__check" + (Settings.isOpenEnabled() ? " message__check--enabled" : "") + "'>Open"
			+ "<br /><span class='message--text-small message__label'>Each player can see the opponent's cards</span></span>"
			+ "<br /><span id='rule-war' class='message__label message__check" + (Settings.isWarEnabled() ? " message__check--enabled" : "") + "'>War"
			+ "<br /><span class='message--text-small message__label'>When the number of an adjacent card matches, if the sum of all the numbers of the opponent's card is smaller"
			+ ", then it is flipped</span></span>"	
			+ "<br /><span id='rule-same' class='message__label message__check" + (Settings.isSameEnabled() ? " message__check--enabled" : "") + "'>Same"
			+ "<br /><span class='message--text-small message__label'>If the numbers of a card equal to the numbers of two or more adjacent cards of the opponent, they will be flipped</span></span>"
			+ "<br /><span id='rule-plus' class='message__label message__check" + (Settings.isPlusEnabled() ? " message__check--enabled" : "") + "'>Plus"
			+ "<br /><span class='message--text-small message__label'>If a card is placed down that adds up to the same value on two or more adjacent cards of the opponent, those cards are flipped</span></span>"
			+ "<br /><span id='rule-combo' class='message__label message__check" + (Settings.isComboEnabled() ? " message__check--enabled" : "") + "'>Combo"
			+ "<br /><span class='message--text-small message__label'>All cards which were turned over by the Same or Plus rule can turn over surrounding opponent's cards if they have a greater value</span></span>"
			+ "</div> "
			+ "<div class='message__confirm'>Menu</div>"
			).append($("<div>", {class: "cursor cursor--settings-0"}));

		var choice = 0;
	   	var self = this;
		$(document).keydown(function(e) {
			var previousChoice = choice;
			switch(e.which) {
		       	case 27: //Esc
		        	$(document).off("keydown");
		        	self.splashScreen();
		        case 38: //Up
		        	$("#setting-player-1 input").blur();
		        	$("#setting-player-2 input").blur();
		     		choice - 1 >= 0 ? choice-- : choice;
		        	break;

		        case 40: //Down
		        	$("#setting-player-1 input").blur();
		        	$("#setting-player-2 input").blur();
		     		choice + 1 <= 8 ? choice++ : choice;
		        	break;

		        case 13: //Enter
		        	switch(choice) {
		        		case 0:
		        			$("#setting-player-1 input").focus();
		        			break;

		        		case 1:
		        			$("#setting-player-2 input").focus();
		        			break;

		        		case 2:
			        		$("#setting-sound .message__check").each(function() {
			        			$(this).toggleClass("message__check--enabled");
			        		});
		        			break;

		  		        case 3:
			        		$("#rule-open").toggleClass("message__check--enabled");
		        			break;

		        		case 4:
			        		$("#rule-war").toggleClass("message__check--enabled");
		        			break;

		        		case 5:
			        		$("#rule-same").toggleClass("message__check--enabled");
		        			break;

		        		case 6:
			        		$("#rule-plus").toggleClass("message__check--enabled");
		        			break;

		        		case 7:
			        		$("#rule-combo").toggleClass("message__check--enabled");
		        			break;

		        		default:
		        			//Player's name
		        			Settings.setPlayer1Name($("#setting-player-1 input").val());
		        			Settings.setPlayer2Name($("#setting-player-2 input").val());

		        			//Audio
		        			if($("#setting-sound .message__check--enabled").text() === "ON") {
		        				Settings.enableAudio();
		        			} else {
		        				Settings.disableAudio();
		        			}

		        			//Rules
		        			if($("#rule-open").hasClass("message__check--enabled")) {
		        				Settings.enableOpen();
		        			} else {
		        				Settings.disableOpen();
		        			}

	        				if($("#rule-war").hasClass("message__check--enabled")) {
		        				Settings.enableWar();
		        			} else {
		        				Settings.disableWar();
		        			}

		        			if($("#rule-same").hasClass("message__check--enabled")) {
		        				Settings.enableSame();
		        			} else {
		        				Settings.disableSame();
		        			}

	        				if($("#rule-plus").hasClass("message__check--enabled")) {
		        				Settings.enablePlus();
		        			} else {
		        				Settings.disablePlus();
		        			}

	        				if($("#rule-combo").hasClass("message__check--enabled")) {
		        				Settings.enableCombo();
		        			} else {
		        				Settings.disableCombo();
		        			}

		        			$(document).off("keydown");
		        			self.splashScreen();
		        			break;
		        	}
		        	break;

		        default: 
		        	return;
	    	}
	    	$(".cursor").removeClass("cursor--settings-" + previousChoice).addClass("cursor--settings-" + choice);
		});
	}

	initGame() {
		$(".board__game-area").append($("<div>", { id: "card-name-message", class: "message message--info message--bottom message--hidden message--text-center" } ));

		if(Settings.isAudioEnabled()) {
			var music = document.getElementById("music");
			music.currentTime = 0;
			music.play();
		}

		this.game.initGame();
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
			if(!Settings.isOpenEnabled()) {
				$(".card.card--player-" + (i + 1)).attr("hiddenBackground", function() {
					return $(this).css("background-image");
				}).css("background-image", "").addClass("card--back");
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
			$(".player-selector").removeClass().addClass("player-selector player-selector--turn player-selector--turn-player-" + playerToPlay);
			self.newTurn(gameState);
		}, 1750);
	}

	newTurn(gameState) {
		var playerToPlay = gameState.getIndexPlayerToPlay() + 1;

		var self = this;
		if(!Settings.isOpenEnabled()) {
			$(".cursor").addClass("cursor--hide");
			$(".board__game-area").append($("<div>", {class: "board__game-text"}));
			$(".board__game-text").text(gameState.getPlayerToPlay().getName() + "'s turn");

			$(document).keydown(function(e) {
				switch(e.which) {
			        case 13: //Enter
			        	//Show the player's cards
						$(".card.card--player-" + playerToPlay).css("background-image", function() {
							return $(this).attr("hiddenBackground");
						}).attr("hiddenBackground", "").removeClass("card--back");

						$(".board__game-text").remove();
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
		       		self.chooseCardToPlay(gameState, selectedCard);
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
			$(".card--selected-player-" + playerToPlay).removeClass("card--disappearance-deck-" + indexCardPlayed 
				+ " card--player-" + playerToPlay 
				+ " card--deck-" + indexCardPlayed 
				+ " card--selected-player-" + playerToPlay)
				.addClass("card--appearance-row-" + row + " card--col-" + col);

				setTimeout(function() {
					//Position the card on its case
					$(".card--appearance-row-" + row).removeClass("card--appearance-row-" + row)
						.addClass("card--row-" + row);

					//Determine if cards have been flipped
					var steps = 0, nbRulesDisplayed = 0, rules = {};
					for(var i = 0; i < gameState.getBoard().getRows(); i++) {
						for(var j = 0; j < gameState.getBoard().getCols(); j++) {
							if(gameState.getBoard().getCardOnBoard(i, j) !== undefined && gameState.getBoard().getCardOnBoard(i, j).isFlipped()) {
								if(gameState.getBoard().getCardOnBoard(i, j).getFlippedStep() > steps) {
									steps = gameState.getBoard().getCardOnBoard(i, j).getFlippedStep();
								}
								if(gameState.getBoard().getCardOnBoard(i, j).getFlippedByRule() !== "SIMPLE") {
									if(rules[gameState.getBoard().getCardOnBoard(i, j).getFlippedStep()] === undefined) {
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
						var delayed = 0;
						if(rules[step] !== "SIMPLE") {
							delayed = 1200;
							$(".board__game-area").append($("<div>", { 
								class: "board__game-text board__game-text--slide",
								text: rules[step]
							} ));
						}

						setTimeout(function() {
							//Remove the text
							$(".board__game-text").remove();

							for(var i = 0; i < gameState.getBoard().getRows(); i++) {
								for(var j = 0; j < gameState.getBoard().getCols(); j++) {
									if(gameState.getBoard().getCardOnBoard(i, j) !== undefined && gameState.getBoard().getCardOnBoard(i, j).isFlipped() 
										&& gameState.getBoard().getCardOnBoard(i, j).getFlippedStep() === step) {
										var flippedCard = gameState.getBoard().getCardOnBoard(i, j);
										//Color of the player
										var color = flippedCard.getOwner() == gameState.getPlayer(0) ? "blue" : "red";
										//X or Y rotation
										var position = gameState.getBoard().getRelativePositionOf(flippedCard, flippedCard.getFlippedByCard());
										var rotation = "Y";
										if(position === "BOTTOM" || position === "UP") {
											rotation = "X";
										}

										//Add a back to the card
										$(".card.card--row-" + i + ".card--col-" + j).addClass("card--front card--front-" + rotation + "-row-" + i + "-col-" + j);
										$(".board__game-area").append($("<div>", { 
											class: "card card--back card--back-" + rotation + "-row-" + i + "-col-" + j + " card--row-" + i + " card--col-" + j
										} ));

										//Change the color of the card
										(function(i, j, flippedCard) {
											setTimeout(function() {
												$(".card.card--front.card--row-" + i + ".card--col-" + j)
													.attr("style", "background-image:url('assets/img/cards/" + color + "/" 
														+ flippedCard.getCard().getName().replace(/ /g,'').toLowerCase() + ".jpg');");
											}, 250);
										})(i, j, flippedCard);

										(function(i, j) {
											//Remove the back
											setTimeout(function() {
												$(".card.card--front.card--row-" + i + ".card--col-" + j).removeClass("card--front card--front-" + rotation + "-row-" + i + "-col-" + j);
												$(".card.card--back.card--row-" + i + ".card--col-" + j).remove();
												if(step < steps) {
													flipCard(step + 1);
												}
											}, 500);
										})(i, j);
									}
								}
							}
						}, delayed);
					}
					
					if(steps >= 1) {
						flipCard(1);
					}

					var timeOut = 200 + (steps * 500) + (nbRulesDisplayed * 1200);
					setTimeout(function() {
						//Update scores
						for (var i = 0; i < gameState.getPlayers().length; i++) {
							$(".score--player-" + (i + 1)).text(gameState.getPlayer(i).getScore());
						}

						//Hide cards
						if(!Settings.isOpenEnabled()) {
							$(".card.card--player-" + playerToPlay).attr("hiddenBackground", function() {
								return $(this).css("background-image");
							}).css("background-image", "").addClass("card--back");

						}

						//End the turn
						this.game.endTurn();
					}, timeOut);

				}, 500);
		}, 250);
	}

	gameOver(gameState) {
		$(".board__game-area").append($("<div>", {class: "board__game-text"}));

		if(gameState.getWinner().length > 1) {
			$(".board__game-text").text("Draw!");
		} else {
			$(".board__game-text").text(gameState.getWinner()[0].getName() + " Wins!");

			if(Settings.isAudioEnabled()) {
				document.getElementById("music").pause();

				var victory = document.getElementById("victory");
				victory.currentTime = 0;
				victory.play();
			}
		}

		var self = this;
		$(document).keydown(function(e) {
			switch(e.which) {
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
		var self = this;
		$(".board__game-area").fadeOut(function() {
			$(this).html("").addClass("board__game-area--final-screen").fadeIn();
			$(".board__game-area").append($("<div>", {id: "play-again-message", class: "message message--info"}));
			$("#play-again-message").html("Do you want to play again ?<div class='message__choices'>Yes<br />No</div>");


			var choice = self.choiceDialog($(".message__choices"), 1, 2, 2, function (gameState, choice) { 
				if(choice == 1) {
					if(Settings.isAudioEnabled()) {
						document.getElementById("victory").pause();
						var music = document.getElementById("music");
						music.currentTime = 0;
						music.play();
					}

					$(".board__game-area").fadeOut(function() {
						$(this).html("").removeClass("board__game-area--final-screen").fadeIn();
						game.initGame(gameState.getPlayers().map(player => player.getName()));
					});
				} else {
					if(Settings.isAudioEnabled()) {
						document.getElementById("music").pause();
						document.getElementById("victory").pause();
					}
					$(".board__game-area").fadeOut(function() {
						$(this).html("").removeClass("board__game-area--final-screen").fadeIn();
						self.splashScreen();
					});
				}
			}, gameState);
		});
	}

	choiceDialog(messageChoice, defaultChoice, maxChoice, escChoice, callback, gameState) {
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