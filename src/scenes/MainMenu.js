export class MainMenuScene extends Phaser.Scene {
    constructor() {
        super("MainMenu");
    }

    create() {
        this.add.rectangle(15, 15, 300, 100, 0x0000FF)
            .setInteractive()
            .on('pointerdown', () => {
                this.scene.start('Board');
            });
        this.add.text(15, 15, "Play").setOrigin(0.5);

        this.add.rectangle(15, 415, 300, 100, 0x00FF00)
            .setInteractive()
            .on('pointerdown', () => {
                this.scene.start('LevelEditor');
            });
        this.add.text(15, 415, "Level Editor").setOrigin(0.5);
    }
}