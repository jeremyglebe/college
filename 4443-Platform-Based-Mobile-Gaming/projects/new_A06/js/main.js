/* Program: 
** Author: Jeremy Glebe
** Description: 
** File: main.js
** Purpose: Creates the global object for the program as a whole, as well as
**     creating a Phaser game object as a child of that global object.
*/

//if A06 exists, use it, otherwise initiate it as empty object
var A06 = A06 || {};
 
A06.game = new Phaser.Game(400, 300, Phaser.AUTO, '', this, true, false);
 
A06.game.state.add('Boot', A06.Boot);
A06.game.state.add('Preload', A06.Preload);
A06.game.state.add('Map', A06.Map);
 
A06.game.state.start('Boot');