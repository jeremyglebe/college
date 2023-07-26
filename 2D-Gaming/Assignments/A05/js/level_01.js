var level_01 = {

	preload: function () {

	},
	create: function () {
		game.physics.startSystem(Phaser.Physics.ARCADE);

		// Adding the knight atlas that contains all the animations
		this.player = game.add.sprite(game.camera.width / 2, game.camera.height / 2, 'knight_atlas');
		// turn physics on for player
		game.physics.arcade.enable(this.player);
		// Set the anchor to the middle of his feet
		this.player.anchor.setTo(.5, 1);
		//Action flags
		this.player.jumping = false;
		this.player.attacking = false;
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
		//Death Animation
		this.player.animations.add('die', Phaser.Animation.generateFrameNames('Dead', 1, 10), 20, false);

		//Defining keys
		this.downKey = game.input.keyboard.addKey(Phaser.Keyboard.S);
		this.upKey = game.input.keyboard.addKey(Phaser.Keyboard.W);
		this.leftKey = game.input.keyboard.addKey(Phaser.Keyboard.A);
		this.rightKey = game.input.keyboard.addKey(Phaser.Keyboard.D);
		this.shiftKey = game.input.keyboard.addKey(Phaser.Keyboard.SHIFT);
		this.spaceBar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		this.dieKey = game.input.keyboard.addKey(Phaser.Keyboard.F);

		//Creating the player's walking object
		//First the configuation
		this.player.walkConfig = {

			//Properties
			sprite: this.player,
			speed: 150,

			//Keys
			nKey: this.upKey,
			sKey: this.downKey,
			wKey: this.leftKey,
			eKey: this.rightKey,

			//Moving Animations
			wAnim: 'walk_left',
			eAnim: 'walk_right',

			//Facing Animations
			fwAnim: 'idle_left',
			feAnim: 'idle_right'

		}
		//Then the actual object
		this.player.walk = new Move8(this.player.walkConfig);
		//Creating the player's running object
		//First the configuation
		this.player.runConfig = {

			//Properties
			sprite: this.player,
			speed: 300,

			//Keys
			nKey: this.upKey,
			sKey: this.downKey,
			wKey: this.leftKey,
			eKey: this.rightKey,

			//Moving Animations
			wAnim: 'run_left',
			eAnim: 'run_right',

			//Facing Animations
			fwAnim: 'idle_left',
			feAnim: 'idle_right'

		}
		//Then the actual object
		this.player.run = new Move8(this.player.runConfig);

		game.addPauseButton(game);
	},

	update: function () {

		if (this.dieKey.isDown){
			this.die();
		}

		if (!this.player.jumping){
		if (this.shiftKey.isDown) {
			this.player.run.move();
			//The only connecting that needs to be done between the two objects
			this.player.walk.direction = this.player.run.direction;
		} else {
			this.player.walk.move();
			//The only connecting that needs to be done between the two objects
			this.player.run.direction = this.player.walk.direction;
		}
	}

		if (this.spaceBar.isDown) { this.jump(); }
		if (game.input.activePointer.isDown) { this.attack(); }

	},

	render: function () {
		// Instructions:
		game.debug.text("Use WASD keys to move sprite around.", game.width / 2, game.height - 45);
		game.debug.text("Click to attack. Space bar to jump.", game.width / 2, game.height - 30);
		game.debug.text("Press F to kill the knight, you sadist.", game.width / 2, game.height - 15);
	},

	attack: function () {

		//If the player is dead, do nothing
		if (this.player.dead) { return; };

		//If already attacking, do nothing
		if (this.player.attacking) { return; };

		var anim;
		//If not jumping, ground attack
		if (!this.player.jumping) {
			//Left or right?
			if (this.player.walk.direction == 'e') {
				anim = this.player.animations.play('atk_right');
			} else {
				anim = this.player.animations.play('atk_left');
			}
			//Disable other actions until animation complete
			this.player.attacking = true;
			this.player.walk.stopped = true;
			this.player.run.stopped = true;
		}
		// Or do a jump attack
		else {
			//Left or right?
			if (this.player.walk.direction == 'e') {
				anim = this.player.animations.play('jmpatk_right');
			} else {
				anim = this.player.animations.play('jmpatk_left');
			}
			//If a player is in a horizontal leap, the attack should make them
			//fall straight down, canceling x velocity
			this.player.body.velocity.x = 0;
			//Disable other actions
			this.player.attacking = true;
			this.player.jumping = true;
			this.player.walk.stopped = true;
			this.player.run.stopped = true;
			//Settings the jumping flag to false on completion
			anim.onComplete.addOnce(function () { 
				this.player.jumping = false; }, this);
		}

		//Enables other actions after animation completion
		anim.onComplete.addOnce(function () {
			this.player.attacking = false;
			this.player.walk.stopped = false;
			this.player.run.stopped = false;
		}, this);

	},

	jump: function () {
		
		//If the player is dead, do nothing
		if (this.player.dead) { return; };

		//If already jumping or attacking, do nothing
		if (this.player.jumping || this.player.attacking) { return; }

		var anim;
		//Left or right animation
		if (this.player.walk.direction == 'e') {
			anim = this.player.animations.play('jmp_right');
		} else {
			anim = this.player.animations.play('jmp_left');
		}

		//Flags set
		this.player.jumping = true;

		//Enables other actions after animation completion
		anim.onComplete.addOnce(function () {
			this.player.jumping = false;
		}, this);

		var ply = this.player;
		//Slight "hop" using timed calls
		ply.body.velocity.y = -200;
		this.time.events.add(anim.delay * anim.frameTotal / 2, function () {
			ply.body.velocity.y = 200;
		});
		this.time.events.add(anim.delay * anim.frameTotal, function () {
			ply.body.velocity.y = 0;
		});

	},

	die: function() {
		this.player.dead = true;
		this.player.walk.stopped = true;
		this.player.run.stopped = true;
		this.player.animations.play('die');
	}

}