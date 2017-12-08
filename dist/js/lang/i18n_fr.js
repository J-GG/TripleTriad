'use strict';

/**
 * The french wording of the game. Overwrite default values.
 * @author Jean-Gabriel Genest
 * @since 17.11.12
 * @version 17.11.19
 */
define([cardGame.gamePath + "js/lang/i18n_en.js"], function (i18nDefault) {
    let i18nFR = {
        ONE_PLAYER: "1 joueur",
        TWO_PLAYER: "2 joueurs",
        SETTINGS: "Paramètres",
        PLAYER_1: "Joueur 1",
        PLAYER_2: "Joueur 2",
        SOUND: "Son",
        LANGUAGE: "Langue",
        DIFFICULTY: "Difficulté IA",
        EASY: "Facile",
        NORMAL: "Normal",
        HARD: "Difficile",
        ON: "Activé",
        OFF: "Désactivé",
        RULES: "Règles",
        OPEN: "Open",
        OPEN_DESCRIPTION: "Chaque joueur voit les cartes de son adversaire",
        WAR: "War",
        WAR_DESCRIPTION: "Quand le nombre d'une carte adjacente est le même et si la somme de tous les nombres de la carte de l'adversaire est plus petite, " +
        "celle-ci est retournée",
        SAME: "Same",
        SAME_DESCRIPTION: "Si les nombres d'une carte sont égaux aux nombres lui faisant face d'au moins deux cartes adjacentes, celles de l'adversaire sont retournées",
        PLUS: "Plus",
        PLUS_DESCRIPTION: "Si la somme des nombres d'au moins deux cartes faisant face à la carte jouée est égale, les cartes de l'adversaire sont retournées",
        COMBO: "Combo",
        COMBO_DESCRIPTION: "Toutes les cartes retournées par Plus ou Same peuvent retourner les cartes adjacentes suivant la rège simple",
        MENU: "Menu",
        WINS: "a gagné!",
        DRAW: "Match nul",
        WIN: "Gagné!",
        LOSE: "Perdu...",
        PLAY_AGAIN: "Voulez vous jouer une autre partie ?",
        YES: "Oui",
        NO: "Non"
    };

    return Object.assign({}, i18nDefault, i18nFR);
});