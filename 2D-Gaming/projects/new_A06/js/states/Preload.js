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
        this.load.tilemap("level02", "assets/maps/level02.json", null, Phaser.Tilemap.TILED_JSON);
        this.load.tilemap("level03", "assets/maps/level03.json", null, Phaser.Tilemap.TILED_JSON);
        this.load.image("gameTiles", "assets/tilesets/ProjectUtumno_full.png");

        //Load specific tile images
        this.load.image('block', 'assets/ui/block.png');
        this.load.image('icon_gold', 'assets/ui/gold.png');
        this.load.spritesheet('portal', 'assets/items/blue_portal.png', 48, 48);
        this.load.spritesheet('bloodFountain', 'assets/items/blood_fountain.png', 32, 32);

        //Load player sprites
        this.load.atlas('player', 'assets/characters/hitmonchan.png', 'assets/characters/hitmonchan.json');

        //Load monster sprites
        this.load.atlas('ditto', 'assets/characters/ditto.png', 'assets/characters/ditto.json');

        //Load item sprites
        this.load.atlas('coin', 'assets/items/coin.png', 'assets/items/coin.json');

    },

    create: function () {

        console.log("State: Preload");

        //this.state.start("Map", true, false, "level01", null);
        this.state.start("Map");

    }

}