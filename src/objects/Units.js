import { HexMap } from "./HexMap";

export const UNIT_DEPTH = 1;
export const UNIT_SCALE = 10;
export const UNIT_ORIGIN_Y = .9;
export const UNIT_HPBAR_OFFSET = 45;
export const UNIT_STD_ANIM_DURATION = 2000;

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
 * @property {number} attack - Attack stat of the unit
 * @property {number} health - Health stat of the unit
 * @property {number} defense - Defense stat of the unit
 */

export const UNITS = {
    /** @type {IUnitConfig} */
    Monk: {
        key: 'Monk',
        animations: {
            idle: [0, 1],
            move: [58, 63],
            attack: [2, 13],
        },
        health: 10,
        attack: 2,
        defense: 4
    },
    Slime: {
        key: 'Slime',
        animations: {
            idle: [4, 7],
            move: [0, 3],
            attack: [12, 15]
        },
        health: 3,
        attack: 1,
        defense: 2
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
        // Stats of the unit
        this.stats = {
            attack: unit.attack,
            defense: unit.defense,
            health: unit.health
        }
        // Remaining health of the unit
        this.health = this.stats.health;
    }

    /**
     * Runs before every frame update
     */
    preUpdate(time, delta) {
        super.preUpdate(time, delta);
        // Keep the health bar next to the unit
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
        // Make the unit face towards its target
        this.facePosition(target);
        // Lower the targets health
        target.harm(Unit.calcDamage(this.stats.attack, target.stats.defense));
    }

    static calcDamage(attack, targetDefense) {
        const DAMAGE_DIE_CHANCE = 0.5;
        const DEFEND_DIE_CHANCE = 0.33;
        // Sum of all damage die and defend die results
        let totalDamage = 0;
        // Roll a number of damage dice equal to attack stat
        for (let i = 0; i < attack; i++) {
            let rollString = "Rolling Attack: ";
            if (Math.random() < DAMAGE_DIE_CHANCE) {
                totalDamage++;
                rollString += "Hit!";
            }
            else {
                rollString += "Miss!";
            }
            console.log(rollString);
        }
        // Roll a number of defense dice equal to target defense stat
        for (let i = 0; i < targetDefense; i++) {
            let rollString = "Rolling Defense: ";
            if (Math.random() < DEFEND_DIE_CHANCE) {
                totalDamage--
                rollString += "Block!";
            }
            else {
                rollString += "Fail!";
            }
            console.log(rollString);
        }
        // Damage can't be negative
        if (totalDamage < 0) totalDamage = 0;
        // Return the final result
        return totalDamage;
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

    die() {
        this.scene.tweens.add({
            targets: [this, this.healthbarborder],
            alpha: 0,
            duration: UNIT_STD_ANIM_DURATION,
            onComplete: () => {
                this.destroy();
            }
        });
    }

    /**
     * Removes highlight and sets the unit as not selected. Mostly for
     * external use.
     */
    deselect() {
        this.clearTint();
        this.selected = false;
    }

    destroy() {
        this.healthbar.destroy();
        this.healthbarborder.destroy();
        super.destroy();
    }

    harm(damage) {
        // Take the damage
        this.health -= damage;
        // Don't lower health below 0
        if (this.health < 0) this.health = 0;
        // Tween healthbar to show damage
        this.scene.tweens.add({
            targets: this.healthbar,
            scaleX: this.health / this.stats.health,
            duration: UNIT_STD_ANIM_DURATION / 4,
            onComplete: () => {
                if (this.health == 0) {
                    this.die();
                }
            }
        });
        // Flag: Is the damage critical?
        let critical = damage >= this.stats.health / 2;
        // Create some hit text to show damage
        let text = this.scene.add.text(this.x, this.y - 50, `${damage}`, {
            color: critical ? 'red' : 'white',
            fontSize: critical ? '70px' : '50px',
            stroke: 'black',
            strokeThickness: 15
        }).setDepth(5);
        // Animate and destroy the text
        this.scene.tweens.add({
            targets: text,
            x: this.x + 100,
            y: this.y - 130,
            alpha: 0,
            duration: UNIT_STD_ANIM_DURATION,
            onComplete: () => {
                text.destroy();
            }
        });
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
        this.facePosition(toHex);
        // Update the row/column number of the unit
        this.row = toHex.row;
        this.column = toHex.column;
        // Create movement animation
        this.scene.tweens.add({
            targets: [this],
            x: toHex.x,
            y: toHex.y,
            duration: UNIT_STD_ANIM_DURATION / 6,
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
     * Faces the unit towards a coordinate.
     * @param coordinate The coordinate that the unit should face towards
     */
    facePosition(coordinate) {
        if (coordinate.x > this.x) {
            this.setFlipX(false);
        }
        else if (coordinate.x < this.x) {
            this.setFlipX(true);
        }
    }
}