import { HexMap } from "../objects/HexMap";
import { ScreenScale } from '../utils/ScreenScale';
const res_scaler = ScreenScale(1080);

export class LevelEditorScene extends Phaser.Scene {
    constructor() {
        super("LevelEditor");
        this.editMap = null;
        this.tool = 'hand';
        this.handStart = {
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
        this.createEditMap();
        this.input.on('pointerdown', (ptr)=>{
            this.handStart = {
                x: ptr.x,
                y: ptr.y
            }
        });
        this.input.on('pointermove', (ptr)=>{
            if(this.tool == 'hand' && ptr.isDown){
                const dx = ptr.x - this.handStart.x;
                const dy = ptr.y - this.handStart.y;
                let cam = this.cameras.main;
                cam.setScroll(cam.scrollX - dx, cam.scrollY - dy);
                this.handStart = {
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