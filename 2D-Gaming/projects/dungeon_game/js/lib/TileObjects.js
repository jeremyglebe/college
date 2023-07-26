/* TileObjects.js
** Author: Jeremy Glebe
** Credit: Pablo Farias Navarro (Author of tutorial from which this was made)
**(https://gamedevacademy.org/html5-phaser-tutorial-top-down-games-with-tiled/)
** Description: This file contains functions that serve as an alternative to
**     the standard Phaser 2 methods for creating sprites from Tilemap tiles
**     and objects. It requires that objects in the tilemap contain the
**     properties "type" and "sprite" (case-sensitive).
*/

TileObjects = {

    /* Function: getTiledObs()
    ** Desc: Gets the objects of a specified type from the tilemap.
    ** Params:
    **     type: The "type" property given to the object in Tiled
    **     map: The tilemap object to search
    **     layer: which layer of the tilemap should be searched
    ** Returns: array of objects from Tiled
    */
    getTiledObs: function (type, map, layer) {
        //We will return an array of objects
        var arr = new Array();
        //Tilemaps have a property objects, which stores all objects in
        //key-value pairs with the object layer as the key.
        map.objects[layer].forEach(function (object) {
            if (object.properties.type === type) {
                //Phaser y=0 is top, but Tiled is bottom
                object.y -= map.tileHeight;
                arr.push(object);
            }
        });
        return arr;
    },

    /* Function: sprTiledOb()
    ** Desc: Creates a sprite based on a Tiled object
    ** Params:
    **     object: the tiled object to make the sprite from
    **     group: the group to put that sprite in
    */
    sprTiledOb: function (object, group = null) {
        if (group) {
            var sprite = group.create(object.x, object.y, object.properties.sprite);
        } else {
            var sprite = this.game.add.sprite(object.x, object.y, object.properties.sprite);
        }

        //Copy all properties to the sprite
        Object.keys(object.properties).forEach(function (key) {
            sprite[key] = object.properties[key];
        });
    }

}