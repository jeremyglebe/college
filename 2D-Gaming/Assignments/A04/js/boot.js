/* Program: Assignment 04 - Falling game
** Description: A guy with wings can't fly b/c he sucks now he has to shoot
**     obstacles and try to score points.
** Author: Jeremy Glebe
** File: boot.js
** Purpose: Sets up screen size and stuff
*/

var boot = function () { };
boot.prototype = {

    create: function () {
        // Always show the game in proportion, even if only part of screen used
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

        // Set scaling minimums and maximums
        this.scale.minWidth = 300;
        this.scale.minHeight = 400;
        this.scale.maxWidth = 1200;
        this.scale.maxHeight = 1600;

        // Scale the screen
		this.scale.pageAlignHorizontally = true;
		this.scale.pageAlignVertically = true;
        this.scale.setScreenSize = true;
        
        // Start loading assets (next game state)
		this.game.state.start('preload');
    }

}