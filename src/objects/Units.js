import { HexMap } from "./HexMap";

export const UNIT_DEPTH = 1;
export const UNIT_SCALE = 10;
export const UNIT_ORIGIN_Y = .9;
export const UNIT_HPBAR_OFFSET = 45;

/**
 * @typedef IUnitAnimationConfig
 * @type {object}
 * @property {number[]} idle - Frame number definition for idle animation
 * @property {number[]} move - Frame number definition for movement animation
 * @property {number[]} attack - Frame number definition for attack animation
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
        /** @type {Phaser.GameObjects.Rectangle} The Unit's health bar border */
        this.healthbarborder = this.scene.add.rectangle(this.x, this.y + UNIT_HPBAR_OFFSET, 145, 30, 0xFF5757).setDepth(1);
        /** @type {Phaser.GameObjects.Rectangle} The Unit's health bar */
        this.healthbar = this.scene.add.rectangle(this.x, this.y + UNIT_HPBAR_OFFSET, 140, 25, 0x6666ff).setDepth(1);
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

    /**
     * Runs before every frame update
     */
    preUpdate(time, delta) {
        super.preUpdate(time, delta);
        this.healthbarborder.setPosition(this.x, this.y + UNIT_HPBAR_OFFSET);
        this.healthbar.setPosition(this.x, this.y + UNIT_HPBAR_OFFSET);
    }

    /**
     * Plays the attack animation and damages a selected target
     * @param {Unit} target The target who should take damage when attacking
     */
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