'use strict';

/**
 * The minimal code for all views.
 * @author Jean-Gabriel Genest
 * @since 17.11.01
 * @version 17.11.18
 */
define([cardGame.gamePath + "js/toolbox/Key.js"], function (Key) {
    return {
        initViews(){
            let sizeRatio = 1.66;
            let fontRatioWidth = 33;
            let fontRatioHeight = 19;
            let $gameArea = cardGame.$container.find(".board__game-area");

            /**
             * Determine the size of the game area based on its container.
             */
            function gameSize() {
                if (cardGame.$container.width() >= cardGame.$container.height() * sizeRatio) {
                    $gameArea.css({
                        height: cardGame.$container.height(),
                        width: cardGame.$container.height() * sizeRatio
                    });
                } else {
                    $gameArea.css({
                        height: cardGame.$container.width() / sizeRatio,
                        width: cardGame.$container.width()
                    });
                }
            }

            /**
             * Determine the size of the font based on the container of the game.
             */
            function fontSize() {
                if (cardGame.$container.width() >= cardGame.$container.height() * sizeRatio) {
                    cardGame.$container.find(".board").css("font-size", cardGame.$container.height() / fontRatioHeight + "px");
                } else {
                    cardGame.$container.find(".board").css("font-size", cardGame.$container.width() / fontRatioWidth + "px");
                }
            }

            gameSize();
            fontSize();

            /**
             * Resize the game area and the fonts when the window is resized
             */
            $(window).resize(function () {
                gameSize();
                fontSize();
            });

            /**
             * Disable/enable scroll with up and down keys when the game has the focus/loses focus
             */
            $(cardGame.$container).find(".board").focus(function () {
                document.onkeydown = function (e) {
                    if (e.keyCode === Key.UP || e.keyCode === Key.DOWN || e.keyCode === Key.RIGHT || e.keyCode === Key.LEFT) {
                        e.preventDefault();
                    }
                };
            });
            $(cardGame.$container).find(".board").blur(function () {
                document.onkeydown = null;
            });
        }
    }
});