var level_01 = {

	preload: function () {

	},
	create: function () {
		console.log("level_01.js");

		game.physics.startSystem(Phaser.Physics.ARCADE);

		this.prevDir = '';	// holds sprites previous direction (left , right) so
		// we can face the correct direction when using the 'idle' animation

		// Adding the knight atlas that contains all the animations
		this.player = game.add.sprite(game.camera.width / 2, game.camera.height / 2, 'knight_atlas');

		//Controls timing of player actions
		this.player.attacking = false;
		this.player.jumping = false;
		this.player.dead = false;

		// Add walking and idle animations. Different aninmations are needed based on direction of movement.
		this.player.animations.add('walk_left', Phaser.Animation.generateFrameNames('Walk_left', 0, 8), 20, true);
		this.player.animations.add('walk_right', Phaser.Animation.generateFrameNames('Walk_right', 0, 8), 20, true);
		this.player.animations.add('idle_left', Phaser.Animation.generateFrameNames('Idle_left', 0, 9), 20, true);
		this.player.animations.add('idle_right', Phaser.Animation.generateFrameNames('Idle_right', 0, 9), 20, true);
		this.player.animations.play('idle_left');
		// Running animations
		this.player.animations.add('run_left', Phaser.Animation.generateFrameNames('Run_left', 0, 9), 20, true);
		this.player.animations.add('run_right', Phaser.Animation.generateFrameNames('Run_right', 0, 9), 20, true);
		// Attack Animations
		this.player.animations.add('atk_left', Phaser.Animation.generateFrameNames('Attack_left', 0, 9), 20, false);
		this.player.animations.add('atk_right', Phaser.Animation.generateFrameNames('Attack_right', 0, 9), 20, false);
		// Jump Animations
		this.player.animations.add('jmp_left', Phaser.Animation.generateFrameNames('Jump_left', 0, 9), 20, false);
		this.player.animations.add('jmp_right', Phaser.Animation.generateFrameNames('Jump_right', 0, 9), 20, false);
		// Jump-Attack Animations
		this.player.animations.add('jmpatk_left', Phaser.Animation.generateFrameNames('JumpAttack_left', 0, 9), 20, false);
		this.player.animations.add('jmpatk_right', Phaser.Animation.generateFrameNames('JumpAttack_right', 0, 9), 20, false);
		//Dead animation
		this.player.animations.add('die', Phaser.Animation.generateFrameNames('Dead', 1, 10), 20, false);

		// Enable various actions after an animation completes
		this.player.events.onAnimationComplete.add(function () {
			this.player.attacking = false;
			this.player.jumping = false;
		}, this);

		// turn physics on for player
		game.physics.arcade.enable(this.player);

		// Set the anchor to the middle of his feet
		this.player.anchor.setTo(.5, 1);

		this.downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
		this.upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
		this.leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
		this.rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
		this.spaceBar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		this.shiftKey = game.input.keyboard.addKey(Phaser.Keyboard.SHIFT);
		//Shortcut to make him die.
		this.die = game.input.keyboard.addKey(Phaser.Keyboard.F);
		game.addPauseButton(game);
	},

	update: function () {

		if (this.die.isDown){
			console.log("SHOULD DIE");
			this.player.dead = true;
			this.player.animations.play('die');
		}

		//If the player isn't dead.
		if (!this.player.dead) {

			//Attack if able (not attacking, jumping)
			if (!this.player.attacking && game.input.activePointer.isDown) {

				//If not jumping, ground attack
				if (!this.player.jumping) {
					//Left or right?
					if (game.input.activePointer.x > this.player.x) {
						this.player.animations.play('atk_right');
					} else {
						this.player.animations.play('atk_left');
					}
					//Disable attacking again until animation completes
					this.player.attacking = true;
				}
				// Or do a jump attack
				else {
					//Left or right?
					if (game.input.activePointer.x > this.player.x) {
						this.player.animations.play('jmpatk_right');
					} else {
						this.player.animations.play('jmpatk_left');
					}
					//Disable attacking or jumping until animation completes
					this.player.attacking = true;
					this.player.jumping = true;
				}

			}

			//Jump if able (not attacking, jumping)
			if (!this.player.attacking && !this.player.jumping && this.spaceBar.isDown) {

				if (this.prevDir == 'right') {
					this.player.animations.play('jmp_right');
				} else {
					this.player.animations.play('jmp_left');
				}

				//Disable attacking again until animation completes
				this.player.jumping = true;
			}

			//Move if able (not attacking, jumping)
			if (!this.player.attacking && !this.player.jumping) {
				this.move();
			} else {
				//Don't perform the full movement action (animations and what not)
				//But the player's speed does need to be 0
				//This should later be included in move() somehow
				this.player.body.velocity.x = 0;
				this.player.body.velocity.y = 0;
			}

		}

	},

	render: function () {
		game.debug.bodyInfo(this.player, 16, 24);
		// Instructions:
		game.debug.text("Use arrow keys to move sprite around.", game.width / 2, game.height - 10);
	},

	/* Function: move()
	** Desc: runs every update to control player movement
	*/
	move: function () {
		//Four main directions
		var n = this.upKey.isDown;
		var s = this.downKey.isDown;
		var w = this.leftKey.isDown;
		var e = this.rightKey.isDown;
		//Four corners
		var nw = n && w;
		var ne = n && e;
		var sw = s && w;
		var se = s && e;
		//Impossible two
		var ns = n && s;
		var we = w && e;
		//Is he running?
		var run = this.shiftKey.isDown;
		//if (run) {console.log("RUN");};

		//If no weird combinations are pressed
		if (!ns && !we) {

			//Check corners first so cardinal directions don't break the logic
			if (nw) {
				this.player.body.velocity.x = -200;
				this.player.body.velocity.y = -200;
				//Check if the player is running
				if (run) {
					this.player.body.velocity.x *= 1.5;
					this.player.body.velocity.y *= 1.5;
					this.player.animations.play('run_left');
				} else {
					this.player.animations.play('walk_left');
				}
				this.prevDir = 'left'
			} else if (ne) {
				this.player.body.velocity.x = 200;
				this.player.body.velocity.y = -200;
				//Check if the player is running
				if (run) {
					this.player.body.velocity.x *= 1.5;
					this.player.body.velocity.y *= 1.5;
					this.player.animations.play('run_right');
				} else {
					this.player.animations.play('walk_right');
				}
				this.prevDir = 'right'
			} else if (sw) {
				this.player.body.velocity.x = -200;
				this.player.body.velocity.y = 200;
				//Check if the player is running
				if (run) {
					this.player.body.velocity.x *= 1.5;
					this.player.body.velocity.y *= 1.5;
					this.player.animations.play('run_left');
				} else {
					this.player.animations.play('walk_left');
				}
				this.prevDir = 'left'
			} else if (se) {
				this.player.body.velocity.x = 200;
				this.player.body.velocity.y = 200;
				//Check if the player is running
				if (run) {
					this.player.body.velocity.x *= 1.5;
					this.player.body.velocity.y *= 1.5;
					this.player.animations.play('run_right');
				} else {
					this.player.animations.play('walk_right');
				}
				this.prevDir = 'right'
			}

			//Then check the four main directions
			else if (n) {
				this.player.body.velocity.x = 0;
				this.player.body.velocity.y = -200;
				//Determine which direction to face while moving up
				if (this.prevDir == 'left') {
					if (run) {
						//handle if the player is running
						this.player.body.velocity.x *= 1.5;
						this.player.body.velocity.y *= 1.5;
						this.player.animations.play('run_left');
					} else {
						this.player.animations.play('walk_left');
					}
				} else {
					if (run) {
						//handle if the player is running
						this.player.body.velocity.x *= 1.5;
						this.player.body.velocity.y *= 1.5;
						this.player.animations.play('run_right');
					} else {
						this.player.animations.play('walk_right');
					}
				}
			} else if (s) {
				this.player.body.velocity.x = 0;
				this.player.body.velocity.y = 200;
				//Determine which direction to face while moving down
				if (this.prevDir == 'left') {
					if (run) {
						//handle if the player is running
						this.player.body.velocity.x *= 1.5;
						this.player.body.velocity.y *= 1.5;
						this.player.animations.play('run_left');
					} else {
						this.player.animations.play('walk_left');
					}
				} else {
					if (run) {
						//handle if the player is running
						this.player.body.velocity.x *= 1.5;
						this.player.body.velocity.y *= 1.5;
						this.player.animations.play('run_right');
					} else {
						this.player.animations.play('walk_right');
					}
				}
			} else if (e) {
				this.player.body.velocity.x = 200;
				this.player.body.velocity.y = 0;
				//Check if the player is running
				if (run) {
					this.player.body.velocity.x *= 1.5;
					this.player.body.velocity.y *= 1.5;
					this.player.animations.play('run_right');
				} else {
					this.player.animations.play('walk_right');
				}
				this.prevDir = 'right'
			} else if (w) {
				this.player.body.velocity.x = -200;
				this.player.body.velocity.y = 0;
				//Check if the player is running
				if (run) {
					this.player.body.velocity.x *= 1.5;
					this.player.body.velocity.y *= 1.5;
					this.player.animations.play('run_left');
				} else {
					this.player.animations.play('walk_left');
				}
				this.prevDir = 'left'
			}

			//If no keys are pressed
			else {
				this.player.body.velocity.x = 0;
				this.player.body.velocity.y = 0;
				//Get the correct facing idle animation
				if (this.prevDir == 'left') {
					this.player.animations.play('idle_left');
				} else {
					this.player.animations.play('idle_right');
				}
			}

		} else {
			//If they're pressing contradicting buttons
			this.player.body.velocity.x = 0;
			this.player.body.velocity.y = 0;
			//Get the correct facing idle animation
			if (this.prevDir == 'left') {
				this.player.animations.play('idle_left');
			} else {
				this.player.animations.play('idle_right');
			}
		}
	}
}