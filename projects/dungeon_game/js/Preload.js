/* Program: Dungeon Game
** Author: Jeremy Glebe
** Description: A game that utilizes a tilemap. The player explores several
**     levels of dungeons and battles monsters.
** File: Preload.js
** Purpose: Loading of assets and tilemaps
*/

//if DungeonGame exists, use it, otherwise initiate it as empty object
var DungeonGame = DungeonGame || {};

DungeonGame.Preload = function () { };

DungeonGame.Preload.prototype = {

    preload: function () {

        //Standard loading bar stuff
        this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY + 128, 'preloadbar');
        this.preloadBar.anchor.setTo(0.5);
        this.load.setPreloadSprite(this.preloadBar);

        //Load Tilemap stuff
        this.load.tilemap("level01", "assets/tilemaps/level01.json", null, Phaser.Tilemap.TILED_JSON);
        this.load.image("gameTiles", "assets/images/tiles.png");

        //Load player sprites
        this.load.image('player', 'assets/images/player.png');

        //Load item sprites
        this.load.image('skull_red', 'assets/images/greencup.png');
        this.load.image('skull_blue', 'assets/images/bluecup.png');
        this.load.image('door', 'assets/images/browndoor.png');

    },

    create: function () {

        //DEBUG: "this" is DungeonGame.Preload
        console.log(this);

        this.state.start("Game");

    }

}