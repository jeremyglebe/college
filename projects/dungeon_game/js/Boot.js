/* Program: Dungeon Game
** Author: Jeremy Glebe
** Description: A game that utilizes a tilemap. The player explores several
**     levels of dungeons and battles monsters.
** File: Boot.js
** Purpose: Prepares assets for the loading screen and game screen settings.
*/

//if DungeonGame exists, use it, otherwise initiate it as empty object
var DungeonGame = DungeonGame || {};

DungeonGame.Boot = function () { };

//Configure game and prep loading screen
DungeonGame.Boot.prototype = {

    preload: function () {

        //asset for loading bar
        this.load.image('preloadbar', 'assets/images/ui/bar.png');

    },

    create: function () {

        //DEBUG: "this" is DungeonGame.Boot
        console.log(this);

        //Loading screen background color
        this.game.stage.backgroundColor = '#ffffff';

        //Scale to show the whole game in proportion
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

        //Align things with the center
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;

        //Start physics
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        this.state.start('Preload');

    }

}