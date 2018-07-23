/* Program: Assignment 04 - Falling game
** Description: A guy with wings can't fly b/c he sucks now he has to shoot
**     obstacles and try to score points.
** Author: Jeremy Glebe
** File: play.js
** Purpose: Actual gameplay. Controls, player, obstacles. Its all here.
*/

var play = function () { }
play.prototype = {

    create: function () {

        //Change the background color to a nice "sky blue"
        this.stage.backgroundColor = '#00aaff';

        //Counts the number of frames that have passed, for spawning
        frameCounter = 120;
        frameDelay = 120;

        //World width & height
        var gw = this.world.width;
        var gh = this.world.height;

        //The game world needs physics
        this.game.physics.startSystem(Phaser.Physics.ARCADE)

        //The player
        this.player = this.game.add.sprite(gw / 2, gh / 6, 'guy');
        this.game.physics.enable(this.player, Phaser.Physics.ARCADE)
        this.player.enableBody = true;
        this.player.body.collideWorldBounds = true;
        this.player.anchor.setTo(.5, .5)
        this.player.body.setSize(this.player.width - 10, this.player.height)
        //Initialize the score
        this.player.score = 0;
        //Player animation
        this.player.animations.add('fly', [0, 1], 5, -1);
        this.player.animations.play('fly');
        //Player's fireballs
        this.player.shots = this.game.add.group();

        //Score text
        this.stext = this.game.add.text(gw / 2, gh / 40, "0");

        //Obstacles object
        this.obstacles = this.game.add.group();
        this.obstacles.speed = 100;

        //Create keyboard controls
        var l = Phaser.KeyCode.LEFT;
        var r = Phaser.KeyCode.RIGHT;
        var a = Phaser.KeyCode.A;
        var d = Phaser.KeyCode.D;
        keys = this.game.input.keyboard.addKeys({
            'left': l,
            'right': r,
            'A': a,
            'D': d
        });
        this.game.input.keyboard.addKeyCapture([a, d, l, r]);
    },

    update: function () {

        this.game.physics.arcade.overlap(this.player, this.obstacles, this.gameOver, null, this);
        this.game.physics.arcade.overlap(this.player.shots, this.obstacles, this.shotHit, null, this);

        //Creates obstacles with frequency relative to the score
        if (frameCounter == 0) {
            this.spawnObstacle();
        }

        //Destroy obstacles that are too high
        for (var i = 0; i < this.obstacles.length; i++) {
            //This method will handle checking y and destroying
            this.obstacles.children[i].outGameDestroy();
        }

        //Destroy fireballs that are out
        for (var i = 0; i < this.player.shots.length; i++) {
            if (!(this.player.shots.children[i].inWorld)) {
                this.player.shots.children[i].pendingDestroy = true;
                //console.log(this.player.shots)
            }
        }

        //Control the player's movement with keys
        if (keys['left'].isDown || keys['A'].isDown) {
            this.player.x -= 5;
        } else if (keys['right'].isDown || keys['D'].isDown) {
            this.player.x += 5;
        }

        /*******Mouse actions*******/
        var px = this.game.input.activePointer.x;
        var py = this.game.input.activePointer.y;
        //Is the pointer over the player?
        var rel_x = Math.abs(px - this.player.x);
        var rel_y = Math.abs(py - this.player.y);
        var plySelected = (rel_x < 40 && rel_y < 40);
        //Player ability to create a fireball at click;
        if (this.game.input.activePointer.isDown && !plySelected && this.game.global.CAN_CLICK) {
            var shot = this.player.shots.create(this.player.x, this.player.y, 'fireball');
            //Setting up the fireball
            this.game.physics.enable(shot, Phaser.Physics.ARCADE);
            shot.enableBody = true;
            var ang = (this.physics.arcade.angleToPointer(shot) * (180 / Math.PI)) + 180;
            shot.scale.setTo(.25, .25)
            shot.anchor.setTo(.5, .5);
            shot.angle = ang;
            shot.animations.add('fire', [0, 4], 10, -1);
            shot.animations.play('fire');
            //Determining speed
            shot.body.velocity.x = -500 * Math.cos(ang * (Math.PI / 180));
            shot.body.velocity.y = -500 * Math.sin(ang * (Math.PI / 180));
        }

        //Mouse click management, update mouse click
        if (this.game.input.activePointer.isDown) {
            //This allows us to check for a single click
            if (this.game.global.CAN_CLICK == true) {
                this.game.global.CAN_CLICK = false;
            }
        } else {
            //This allows us to check for a single click
            this.game.global.CAN_CLICK = true;
        }

        //Update the frame counter
        frameDelay = (120 - this.player.score > 30) ? (120 - this.player.score) : 30;
        frameCounter--;

    },

    spawnObstacle: function () {

        console.log("Ob spawned on frame: " + String(frameCounter));

        var obstacle;
        var r = rint(2); //Random ob selector
        //World width & height
        var gw = this.game.world.width;
        var gh = this.game.world.height;

        //Randomly selects an object to spawn
        if (r == 0) {
            obstacle = this.obstacles.create(rint(gw), gh, 'axe');
            obstacle.type = 'axe';
        } else if (r == 1) {
            obstacle = this.obstacles.create(rint(gw), gh, 'boulder');
            obstacle.type = 'boulder';
        }

        this.game.physics.enable(obstacle, Phaser.Physics.ARCADE);
        obstacle.enableBody = true;
        //Sets the origin of the object to the center
        obstacle.anchor.setTo(.5, .5);
        //Destroys the object when its flown off screen
        obstacle.outGameDestroy = function () {
            if (obstacle.y < 0 - obstacle.height) {
                //pending destroy so it can be done iteratively over the group
                obstacle.pendingDestroy = true;
            }
        }
        //Size adjustment
        obstacle.scale.setTo(.25, .25);
        //Rotate it
        obstacle.body.angularVelocity = 200 + (5 * this.player.score);
        //Determining the obstacles speed
        obstacle.body.velocity.y = -(100 + (5 * this.player.score));

        frameCounter = frameDelay;

        return obstacle;

    },

    shotHit: function (shot, ob) {
        shot.destroy();
        ob.destroy();
        this.player.score += 1;
        this.stext.text = String(this.player.score);
    },

    gameOver: function (ply, ob) {

        console.log("wrecked.");
        this.game.state.start('menu');

    }

}