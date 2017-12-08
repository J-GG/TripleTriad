# TripleTriad

Triple Triad is a mini card game released along Final Fantasy VIII where two players fight with cards on a 3X3 board. Various rules can be enabled to make the game more or less complex.
## The Game

| <img src="https://preview.ibb.co/iPkb56/splashscreen.png" width="200" />  | <img src="https://preview.ibb.co/gvW5yR/game.png" width="200"/> | <img src="https://preview.ibb.co/gn2pQ6/game1.png" width="200" /> | <img src="https://preview.ibb.co/jxrik6/settings.png" width="200" />
| :---:  | :---:  | :---:  | :---:  |
| *Main menu*  | *Game against the AI*  | *PvP* | *Settings*

This version of the game uses the same graphics as the original one to which the gameplay has been changed to make it more suitable to a standalone game.  

**Demo** - https://triple-triad.000webhostapp.com

### Controls

The game can be played with either a mouse or a keyboard.

* <kbd>↑</kbd> , <kbd>↓</kbd> , <kbd>←</kbd> , <kbd>→</kbd> - Move the cursor
* <kbd>Enter</kbd> - Validate
* <kbd>Esc</kbd> - Cancel

### Cards

A Triple Triad card is a card with four numbers on its top, left, right and bottom sides.  
Blue cards belong to the first player and red cards to the second one.
### Rules

The purpose of each player is to own as many cards of their color as they can at the end of the game. Basically, a player takes (flips) the opponent's card by playing a card with a higher number on the side facing the opponent's card.

However, more rules can be enabled in the settings:  
* **Open** - Each player can see the opponent's cards.
* **War** - When the number of an adjacent card matches, if the sum of all the numbers of the opponent's card is smaller, then it is flipped.
* **Same** - If the numbers of a card equal to the numbers of two or more adjacent cards of the opponent, they will be flipped.
* **Plus** - If a card is placed down that adds up to the same value on two or more adjacent cards of the opponent, those cards are flipped.
* **Combo** - All cards which were turned over by the Same or Plus rule can turn over surrounding opponent's cards if the former have a greater value.

## Development

### Stack

* HTML/CSS/Javascript (ES6)
* [jquery](https://jquery.com)
* [RequireJS](http://requirejs.org)
* [Handlebars](http://handlebarsjs.com)
* [npm](https://www.npmjs.com)
* [Gulp](https://gulpjs.com)
* [BEM](http://getbem.com)

### Key features

* **Client-side only** - two players share the same computer
* **MVC architecture**
* **Responsive design** - adapts perfectly to the container
* **Embeddable** - designed to be embedded in another website
* **Multi-languages** - English and French are currently supported

## Installation

* Clone the repository
```
git clone https://github.com/J-GG/TripleTriad.git
```
* Install the dependencies with npm
```
npm install
```
* Install and run a local server
```
npm install -g http-server
http-server
```
* Open **dist/index.html** to start the game

<br />

* To rebuild the entire **dist** folder for production (minified files), launch this gulp task
```
gulp build-prod
```
* To rebuild the entire **dist** folder for development (**not** minified files), launch this gulp task
```
gulp build-dev
```
* For development purpose, run the watcher to update the **dist** folder in real time
```
gulp watch
```