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