import * as Phaser from 'phaser';
import { BoardScene } from './scenes/Board';
import { LevelEditorHUDScene, LevelEditorScene } from './scenes/LevelEditor';
import { ScreenScale } from './utils/ScreenScale';

let res_scaler = ScreenScale(1080);

/**
 * @type {Phaser.Types.Core.GameConfig}
 */
const config = {
    width: res_scaler.scaled.width,
    height: res_scaler.scaled.height,
    scale: {
        mode: Phaser.Scale.ScaleModes.FIT
    },
    scene: [
        BoardScene,
        LevelEditorScene,
        LevelEditorHUDScene
    ],
    backgroundColor: 0xFFFFFF
};

let game = new Phaser.Game(config);