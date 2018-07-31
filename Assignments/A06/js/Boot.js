/* Program: A06
** Author: Jeremy Glebe
** Description: 
** File: Boot.js
** Purpose: Prepares assets for the loading screen and game screen settings.
*/

//if A06 exists, use it, otherwise initiate it as empty object
var A06 = A06 || {};

A06.Boot = function () { };

//Configure game and prep loading screen
A06.Boot.prototype = {

    preload: function () {

        //asset for loading bar
        this.load.image('preloadbar', 'assets/ui/bar.png');

    },

    create: function () {

        //Loading screen background color
        this.game.stage.backgroundColor = '#000000';

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