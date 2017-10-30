'use strict';

/**
 * The object defining the routing system. Each route is defined by a key and a method.
 * When a route is invoked, the corresponding method to the key is returned.
 * @author Jean-Gabriel Genest
 * @since 17.10.30
 * @version 17.10.30
 */
define(["./controllers/SplashScreenController",
        "./controllers/SettingsController"],
    function (SplashScreenController, SettingsController) {
        return (function () {

            /**
             * The list of routes.
             * @since 17.10.30
             */
            let routes = {
                default: SplashScreenController.splashScreen,
                settings: SettingsController.settings
            };

            return {
                /**
                 * Return the method corresponding to the given label.
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