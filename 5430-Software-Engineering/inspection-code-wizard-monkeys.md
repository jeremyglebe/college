### HexMap.js
This file contains classes which define the behavior of the hexagon-tile map
and establish the relationship between hexes and other scene objects. It is
the core component of the game world.
```js
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

    /**
     * @param {number} row 
     * @param {number} column 
     * @returns {Hex}
     */
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

    neighbors(){
        const adj = this.adjacent();
        return {
            nw: this.map.at(adj.nw.row, adj.nw.column),
            w: this.map.at(adj.w.row, adj.w.column),
            sw: this.map.at(adj.sw.row, adj.sw.column),
            ne: this.map.at(adj.ne.row, adj.ne.column),
            e: this.map.at(adj.e.row, adj.e.column),
            se: this.map.at(adj.se.row, adj.se.column)
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
```

### Unit.js
This file defines the Unit class, which refers to the characters that can be
controlled by the players and bots. The file also contains configurations for
each variation of controllable unit and defines how units move and attack.
```js
import { HexMap } from "./HexMap";

export const UNIT_DEPTH = 1;
export const UNIT_SCALE = 10;
export const UNIT_ORIGIN_Y = .9;

export const UNITS = {
    /** @type {IUnitConfig} */
    Adventurer: {
        key: 'Adventurer',
        animations: {
            idle: [0, 1],
            move: [58, 63],
            attack: [2, 13],
        }
    },
    Slime: {
        key: 'Slime',
        animations: {
            idle: [4, 7],
            move: [0, 3],
            attack: [12, 15]
        }
    }
}

export class Unit extends Phaser.GameObjects.Sprite {
    /**
     * 
     * @param {BoardScene} scene Scene to attach this character to, must be a BoardScene
     * @param {number} row
     * @param {number} column
     * @param {IUnitConfig} unit Unit configuration object
     */
    constructor(scene, row, column, owner, unit) {
        // Place player at the same coordinates as the hexagon they start on
        super(scene, scene.map.at(row, column).x, scene.map.at(row, column).y, unit.key);
        // Store position in the hex map
        this.row = row;
        this.column = column;
        // The owner of the unit
        this.owner = owner;
        // Queue of grid locations to move to
        this.moveQueue = [];
        // Flag whether the unit has been selected
        this.selected = false;
        /** @type {HexMap} Additional, easier reference to map */
        this.map = scene.map;
        // Show the sprite over the tiles
        this.setDepth(UNIT_DEPTH);
        // Scale the characters b/c they are VERY small
        this.setScale(UNIT_SCALE);
        // Set the unit origin point for movement
        this.setOrigin(0.5, UNIT_ORIGIN_Y);
        // Create animations for the character
        this.createAnimations(unit);
        // Add this character to the scene once they are constructed
        this.scene.add.existing(this);
    }

    attack(target) {
        this.deselect();
        this.anims.play('attack');
        this.on('animationcomplete-attack', () => {
            this.anims.play('idle');
            this.off('animationcomplete-attack');
        });
    }

    /**
     * Creates and attaches animations to the Phaser Sprite based on the unit
     * config it is using.
     * @param {IUnitConfig} unit Configuration for the unit. Contains
     * animation details.
     */
    createAnimations(unit) {
        // Create the idle animation
        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers(unit.key, {
                start: unit.animations.idle[0],
                end: unit.animations.idle[1]
            }),
            repeat: -1,
            frameRate: 8
        });
        // Create the movement animation
        this.anims.create({
            key: 'move',
            frames: this.anims.generateFrameNumbers(unit.key, {
                start: unit.animations.move[0],
                end: unit.animations.move[1]
            }),
            repeat: -1,
            frameRate: 8
        });
        // Create the attack animation
        this.anims.create({
            key: 'attack',
            frames: this.anims.generateFrameNumbers(unit.key, {
                start: unit.animations.attack[0],
                end: unit.animations.attack[1]
            }),
            frameRate: 8
        });
        // Start default animation
        this.anims.play('idle');
    }

    /**
     * Removes highlight and sets the unit as not selected. Mostly for
     * external use.
     */
    deselect() {
        this.clearTint();
        this.selected = false;
    }

    /**
     * Moves the unit across all tiles in it's movement queue
     */
    move() {
        // Start the movement animation on the first call
        if (this.anims.currentAnim.key != 'move')
            this.anims.play('move');
        // Get the hex tile to move to
        let toHex = this.map.at(this.moveQueue[0].row, this.moveQueue[0].column);
        // Set the direction of the unit when moving
        this.setDirectionByNeighbor(toHex);
        // Update the row/column number of the unit
        this.row = toHex.row;
        this.column = toHex.column;
        // Create movement animation
        this.scene.tweens.add({
            targets: [this],
            x: toHex.x,
            y: toHex.y,
            duration: 500,
            onComplete: () => {
                // Remove first item from queue
                this.moveQueue.shift();
                // Move again if there are more movements in the queue
                if (this.moveQueue.length > 0) {
                    this.move();
                }
                // Otherwise, fire the 'moved' signal
                else {
                    this.anims.play('idle');
                    this.emit('unit-moved');
                }
            }
        });
    }

    /**
     * Creates a path (stored in the unit's movement queue) towards a specific
     * row and column. This is not the shortest path nor is it even necessarily
     * a possible path. (If there are tiles that should be ignored, this will
     * not do so) Instead, you should interrupt this path when obstructive
     * tiles are encountered. Bots will likely need to use more complex
     * pathing. This is just meant to help users skip some steps when moving.
     * @param {number} row The row to path towards
     * @param {number} column The column to path towards
     */
    path(row, column) {
        let hex = this.map.at(this.row, this.column);
        // First get on either the same row or column as the objective
        while (hex.row != row && hex.column != column) {
            let neighbors = hex.neighbors();
            // If hex is southeast of goal, go northwest
            if (hex.row > row && hex.column > column) {
                hex = neighbors.nw;
                this.moveQueue.push(hex);
            }
            // Else if hex is southwest of goal, go northeast
            else if (hex.row > row && hex.column < column) {
                hex = neighbors.ne;
                this.moveQueue.push(hex);
            }
            // Else if hex is northeast of goal, go southwest
            else if (hex.row < row && hex.column > column) {
                hex = neighbors.sw;
                this.moveQueue.push(hex);
            }
            // Else if hex is northwest of goal, go southeast
            else if (hex.row < row && hex.column < column) {
                hex = neighbors.se;
                this.moveQueue.push(hex);
            }
        }
        // Eventually, either a row or a column will ine up
        if (hex.row == row) {
            // If the row lines up, go either left or right
            while (hex.column < column) {
                hex = this.map.at(hex.row, hex.column + 1);
                this.moveQueue.push(hex);
            }
            while (hex.column > column) {
                hex = this.map.at(hex.row, hex.column - 1);
                this.moveQueue.push(hex);
            }
        }
        if (hex.column == column) {
            // If the columns lines up, go either up or down
            while (hex.row < row) {
                hex = this.map.at(hex.row + 1, hex.column);
                this.moveQueue.push(hex);
            }
            while (hex.row > row) {
                hex = this.map.at(hex.row - 1, hex.column);
                this.moveQueue.push(hex);
            }
        }
    }

    /**
     * Highlights the unit and sets them as selected. Mostly for external
     * use.
     */
    select() {
        this.setTint(0x00FF00);
        this.selected = true;
    }

    /**
     * Faces the unit towards a neighboring hex. If a hex is passed in that is
     * not a neighbor, the unit will not adjust direction.
     * @param {Hex} hex The neighboring hex that the unit should face towards
     */
    setDirectionByNeighbor(hex) {
        let myTile = this.map.at(this.row, this.column);
        let neighbors = myTile.neighbors()
        let direction = '';
        for (let key in neighbors) {
            if (hex == neighbors[key]) {
                direction = key;
            }
        }
        // Determine the character's direction based on hex moving to
        if (direction.includes('e')) {
            this.setFlipX(false);
        }
        else if (direction.includes('w')) {
            this.setFlipX(true);
        }
    }
}
```

### Board.js
This file defines the main gameplay board and fascilitates interactions
Units and Hexes, as well as between Units and opposing Units.
```js
import { HexMap } from "../objects/HexMap";
import { UNITS, Unit } from "../objects/Units";
import { CloudManager } from "../utils/CloudManager";
import { CONFIGS } from "../utils/Configs";

export class BoardScene extends Phaser.Scene {
    constructor() {
        super("Board");
        this.cloud = CloudManager.get();
        this.map = null;
        this.units = [];
        this.selectedUnit = null;
        this.enemyUnit = null;
    }

    preload() {
        this.load.spritesheet('hex', './assets/images/tiles/tiles.png', {
            frameWidth: 330,
            frameHeight: 330
        });
        this.load.spritesheet('Adventurer', './assets/images/rvros/Adventurer.png', {
            frameWidth: 50,
            frameHeight: 37
        });
        this.load.spritesheet('Slime', './assets/images/rvros/Slime.png', {
            frameWidth: 32,
            frameHeight: 25
        });
        this.load.audio('background', './assets/sounds/background3.mp3');

    }

    create() {
        // Create the actual map on the screen
        this.createMap();
        // Create a player unit to test
        this.createPlayerUnit(5, 3, UNITS.Adventurer);
        this.createPlayerUnit(1, 6, UNITS.Adventurer);
        this.createPlayerUnit(3, 2, UNITS.Adventurer);
        this.createOtherUnit(9, 9, 'bot-1', UNITS.Slime);
        this.createOtherUnit(2, 11, 'bot-1', UNITS.Slime);
        this.createOtherUnit(5, 10, 'bot-1', UNITS.Slime);

        //create blackground music
        this.background = this.sound.add('background');
        var musicConfig = {
            mute: false,
            volume: 0.2,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0
        }
        // Play background music
        this.background.play(musicConfig);
        // Create controls to pan the camera across the map
        this.createPanControls();
        // Make sure hexagons are interactive and add highlighting listeners
        this.prepareHexagons();
    }

    createMap() {
        // Defines the appearance of the map, which tiles are which
        const hexes = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
            [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
            [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
            [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
            [0, 1, 1, 1, 8, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
            [0, 1, 1, 1, 1, 8, 8, 8, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
            [0, 1, 1, 1, 1, 1, 1, 8, 8, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
            [0, 1, 1, 1, 1, 1, 1, 1, 1, 8, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
            [0, 1, 1, 1, 1, 1, 1, 1, 1, 8, 8, 1, 1, 1, 1, 1, 1, 1, 1, 0],
            [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 8, 1, 1, 1, 1, 1, 1, 1, 0],
            [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 8, 1, 1, 1, 1, 1, 1, 1, 0],
            [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 8, 1, 1, 1, 1, 1, 1, 1, 0],
            [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 8, 1, 1, 1, 1, 1, 1, 1, 0],
            [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 8, 4, 4, 4, 1, 1, 1, 1, 0],
            [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 8, 8, 8, 4, 1, 1, 1, 1, 0],
            [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 8, 8, 8, 4, 1, 1, 1, 1, 0],
            [0, 1, 1, 1, 1, 1, 1, 1, 1, 4, 8, 8, 8, 8, 4, 1, 1, 1, 1, 0],
            [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 4, 8, 4, 4, 1, 1, 1, 1, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 8, 4, 0, 0, 0, 0, 0, 0]
        ];
        // Configure and create the hex map
        this.map = new HexMap(this, hexes, CONFIGS.mapConfig);
        // Zoom the camera out a bit because it looks nicer
        this.cameras.main.setZoom(0.5);
    }

    createOtherUnit(row, column, owner, unitConfig) {
        let unit = new Unit(this, row, column, owner, unitConfig);
        unit.setInteractive(this.input.makePixelPerfect());
        unit.on('pointerdown', () => {
            if (this.selectedUnit) {
                this.selectedUnit.attack(unit);
                this.selectedUnit = null;
            }
        });
        this.units.push(unit);
    }

    createPanControls() {
        // Update the position we are panning from
        const setPanningPoint = (ptr) => {
            ptr.panX = ptr.x;
            ptr.panY = ptr.y;
        };

        // Check when pointer is first pushed down
        this.input.on('pointerdown', (ptr) => {
            // In the event of double click, pan quickly to location
            if (this.time.now - ptr.upTime < 150) {
                this.cameras.main.pan(ptr.worldX, ptr.worldY, 150);
            }
            // Set a new point to drag/pan from regardless
            setPanningPoint(ptr);
        });

        // Check every time the pointer moves
        this.input.on('pointermove', (ptr) => {
            // We only care about movement if the pointer is held
            if (ptr.isDown) {
                // Determine how far to move on x and y dimensions (doubling
                // ensures panning is centered on mouse/pointer)
                const dx = (ptr.x - ptr.panX) * 2;
                const dy = (ptr.y - ptr.panY) * 2;
                // Update the camera's position
                let cam = this.cameras.main;
                cam.setScroll(cam.scrollX - dx, cam.scrollY - dy);
                // Set new point to drag/pan from
                setPanningPoint(ptr);
            }
        });
    }

    createPlayerUnit(row, column, unitConfig) {
        let unit = new Unit(this, row, column, this.cloud.user.id, unitConfig);
        unit.setInteractive(this.input.makePixelPerfect());
        unit.on('pointerdown', () => {
            this.onSelectUnit(unit);
        });
        this.units.push(unit);
    }

    prepareHexagons() {
        for (let row of this.map.hexes) {
            for (let hex of row) {
                // Make each hexagon interactive and have perfect overlap detection
                hex.setInteractive(this.input.makePixelPerfect());
                // Listeners for hexagon highlighting
                hex.on('pointerover', () => {
                    // Set the current hexagon to be highlighted
                    hex.setTintFill(0x00FF55);
                    // Set depth, tiles slightly overlap and it may look weird without
                    hex.setDepth(0.1);
                });
                hex.on('pointerout', () => {
                    // Reset highlighted hexagons
                    hex.clearTint();
                    hex.setDepth(0);
                });
                // Control player unit movements
                hex.on('pointerdown', () => {
                    if (this.selectedUnit) {
                        // Determine the path to the clicked location
                        this.selectedUnit.path(hex.row, hex.column);
                        // Move to the location
                        this.selectedUnit.move();
                        // Deselect the unit
                        this.selectedUnit.deselect();
                        this.selectedUnit = null;
                    }
                });
            }
        }
    }

    onSelectUnit(unit) {
        // Deselect any previous selected units
        for (let u of this.units) {
            if (u.selected) u.deselect();
        }
        // Toggle the selection status of this unit
        unit.selected ? unit.deselect() : unit.select();
        // Set the Board's selected unit
        this.selectedUnit = unit.selected ? unit : null;
    }

}
```
