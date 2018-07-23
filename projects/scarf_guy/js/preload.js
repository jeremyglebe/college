var preload = function(){}
preload.prototype = {

    //Load all assets here
	preload: function(){
        //Fakes
        this.load.image('sky', 'assets/sky.png');
        this.load.image('star', 'assets/star.png');
        this.load.image('ground', 'assets/ground.png');

        // Character sprites
        this.load.spritesheet('scarf_guy', 'assets/sheet_scarf_guy.png', 50, 70);

        // Item sprites
        this.load.image('ribbon', 'assets/white_ribbon.png');
        this.load.image('candy', 'assets/candy.png');
        this.load.image('lollipop', 'assets/lollipop.png');

        // Sounds

	},
    
    // After loading assets, start the main menu
	create: function(){ this.game.state.start('mainMenu'); }
}