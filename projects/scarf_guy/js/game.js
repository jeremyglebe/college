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
    var game = new Phaser.Game(1280, 720, Phaser.Canvas, "game");

    /***Game "Globals" (Not true globals, but availble to all game elements)***/


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