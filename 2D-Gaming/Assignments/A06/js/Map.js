/* Program: A06
** Author: Jeremy Glebe
** Description: 
** File: Map.js
** Purpose: Initiates gameplay on a specific tilemap. Creates monsters, items,
**     the player, and more.
*/

//if A06 exists, use it, otherwise initiate it as empty object
var A06 = A06 || {};

A06.Map = function() { };

A06.Map.prototype = {

    //This is where state parameters are passed
    init: function(map, player) {

        this.mapName = map;
        this.player = player;

    },

    create: function() {

        console.log(this.mapName);
        // Create the tilemap object from tilemap data
        this.map = this.game.add.tilemap(this.mapName);
        console.log(this.map);
        //Associate a tileset image with the object
        //param1 = tileset name in Tiled, param2 = asset key
        this.map.addTilesetImage('tiles', 'gameTiles');
        //Create the layers from Tiled in the game (overhead is further down)
        this.mapLayers = {};
        //Create the map layers
        this.createMapLayers(this.map, "bg");
        //Make the game world match the Tilemap bottom layer's size
        this.mapLayers[this.map.layers[0].name].resizeWorld();

        //Coins for the player to grab
        this.coins = this.game.add.group();
        this.coins.enableBody = true;
        this.createCoins(30);

        //Enemy object
        this.enemies = {};
        //Group of enemies
        this.enemySprites = this.game.add.group();
        this.enemySprites.enableBody = true;
        this.createEnemies();

        //Group of transition objects
        this.transitions = this.game.add.group();
        this.transitions.enableBody = true;
        //Create transition objects
        this.createTransitions();

        //End of the game, if present
        this.endGame = this.game.add.group();
        this.endGame.enableBody = true;
        this.createEndGame();

        //Create the player
        this.createPlayer();

        //Make the camera track the player
        this.camera.follow(this.player.sprite);
        //Rounding pixels when following player causes jitters in the camera
        this.camera.roundPx = false;

        //The overhead layer should be displayed ABOVE the player, so it is
        //created AFTERWARDS
        this.createMapLayers(this.map, "fg");

    },

    update: function() {

        //If player dies
        if (this.player.health <= 0 && !this.player._moveController.stopped) {
            this.player._moveController.stopped = true;
            this.player.sprite.animations.play('die');
            this.time.events.add(5000, function() {
                this.state.start("Map", true, false, "level01", null);
            }, this);
        }

        //Move the player
        if (!this.player.knockedBack) {
            this.player.move();
        }

        //Move enemies
        this.enemies.moveAll(this.player.sprite);

        //Check for collisions with layers
        for (key in this.mapLayers) {
            var currMap = this.mapLayers[key];
            //Collisions only need to check with collision layers
            if (currMap.map.layers[currMap.index].properties.collide == "true") {
                //Player collision with layers
                this.game.physics.arcade.collide(this.player.sprite, currMap);
                //Enemy collision with layers
                this.game.physics.arcade.collide(this.enemies.sprites, currMap);
                //Coins, callback only run if on a non-blank tile
                this.game.physics.arcade.overlap(this.coins, currMap, this.clsnCoinsLayer,
                    //Additional check to make sure the overlap isn't with an empty tile
                    function(coin, tile) {
                        if (tile.index == -1) { return false; }; return true;
                    }, this);
            }
        }
        //Check for collisions with transition objects
        this.game.physics.arcade.overlap(this.player.sprite, this.transitions,
            this.clsnPlyTrans, null, this);
        //Check for collisions with enemies
        this.game.physics.arcade.overlap(this.player.sprite, this.enemies.sprites,
            this.clsnPlyEnemy, null, this);
        //Check for collision with coin
        this.game.physics.arcade.overlap(this.player.sprite, this.coins, this.clsnPlyCoin, null, this);
        //Check for collisioins with end game
        this.game.physics.arcade.overlap(this.player.sprite, this.endGame, this.clsnPlyEnd, null, this);

    },

    render: function() {

        //this.game.debug.body(this.player.sprite);
        //this.game.debug.body(this.coins);

    },

    shutdown: function() {

        //Remove the sprite from the world so it sin't destroyed
        //on state change and can be re-used
        //Thanks to https://codepen.io/lewster32/pen/XJWJde for explaining
        //how to keep sprites between states
        this.world.remove(this.player.sprite);
        this.world.remove(this.player.hud);

    },

    createCoins: function(num) {

        for (var i = 0; i < num; i++) {
            x = this.rnd.integerInRange(0, this.game.world.width);
            y = this.rnd.integerInRange(0, this.game.world.height);
            var coin = this.coins.create(x, y, 'coin');
            coin.animations.add('spin', Phaser.Animation.generateFrameNames('goldCoin', 1, 9), 5, true);
            coin.animations.play('spin');
            coin.scale.setTo(0.5);
            coin.anchor.setTo(0.5);
            coin.trys = 0;
        }

    },

    createEndGame: function() {

        //Find all objects of type "endGame"
        var result = TileObjects.getTiledObs('endGame', this.map);
        //There should be one result
        if (result[0]) {
            TileObjects.sprTiledOb(result[0], this.endGame);
        }

    },

    createEnemies: function() {

        //Generate the transitions
        result = TileObjects.getTiledObs('enemy', this.map);
        result.forEach(function(child) {

            TileObjects.sprTiledOb(child, this.enemySprites);

        }, this);

        this.enemies = new A06.EnemyManager(this.enemySprites);

    },

    createMapLayers: function(map, loc) {

        //Add collision to every tile (1-1467) of collision layer
        //this.map.setCollisionBetween(1, 1467, true, 'collision');
        for (var i = 0; i < map.layers.length; i++) {

            //If this layer is located in the correct focus (fore/background)
            if (map.layers[i].properties.location == loc) {

                //Get the layer name
                var layerName = map.layers[i].name;

                //Add the layer object for later lookup
                var l = this.map.createLayer(layerName);
                this.mapLayers[layerName] = l;

                //If this is a collision layer
                if (map.layers[i].properties.collide == "true") {
                    map.setCollisionBetween(1, 10000, true, layerName);
                }

            }

        }

    },

    createPlayer: function() {

        //If the player was passed in an "null", create a new one
        if (!this.player) {

            //Find all objects of type "plyTile"
            var plyTile = TileObjects.getTiledObs('playerStart', this.map);
            //There should be one result, use its x,y to spawn the player
            this.player = new A06.Player(plyTile[0].x, plyTile[0].y);

        }
        //If the player was passed in, there's still stuff to fix
        else {
            //We need to bring the player's sprite back into the world
            //Thanks to https://codepen.io/lewster32/pen/XJWJde for explaining
            //how to keep sprites between states
            this.game.add.existing(this.player.sprite);
            this.game.add.existing(this.player.hud);
        }

    },

    createTransitions: function() {

        //Generate the transitions
        result = TileObjects.getTiledObs('transition', this.map);
        result.forEach(function(child) {
            TileObjects.sprTiledOb(child, this.transitions);
        }, this);

        //Animate any transitions that should for
        this.transitions.forEach(function(child) {
            if (child.animated) {
                if (child.frameRate) {
                    child.animations.add('anim', null, frameRate, true);
                } else {
                    child.animations.add('anim', null, 5, true);
                }
                child.animations.play('anim');
            }
        }, this);

    },

    clsnCoinsLayer: function(coin, tile) {

        console.log("Coin collided with non-negative index tile");
        //console.log(tile.index + "Failed to place coin object!")
        var x = this.rnd.integerInRange(0, this.game.world.width);
        var y = this.rnd.integerInRange(0, this.game.world.height);
        coin.body.x = x;
        coin.body.y = y;

    },

    clsnPlyCoin: function(ply, coin) {
        ply.player.collectCoin(coin);
    },

    clsnPlyEnd: function(ply, end) {
        ply.player._moveController.stopped = true;
        var wintext = this.game.add.text(0.37*this.game.width, this.game.height / 2, "YOU WIN!");
        wintext.fixedToCamera = true;
        wintext.fill = '#ffffff';
        this.time.events.add(5000, function() {
            this.state.start("Map", true, false, "level01", null);
        }, this);
    },

    clsnPlyEnemy: function(ply, enemy) {

        ply.player.setHealth(ply.player.health - 10);
        ply.player.knockedBack = true;
        this.time.events.add(250, function() {
            ply.player.knockedBack = false;
        }, this);
        if (enemy.body.x > ply.body.x + 2) { ply.body.velocity.x = -100; }
        else if (enemy.body.x < ply.body.x - 2) { ply.body.velocity.x = 100 }
        if (enemy.body.y > ply.body.y + 2) { ply.body.velocity.y = -100; }
        else if (enemy.body.y < ply.body.y - 2) { ply.body.velocity.y = 100 }

    },

    clsnPlyTrans: function(ply, trans) {

        if (trans.targetMap == "same") {

            //If the target map is the same, we're just moving
            ply.x = trans.targetX;
            ply.y = trans.targetY;

        } else {

            //Otherwise we need to change states
            //First set the player's x and y
            ply.x = trans.targetX;
            ply.y = trans.targetY;
            //Then transition to the new map
            this.state.start("Map", true, false, trans.targetMap, ply.player);

        }

    }

}