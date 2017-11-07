'use strict';

/**
 * The object defining the routing system. Each route is defined by a key and a method.
 * When a route is invoked, the corresponding method to the key is returned.
 * @author Jean-Gabriel Genest
 * @since 17.10.30
 * @version 17.11.01
 */
define(["../controllers/SplashScreenController",
        "../controllers/SettingsController",
        "../controllers/GameController",
        "../controllers/FinalScreenController"],
    function (SplashScreenController, SettingsController, GameController, FinalScreenController) {
        return (function () {

            /**
             * The list of routes.
             * @since 17.10.30
             */
            let routes = {
                default: SplashScreenController.splashScreen,
                splashScreen: SplashScreenController.splashScreen,
                settings: SettingsController.settings,
                play: GameController.play,
                startGame: GameController.startGame,
                playCard: GameController.playCard,
                endTurn: GameController.endTurn,
                finalScreen: FinalScreenController.finalScreen
            };

            return {
                /**
                 * Return the method corresponding to the given key.
                 * @param key The key of the route
                 * @returns {*} The method corresponding to the key
                 * @since 17.10.30
                 */
                get(key) {
                    let method = routes[key] ? routes[key] : routes["default"];
                    logger.debug("Routing [key: " + key + "] to [method: " + method.name + "]");

                    return method;
                }
            }
        })();
    });