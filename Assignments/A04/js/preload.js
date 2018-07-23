/* Program: Assignment 04 - Falling game
** Description: A guy with wings can't fly b/c he sucks now he has to shoot
**     obstacles and try to score points.
** Author: Jeremy Glebe
** File: preload.js
** Purpose: Retrieves/loads all assets for the game
*/

var preload = function(){}
preload.prototype = {

    //Load all assets here
	preload: function(){
        
        // Character sprites
        this.load.spritesheet('guy', 'assets/flying.png', 97, 87);

        //Obstacles
        this.load.image('boulder', 'assets/boulder.png');
        this.load.image('axe', 'assets/axe.png');
        this.load.spritesheet('fireball', 'assets/fireball.png', 220, 124);

	},
    
    // After loading assets, start the menu
	create: function(){ this.game.state.start('menu'); }
}