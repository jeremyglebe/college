/* Program: Assignment 04 - Falling game
** Description: A guy with wings can't fly b/c he sucks now he has to shoot
**     obstacles and try to score points.
** Author: Jeremy Glebe
** File: menu.js
** Purpose: Menu before launching into actual gameplay
*/

var menu = function(){}
menu.prototype = {

    create: function(){

        this.game.state.start('play');

    }
    
}