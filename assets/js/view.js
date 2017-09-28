function initPlayersView (game, callback) {
	var player1Name = "JG";
	var player2Name = "Cherise";

	callback.call(game, player1Name, player2Name);
}

function drawCardsView(game, callback, deckPlayer1, deckPlayer2) {
	for (var i = 0; i < 5; i++) {
		(function(deckPlayer1, i) {
			setTimeout(function() {
				$(".board__game-area").append($("<div>", {
					class: "card card--player-1", 
					style: "background-image:url('assets/img/" + deckPlayer1[i].getName() + ".jpg'); top: 150%;" 
				}).animate({top: (12 + 13 * i) + "%"}, 300));

			}, 50 * i);
		})(deckPlayer1, i)
	}

	for (var i = 0; i < 5; i++) {
		(function(deckPlayer2, i) {
			setTimeout(function() {
				$(".board__game-area").append($("<div>", {
					class: "card card--player-2",
					style: "background-image:url('assets/img/" + deckPlayer2[i].getName() + ".jpg'); top: 150%;" 
				}).animate({top: (12 + 13 * i) + "%"}, 300));
			}, 500 + 50 * i);
		})(deckPlayer2, i)
	}

	setTimeout(function() {
		callback.call(game);
	}, 1000);
}

function firstPlayerToPlayView(game, gameState) {
	var playerToPlay = gameState.getPlayerToPlay() == gameState.getPlayer1() ? "player-1" : "player-2";

	$(".board__game-area").append($("<div>", {class: "board__player-selector board__player-selector--draw board__player-selector--draw-" + playerToPlay}));
	
	setTimeout(function() {
		$(".board__player-selector").removeClass("board__player-selector--draw-" + playerToPlay).addClass("board__player-selector--turn board__player-selector--turn-" + playerToPlay);
		$(".board__game-area").append($("<div>", {class: "board__cursor"}));
		chooseCardView(game, gameState, 4);
	}, 1750);
}

function chooseCardView(game, gameState, selectedCard) {
	var playerToPlay = gameState.getPlayerToPlay() == gameState.getPlayer1() ? "player-1" : "player-2";

	$(".board__cursor").addClass("board__cursor--" + playerToPlay + " board__cursor--card-" + selectedCard);
	
    updateselectedCardView(playerToPlay, selectedCard);

	$(document).keydown(function(e) {
		var previousSelectedCard = selectedCard;
		switch(e.which) {
	        case 38: //Up
	        	selectedCard + 1 < gameState.getPlayerToPlay().getDeck().length ? selectedCard++ : selectedCard;
    			updateselectedCardView(playerToPlay, selectedCard, previousSelectedCard);
	        	break;

	        case 40: //Down
	        	selectedCard - 1 >= 0 ? selectedCard-- : selectedCard;
    			updateselectedCardView(playerToPlay, selectedCard, previousSelectedCard);
	        	break;

	        case 13: //Enter
	        	$(".board__cursor").removeClass("board__cursor--" + playerToPlay).removeClass("board__cursor--card-" + selectedCard);
	        	$(document).off("keydown");
	        	chooseCaseView(game, gameState, selectedCard);
	        	break;

	        default: 
	        	return;
    	}
	});
}

function updateselectedCardView(playerToPlay, selectedCard, previousSelectedCard) {
	//Shift the cards
	if(previousSelectedCard != undefined) {
		var divpreviousSelectedCard = $(".card--" + playerToPlay)[4 - previousSelectedCard];
    	$(divpreviousSelectedCard).removeClass("card--selected-" + playerToPlay);
	}

    var divselectedCard = $(".card--" + playerToPlay)[4 - selectedCard];
    $(divselectedCard).addClass("card--selected-" + playerToPlay);

    //Move the cursor
    $(".board__cursor").removeClass("board__cursor--card-" + previousSelectedCard).addClass("board__cursor--card-" + selectedCard);

}

function chooseCaseView(game, gameState, selectedCard) {
	$(document).keydown(function(e) {
		switch(e.which) {
	        case 37: //Left
	        	break;

	        case 38: //Up
	        	break;

	        case 39: //Right
	        	break;

	        case 40: //Down
	        	break;

	        case 13: //Enter
	        	break;

	       	case 27: //Esc
	       		chooseCardView(game, gameState, selectedCard);
	        	break;

	        default: 
	        	return;
		}
	});
}