import { HexMap } from "../objects/HexMap";

export class BoardTestScene extends Phaser.Scene {
    constructor() {
        super("Board");
    }
    preload() {
        this.load.spritesheet('hex', './assets/images/tiles/tiles.png', {
            frameWidth: 330,
            frameHeight: 330
        });
    }
    create() {
        const hexes = [
            [0, 1, 2, 3],
            [4, 5, 6, 7],
            [8, 9, 10, 11],
            [12, 13, 14, 15]
        ];
        let map = new HexMap(this, hexes, {
            height: 4,
            width: 4,
            hex_height: 220,
            hex_width: 260,
            odd_x_offset: 130
        });
        this.cameras.main.setZoom(0.5);

        // Testing the map origin position
        this.add.circle(0, 0, 35, 0x0000FF, 0.2);
        // Just some test stuff with hexes
        for (let row of map.hexes) {
            for (let hex of row) {
                // Testing showing coordinate numbers
                hex.debug();
                // Testing showing neighbors when hovering
                hex.setInteractive();
                hex.on('pointerover', () => {
                    const adjacents = hex.adjacent();
                    for (let coord of Object.values(adjacents)) {
                        const adj_hex = map.at(coord.row, coord.column);
                        if (adj_hex) {
                            adj_hex.setTintFill(0x00FF00);
                        }
                    }
                });
                hex.on('pointerout', () => {
                    const adjacents = hex.adjacent();
                    for (let coord of Object.values(adjacents)) {
                        const adj_hex = map.at(coord.row, coord.column);
                        if (adj_hex) {
                            adj_hex.clearTint();
                        }
                    }
                });
            }
        }
    }
}