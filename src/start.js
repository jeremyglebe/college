import * as Phaser from 'phaser';
import { BoardScene } from './scenes/Board';

/**
 * @type {Phaser.Types.Core.GameConfig}
 */
const config = {
    width: 800,
    height: 600,
    scale: {
        mode: Phaser.Scale.ScaleModes.FIT
    },
    scene: [
        BoardScene
    ],
    backgroundColor: 0xFFFFFF 
};

let game = new Phaser.Game(config);