/* Program: A06
** Author: Jeremy Glebe
** Description: 
** File: MoveControl.js
** Purpose: Creates class that controls movement of a sprite, 8-directional
*/

//if A06 exists, use it, otherwise initiate it as empty object
var A06 = A06 || {};

/* Class: MoveControl
** Desc: Object with 8-direction control of a sprite
** Params:
**     args: a set of key-value pairs used as arguments
**     The keys are listed below
** Keys:
**     subject: the sprite to move with this object
**     keys: Object containing buttons (n,s,w,e), buttons are objects with
**         boolean property isDown (ex Phaser.Key)
**     speed: the velocity at which the character should move
**     anim: Object holding animations (two other objects)
**         idle: Object with idle animation names (n, s, w, e, nw, ne, sw, se)
**         move: Object with move animation names (n, s, w, e, nw, ne, sw, se)
*/
//Constructor
A06.MoveControl = function (args) {
    console.log("Constructor: MoveControl()"); console.log(args);
    //Run the actual creation code
    this.myCreate(args);
};
A06.MoveControl.prototype = {

    myCreate: function (args) {
        //Setting up movement
        this.subject = args.subject || null;
        this.direction = 's';
        this.enabled = true;
        this.fixDir = false;
        this.fixMov = false;
        this.stopped = false;

        //Movement keys
        this.keys = {}
        this.keys.n = args.keys.n || null;
        this.keys.s = args.keys.s || null;
        this.keys.w = args.keys.w || null;
        this.keys.e = args.keys.e || null;

        this.speed = args.speed || 50;
    },

    /* Function: move()
    ** Description: Handles velocity and animations when moving
    */
    move: function () {
        if (this.enabled) {
            //Warnings
            //There needs to be a subject to move
            if (!this.subject) {
                console.log("Move Warning: No subject to move!")
                return;
            }
            if (!this.keys.n) {
                console.log("Move Warning: No nKey defined!")
            }
            if (!this.keys.s) {
                console.log("Move Warning: No sKey defined!")
            }
            if (!this.keys.w) {
                console.log("Move Warning: No wKey defined!")
            }
            if (!this.keys.e) {
                console.log("Move Warning: No eKey defined!")
            }

            //What direction is the player trying to go?
            var dir = this.getDir();

            //Under condition fixDir, the subject can't change directions but it
            //may stop or go
            if (this.fixDir) {
                if (dir != this.direction) {
                    dir = 'x';
                }
            }
            //The subject may be completely fixed moving in their direction
            if (this.fixMov) { dir = this.direction; }
            //The subject may be stopped
            if (this.stopped) { dir = 'x'; }

            //This is where direction and speed are ultimately set
            switch (dir) {
                case 'n':
                    //Set the velocity
                    this.subject.body.velocity.x = 0;
                    this.subject.body.velocity.y = -this.speed;
                    //Set the direction faced (for animation choosing later)
                    this.direction = 'n';
                    break;
                case 's':
                    //Set the velocity
                    this.subject.body.velocity.x = 0;
                    this.subject.body.velocity.y = this.speed;
                    //Set the direction faced (for animation choosing later)
                    this.direction = 's';
                    break;
                case 'w':
                    //Set the velocity
                    this.subject.body.velocity.x = -this.speed;
                    this.subject.body.velocity.y = 0;
                    //Set the direction faced (for animation choosing later)
                    this.direction = 'w';
                    break;
                case 'e':
                    //Set the velocity
                    this.subject.body.velocity.x = this.speed;
                    this.subject.body.velocity.y = 0;
                    //Set the direction faced (for animation choosing later)
                    this.direction = 'e';
                    break;
                case 'nw':
                    //Set the velocity
                    this.subject.body.velocity.x = -this.speed;
                    this.subject.body.velocity.y = -this.speed;
                    this.direction = 'nw';
                    break;
                case 'ne':
                    //Set the velocity
                    this.subject.body.velocity.x = this.speed;
                    this.subject.body.velocity.y = -this.speed;
                    this.direction = 'ne';
                    break;
                case 'sw':
                    //Set the velocity
                    this.subject.body.velocity.x = -this.speed;
                    this.subject.body.velocity.y = this.speed;
                    this.direction = 'sw';
                    break;
                case 'se':
                    //Set the velocity
                    this.subject.body.velocity.x = this.speed;
                    this.subject.body.velocity.y = this.speed;
                    this.direction = 'se';
                    break;
                case 'x':
                default:
                    //Set the velocity
                    this.subject.body.velocity.x = 0;
                    this.subject.body.velocity.y = 0;
                    break;
            }
        }
    },

    /* Function: getDir()
    ** Description: Gets the direction the player is trying to move
    ** Returns: One of the following keys
    **     'n'    north
    **     's'    south
    **     'w'    west
    **     'e'    east
    **     'nw'   northwest
    **     'ne'   northeast
    **     'sw'   southwest
    **     'se'   southeast
    **     'x'    no direction
    */
    getDir: function () {

        //In case the key isn't defined, keys are considered "not pressed" by
        //default
        var n = this.keys.n.isDown || false;
        var s = this.keys.s.isDown || false;
        var w = this.keys.w.isDown || false;
        var e = this.keys.e.isDown || false;

        //If impossible directions are chosen, return no direction
        if (n && s) { return 'x' };
        if (w && e) { return 'x' };
        //Check the four corners first
        if (n && w) { return 'nw' };
        if (n && e) { return 'ne' };
        if (s && w) { return 'sw' };
        if (s && e) { return 'se' };
        //Check the 4 cardinal directions now
        if (n) { return 'n' };
        if (s) { return 's' };
        if (w) { return 'w' };
        if (e) { return 'e' };

        //If nothing is caught above, return no direction
        return 'x';

    }

}