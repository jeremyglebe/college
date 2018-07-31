/* Program: A06
** Author: Jeremy Glebe
** Description: 
** File: Map.js
** Purpose: Initiates gameplay on a specific tilemap. Creates monsters, items,
**     the player, and more.
*/

//if A06 exists, use it, otherwise initiate it as empty object
var A06 = A06 || {};

A06.Map = function () { };

A06.Map.prototype = {

    //This is where state parameters are passed
    init: function (map, player) {

        this.mapName = map;
        this.player = player;

    },

    create: function () {

        // Create the tilemap object from tilemap data
        this.map = this.game.add.tilemap(this.mapName);
        //Associate a tileset image with the object
        //param1 = tileset name in Tiled, param2 = asset key
        this.map.addTilesetImage('tiles', 'gameTiles');
        //Create the layers from Tiled in the game (overhead is further down)
        this.mapLayers = {};
        this.createMapLayers(this.map, "bg");
        //Make the game world match the Tilemap bottom layer's size
        this.mapLayers[this.map.layers[0].name].resizeWorld();

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

    update: function () {

        this.player.move();

    },

    createMapLayers: function (map, loc) {

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
                if (map.layers[i].collide == "true") {
                    map.setCollisioniBetween(1, 10000, true, layerName);
                }

            }

        }

    },

    createPlayer: function(){

        //If the player was passed in an "null", create a new one
        if (!this.player) {

            //Find all objects of type "plyTile"
            var plyTile = TileObjects.getTiledObs('playerStart', this.map);
            //There should be one result, use its x,y to spawn the player
            this.player = new A06.Player(plyTile[0].x, plyTile[0].y);

        }

    }

}