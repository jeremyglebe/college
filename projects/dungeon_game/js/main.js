/* Program: Dungeon Game
** Author: Jeremy Glebe
** Description: A game that utilizes a tilemap. The player explores several
**     levels of dungeons and battles monsters.
** File: main.js
** Purpose: Creates the global object for the program as a whole, as well as
**     creating a Phaser game object as a child of that global object.
*/

//if DungeonGame exists, use it, otherwise initiate it as empty object
var DungeonGame = DungeonGame || {};
 
DungeonGame.game = new Phaser.Game(160, 160, Phaser.AUTO, '');
 
DungeonGame.game.state.add('Boot', DungeonGame.Boot);
DungeonGame.game.state.add('Preload', DungeonGame.Preload);
DungeonGame.game.state.add('Game', DungeonGame.Game);
 
DungeonGame.game.state.start('Boot');