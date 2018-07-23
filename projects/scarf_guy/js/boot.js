/* Game: Scarf Guy!
** Description: Game where scarf guy collects things.
** Author: Jeremy Glebe
** File: boot.js
** Purpose: Sets up screen size and stuff
*/

var boot = function () { };
boot.prototype = {

    create: function () {
        // Scaling, if we're okay with non-absolute size
        if (this.game.global.G_SCALABLE) {

            //Set scaling minimums and maximums
            //this.scale.minWidth = 400;
            //this.scale.minHeight = 300;
            //this.scale.maxWidth = 1600;
            //this.scale.maxHeight = 1200;

            // Always show the game in proportion, even if only part of screen used
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

            // Scale the screen
            this.scale.pageAlignHorizontally = true;
            this.scale.pageAlignVertically = true;
            this.scale.setScreenSize = true;
        }

        // Start loading assets (next game state)
        this.game.state.start('preload');
    }

}