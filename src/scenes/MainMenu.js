import { ScreenScale } from '../utils/ScreenScale';
const GAME_SCALE = ScreenScale(1080).scaled;
export class MainMenuScene extends Phaser.Scene {
    constructor() {
        super("MainMenu");
        this.menuObj = null;
        this.menuEle = null;
    }

    preload() {
        this.load.html('title-menu', './assets/html/title-menu.html');
    }

    create() {
        // Create the title menu using an HTML asset
        this.menuObj = this.add.dom(GAME_SCALE.center.x, GAME_SCALE.center.y).createFromCache('title-menu');
        /** @type {HTMLDivElement} The menu div inside the HTML menu doc */
        this.menuEle = this.menuObj.node.querySelector('#menu');
        // Add functionality to buttons
        this.menuEle.querySelector('#play-button').onclick = () => {
            this.scene.start('Board');
        }
        this.menuEle.querySelector('#edit-button').onclick = () => {
            this.scene.start('LevelEditor');
        }
    }
}