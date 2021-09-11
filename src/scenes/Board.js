export class BoardScene extends Phaser.Scene {
    constructor() {
        super("Board");
        this.hexes = [
            [0, 1, 2, 3],
            [4, 5, 6, 7],
            [8, 9, 10, 11],
            [12, 13, 14, 15]
        ];
    }
    preload() {
        this.load.spritesheet('tile', './assets/images/tiles/tiles.png', {
            frameWidth: 330,
            frameHeight: 330
        });
    }
    create() {
        this.placeTiles();
        this.cameras.main.setZoom(0.5);
    }
    placeTiles() {
        const hex_width = 260;
        const hex_height = 220;
        const odd_x_offset = 130; // expected: hex_width / 2
        for (let r = 0; r < this.hexes.length; r++) {
            for (let c = 0; c < this.hexes[r].length; c++) {
                // Odd row
                if (r % 2) {
                    this.add.sprite(hex_width * c + odd_x_offset, hex_height * r, 'tile', this.hexes[r][c])
                        // .setOrigin(0);
                }
                // Even row
                else {
                    this.add.sprite(hex_width * c, hex_height * r, 'tile', this.hexes[r][c])
                        // .setOrigin(0);
                }
            }
        }
    }
}