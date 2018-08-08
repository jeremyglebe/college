var DoW = DoW || {};

DoW.Boot = function () { };
DoW.Boot.prototype = {
    preload: function () {

        this.load.image('preloadBar', 'assets/loadingBar.png')

    },
    create: function () {
        console.log('State: Boot');

        //Scale to show the whole game in proportion
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

        //Minimum/Maximum Scaling
        this.scale.minWidth = 400;
        this.scale.minHeight = 300;
        this.scale.maxWidth = 1600;
        this.scale.maxHeight = 1200;

        //Align things with the center
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;

        //Screen size
        this.scale.setScreenSize = true;

        //Start physics
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        this.state.start('Preload');

    }
}