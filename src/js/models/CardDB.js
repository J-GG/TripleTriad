'use strict';

/**
 * Simulate a database of cards.
 * @author Jean-Gabriel Genest
 * @since 17.10.22
 * @version 17.12.07
 */
define([cardGame.gamePath + "js/models/Card.js"], function (Card) {
    return class CardDB {

        /**
         * Initialize all the available cards.
         * @since 17.10.22
         */
        static initDB() {
            this.cardList = [];

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

            /* Level 6 */
            this.cardList.push(new Card("Fujin, Raijin", 6, 2, 8, 8, 4));
            this.cardList.push(new Card("Elvoret", 6, 7, 8, 3, 4));
            this.cardList.push(new Card("X-ATM092", 6, 4, 8, 7, 3));
            this.cardList.push(new Card("Granaldo", 6, 7, 2, 8, 5));
            this.cardList.push(new Card("Gerogero", 6, 1, 8, 8, 3));
            this.cardList.push(new Card("Iguion", 6, 8, 2, 8, 2));
            this.cardList.push(new Card("Abadon", 6, 6, 8, 4, 5));
            this.cardList.push(new Card("Trauma", 6, 4, 8, 5, 6));
            this.cardList.push(new Card("Oilboyle", 6, 1, 8, 4, 8));
            this.cardList.push(new Card("Shumi Tribe", 6, 6, 5, 8, 4));
            this.cardList.push(new Card("Krysta", 6, 7, 5, 8, 1));

            /* Level 7 */
            this.cardList.push(new Card("Propagator", 7, 8, 4, 4, 8));
            this.cardList.push(new Card("Jumbo Cactuar", 7, 8, 8, 4, 4));
            this.cardList.push(new Card("Tri-Point", 7, 8, 5, 2, 8));
            this.cardList.push(new Card("Gargantua", 7, 5, 6, 6, 8));
            this.cardList.push(new Card("Mobile Type 8", 7, 8, 6, 7, 3));
            this.cardList.push(new Card("Sphinxara", 7, 8, 3, 5, 8));
            this.cardList.push(new Card("Tiamat", 7, 8, 8, 5, 4));
            this.cardList.push(new Card("BGH251F2", 7, 5, 7, 8, 5));
            this.cardList.push(new Card("Red Giant", 7, 6, 8, 4, 7));
            this.cardList.push(new Card("Catoblepas", 7, 1, 8, 7, 7));
            this.cardList.push(new Card("Ultima Weapon", 7, 7, 7, 2, 8));

            /* Level 8 */
            this.cardList.push(new Card("Chubby Chocobo", 8, 4, 4, 8, 9));
            this.cardList.push(new Card("Angelo", 8, 9, 6, 7, 3));
            this.cardList.push(new Card("Gilgamesh", 8, 3, 7, 9, 6));
            this.cardList.push(new Card("Mini Mog", 8, 9, 3, 9, 2));
            this.cardList.push(new Card("Chicobo", 8, 9, 4, 8, 4));
            this.cardList.push(new Card("Quezacotl", 8, 2, 9, 9, 4));
            this.cardList.push(new Card("Shiva", 8, 6, 7, 4, 9));
            this.cardList.push(new Card("Ifrit", 8, 9, 6, 2, 8));
            this.cardList.push(new Card("Siren", 8, 8, 9, 6, 2));
            this.cardList.push(new Card("Sacred", 8, 5, 1, 9, 9));
            this.cardList.push(new Card("Minotaur", 8, 9, 5, 2, 9));

            /* Level 9 */
            this.cardList.push(new Card("Carbuncle", 9, 8, 4, 10, 4));
            this.cardList.push(new Card("Diablos", 9, 5, 10, 8, 3));
            this.cardList.push(new Card("Leviathan", 9, 7, 10, 1, 7));
            this.cardList.push(new Card("Odin", 9, 8, 10, 3, 5));
            this.cardList.push(new Card("Pandemona", 9, 10, 1, 7, 7));
            this.cardList.push(new Card("Cerberus", 9, 7, 4, 6, 10));
            this.cardList.push(new Card("Alexander", 9, 9, 10, 4, 2));
            this.cardList.push(new Card("Phoenix", 9, 7, 2, 7, 10));
            this.cardList.push(new Card("Bahamut", 9, 10, 8, 2, 6));
            this.cardList.push(new Card("Doomtrain", 9, 3, 1, 10, 10));
            this.cardList.push(new Card("Eden", 9, 4, 4, 9, 10));

            /* Level 10 */
            this.cardList.push(new Card("Ward", 10, 10, 7, 2, 8));
            this.cardList.push(new Card("Kiros", 10, 6, 7, 6, 10));
            this.cardList.push(new Card("Laguna", 10, 5, 10, 3, 9));
            this.cardList.push(new Card("Selphie", 10, 10, 8, 6, 4));
            this.cardList.push(new Card("Quistis", 10, 9, 6, 10, 2));
            this.cardList.push(new Card("Irvine", 10, 2, 6, 9, 10));
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