import { HexMap } from "../objects/HexMap";
import { UNITS, Unit } from "../objects/Units";
import { CloudManager } from "../utils/CloudManager";
import { CONFIGS } from "../Configs";
import { ScreenScale } from '../utils/ScreenScale';
import { SignalManager } from "../utils/SignalManager";

const GAME_SCALE = ScreenScale(1080).scaled;

export class BoardScene extends Phaser.Scene {
    constructor() {
        super("Board");
        this.cloud = CloudManager.get();
        this.map = null;
        this.units = [];
        this.selectedUnit = null;
        this.enemyUnit = null;
        this.signals = SignalManager.get();
    }

    init(data) {
        this.loadedGame = data.loaded || false;
    }

    preload() {
        this.load.spritesheet('hex', './assets/images/tiles/tiles.png', {
            frameWidth: 330,
            frameHeight: 330
        });
        this.load.spritesheet('Monk', './assets/images/rvros/Adventurer.png', {
            frameWidth: 50,
            frameHeight: 37
        });
        this.load.spritesheet('Slime', './assets/images/rvros/Slime.png', {
            frameWidth: 32,
            frameHeight: 25
        });
        this.load.audio('level1_background', './assets/sounds/level1_background.mp3');
        this.load.bitmapFont("pixelFont", "assets/font/font.png", "assets/font/font.xml")

    }

    create() {
        if (!this.loadedGame) {
            // Create the actual map on the screen
            this.createMap();
            // Create a player unit to test
            const keys = Object.keys(UNITS);
            const runit = () => UNITS[keys[Math.floor(Math.random() * keys.length)]];
            const rrow = () => Math.floor(Math.random() * CONFIGS.mapConfig.height);
            const rcol = () => Math.floor(Math.random() * CONFIGS.mapConfig.width);
            this.createPlayerUnit(rrow(), rcol(), runit());
            this.createPlayerUnit(rrow(), rcol(), runit());
            this.createPlayerUnit(rrow(), rcol(), runit());
            this.createOtherUnit(rrow(), rcol(), 'bot-1', runit());
            this.createOtherUnit(rrow(), rcol(), 'bot-1', runit());
            this.createOtherUnit(rrow(), rcol(), 'bot-1', runit());
        }

        //create blackground music
        this.background = this.sound.add('level1_background');
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

        // this.createscore();

        // Create controls to pan the camera across the map
        this.createPanControls();
        // Make sure hexagons are interactive and add highlighting listeners
        this.prepareHexagons();

        this.scene.launch('HUD');

        this.signals.on('turn-ended', ()=>{
            this.endTurn();
        });
    }

    endTurn(){
        // Clear units for use again
        for(let unit of this.units){
            unit.movedList = [];
            unit.moved = 0;
            unit.attacked = false;
        }
    }

    createscore() {
        this.score = 10;
        this.scoreLabel = this.add.bitmapText(10, 130, "pixelFont", "SCORE:", 150).setDepth(1).setScale(1.5);
        this.scoreLabel.text = "SCORE:  " + this.zeroPad(this.score, 5);
    }

    zeroPad(number, size) {
        var stringNumber = String(number);
        while (stringNumber.length < (size || 2)) {
            stringNumber = "0" + stringNumber;
        }
        return stringNumber;
    }

    createMap() {
        // Defines the appearance of the map, which tiles are which
        const hexes = CONFIGS.mapList[Math.floor(Math.random() * CONFIGS.mapList.length)];
        // Configure and create the hex map
        this.map = new HexMap(this, hexes, CONFIGS.mapConfig);
        // Zoom the camera out a bit because it looks nicer
        this.cameras.main.setZoom(0.5);
    }

    createOtherUnit(row, column, owner, unitConfig) {
        let unit = new Unit(this, row, column, owner, unitConfig);
        unit.facePosition({ x: -1000, y: -1000 });
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
                // Control player unit movements
                hex.on('pointerdown', () => {
                    if (this.selectedUnit) {
                        // Determine the path to the clicked location
                        this.selectedUnit.setPathNaive(hex.row, hex.column);
                        // Move to the location
                        this.selectedUnit.moveThroughQueue();
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

export class HUDScene extends Phaser.Scene {
    constructor(){
        super("HUD");
        this.signals = SignalManager.get();
    }
    create(){
        this.add.dom(GAME_SCALE.width-150, GAME_SCALE.height-50, 'button', {
            width: "300px",
            height: "100px"
        }, "End Turn").addListener('click').on('click', ()=>{
            this.signals.emit("turn-ended");
        });
    }
}