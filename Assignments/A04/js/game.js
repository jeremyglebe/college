/* Program: Assignment 04 - Falling game
** Description: A guy with wings can't fly b/c he sucks now he has to shoot
**     obstacles and try to score points.
** Author: Jeremy Glebe
** File: game.js
** Purpose: Sets up globals, the game object, and game states
*/

window.onload = main();
function main() {
    /***Game Object***/
    var game = new Phaser.Game(600, 800, Phaser.Canvas, "game");

    /***Game Globals***/
    game.global = {
        SCORE: 0,
        CAN_CLICK: true
    }

    /***Game States***/
    game.state.add("boot", boot);
    game.state.add("preload", preload);
    game.state.add("menu", menu);
    game.state.add("play", play)

    game.state.start("boot");
}

/***Global Functions***/

/* Function: rint()
** Description: Random integer, [0,n)
*/
function rint(n) { return Math.floor(Math.random() * Math.floor(n)); }