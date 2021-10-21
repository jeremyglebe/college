import { ScreenScale } from '../utils/ScreenScale';

// ScreenScale provides some useful coordinates, such as the center of the
// screen, without needing to worry about aspect ratio.
const GAME_SCALE = ScreenScale(1080).scaled;

export class MainMenuScene extends Phaser.Scene {
    constructor() {
        super("MainMenu");
        /** @type {Phaser.GameObjects.DOMElement} Phaser object container for the HTML doc */
        this.menuObj = null;
        /** @type {HTMLDivElement} Actual HTML div element inside the document */
        this.menuEle = null;
    }

    /**
     * Preload is where a scene loads assets which it will need later
     */
    preload() {
        // HTML documents can be loaded to be used as menus/ui in the game
        this.load.html('mainmenu', './assets/html/mainmenu.html');
        this.load.audio("click",'./assets/sounds/mouse-click-single.mp3');
    }

    /**
     * Phaser scenes all have a create() method where objects are first added to the scene.
     * This is different from the constructor, which prepares all internal logic, member
     * variables, and methods of the scene.
     */
    create() {
        // Create the title menu using an HTML asset
        this.menuObj = this.add.dom(GAME_SCALE.center.x, GAME_SCALE.center.y).createFromCache('mainmenu');
        this.menuEle = this.menuObj.node.querySelector('#menu');
        //Add click sound
        this.clickSound = this.sound.add('click');
        // Add functionality to buttons, querySelector gets a specific element
        this.menuEle.querySelector('#play-button')
            // Buttons have a property "onclick" which should be assigned to a function
            .onclick = () => {
                this.scene.start('Board');
                this.clickSound.play();
            }
        this.menuEle.querySelector('#edit-button').onclick = () => {
            this.scene.start('LevelEditor');
            this.clickSound.play();
        }
    }
}