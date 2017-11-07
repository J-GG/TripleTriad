'uset strict';

/**
 * Simulate a database of cards.
 * @author Jean-Gabriel Genest
 * @since 17.10.22
 * @version 17.10.22
 */
define(["js/models/Card"], function (Card) {
    return class CardDB {

        /**
         * Initialize all the available cards.
         * @since 17.10.22
         */
        static initDB() {
            this.cardList = [];
            /* Non official */
            this.cardList.push(new Card("Dogememe", 1, 2, 2, 2, 2));
            this.cardList.push(new Card("Blogging Shiba", 1, 4, 2, 4, 10));
            this.cardList.push(new Card("Pandaminator", 1, 3, 3, 5, 2));

            /* Level 1 */
            this.cardList.push(new Card("Bite Bug", 1, 1, 3, 3, 5));
            this.cardList.push(new Card("Funguar", 1, 5, 1, 1, 3));
            this.cardList.push(new Card("Geezard", 1, 1, 4, 1, 5));
            this.cardList.push(new Card("Redbat", 1, 6, 1, 1, 2));
            this.cardList.push(new Card("Blobra", 1, 2, 3, 1, 5));
            this.cardList.push(new Card("Gayla", 1, 2, 1, 4, 4));
            this.cardList.push(new Card("Gesper", 1, 1, 5, 4, 1));
            this.cardList.push(new Card("Fastitocalon-F", 1, 3, 5, 2, 1));
            this.cardList.push(new Card("Blood Soul", 1, 2, 1, 6, 1));
            this.cardList.push(new Card("Caterchipillar", 1, 4, 2, 4, 3));
            this.cardList.push(new Card("Cockatrice", 1, 2, 1, 2, 6));

            /* Level 2 */
            this.cardList.push(new Card("Grat", 2, 7, 1, 3, 1));
            this.cardList.push(new Card("Buel", 2, 6, 2, 2, 3));
            this.cardList.push(new Card("Mesmerize", 2, 5, 3, 3, 4));
            this.cardList.push(new Card("Glacial Eye", 2, 6, 1, 4, 3));
            this.cardList.push(new Card("Bellhelmel", 2, 3, 4, 5, 3));
            this.cardList.push(new Card("Thrustaevis", 2, 5, 3, 2, 5));
            this.cardList.push(new Card("Anacondaur", 2, 5, 1, 3, 5));
            this.cardList.push(new Card("Creeps", 2, 5, 2, 5, 2));
            this.cardList.push(new Card("Grendel", 2, 4, 4, 5, 2));
            this.cardList.push(new Card("Jelleye", 2, 3, 2, 1, 7));
            this.cardList.push(new Card("Grand Mantis", 2, 5, 2, 5, 3));

            /* Level 3 */
            this.cardList.push(new Card("Forbidden", 3, 6, 6, 3, 2));
            this.cardList.push(new Card("Armadodo", 3, 6, 3, 1, 6));
            this.cardList.push(new Card("Tri-Face", 3, 3, 5, 5, 5));
            this.cardList.push(new Card("Fastitocalon", 3, 7, 5, 1, 3));
            this.cardList.push(new Card("Snow Lion", 3, 7, 1, 5, 3));
            this.cardList.push(new Card("Ochu", 3, 5, 6, 3, 3));
            this.cardList.push(new Card("SAM08G", 3, 5, 6, 2, 4));
            this.cardList.push(new Card("Death Claw", 3, 4, 4, 7, 2));
            this.cardList.push(new Card("Cactuar", 3, 6, 2, 6, 3));
            this.cardList.push(new Card("Tonberry", 3, 3, 6, 4, 4));
            this.cardList.push(new Card("Abyss Worm", 3, 7, 2, 3, 5));

            /* Level 4 */
            this.cardList.push(new Card("Turtapod", 4, 2, 3, 6, 7));
            this.cardList.push(new Card("Vysage", 4, 6, 5, 4, 5));
            this.cardList.push(new Card("T-Rexaur", 4, 4, 6, 2, 7));
            this.cardList.push(new Card("Bomb", 4, 2, 7, 6, 3));
            this.cardList.push(new Card("Blitz", 4, 1, 6, 4, 7));
            this.cardList.push(new Card("Wendingo", 4, 7, 3, 1, 6));
            this.cardList.push(new Card("Torama", 4, 7, 4, 4, 4));
            this.cardList.push(new Card("Imp", 4, 3, 7, 3, 6));
            this.cardList.push(new Card("Blue Dragon", 4, 6, 2, 7, 3));
            this.cardList.push(new Card("Adamantoise", 4, 4, 5, 5, 6));
            this.cardList.push(new Card("Hexadragon", 4, 7, 5, 4, 3));

            /* Level 5 */
            this.cardList.push(new Card("Iron Giant", 5, 6, 5, 6, 5));
            this.cardList.push(new Card("Behemoth", 5, 3, 6, 5, 7));
            this.cardList.push(new Card("Chimera", 5, 7, 6, 5, 3));
            this.cardList.push(new Card("Pupu", 5, 3, 10, 2, 1));
            this.cardList.push(new Card("Elastoid", 5, 6, 2, 6, 7));
            this.cardList.push(new Card("GIM47N", 5, 5, 5, 7, 4));
            this.cardList.push(new Card("Malboro", 5, 7, 7, 4, 2));
            this.cardList.push(new Card("Ruby Dragon", 5, 7, 2, 7, 4));
            this.cardList.push(new Card("Elnoyle", 5, 5, 3, 7, 6));
            this.cardList.push(new Card("Tonberry King", 5, 4, 6, 7, 4));
            this.cardList.push(new Card("Biggs, Wedge", 5, 6, 6, 2, 7));
            
            /* Level 10 */
            this.cardList.push(new Card("Zell", 10, 8, 5, 10, 6));
            this.cardList.push(new Card("Rinoa", 10, 4, 10, 2, 10));
            this.cardList.push(new Card("Edea", 10, 10, 10, 3, 3));
            this.cardList.push(new Card("Seifer", 10, 6, 9, 10, 4));
            this.cardList.push(new Card("Squall", 10, 10, 4, 6, 9));

            this.LEVEL_MAX = 10;
        }

        /**
         * Get an array of cards based on a weighted random selection. The weight if based on the level of the cards.
         * @param number The number of returned cards.
         * @returns {Array} An array of Card randomly selected
         * @since 17.10.22
         */
        static getRandomCards(number) {
            if (number < 0) {
                logger.warning("The number of cards should be greater than 0 but " + number + " found");
            }
            if (this.cardList === undefined) {
                this.initDB();
            }

            //The total weight of the cards is computed
            let sum = 0;
            for (let i = 0; i < this.cardList.length; i++) {
                sum += this.LEVEL_MAX + 1 - this.cardList[i].getLevel();
            }

            let cards = [];

            draw_card:
                for (let i = 0; i < number; i++) {
                    let randomNumber = Math.floor(Math.random() * (sum + 1));
                    let seek = 0;
                    for (let j = 0; j < this.cardList.length; j++) {
                        let card = this.cardList[j];
                        if (randomNumber <= seek + this.LEVEL_MAX + 1 - this.cardList[j].getLevel()) {
                            cards.push(new Card(card.getName(), card.getLevel(), card.getUp(), card.getRight(), card.getDown(), card.getLeft()));
                            continue draw_card;
                        }

                        seek += this.LEVEL_MAX + 1 - this.cardList[j].getLevel();
                    }

                    logger.error("No card has been drawn [Sum of weights : " + sum + "; random number : " + randomNumber + "]");
                }

            return cards;
        }
    }
});