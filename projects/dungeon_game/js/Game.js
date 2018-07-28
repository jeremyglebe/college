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

        //Add collision to every tile (1-2506) of blockedLayer
        this.map01.setCollisionBetween(1, 2506, true, 'blockedLayer');

        //Make the game world match the Tilemap layer size
        this.backgroundlayer.resizeWorld();

        //Prepare the level to be played, add objects
        this.prepareLevel();

        //create player
        var result = TileObjects.getTiledObs('playerStart', this.map01, 'objectsLayer')
        //we know there is just one result
        this.player = this.game.add.sprite(result[0].x, result[0].y + 10, 'player');

        //Animations
        this.player.animations.add('sIdle', [0], 0, true);
        this.player.animations.add('nIdle', [8], 0, true);
        this.player.animations.add('wIdle', [16], 0, true)
        this.player.animations.add('eIdle', [24], 0, true)
        this.player.animations.add('sWalk', [2, 3, 4], 5, true);
        this.player.animations.add('nWalk', [10, 11, 12], 5, true);
        this.player.animations.add('wWalk', [18, 19, 20], 5, true);
        this.player.animations.add('eWalk', [26, 27, 28], 5, true);

        //Resizes the player image
        this.player.scale.setTo(0.75);
        //Set the player's origin to the middle of his feet
        this.player.anchor.setTo(0.5, 0.8);
        //Enables a physics body for the player
        this.game.physics.arcade.enable(this.player);
        //Changes the physics (collision) body of the player
        this.player.body.setSize(20, 20, 0, 0);

        //Setting up player movement
        this.player.moveConfig = {
            sprite: this.player,
            //controls
            nKey: this.game.input.keyboard.addKey(Phaser.Keyboard.W),
            sKey: this.game.input.keyboard.addKey(Phaser.Keyboard.S),
            wKey: this.game.input.keyboard.addKey(Phaser.Keyboard.A),
            eKey: this.game.input.keyboard.addKey(Phaser.Keyboard.D),
            //animations
            speed: 30,
            nAnim: 'nWalk',
            sAnim: 'sWalk',
            wAnim: 'wWalk',
            eAnim: 'eWalk',
            fnAnim: 'nIdle',
            fsAnim: 'sIdle',
            fwAnim: 'wIdle',
            feAnim: 'eIdle'
        }
        this.player.walk = new Move8(this.player.moveConfig);

        //the camera will follow the player in the world
        this.game.camera.follow(this.player);
    },

    update: function () {

        //collision
        this.game.physics.arcade.collide(this.player, this.blockedLayer);
        this.game.physics.arcade.overlap(this.player, this.items, this.collect, null, this);
        this.game.physics.arcade.overlap(this.player, this.doors, this.enterDoor, null, this);

        //player movement
        this.player.walk.move();

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

        //Resize the game (not the window, or the world)
        this.game.scale.setGameSize(200, 150);

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

    },



    render: function () {

        //this.game.debug.body(this.player);

    }

}