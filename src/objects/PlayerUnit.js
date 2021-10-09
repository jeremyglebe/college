import { BoardScene } from "../scenes/Board";
import { UNIT_DEPTH, UNIT_SCALE } from "./Units";

export class PlayerUnit extends Phaser.GameObjects.Sprite {
    /**
     * 
     * @param {BoardScene} scene Scene to attach this character to, must be a BoardScene
     * @param {number} row
     * @param {number} column
     * @param {IUnitConfig} unit Unit configuration object
     */
    constructor(scene, row, column, unit) {
        // Place player at the same coordinates as the hexagon they start on
        super(scene, scene.map.at(row, column).x, scene.map.at(row, column).y, unit.key);
        // Store position in the hex map
        this.row = row;
        this.column = column;
        // Additional, easier reference to map
        this.map = scene.map;
        // Show the sprite over the tiles
        this.setDepth(UNIT_DEPTH);
        // Scale the characters b/c they are VERY small
        this.setScale(UNIT_SCALE);
        // Add this character to the scene once they are constructed
        this.scene.add.existing(this);
    }

    _move1(direction) {
        let neighbors = this.map.at(this.row, this.column).adjacent();
        let toRow = neighbors[direction].row;
        let toCol = neighbors[direction].column;
        let toHex = this.map.at(toRow, toCol);
        return this.scene.tweens.add({
            targets: [this],
            x: toHex.x,
            y: toHex.y,
            duration: 500,
        });
    }
}