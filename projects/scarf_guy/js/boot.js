/* Game: Scarf Guy!
** Description: Game where scarf guy collects things.
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
        this.scale.minWidth = 1024;
        this.scale.minHeight = 576;
        this.scale.maxWidth = 1280;
        this.scale.maxHeight = 720;

        // Scale the screen
		this.scale.pageAlignHorizontally = true;
		this.scale.pageAlignVertically = true;
        this.scale.setScreenSize = true;
        
        // Start loading assets (next game state)
		this.game.state.start('preload');
    }

}