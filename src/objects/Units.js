import { HexMap } from "./HexMap";

export const UNIT_DEPTH = 1;
export const UNIT_SCALE = 24;

/**
 * @typedef IAnimationDirectFrames
 * @type {object}
 * @property {number[]} nw - List of frames for the northwest animation
 * @property {number[]} ne - List of frames for the northeast animation
 * @property {number[]} sw - List of frames for the southwest animation
 * @property {number[]} se - List of frames for the southeast animation
 */

/**
 * @typedef IUnitAnimationConfig
 * @type {object}
 * @property {IAnimationDirectFrames} idle - Frame number definition for idle animation
 * @property {IAnimationDirectFrames} move - Frame number definition for movement animation
 * @property {IAnimationDirectFrames} attack - Frame number definition for attack animation
 */

/**
 * Interface which defines the properties of the configuration object for a unit
 * @typedef IUnitConfig
 * @type {object}
 * @property {string} key - Key of the spritesheet for the unit
 * @property {IUnitAnimationConfig} animations - Config for unit animations
 */

export const UNITS = {
    /** @type {IUnitConfig} */
    Amazon: {
        key: 'Amazon',
        animations: {
            idle: {
                nw: [],
                ne: [],
                sw: [],
                se: []
            },
            move: {
                nw: [],
                ne: [],
                sw: [],
                se: []
            },
            attack: {
                nw: [0, 1, 2, 3],
                ne: [16, 17, 18, 19],
                sw: [32, 33, 34, 35],
                se: [48, 49, 50, 51]
            },
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
        this.setOrigin(0.5, 0.55);
        // Add this character to the scene once they are constructed
        this.scene.add.existing(this);
    }

    deselect(){
        this.clearTint();
        this.selected = false;
    }

    move() {
        let toHex = this.map.at(this.moveQueue[0].row, this.moveQueue[0].column);
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
                    this.emit('unit-moved');
                }
            }
        });
    }

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

    select(){
        this.setTint(0x00FF00);
        this.selected = true;
    }
}