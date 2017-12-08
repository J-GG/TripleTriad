'use strict';

/**
 * The object defining the routing system. Each route is defined by a key and a method.
 * When a route is invoked, the corresponding method to the key is returned.
 * @author Jean-Gabriel Genest
 * @since 17.10.30
 * @version 17.11.12
 */
define([cardGame.gamePath + "js/controllers/SplashScreenController.js",
        cardGame.gamePath + "js/controllers/SettingsController.js",
        cardGame.gamePath + "js/controllers/GameController.js",
        cardGame.gamePath + "js/controllers/FinalScreenController.js"],
    function (SplashScreenController, SettingsController, GameController, FinalScreenController) {
        return (function () {

            /**
             * The list of keys.
             * @since 17.11.10
             */
            let keys = {
                DEFAULT: 0,
                SPLASH_SCREEN: 1,
                SETTINGS: 2,
                PLAY: 3,
                START_GAME: 4,
                PLAYER_PLAYS_CARD: 5,
                END_TURN: 6,
                FINAL_SCREEN: 7,
                AI_PLAYS_CARD: 8
            };

            /**
             * The list of routes.
             * @since 17.10.30
             */
            let routes = {
                [keys.DEFAULT]: SplashScreenController.splashScreen,
                [keys.SPLASH_SCREEN]: SplashScreenController.splashScreen,
                [keys.SETTINGS]: SettingsController.settings,
                [keys.PLAY]: GameController.play,
                [keys.START_GAME]: GameController.startGame,
                [keys.PLAYER_PLAYS_CARD]: GameController.playerPlaysCard,
                [keys.AI_PLAYS_CARD]: GameController.AIPlaysCard,
                [keys.END_TURN]: GameController.endTurn,
                [keys.FINAL_SCREEN]: FinalScreenController.finalScreen
            };

            return {

                /**
                 * Return the list of keys.
                 * @returns {*} The list of keys
                 * @since 17.11.10
                 */
                getKeys() {
                    return keys;
                },

                /**
                 * Return the method corresponding to the given key.
                 * @param key The key of the route
                 * @returns {*} The method corresponding to the key
                 * @since 17.10.30
                 */
                get(key) {
                    let method = routes[key] ? routes[key] : routes[keys.DEFAULT];
                    logger.debug("Routing [key: " + key + "] to [method: " + method.name + "]");

                    return method;
                }
            }
        })();
    });