/* Program: Assignment 03 - Freefall Game
** Description: Modified version of the freefall game from class. Now featuring
**     difficulty scaling based on score.
** Author: Jeremy Glebe
** File: play.js
** Purpose: The main file that controls the game. This handles effecitively
**     everything. Obstacles, the player, scoring points. Its all here.
*/

var play = {
	create: function () {
		console.log("play.js");
		// Game width and height for convenience
		w = game.width
		h = game.height
		//Number of updates that has occured
		frame_counter = 0
		// Bg color
		game.stage.backgroundColor = BG_COLOR
		// Bg image
		this.bg = game.add.image(0, 0, 'bg')
		// Platform width
		platform_width = game.cache.getImage('obstacle').width
		// Score sound
		this.sound.score = game.add.audio('score')
		this.sound.score.volume = .4
		// Death sound
		this.sound.kill = game.add.audio('kill')
		// Music
		this.music = game.add.audio('music')
		this.music.play('', 0, 0.5, true)
		//Kick off the physics system
		this.physics.startSystem(Phaser.Physics.ARCADE)
		// Obstacles
		this.obstacles = game.add.group()
		// Player
		this.player = game.add.sprite(game.width / 2, 250, 'player')
		game.physics.enable(this.player, Phaser.Physics.ARCADE)
		this.player.enableBody = true
		this.player.body.collideWorldBounds = true
		this.player.scale.setTo(.5, .5)
		this.player.anchor.setTo(.5, .5)
		this.player.body.setSize(this.player.width - 10, this.player.height)
		// Score label
		this.bmpText = game.add.bitmapText(game.width / 2, 100, 'fontUsed', '', 150);
		this.bmpText.anchor.setTo(.5, .5)
		this.bmpText.scale.setTo(.3, .3)
		// Support for mouse click and touchscreen input
		game.input.onDown.add(this.onDown, this)
		//
		this.pauseAndUnpause(game)
	},

	//Changed
	/* Function: update()
	** Desc: Runs each time the game updates. 60/s
	*/
	update: function () {
		this.bmpText.text = game.global.score
		// Collision
		game.physics.arcade.overlap(this.player, this.obstacles, this.killPlayer, null, this)
		// Spawns the obstacles with increasing frequency
		if (frame_counter % game.global.ob_frames == 0) {
			console.log("Ob spawned on frame: " + String(frame_counter))
			//No longer spawn in pairs, random x
			this.spawnObstacle(game.global.obstacle_id++, game.rnd.integerInRange(0, game.width), game.height, speed = 200 * game.global.g_speed)
		}
		frame_counter++
		//Moves the player if needed
		this.move();
		//Checks if the score should be increased and does
		game.global.score += this.scorePoint();
	},

	//Changed
	/* Function: spawnObstacle()
	** Description: Spawns a random obstacle for the player to avoid
	** Params:
	**     entity - I left this alone. I think its an id?
	**     x - x coordinate on screen. Left->Right
	**     y - y coordinate on screen. Top->Bottom
	**     speed - The speed at which to move up
	*/
	spawnObstacle: function (entity, x, y, speed) {
		//This generates a random obstacle
		var obstacle;
		var r = game.rnd.integerInRange(0, 2)
		if (r == 0) {
			obstacle = this.obstacles.create(x, y, 'obstacle', entity)
		} else if (r == 1) {
			obstacle = this.obstacles.create(x, y, 'boulder', entity)
			obstacle.scale.setTo(.25, .25)
		} else {
			obstacle = this.obstacles.create(x, y, 'axe', entity)
			obstacle.scale.setTo(.125, .125)
		}

		game.physics.enable(obstacle, Phaser.Physics.ARCADE)

		obstacle.enableBody = true
		obstacle.body.colliderWorldBounds = true
		obstacle.body.immovable = true
		obstacle.anchor.setTo(.5, .5)
		obstacle.body.velocity.y = -speed
		// To ensure you only score once per obstacle
		obstacle.scored = false;

		obstacle.checkWorldBounds = true;
		// Kill obstacle/enemy if vertically out of bounds
		obstacle.events.onOutOfBounds.add(this.killObstacle, this);

		obstacle.outOfBoundsKill = true;
		//console.log(this.obstacles);
	},

	killObstacle: function (obstacle) {
		//console.log(obstacle);
		this.obstacles.remove(obstacle);
		//console.log(this.obstacles.children.length);
	},

	/* Function: scorePoint()
	** Desc: Determines if a point should be scored each update.
	** Return: 1 point, or 0 points to be added to score.
	*/
	scorePoint: function () {
		//console.log(this.obstacles)
		var point = 0;
		var obstacles = this.obstacles.children;
		//For ever obstacle
		for (var i = 0; i < obstacles.length; i++) {
			//If it is visible
			if (obstacles[i].visible) {
				let py = this.player.y;
				let oy = obstacles[i].y;
				let ox = obstacles[i].x;
				//If below obstacle and haven't already scored off of it
				if (py > oy && !obstacles[i].scored) {
					point++;
					this.sound.score.play('', 0, 0.5, false)
					// Increase the game speed
					game.global.g_speed += .1;
					// Flag the obstacle as already scored from
					obstacles[i].scored = true;
					// Controls hbow frequently obstacles spawn based on score
					if (game.global.score > 90) {
						// This is the highest possible frequency
						game.global.ob_frames = 30;
					} else {
						// Otherwise, frame delay is 120 - score
						game.global.ob_frames = 120 - game.global.score;
					}
				}
			}
		}
		return point;
	},

	killPlayer: function (player) {

		//issues with this
		//game.plugins.screenShake.shake(20);
		this.sound.kill.play('', 0, 0.5, false)
		player.kill();
		game.state.start('gameOver');

	},


	// Tap on touchscreen or click with mouse
	onDown: function (pointer) { },

	// Move player
	move: function () {
		if (game.input.activePointer.isDown) {
			//console.log(game.input.x);
			let rate = this.moveSpeed(game.input.x, game.width);
			let angle = this.moveAngle(rate, 3);
			//console.log("rate: " + rate);
			this.player.x += rate;
			this.player.angle = angle;
		} else {
			this.player.angle = 0;
		}
	},
	moveAngle: function (rate, factor) {

		return rate * factor;
	},

	moveSpeed: function (x, width, skill = 2) {
		var ratio = 0;

		if (x < width / 2) {
			ratio = x / (width / 2);
			ratio *= 10;
			ratio = Math.ceil(ratio);
			ratio /= 2;
			rate = (5 - ratio) * -1;
		} else {
			ratio = x / width;
			ratio *= 10;
			ratio = Math.ceil(ratio);
			ratio /= 2;
			rate = ratio;
		}

		// Experimental way to increase movement speed with score, so the
		// difficulty increases but remains possible
		return rate * skill * game.global.g_speed;

		//return rate * skill;
	},

	pauseAndUnpause: function (game) {
		var pause_button = game.add.sprite(game.width - 40, 40, 'pause')
		pause_button.anchor.setTo(.5, .5)
		pause_button.inputEnabled = true
		// pause:
		pause_button.events.onInputUp.add(
			function () {
				if (!game.paused) {
					game.paused = true
				}
				pause_watermark = game.add.sprite(game.width / 2, game.height / 2, 'pause')
				pause_watermark.anchor.setTo(.5, .5)
				pause_watermark.alpha = .1
			}, this)
		// Unpause:
		game.input.onDown.add(
			function () {
				if (game.paused) {
					game.paused = false
					pause_watermark.destroy()
				}
			}, self)
	},

	render: function () {
		debug = false
		if (debug) {
			// Show hitbox
			game.debug.body(this.player)

			for (var i = 0; i < obstacles.length; i++) {
				game.debug.body(obstacles[i])
			}
		}
	}
}