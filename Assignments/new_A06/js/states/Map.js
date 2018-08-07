/* Program: A06
** Author: Jeremy Glebe
** Description: 
** File: Map.js
** Purpose: Initiates gameplay on a specific tilemap. Creates monsters, items,
**     the player, and more.
*/

//if A06 exists, use it, otherwise initiate it as empty object
var A06 = A06 || {};

A06.Map = function() { };

A06.Map.prototype = {

    init: function() {

    },

    create: function() {
        console.log("State: Map");

        this.ply = new A06.Player({x: 50, y: 50});
        this.ply.report();

    },

    update: function() {
        this.ply.myUpdate();
    },

    render: function() {

    },

    shutdown: function() {

    }
}