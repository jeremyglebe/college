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

        //Prepare the level to be played, add objects
        this.prepareLevel();

        //create player
        var result = TileObjects.getTiledObs('playerStart', this.map01, 'objectsLayer')

        //we know there is just one result
        this.player = this.game.add.sprite(result[0].x, result[0].y, 'player');
        this.game.physics.arcade.enable(this.player);

        //the camera will follow the player in the world
        this.game.camera.follow(this.player);

        //move player with cursor keys
        this.cursors = this.game.input.keyboard.createCursorKeys();
    },

    update: function () {

        //collision
        this.game.physics.arcade.collide(this.player, this.blockedLayer);
        this.game.physics.arcade.overlap(this.player, this.items, this.collect, null, this);
        this.game.physics.arcade.overlap(this.player, this.doors, this.enterDoor, null, this);

        //player movement
        this.player.body.velocity.y = 0;
        this.player.body.velocity.x = 0;

        if (this.cursors.up.isDown) {
            this.player.body.velocity.y -= 50;
        }
        else if (this.cursors.down.isDown) {
            this.player.body.velocity.y += 50;
        }
        if (this.cursors.left.isDown) {
            this.player.body.velocity.x -= 50;
        }
        else if (this.cursors.right.isDown) {
            this.player.body.velocity.x += 50;
        }

    },

    collect: function (player, collectable) {
        console.log('yummy!');

        //remove sprite
        collectable.destroy();
    },

    enterDoor: function (player, door) {
        console.log('entering door that will take you to ' + door.targetTilemap + ' on x:' + door.targetX + ' and y:' + door.targetY);
    },

    /* Function: prepareLevel()
    ** Desc: create all the items/doors/objects for level 1
    */
    prepareLevel: function () {

        //Generate the items
        this.items = this.game.add.group();
        this.items.enableBody = true;
        result = TileObjects.getTiledObs('item', this.map01, 'objectsLayer');
        result.forEach(function (element) {
            TileObjects.sprTiledOb(element, this.items);
        }, this);

        //Generate the doors
        this.doors = this.game.add.group();
        this.doors.enableBody = true;
        result = TileObjects.getTiledObs('door', this.map01, 'objectsLayer');

        result.forEach(function (element) {
            TileObjects.sprTiledOb(element, this.doors);
        }, this);

    }

}