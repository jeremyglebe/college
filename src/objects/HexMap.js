/**
 * Interface which defines the properties of the configuration object for the hex map
 * @typedef IHexMapConfig
 * @type {object}
 * @property {number} height - Number of rows in the map
 * @property {number} width - Number of columns in the map
 * @property {number} hex_width - Width in pixels hexagon sprites should occupy
 * @property {number} hex_height - Height in pixels hexagon sprites should occupy
 * @property {number} odd_x_offset - Distance odd rows should be offset on the x axis in pixels
 */

export class HexMap {
    /**
     * @param {Phaser.Scene} scene Scene that the map should be rendered on
     * @param {number[][]} hexes ID of each hex in the map, left to right and top to bottom
     * @param {IHexMapConfig} config Configuration object which defines the general shape of the map
     */
    constructor(scene, hexes, config) {
        /** @type {Phaser.Scene} Scene that the map should be rendered on */
        this.scene = scene;
        /** @type {number} Number of rows in the map */
        this.height = config.height;
        /** @type {number} Number of columns in the map */
        this.width = config.width;
        /** @type {number} Width in pixels hexagon sprites should occupy */
        this.hex_width = config.hex_width;
        /** @type {number} Height in pixels hexagon sprites should occupy */
        this.hex_height = config.hex_height;
        /** @type {number} Distance odd rows should be offset on the x axis in pixels */
        this.odd_x_offset = config.odd_x_offset;

        /** @type {Phaser.GameObjects.Group} Group that the hexs' sprites belong to */
        this.group = this.scene.add.group();
        /** @type {Hex[][]} Descriptions of each hex in the map, left to right and top to bottom */
        this.hexes = [];

        // Add each row to the hex array
        for (let r = 0; r < this.height; r++) {
            this.hexes.push([]);
            // Add a hex for each column in the given row
            for (let c = 0; c < this.width; c++) {
                let hex = new Hex(this, r, c, hexes[r][c], 'hex');
                this.hexes[r].push(hex);
                this.group.add(hex);
            }
        }

    }

    at(row, column) {
        // Validate the coordinates
        if (row >= 0
            && column >= 0
            && row < this.height
            && column < this.width
        ) {
            return this.hexes[row][column];
        }
        else {
            return null;
        }
    }
}

export class Hex extends Phaser.GameObjects.Sprite {
    /**
     * @param {HexMap} map The map which the hex is being added to
     * @param {number} row The row at which the hex is located
     * @param {number} column The column at which the hex is located
     * @param {number} id The id/type/frame of the hex
     * @param {string} key The texture key the hex should use for rendering
     */
    constructor(map, row, column, id, key) {
        // Run the Phaser Sprite constructor
        super(
            // Add to the map's scene
            map.scene,
            // Different x position for even/odd rows because odd rows are offset
            row % 2 ? map.hex_width * column + map.odd_x_offset : map.hex_width * column,
            map.hex_height * row,
            // Optional arguments (by using OR syntax, if args are null then the alt will be used)
            key || 'hex', id || 0
        );

        // Store Hex properties
        /** @type {HexMap} The map which the hex is being added to */
        this.map = map;
        /** @type {number} The row at which the hex is located */
        this.row = row;
        /** @type {number} The column at which the hex is located */
        this.column = column;
        /** @type {number} The id/type/frame of the hex */
        this.id = id || 0;
        /** @type {string} The texture key the hex should use for rendering */
        this.key = key || 'hex';

        // Configure hex tile sprite
        // this.setOrigin(0);

        // Might show text later for debugging purposes
        this.debugText = null;

        // Add the hex to the scene
        this.map.scene.add.existing(this);
    }

    adjacent() {
        // Since we store as a 2D-array (rectangular) calculate the neighbors for a rectangular grid initially
        const nw = { row: this.row - 1, column: this.column - 1 };
        const n = { row: this.row - 1, column: this.column };
        const ne = { row: this.row - 1, column: this.column + 1 };
        const w = { row: this.row, column: this.column - 1 };
        const e = { row: this.row, column: this.column + 1 };
        const sw = { row: this.row + 1, column: this.column - 1 };
        const s = { row: this.row + 1, column: this.column };
        const se = { row: this.row + 1, column: this.column + 1 };
        // Now drop neighbors since it is a hex grid and has 6 neighbors rather than 8
        // Which neighbors are dropped depends on the row, as hex grids are staggered
        if (this.row % 2 == 0) {
            // Even rows drop northeast and southeast
            const even_row_neighbors = {
                nw: nw,
                ne: n,
                w: w,
                e: e,
                sw: sw,
                se: s
            }
            return even_row_neighbors;
        }
        else {
            // Odd rows drop the northwest and southwest neigbors
            const odd_row_neighbors = {
                nw: n,
                ne: ne,
                w: w,
                e: e,
                sw: s,
                se: se
            }
            return odd_row_neighbors;
        }
    }

    debug() {
        // Shows the row/column of the hexagon as text over the hexagon
        if (!this.debugText) {
            this.debugText = this.map.scene.add.text(this.x, this.y, `${this.row},${this.column}`, {
                fontSize: '40px',
                stroke: 'black',
                strokeThickness: 7
            }).setOrigin(0.5);
        }
    }

    unDebug() {
        // Destroy and hide existing debug text
        if (this.debugText) {
            this.debugText.destroy();
            this.debugText = null;
        }
    }

}
