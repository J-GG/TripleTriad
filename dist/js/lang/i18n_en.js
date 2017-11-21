'use strict';

/**
 * The english (and default) wording of the game.
 * @author Jean-Gabriel Genest
 * @since 17.11.12
 * @version 17.11.19
 */
define([], function () {
    return {
        ONE_PLAYER: "1 player",
        TWO_PLAYER: "2 players",
        SETTINGS: "Settings",
        PLAYER_1: "Player 1",
        PLAYER_2: "Player 2",
        SOUND: "Sound",
        LANGUAGE: "Language",
        DIFFICULTY: "AI difficulty",
        EASY: "Easy",
        NORMAL: "Normal",
        HARD: "Hard",
        ON: "ON",
        OFF: "OFF",
        RULES: "Rules",
        OPEN: "Open",
        OPEN_DESCRIPTION: "Each player can see the opponent's cards",
        WAR: "War",
        WAR_DESCRIPTION: "When the number of an adjacent card matches, if the sum of all the numbers of the opponent's card is smaller, then it is flipped",
        SAME: "Same",
        SAME_DESCRIPTION: "If the numbers of a card equal to the numbers of two or more adjacent cards of the opponent, they will be flipped",
        PLUS: "Plus",
        PLUS_DESCRIPTION: "If a card is placed down that adds up to the same value on two or more adjacent cards of the opponent, those cards are flipped",
        COMBO: "Combo",
        COMBO_DESCRIPTION: "All cards which were turned over by the Same or Plus rule can turn over surrounding opponent's cards if the former have a greater value",
        MENU: "Menu",
        WINS: "Wins",
        DRAW: "Draw",
        WIN: "You Win",
        LOSE: "You Lose",
        PLAY_AGAIN: "Do you want to play again?",
        YES: "Yes",
        NO: "No"
    };
});