var mainMenu = function(){}
mainMenu.prototype = {

	create: function(){
        
        // Background Color
		this.game.stage.backgroundColor = 0x44aaff;

        // Size of the game window
		var w = this.game.width;
		var h = this.game.height;

		// Touch or mouse click
		this.game.input.onDown.add( playGame, this)

		function playGame(game)
		{
            console.log("Pressed play!")
			this.game.state.start('level01')
		}
    }
    
}