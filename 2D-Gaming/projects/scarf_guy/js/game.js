/* Game: Scarf Guy!
** Description: Game where scarf guy collects things.
** Author: Jeremy Glebe
** File: game.js
** Purpose: Sets up globals, the game object, and game states
*/

/***GLOBALS***/


window.onload = main();
function main() {
    /***Game Object***/
    var game = new Phaser.Game(800, 600, Phaser.Canvas, "game");

    /***Game "Globals" (Not true globals, but availble to all game elements)***/
    //(Use G_ to distinguish from true globals)
    game.global = {
        // The overall game score (unused)
        G_SCORE: 0,
        // Is it okay to scale the display?
        G_SCALABLE: true
    };

    /***Game States***/
    game.state.add("boot", boot);
    game.state.add("preload", preload);
    game.state.add("mainMenu", mainMenu);
    game.state.add("level01", level01)
    game.state.start("boot");
}

/***Global Functions***/

/* Function: rint()
** Description: Random integer, [0,n)
*/
function rint(n) { return Math.floor(Math.random() * Math.floor(n)); }