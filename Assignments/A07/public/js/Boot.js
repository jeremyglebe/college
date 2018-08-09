var DoW = DoW || {};

DoW.Boot = function () { };
DoW.Boot.prototype = {
    preload: function () {

        this.load.image('preloadBar', 'assets/loadingBar.png')

    },
    create: function () {
        console.log('State: Boot');

        //This is where the connection to the server is established
        this.game.socket = io();

        //Scale to show the whole game in proportion
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

        //Minimum/Maximum Scaling
        this.scale.minWidth = 480;
        this.scale.minHeight = 640;
        this.scale.maxWidth = 1080;
        this.scale.maxHeight = 1920;

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