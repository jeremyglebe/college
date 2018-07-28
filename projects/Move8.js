/* Move8.js
** Author: Jeremy Glebe
** Description: An object that can enable 8-directional movement controls for
**     any phaser 2 sprite. Its settings are all passed in through a single
**     configuration object. Example formats are provided.
*/

/* Function(Class): Move8
** Description: A controller for a Phaser sprite object that supports
**     8-directional movement.
** Params:
**     config: object containing key-value pairs to configure the Move8 object
**
**     List of config keys:
**     
**     (REQUIRED)
**     sprite: The sprite that the Move8 object controls
**     nKey: the Phaser key object that corresponds with north/up
**     sKey: the Phaser key object that corresponds with south/down
**     wKey: the Phaser key object that corresponds with west/left
**     eKey: the Phaser key object that corresponds with east/right
**
**     (NOT REQUIRED)
**     stopped: whether movement is paused, you might want to toggle this when
**         the player performs in game actions exclusive from movement
**     speed: the number that velocity should be set to when moving, defaults
**         to 50
**     direction: the player's starting out direction (and the current facing
**         direction as movement occurs and it updates)
**     nAnim: moving animation in the given direction
**     sAnim: moving animation in the given direction
**     wAnim: moving animation in the given direction
**     eAnim: moving animation in the given direction
**     nwAnim: moving animation in the given direction
**     neAnim: moving animation in the given direction
**     swAnim: moving animation in the given direction
**     seAnim: moving animation in the given direction
**     fnAnim: facing animation in the given direction
**     fsAnim: facing animation in the given direction
**     fwAnim: facing animation in the given direction
**     feAnim: facing animation in the given direction
**     fnwAnim: facing animation in the given direction
**     fneAnim: facing animation in the given direction
**     fswAnim: facing animation in the given direction
**     fseAnim: facing animation in the given direction
*/
Move8 = function (config) {

    //Flags
    this.stopped = config.stopped || false;

    //Properties
    this.sprite = config.sprite || null;
    this.speed = config.speed || 50;
    this.direction = config.direction || 'x';

    //Keys
    this.nKey = config.nKey || null;
    this.sKey = config.sKey || null;
    this.wKey = config.wKey || null;
    this.eKey = config.eKey || null;

    //Moving Animations
    this.nAnim = config.nAnim || null;
    this.sAnim = config.sAnim || null;
    this.wAnim = config.wAnim || null;
    this.eAnim = config.eAnim || null;
    this.nwAnim = config.nwAnim || null;
    this.neAnim = config.neAnim || null;
    this.swAnim = config.swAnim || null;
    this.seAnim = config.seAnim || null;

    //Facing Animations
    this.fnAnim = config.fnAnim || null;
    this.fsAnim = config.fsAnim || null;
    this.fwAnim = config.fwAnim || null;
    this.feAnim = config.feAnim || null;
    this.fnwAnim = config.fnwAnim || null;
    this.fneAnim = config.fneAnim || null;
    this.fswAnim = config.fswAnim || null;
    this.fseAnim = config.fseAnim || null;

}

Move8.prototype = {

    //Methods

    /* Function: move()
    ** Description: Handles velocity and animations when moving
    */
    move: function () {

        //There needs to be a sprite to move
        if (!this.sprite) { return; }

        //If stopped, end motion and don't affect animation
        if (this.stopped) {
            this.sprite.body.velocity.x = 0;
            this.sprite.body.velocity.y = 0;
            return;
        }

        //What direction is the player trying to go?
        var dir = this.getDir();

        //This is where direction, animation, and speed are ultimately set
        switch (dir) {

            case 'n':

                //Set the velocity
                this.sprite.body.velocity.x = 0;
                this.sprite.body.velocity.y = -this.speed;

                //Try a few different animations based on what is defined
                //First, just the north animation
                if (this.nAnim) {
                    this.sprite.animations.play(this.nAnim);
                    //Set the direction faced (for animation choosing later)
                    this.direction = 'n';
                }
                //If not defined, try the west/east (whichever was faced last)
                else if (this.wAnim && this.eAnim) {
                    //Choose between west and east
                    if (this.direction == 'w') {
                        this.sprite.animations.play(this.wAnim);
                        //Set the direction faced (for animation choosing later)
                        this.direction = 'w';
                    } else {
                        this.sprite.animations.play(this.eAnim);
                        //Set the direction faced (for animation choosing later)
                        this.direction = 'e';
                    }
                }

                break;

            case 's':

                //Set the velocity
                this.sprite.body.velocity.x = 0;
                this.sprite.body.velocity.y = this.speed;

                //Try a few different animations based on what is defined
                //First, just the south animation
                if (this.sAnim) {
                    this.sprite.animations.play(this.sAnim);
                    //Set the direction faced (for animation choosing later)
                    this.direction = 's';
                }
                //If not defined, try the west/east (whichever was faced last)
                else if (this.wAnim && this.eAnim) {
                    //Choose between west and east
                    if (this.direction == 'w') {
                        this.sprite.animations.play(this.wAnim);
                        //Set the direction faced (for animation choosing later)
                        this.direction = 'w';
                    } else {
                        this.sprite.animations.play(this.eAnim);
                        //Set the direction faced (for animation choosing later)
                        this.direction = 'e';
                    }
                }

                break;

            case 'w':

                //Set the velocity
                this.sprite.body.velocity.x = -this.speed;
                this.sprite.body.velocity.y = 0;

                //Try a few different animations based on what is defined
                //First, just the west animation
                if (this.wAnim) {
                    this.sprite.animations.play(this.wAnim);
                    //Set the direction faced (for animation choosing later)
                    this.direction = 'w';
                }
                //If not defined, try the north/south (whichever was faced last)
                else if (this.nAnim && this.sAnim) {
                    //Choose between north and south
                    if (this.direction == 'n') {
                        this.sprite.animations.play(this.nAnim);
                        //Set the direction faced (for animation choosing later)
                        this.direction = 'n';
                    } else {
                        this.sprite.animations.play(this.sAnim);
                        //Set the direction faced (for animation choosing later)
                        this.direction = 's';
                    }
                }

                break;

            case 'e':

                //Set the velocity
                this.sprite.body.velocity.x = this.speed;
                this.sprite.body.velocity.y = 0;

                //Try a few different animations based on what is defined
                //First, just the east animation
                if (this.eAnim) {
                    this.sprite.animations.play(this.eAnim);
                    //Set the direction faced (for animation choosing later)
                    this.direction = 'e';
                }
                //If not defined, try the north/south (whichever was faced last)
                else if (this.nAnim && this.sAnim) {
                    //Choose between north and south
                    if (this.direction == 'n') {
                        this.sprite.animations.play(this.nAnim);
                        //Set the direction faced (for animation choosing later)
                        this.direction = 'n';
                    } else {
                        this.sprite.animations.play(this.sAnim);
                        //Set the direction faced (for animation choosing later)
                        this.direction = 's';
                    }
                }

                break;

            case 'nw':

                //Set the velocity
                this.sprite.body.velocity.x = -this.speed;
                this.sprite.body.velocity.y = -this.speed;

                //Try a few different animations based on what is defined
                //First, just the nw animation
                if (this.nwAnim) {
                    this.sprite.animations.play(this.nwAnim);
                    this.direction = 'nw';
                }
                //Now lets try the w/e component
                else if (this.wAnim) {
                    this.sprite.animations.play(this.wAnim);
                    this.direction = 'w';
                }
                //Finally try the n/s component
                else if (this.nAnim) {
                    this.sprite.animations.play(this.nAnim);
                    this.direction = 'n';
                }

                break;


            case 'ne':

                //Set the velocity
                this.sprite.body.velocity.x = this.speed;
                this.sprite.body.velocity.y = -this.speed;

                //Try a few different animations based on what is defined
                //First, just the ne animation
                if (this.neAnim) {
                    this.sprite.animations.play(this.neAnim);
                    this.direction = 'ne';
                }
                //Now lets try the w/e component
                else if (this.eAnim) {
                    this.sprite.animations.play(this.eAnim);
                    this.direction = 'e';
                }
                //Finally try the n/s component
                else if (this.nAnim) {
                    this.sprite.animations.play(this.nAnim);
                    this.direction = 'n';
                }

                break;


            case 'sw':

                //Set the velocity
                this.sprite.body.velocity.x = -this.speed;
                this.sprite.body.velocity.y = this.speed;

                //Try a few different animations based on what is defined
                //First, just the sw animation
                if (this.swAnim) {
                    this.sprite.animations.play(this.swAnim);
                    this.direction = 'sw';
                }
                //Now lets try the w/e component
                else if (this.wAnim) {
                    this.sprite.animations.play(this.wAnim);
                    this.direction = 'w';
                }
                //Finally try the n/s component
                else if (this.sAnim) {
                    this.sprite.animations.play(this.sAnim);
                    this.direction = 's';
                }

                break;


            case 'se':

                //Set the velocity
                this.sprite.body.velocity.x = this.speed;
                this.sprite.body.velocity.y = this.speed;

                //Try a few different animations based on what is defined
                //First, just the se animation
                if (this.seAnim) {
                    this.sprite.animations.play(this.seAnim);
                    this.direction = 'se';
                }
                //Now lets try the w/e component
                else if (this.eAnim) {
                    this.sprite.animations.play(this.eAnim);
                    this.direction = 'e';
                }
                //Finally try the n/s component
                else if (this.seAnim) {
                    this.sprite.animations.play(this.seAnim);
                    this.direction = 'se';
                }

                break;

            case 'x':
            default:

                //Set the velocity
                this.sprite.body.velocity.x = 0;
                this.sprite.body.velocity.y = 0;

                //Determine an animation to use
                //We're using another switch because the sprite can idle in
                //pretty much any direction
                switch (this.direction) {

                    case 'n':

                        if (this.fnAnim) {
                            this.sprite.animations.play(this.fnAnim);
                        } else if (this.nAnim) {
                            this.sprite.animations.play(this.nAnim);
                        }

                        break;

                    case 's':

                        if (this.fsAnim) {
                            this.sprite.animations.play(this.fsAnim);
                        } else if (this.sAnim) {
                            this.sprite.animations.play(this.sAnim);
                        }

                        break;

                    case 'w':

                        if (this.fwAnim) {
                            this.sprite.animations.play(this.fwAnim);
                        } else if (this.wAnim) {
                            this.sprite.animations.play(this.wAnim);
                        }

                        break;

                    case 'e':

                        if (this.feAnim) {
                            this.sprite.animations.play(this.feAnim);
                        } else if (this.eAnim) {
                            this.sprite.animations.play(this.eAnim);
                        }

                        break;

                    case 'nw':

                        if (this.fnwAnim) {
                            this.sprite.animations.play(this.fnwAnim);
                        } else if (this.nwAnim) {
                            this.sprite.animations.play(this.nwAnim);
                        }

                        break;

                    case 'ne':

                        if (this.fneAnim) {
                            this.sprite.animations.play(this.fneAnim);
                        } else if (this.neAnim) {
                            this.sprite.animations.play(this.neAnim);
                        }

                        break;

                    case 'sw':

                        if (this.fswAnim) {
                            this.sprite.animations.play(this.fswAnim);
                        } else if (this.swAnim) {
                            this.sprite.animations.play(this.swAnim);
                        }

                        break;

                    case 'se':

                        if (this.fseAnim) {
                            this.sprite.animations.play(this.fseAnim);
                        } else if (this.seAnim) {
                            this.sprite.animations.play(this.seAnim);
                        }

                        break;

                }

                break;
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
        var n = false;
        var s = false;
        var w = false;
        var e = false;
        //If the key is defined, this determines if its pressed
        if (this.nKey) { n = this.nKey.isDown };
        if (this.sKey) { s = this.sKey.isDown };
        if (this.wKey) { w = this.wKey.isDown };
        if (this.eKey) { e = this.eKey.isDown };

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