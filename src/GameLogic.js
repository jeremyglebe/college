export class GameLogic extends Phaser.Events.EventEmitter {
    constructor(tile_map, height_map, spawn_map){
        super();
        /** @type {number[][]} map which sets the type of tile based on id */
        this.tile_map = tile_map;
        /** @type {number[][]} map which sets the height of every tile */
        this.height_map = height_map;
        /** @type {string[][]} map which determines where objects spawn */
        this.spawn_map = spawn_map;
        /** @type {any[][]} map which tracks objects and locations */
        this.object_map = this.createObjectMap();
    }

    /**
     * Creates a new object map using the spawn locations from the spawn map
     * @returns {any[][]} Newly generated object map based on spawns
     */
    createObjectMap(){
        map = [];
        for(let r = 0; r < this.spawn_map.length; r++){
            map.push([]);
            for(let c = 0; c < this.spawn_map[r].length; c++){
                map[r].push(null);
            }
        }
        return map;
    }
}