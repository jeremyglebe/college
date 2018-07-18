var preload = function(){}
preload.prototype = {

    //Load all assets here
	preload: function(){
        
        // Character sprites
        this.load.spritesheet('scarf_guy', 'assets/sheet_scarf_guy.png', 32, 48);

        // Item sprites
        this.load.image('ribbon', 'assets/white_ribbon.png');
        this.load.image('candy', 'assets/candy.png');
        this.load.image('lollipop', 'assets/lollipop.png');

        // Sounds

	},
    
    // After loading assets, start the main menu
	create: function(){ this.game.state.start('mainMenu'); }
}