/* Program: Assignment 03 - Freefall Game
** Description: Modified version of the freefall game from class.
** Author: Jeremy Glebe
** File: mainmenu.js
** Purpose: A creative menu just to kick off the game for the user.
**     Launches after Boot and again after Game Over
*/

var mainMenu = {

	/* Function: create()
	** Description: Creates main menu texts and input
	*/
	create: function () {
		console.log("mainmenu.js");
		// BG COLOR
		game.stage.backgroundColor = BG_COLOR
		// Bg image
		this.bg = game.add.image(0, 0, 'bg')

		var w = game.width
		var h = game.height

		// Title
		var logo = game.add.bitmapText(w / 2, -100, 'fontUsed', '', 75)
		logo.text = GAMETITLE
		logo.anchor.setTo(0.5, 0.5)
		game.add.tween(logo).to({
			y: h / 2 - 80
		}, 1000, Phaser.Easing.Bounce.Out).start()

		// Help
		var label = game.add.bitmapText(w / 2, h - 100, 'fontUsed', '', 40);

		//This generates a random game text from an array of possibilities
		//https://www.emanueleferonato.com/2016/11/09/understanding-phaser-array-utilities-using-arrayutils-class/
		label.texts = [
			"Best thing since sliced bread!",
			"GAME MESSAGE HERE",
			"You'll say \"It's okay.\"!",
			"Tell your friends!",
			"This is not a test.",
			"Space. Space. Gotta go to space.",
			"!?",
			"5-Stars \"Boulders rock.\"-IGN"
		]
		label.text = Phaser.ArrayUtils.getRandomItem(label.texts)

		label.anchor.setTo(0.5, 0.5)
		label.alpha = 0
		game.add.tween(label).delay(500).to({
			alpha: 1
		}, 1000).start()
		game.add.tween(label).to({
			y: h - 120
		}, 500).to({
			y: h - 100
		}, 500).loop().start()

		// touch input
		game.input.onDown.add(this.listener)
	},
	listener: function () {
		game.state.start('play')
	}
}