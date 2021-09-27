import { HexMap } from "../objects/HexMap";
import { ScreenScale } from '../utils/ScreenScale';
import { SignalManager } from '../utils/SignalManager';

const RES_SCALER = ScreenScale(1080);
const GAME_SCALE = RES_SCALER.scaled;
const TOOLBOX = ['⬢', '✢'];

export class LevelEditorScene extends Phaser.Scene {
    constructor() {
        super("LevelEditor");
        this.signals = SignalManager.get();
        this.editMap = null;
        this.activeTool = TOOLBOX[0];
        this.moveStart = {
            x: 0,
            y: 0
        };
    }

    preload() {
        this.load.spritesheet('hex', './assets/images/tiles/tiles.png', {
            frameWidth: 330,
            frameHeight: 330
        });
    }

    create() {
        this.scene.launch('LevelEditorHUD');
        this.createEditMap();
        this.signals.on('set active tool', (i) => {
            this.activeTool = TOOLBOX[i];
        });
        this.input.on('pointerdown', (ptr) => {
            this.moveStart = {
                x: ptr.x,
                y: ptr.y
            }
        });
        this.input.on('pointermove', (ptr) => {
            if (this.activeTool == '✢' && ptr.isDown) {
                const dx = ptr.x - this.moveStart.x;
                const dy = ptr.y - this.moveStart.y;
                let cam = this.cameras.main;
                cam.setScroll(cam.scrollX - dx, cam.scrollY - dy);
                this.moveStart = {
                    x: ptr.x,
                    y: ptr.y
                };
            }
        });
    }

    createEditMap() {
        const config = {
            height: 4,
            width: 4,
            hex_height: 220,
            hex_width: 260,
            odd_x_offset: 130
        }
        let hexes = [];
        for (let r = 0; r < config.height; r++) {
            hexes.push([]);
            for (let c = 0; c < config.width; c++) {
                hexes[r].push(14);
            }
        }
        this.editMap = new HexMap(this, hexes, config);
        this.editMap.group.getChildren().forEach((obj) => {
            obj.setTint(0xFF0000, 0x00FF00, 0x000000, 0x0000FF);
        });
    }

}

export class LevelEditorHUDScene extends Phaser.Scene {
    constructor() {
        super("LevelEditorHUD");
        this.signals = SignalManager.get();
        this.toolIndex = 0;
        this.activeToolIcon = null;
        this.leftToolIcon = null;
        this.rightToolIcon = null;
    }

    create() {
        this.createTextObjects();
        // Listener for clicking the left tool icon
        this.leftToolIcon.on('pointerdown', (...args) => {
            const event = args[3];
            this.toolIndex = this.toolIndex > 0 ? this.toolIndex-- : TOOLBOX.length - 1;
            this.updateToolIcons();
            event.stopPropagation();
            this.signals.emit('set active tool', this.toolIndex);
        });
        // Listener for clicking the right tool icon
        this.rightToolIcon.on('pointerdown', (...args) => {
            const event = args[3];
            this.toolIndex = (this.toolIndex + 1) % TOOLBOX.length;
            this.updateToolIcons();
            event.stopPropagation();
            this.signals.emit('set active tool', this.toolIndex);
        });
    }

    createTextObjects() {
        // Active tool icon
        this.activeToolIcon = this.add.text(GAME_SCALE.center.x, GAME_SCALE.height - 128,
            TOOLBOX[0],
            {
                fontSize: '128px',
                stroke: 'black',
                strokeThickness: 16
            }
        ).setOrigin(0.5);

        // Tool to the left in the toolbox
        this.leftToolIcon = this.add.text(GAME_SCALE.center.x - 128, GAME_SCALE.height - 128,
            TOOLBOX[TOOLBOX.length - 1],
            {
                fontSize: '64px',
                stroke: 'black',
                strokeThickness: 8
            }
        ).setOrigin(0.5).setInteractive();

        // Tool to the right in the toolbox
        this.rightToolIcon = this.add.text(GAME_SCALE.center.x + 128, GAME_SCALE.height - 128,
            TOOLBOX[1],
            {
                fontSize: '64px',
                stroke: 'black',
                strokeThickness: 8
            }
        ).setOrigin(0.5).setInteractive();
    }

    updateToolIcons() {
        this.activeToolIcon.setText(TOOLBOX[this.toolIndex]);
        this.leftToolIcon.setText(this.toolIndex > 0 ? TOOLBOX[this.toolIndex - 1] : TOOLBOX[TOOLBOX.length - 1]);
        this.rightToolIcon.setText(TOOLBOX[(this.toolIndex + 1) % TOOLBOX.length]);
    }
}