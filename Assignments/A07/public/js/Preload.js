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

    },
    create: function () {
        console.log('State: Preload');
        this.state.start('Menu');
    }
}