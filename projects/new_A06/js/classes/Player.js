/* Program: A06
** Author: Jeremy Glebe
** Description: 
** File: Player.js
** Purpose: Creates the player class
*/

//if A06 exists, use it, otherwise initiate it as empty object
var A06 = A06 || {};

/* Class: Player
** Desc: The player character in the game
** Params:
**     args: a set of key-value pairs used as arguments
**     The keys are listed below
** Keys:
**     buttons: a key-value object for player buttons
**         upKey, downKey, leftkey, rightKey
*/
//Constructor
A06.Player = function (args) {
    console.log("Constructor: Player()"); console.log(args);
    //Run the actual creation code
    this.myCreate(args);
};
//Prototype
A06.Player.prototype = {

    myCreate: function (args) {
        console.log("Player.myCreate()"); console.log(args);

        //We need some keys to control the player
        this.buttons = args.buttons || {
            upKey: A06.game.input.keyboard.addKey(Phaser.Keyboard.UP),
            downKey: A06.game.input.keyboard.addKey(Phaser.Keyboard.DOWN),
            leftKey: A06.game.input.keyboard.addKey(Phaser.Keyboard.LEFT),
            rightKey: A06.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT),
            atkKey: A06.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
        }

        //Create the player's sprites
        this.createSqr(args);
        this.createVis(args);
        this.createAtkB(args);

        //Flags
        this.attacking = false;
        this.animBusy = false;
    },

    myUpdate: function () {
        this.sqr.myUpdate();
        this.vis.myUpdate();
        this.atkB.myUpdate();
        if (this.buttons.atkKey.isDown) {
            this.attack();
        }
    },

    createAtkB: function (args) {
        console.log("Player.createAtkB()"); console.log(args);

        //Determine width/height of tiles
        var tileWidth = 32;
        var tileHeight = 32;

        //Sprite: Player's attack hitbox
        this.attackBox = A06.game.add.sprite(args.x + 30, args.y + 30, 'block');
        //Aliases
        this.atkB = this.attackBox;
        this.atkB.p = this;

        //Adding physics
        console.log("Adding Physics: Player.attackBox");
        A06.game.physics.arcade.enable(this.attackBox);

        //Modifying sprite
        this.attackBox.tint = 0xff0000;
        this.attackBox.alpha = 0.5;
        this.attackBox.anchor.setTo(0.5);
        this.attackBox.width = 0.5 * tileWidth;
        this.attackBox.height = 0.5 * tileHeight;

        //Update function
        this.atkB.myUpdate = function () {
            //Scope Note: 'this' is 'Player.attackBox'

            //Change the location of the box
            //Coordinates of player's visible body
            var vX = this.p.vis.x;
            var vY = this.p.vis.y;
            //Should be centered with the player's body
            if (!this.p.attacking) {
                this.x = vX + (this.p.vis.width / 2);
                this.y = vY + (this.p.vis.height / 2);
            } else {
                //Calling attack again adjusts the position based on attacking
                this.p.attack();
            }

        };

    },

    createSqr: function (args) {
        console.log("Player.createSqr()"); console.log(args);

        //Determine width/height of tiles
        var tileWidth = 32;
        var tileHeight = 32;

        //Sprite: Player movement square
        this.square = A06.game.add.sprite(args.x, args.y, 'block');
        //Aliases
        this.sqr = this.square;
        this.sqr.p = this;

        //Adding physics
        console.log("Adding Physics: Player.square");
        A06.game.physics.arcade.enable(this.square);

        //We'll use a MoveControl object to move this
        this.square.mover = new A06.MoveControl(this.createSqrMvConf());

        //The square will track the last direction it moved
        this.square.direction = 's';

        //Modifying sprite
        this.square.tint = 0x00ff00;
        this.square.alpha = 0.5;
        this.square.anchor.setTo(0.5);
        this.square.width = 0.75 * tileWidth;
        this.square.height = 0.5 * tileHeight;

        //Update function
        this.square.myUpdate = function () {
            //Scope Note: 'this' is 'Player.square'

            this.mover.move();
            this.direction = this.mover.direction;

            //Set the animation if not busy
            if (!this.p.animBusy) {
                switch (this.direction) {
                    case 'n':
                        if (this.body.velocity.y < 0) {
                            this.p.vis.animations.play('nMove');
                        } else {
                            this.p.vis.animations.play('nIdle');
                        }
                        break;
                    case 's':
                        if (this.body.velocity.y > 0) {
                            this.p.vis.animations.play('sMove');
                        } else {
                            this.p.vis.animations.play('sIdle');
                        }
                        break;
                    case 'w':
                        if (this.body.velocity.x < 0) {
                            this.p.vis.animations.play('wMove');
                        } else {
                            this.p.vis.animations.play('wIdle');
                        }
                        break;
                    case 'e':
                        if (this.body.velocity.x > 0) {
                            this.p.vis.animations.play('eMove');
                        } else {
                            this.p.vis.animations.play('eIdle');
                        }
                        break;
                    case 'nw':
                        if (this.body.velocity.y < 0) {
                            this.p.vis.animations.play('nwMove');
                        } else {
                            this.p.vis.animations.play('nwIdle');
                        }
                        break;
                    case 'ne':
                        if (this.body.velocity.y < 0) {
                            this.p.vis.animations.play('neMove');
                        } else {
                            this.p.vis.animations.play('neIdle');
                        }
                        break;
                    case 'sw':
                        if (this.body.velocity.y > 0) {
                            this.p.vis.animations.play('swMove');
                        } else {
                            this.p.vis.animations.play('swIdle');
                        }
                        break;
                    case 'se':
                        if (this.body.velocity.y > 0) {
                            this.p.vis.animations.play('seMove');
                        } else {
                            this.p.vis.animations.play('seIdle');
                        }
                        break;
                }
            }

        };

    },

    createSqrMvConf: function (args) {
        //Generate the config for player square's move object
        var mvConf = {
            subject: this.square,
            keys: {
                n: this.buttons.upKey,
                s: this.buttons.downKey,
                e: this.buttons.rightKey,
                w: this.buttons.leftKey
            }
        }
        return mvConf;
    },

    createVis: function (args) {
        console.log("Player.createVis()"); console.log(args);

        //Sprite: Player's visible body
        this.visual = A06.game.add.sprite(args.x, args.x, 'player', 'idle0');
        //Aliases
        this.vis = this.visual;
        this.vis.p = this;

        //Add animations
        this.createVisAnims(args);

        //Adding physics
        console.log("Adding Physics: Player.visual");
        A06.game.physics.arcade.enable(this.visual);

        //Update function
        this.visual.myUpdate = function () {
            //Scope Note: 'this' is 'Player.visual'

            //Moving the player's visible body
            //Coordinates of player's movement square
            var sX = this.p.sqr.x;
            var sY = this.p.sqr.y;
            //Bottom of the Player's feet line up with the square's center
            this.x = sX - (this.width / 2);
            this.y = sY - (this.height);

        }

    },

    createVisAnims: function (args) {

        //Animations
        this.vis.animations.add('sIdle', ['idle0'], 5, true);
        this.vis.animations.add('nIdle', ['idle2'], 5, true);
        this.vis.animations.add('wIdle', ['idle4'], 5, true);
        this.vis.animations.add('eIdle', ['idle6'], 5, true);
        this.vis.animations.add('swIdle', ['idle8'], 5, true);
        this.vis.animations.add('seIdle', ['idle10'], 5, true);
        this.vis.animations.add('nwIdle', ['idle12'], 5, true);
        this.vis.animations.add('neIdle', ['idle14'], 5, true);
        this.vis.animations.add('sAttack', ['idle1'], 4, true);
        this.vis.animations.add('nAttack', ['idle3'], 4, true);
        this.vis.animations.add('wAttack', ['idle5'], 4, true);
        this.vis.animations.add('eAttack', ['idle7'], 4, true);
        this.vis.animations.add('swAttack', ['idle9'], 4, true);
        this.vis.animations.add('seAttack', ['idle11'], 4, true);
        this.vis.animations.add('nwAttack', ['idle13'], 4, true);
        this.vis.animations.add('neAttack', ['idle15'], 4, true);
        this.vis.animations.add('sMove', Phaser.Animation.generateFrameNames('move', 0, 2), 5, true);
        this.vis.animations.add('nMove', Phaser.Animation.generateFrameNames('move', 3, 5), 5, true);
        this.vis.animations.add('wMove', Phaser.Animation.generateFrameNames('move', 6, 8), 5, true);
        this.vis.animations.add('eMove', Phaser.Animation.generateFrameNames('move', 9, 11), 5, true);
        this.vis.animations.add('swMove', Phaser.Animation.generateFrameNames('move', 12, 14), 5, true);
        this.vis.animations.add('seMove', Phaser.Animation.generateFrameNames('move', 15, 17), 5, true);
        this.vis.animations.add('nwMove', Phaser.Animation.generateFrameNames('move', 18, 20), 5, true);
        this.vis.animations.add('neMove', Phaser.Animation.generateFrameNames('move', 21, 23), 5, true);
        this.vis.animations.add('die', ['idle0', 'idle8', 'idle4', 'idle13', 'idle3'], 5, false);

    },

    report: function () {
        console.log("Report for Player object:")
        console.log(this);
    },

    attack: function () {
        if (!this.attacking) {
            //Set the player's "attacking" flag to true
            this.attacking = true;
            //Set flags for animation is busy and move in fixed direction
            this.animBusy = true;
            this.sqr.mover.fixDir = true;
            console.log("Set Flag: attacking");

            //Center of player's visible body
            var vX = this.vis.x + (this.vis.width / 2);
            var vY = this.vis.y + (this.vis.height / 2);
            //Move the attack hitbox & play animation based on direction
            switch (this.sqr.direction) {
                case 'n':
                    this.atkB.y = vY - 0.5 * this.vis.height;
                    this.vis.animations.play('nAttack');
                    break;
                case 's':
                    this.atkB.y = vY + 0.5 * this.vis.height;
                    this.vis.animations.play('sAttack');
                    break;
                case 'w':
                    this.atkB.x = vX - 0.5 * this.vis.width;
                    this.vis.animations.play('wAttack');
                    break;
                case 'e':
                    this.atkB.x = vX + 0.5 * this.vis.width;
                    this.vis.animations.play('eAttack');
                    break;
                case 'nw':
                    this.atkB.x = vX - 0.5 * this.vis.width;
                    this.atkB.y = vY - 0.5 * this.vis.height;
                    this.vis.animations.play('nwAttack');
                    break;
                case 'ne':
                    this.atkB.x = vX + 0.5 * this.vis.width;
                    this.atkB.y = vY - 0.5 * this.vis.height;
                    this.vis.animations.play('neAttack');
                    break;
                case 'sw':
                    this.atkB.x = vX - 0.5 * this.vis.width;
                    this.atkB.y = vY + 0.5 * this.vis.height;
                    this.vis.animations.play('swAttack');
                    break;
                case 'se':
                    this.atkB.x = vX + 0.5 * this.vis.width;
                    this.atkB.y = vY + 0.5 * this.vis.height;
                    this.vis.animations.play('seAttack');
                    break;
            }

            //Make sure to reset the flag
            A06.game.time.events.add(250, function () {
                this.attacking = false;
                //Set flags for animation is busy and move in fixed direction
                this.animBusy = false;
                this.sqr.mover.fixDir = false;
                console.log("Reset Flag: attacking");
            }, this);

        } else {
            //If the player is already attacking, this may be being called by
            //an update method to ensure the box is in the correct place

            //Center of player's visible body
            var vX = this.vis.x + (this.vis.width / 2);
            var vY = this.vis.y + (this.vis.height / 2);
            //Move the attack hitbox based on direction
            switch (this.sqr.direction) {
                case 'e':
                case 'ne':
                case 'se':
                    this.atkB.x = vX + 0.5 * this.vis.width;
                    break;
                case 'w':
                case 'nw':
                case 'sw':
                    this.atkB.x = vX - 0.5 * this.vis.width;
                    break;
            }
            switch (this.sqr.direction) {
                case 'n':
                case 'nw':
                case 'ne':
                    this.atkB.y = vY - 0.5 * this.vis.height;
                    break;
                case 's':
                case 'sw':
                case 'se':
                    this.atkB.y = vY + 0.5 * this.vis.height;
                    break;
            }

        }
    }

};