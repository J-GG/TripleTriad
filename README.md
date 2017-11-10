# TripleTriad

Triple Triad is a mini card game released along Final Fantasy VIII where two players fight with cards on a 3X3 board. Various rules can be enabled to make the game more or less complex. The player collects cards to improve their deck as they progress in the game.

## Presentation

This version of the game uses the same graphics as the original one to which I changed the gameplay to make it more suitable to a standalone game.

**Demo** - http://cardgame.hebergratuit.net/dist/

### Controls

The game can only be played with a keyboard.

* <kbd>↑</kbd> , <kbd>↓</kbd>, <kbd>←</kbd> , <kbd>→</kbd> - Move the cursor
* <kbd>Enter</kbd> - Validate
* <kbd>Esc</kbd> - Cancel

### Cards

A Triple Triad card is a card with four numbers on its top, left, right and bottom sides.  
Blue cards belong to the first player and red cards to the second one. The purpose of each player is to own as many cards of their color as they can at the end of the game. According to the basic rule, a player takes (flips) the opponent's card by playing a card with a higher number on the side facing the opponent's card.

### Rules

There are more rules which can be enabled in the settings:  
* **Open** - Each player can see the opponent's cards.
* **War** - When the number of an adjacent card matches, if the sum of all the numbers of the opponent's card is smaller, then it is flipped.
* **Same** - If the numbers of a card equal to the numbers of two or more adjacent cards of the opponent, they will be flipped.
* **Plus** - If a card is placed down that adds up to the same value on two or more adjacent cards of the opponent, those cards are flipped.
* **Combo** - All cards which were turned over by the Same or Plus rule can turn over surrounding opponent's cards if the former have a greater value.

## Installing

* Clone the repository
```
git clone https://github.com/J-GG/TripleTriad.git
```
* Open **dist/index.html** to start the game

<br />

* To rebuild the entire **dist** folder, use this gulp task
```
gulp build
```
* For development purpose, use the watcher to update the **dist** folder in real time
```
gulp dev
```
