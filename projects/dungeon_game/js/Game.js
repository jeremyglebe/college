/* Program: Dungeon Game
** Author: Jeremy Glebe
** Description: A game that utilizes a tilemap. The player explores several
**     levels of dungeons and battles monsters.
** File: Game.js
** Purpose: Gameplay: objects, player, items, monsters. Its all here.
*/

//if DungeonGame exists, use it, otherwise initiate it as empty object
var DungeonGame = DungeonGame || {};

DungeonGame.Game = function () { }

DungeonGame.Game.prototype = {

    create: function () {

        //DEBUG: "this" is DungeonGame.Game
        console.log(this);

        //Create an actual tilemap object (in preload we got the json's data)
        this.map01 = this.game.add.tilemap('level01');
        //Associate a tilemap image with the object
        //param1 = tileset name in Tiled, param2 = asset key
        this.map01.addTilesetImage('tiles', 'gameTiles');

        //Create the layers from Tiled in the game
        this.backgroundlayer = this.map01.createLayer('backgroundLayer');
        this.blockedLayer = this.map01.createLayer('blockedLayer');

        //Add collision to every tile (1-) of blockedLayer
        this.map01.setCollisionBetween(1, 2506, true, 'blockedLayer');

        //Make the game world match the Tilemap layer size
        this.backgroundlayer.resizeWorld();

    }

}