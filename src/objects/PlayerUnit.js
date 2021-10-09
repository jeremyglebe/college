import { BoardScene } from "../scenes/Board";

export class PlayerUnit extends Phaser.GameObjects.Sprite {
    /**
     * 
     * @param {BoardScene} scene Scene to attach this character to, must be a BoardScene
     * @param {number} row Row of the hexagon to start the character on
     * @param {number} col Column of the hexagon to start the character on
     * @param {string} imageKey Key of the spritesheet this character uses
     */
    constructor(scene, row, col, imageKey) {
        // Place player at the same coordinates as the hexagon they start on
        super(scene, scene.map.at(row, col).x, scene.map.at(row, col).y, imageKey, 0);
        // Show the sprite over the tiles
        this.setDepth(1);
        // Scale the characters b/c they are VERY small
        this.setScale(15);
        // Add this character to the scene once they are constructed
        this.scene.add.existing(this);
    }
}