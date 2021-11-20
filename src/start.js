import * as Phaser from 'phaser';
import { BoardScene, HUDScene } from './scenes/Board';
import { LevelEditorHUDScene, LevelEditorScene } from './scenes/LevelEditor';
import { MainMenuScene } from './scenes/MainMenu';
import { ScreenScale } from './utils/ScreenScale';
import { LevelChooseScene} from './scenes/LevelChoose';

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
        MainMenuScene,
        LevelEditorScene,
        BoardScene,
        LevelEditorHUDScene,
        LevelChooseScene,
        HUDScene
    ],
    backgroundColor: 0x000000,
    render: {
        pixelArt: true,
        roundPixels: true
    },
    parent: 'game',
    dom: {
        createContainer: true
    }
};

let game = new Phaser.Game(config);