var DoW = DoW || {};

DoW.Preload = function () { };
DoW.Preload.prototype = {
    preload: function () {

        //Standard loading bar stuff
        this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY + 128, 'preloadBar');
        this.preloadBar.anchor.setTo(0.5);
        this.load.setPreloadSprite(this.preloadBar);

        //Loading ship assets
        this.load.image('ship1', 'assets/ship1.png');
        this.load.image('ship2', 'assets/ship2.png');
        this.load.image('ship3', 'assets/ship3.png');

        //Loading planet assets
        this.load.spritesheet('planet1', 'assets/planet1.png', 275, 250);
        this.load.spritesheet('planet2', 'assets/planet2.png', 200, 185);
        this.load.spritesheet('planet3', 'assets/planet3.png', 475, 292);
        this.load.spritesheet('planet4', 'assets/planet4.png', 300, 353);
        this.load.spritesheet('planet5', 'assets/planet5.png', 350, 340);
        this.load.spritesheet('planet6', 'assets/planet6.png', 275, 246);
        this.load.spritesheet('planet7', 'assets/planet7.png', 375, 350);

        //Other sprites
        this.load.image('bg', 'assets/universe.jpg');
        this.load.image('hpBar', 'assets/hpBar.png');
        this.load.image('fireButton', 'assets/fireButton.png');
        this.load.image('laser', 'assets/laser.png');
        this.load.spritesheet('expl', 'assets/explosion.png', 650, 600);

    },
    create: function () {
        console.log('State: Preload');
        this.state.start('Menu');
    }
}