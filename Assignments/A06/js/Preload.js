/* Program: A06
** Author: Jeremy Glebe
** Description: 
** File: Preload.js
** Purpose: Loading of assets and tilemaps
*/

//if A06 exists, use it, otherwise initiate it as empty object
var A06 = A06 || {};

A06.Preload = function () { };

A06.Preload.prototype = {

    preload: function () {

        //Standard loading bar stuff
        this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY + 128, 'preloadbar');
        this.preloadBar.anchor.setTo(0.5);
        this.preloadBar.scale.setTo(4,2);
        this.load.setPreloadSprite(this.preloadBar);

        //Load Tilemap stuff
        this.load.tilemap("level01", "assets/maps/level01.json", null, Phaser.Tilemap.TILED_JSON);
        this.load.image("gameTiles", "assets/tilesets/ProjectUtumno_full.png");

        //Load player sprites
        this.load.atlas('player', 'assets/hitmonchan.png', 'assets/hitmonchan.json');

        //Load item sprites

    },

    create: function () {

        this.state.start("Map", true, false, "level01", null);

    }

}