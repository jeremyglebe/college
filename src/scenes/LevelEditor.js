import { SignalManager } from '../utils/SignalManager';
import { HexMap } from '../objects/HexMap';
import { CONFIGS } from '../utils/Configs';
import { ScreenScale } from '../utils/ScreenScale';
import { webDownload } from '../utils/Downloads';

const LEVEL_EDITOR_FRAME_MIN = 0;
const LEVEL_EDITOR_FRAME_MAX = 15;
const DEFAULT_FRAME = 8;
const GAME_SCALE = ScreenScale(1080).scaled;

export class LevelEditorScene extends Phaser.Scene {
    constructor() {
        super("LevelEditor");
        this.keys = { up: null, down: null, left: null, right: null, in: null, out: null };
        this.index = LEVEL_EDITOR_FRAME_MIN;
        this.signals = SignalManager.get();
    }
    preload() {
        this.load.spritesheet('hex', './assets/images/tiles/tiles.png', {
            frameWidth: 330,
            frameHeight: 330
        });
        this.load.audio('level_editor_background','./assets/sounds/level_editor_background.mp3')
    }
    create() {
        this.createMap();
        this.createKeyControls();
        this.createHexListeners();
        this.scene.launch('LevelEditorHUD');
        this.signals.on('leveledit-update-index', (index) => { this.index = index; });
        this.input.keyboard.on('keydown-L', () => {
            let result = [];
            for (let row of this.map.hexes) {
                let row_arr = [];
                for (let hex of row) {
                    row_arr.push(hex.id);
                }
                result.push(row_arr);
            }
            console.log(`Logging Map...\n${JSON.stringify(result)}`);
            webDownload(JSON.stringify(result), 'map.json');
        });
        this.background = this.sound.add('level_editor_background');
        let musicConfig = {
            mute: false,
            volume: 0.2,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0
        }

        this.background.play(musicConfig);

    }

    update() {
        this.scroll();
    }

    createHexListeners() {
        for (let row of this.map.hexes) {
            for (let hex of row) {
                hex.setInteractive(this.input.makePixelPerfect());
                hex.on('pointerdown', () => {
                    hex.setFrame(this.index);
                    hex.id = this.index;
                });
                hex.on('pointerover', (ptr) => {
                    if (ptr.isDown) {
                        hex.setFrame(this.index);
                        hex.id = this.index;
                    }
                });
            }
        }
    }

    createKeyControls() {
        this.keys.up = this.input.keyboard.addKey('UP');
        this.keys.down = this.input.keyboard.addKey('DOWN');
        this.keys.left = this.input.keyboard.addKey('LEFT');
        this.keys.right = this.input.keyboard.addKey('RIGHT');
        this.keys.in = this.input.keyboard.addKey('W');
        this.keys.out = this.input.keyboard.addKey('S');
    }

    createMap() {
        const tiles = Array(CONFIGS.mapConfig.height).fill(Array(CONFIGS.mapConfig.width).fill(DEFAULT_FRAME));
        this.map = new HexMap(this, tiles, CONFIGS.mapConfig);
    }

    debugMapHexes() {
        for (let row of this.map.hexes) {
            for (let hex of row) {
                hex.debug();
            }
        }
    }

    scroll() {
        const SCROLL_SPEED = 20;
        if (this.keys.up.isDown) {
            this.cameras.main.scrollY -= SCROLL_SPEED;
        }
        if (this.keys.down.isDown) {
            this.cameras.main.scrollY += SCROLL_SPEED;
        }
        if (this.keys.left.isDown) {
            this.cameras.main.scrollX -= SCROLL_SPEED;
        }
        if (this.keys.right.isDown) {
            this.cameras.main.scrollX += SCROLL_SPEED;
        }
        if (this.keys.in.isDown) {
            this.cameras.main.zoom += .01;
        }
        if (this.keys.out.isDown) {
            this.cameras.main.zoom -= .01;
        }
    }
}

export class LevelEditorHUDScene extends Phaser.Scene {
    constructor() {
        super("LevelEditorHUD");
        this.signals = SignalManager.get();
        this.index = LEVEL_EDITOR_FRAME_MIN;
        this.hex = null;
        this.signals = SignalManager.get();
    }

    create() {
        this.hex = this.add.sprite(180, 62, 'hex', this.index).setScale(0.4);
        this.input.keyboard.on('keydown-A', () => {
            this.index > LEVEL_EDITOR_FRAME_MIN ? this.index-- : this.index = LEVEL_EDITOR_FRAME_MAX;
            this.hex.setFrame(this.index);
            this.signals.emit('leveledit-update-index', this.index);
        });
        this.input.keyboard.on('keydown-D', () => {
            this.index < LEVEL_EDITOR_FRAME_MAX ? this.index++ : this.index = LEVEL_EDITOR_FRAME_MIN;
            this.hex.setFrame(this.index);
            this.signals.emit('leveledit-update-index', this.index);
        });
        this.createTextPrompts();
    }

    createTextPrompts() {
        this.add.text(0, 20, '<<A)          (D>>', {
            font: '48px Arial',
            strokeThickness: 12,
            stroke: 'black'
        });
        this.add.text(GAME_SCALE.width - 30, 0, 'Use  arrow  keys  to  pan  camera\nSave  map  w/  L  key\nW/S  to  zoom  camera', {
            font: '36px Arial',
            strokeThickness: 8,
            stroke: 'black'
        }).setOrigin(1, 0).setLineSpacing(0);
    }

}