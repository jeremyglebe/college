/* Player.js
** Author: Jeremy Glebe
** Description: A class for the player object.
*/

//if A06 exists, use it, otherwise initiate it as empty object
var A06 = A06 || {};

A06.Player = function(x = 0, y = 0) {

    //Creating the player's main sprite and body
    this.sprite = A06.game.add.sprite(x, y, 'player');
    A06.game.physics.arcade.enable(this.sprite);
    //Basically gives the sprite access back to its player object
    this.sprite.player = this;
    //Changes the physics (collision) body of the player
    this.sprite.body.setSize(16, 16, 0.1 * this.sprite.width, 0.4 * this.sprite.height);
    //Set character physical condition
    this.knockedBack = false;

    //Animations
    this.sprite.animations.add('sIdle', ['idle0'], 5, true);
    this.sprite.animations.add('nIdle', ['idle2'], 5, true);
    this.sprite.animations.add('wIdle', ['idle4'], 5, true);
    this.sprite.animations.add('eIdle', ['idle6'], 5, true);
    this.sprite.animations.add('swIdle', ['idle8'], 5, true);
    this.sprite.animations.add('seIdle', ['idle10'], 5, true);
    this.sprite.animations.add('nwIdle', ['idle12'], 5, true);
    this.sprite.animations.add('neIdle', ['idle14'], 5, true);
    this.sprite.animations.add('sMove', Phaser.Animation.generateFrameNames('move', 0, 2), 5, true);
    this.sprite.animations.add('nMove', Phaser.Animation.generateFrameNames('move', 3, 5), 5, true);
    this.sprite.animations.add('wMove', Phaser.Animation.generateFrameNames('move', 6, 8), 5, true);
    this.sprite.animations.add('eMove', Phaser.Animation.generateFrameNames('move', 9, 11), 5, true);
    this.sprite.animations.add('swMove', Phaser.Animation.generateFrameNames('move', 12, 14), 5, true);
    this.sprite.animations.add('seMove', Phaser.Animation.generateFrameNames('move', 15, 17), 5, true);
    this.sprite.animations.add('nwMove', Phaser.Animation.generateFrameNames('move', 18, 20), 5, true);
    this.sprite.animations.add('neMove', Phaser.Animation.generateFrameNames('move', 21, 23), 5, true);
    this.sprite.animations.add('die', ['idle0', 'idle8', 'idle4', 'idle13', 'idle3'], 5, false);

    //Creating the player's attack box sprite and body
    //this.atkBox = A06.game.add.sprite();

    //Define this player's stats
    this.maxHealth = 100;
    this.health = 100;
    this.gold = 0;

    //Create the player's heads up display
    this.createHUD();

    //This configures the movement object
    this._moveConfig = {
        sprite: this.sprite,
        speed: 50,
        nKey: A06.game.input.keyboard.addKey(Phaser.Keyboard.W),
        sKey: A06.game.input.keyboard.addKey(Phaser.Keyboard.S),
        wKey: A06.game.input.keyboard.addKey(Phaser.Keyboard.A),
        eKey: A06.game.input.keyboard.addKey(Phaser.Keyboard.D),
        fnAnim: 'nIdle',
        fsAnim: 'sIdle',
        fwAnim: 'wIdle',
        feAnim: 'eIdle',
        fnwAnim: 'nwIdle',
        fneAnim: 'neIdle',
        fswAnim: 'swIdle',
        fseAnim: 'seIdle',
        nAnim: 'nMove',
        sAnim: 'sMove',
        wAnim: 'wMove',
        eAnim: 'eMove',
        nwAnim: 'nwMove',
        neAnim: 'neMove',
        swAnim: 'swMove',
        seAnim: 'seMove'
    };
    //This object controls the movement of the main sprite
    this._moveController = new Move8(this._moveConfig);

}

A06.Player.prototype = {

    move: function() {

        //Movement
        this._moveController.move();
        // this.atkBox.body.x = this.sprite.body.x;
        // this.atkBox.body.y = this.sprite.body.y;

    },

    attack: function() {

        return;

    },

    createHUD: function() {

        //Create a hud for the player
        this.hud = A06.game.add.group();
        //Make the hud fixed to the screen
        this.hud.fixedToCamera = true;
        //Set boundaries
        this.hud.xOrigin = 0.9 * A06.game.width;
        this.hud.yOrigin = 0.6 * A06.game.height;
        this.hud.wOrigin = 0.1 * A06.game.width;
        this.hud.hOrigin = 0.4 * A06.game.height;

        //Add a transparent box for the HUD to lie over
        var box = this.hud.create(this.hud.xOrigin, this.hud.yOrigin, 'block');
        box.tint = 0x000000;
        box.height = this.hud.hOrigin;
        box.width = this.hud.wOrigin;
        box.alpha = 0.3;

        //Add a health bar in 3 layers
        var blackbar = this.hud.create(0.935 * A06.game.width, 0.735 * A06.game.height, 'block');
        blackbar.tint = 0x000000;
        blackbar.height = 75;
        blackbar.width = 15;
        var redbar = this.hud.create(0.94 * A06.game.width, 0.742 * A06.game.height, 'block');
        redbar.tint = 0xff0000;
        redbar.height = 71;
        redbar.width = 11;
        //The third, green layer is the one we'll actually have to change later.
        this.healthbar = this.hud.create(0.94 * A06.game.width, 0.742 * A06.game.height, 'block');
        this.healthbar.maxHeight = 71;
        this.healthbar.tint = 0x00ff00;
        this.healthbar.height = 71;
        this.healthbar.width = 11;

        //Add a coin counter
        var goldicon = this.hud.create(this.hud.xOrigin + (0.05 * this.hud.wOrigin), (0.03 * this.hud.hOrigin) + this.hud.yOrigin, 'icon_gold');
        goldicon.scale.setTo(0.5);
        //The text display
        this.goldText = A06.game.add.text(this.hud.xOrigin + (0.5 * this.hud.wOrigin), (0.04 * this.hud.hOrigin) + this.hud.yOrigin, "0");
        this.goldText.fontSize = 10;
        this.goldText.fill = '#ffffff';
        this.hud.add(this.goldText);

    },

    setHealth: function(newHealth) {

        if (newHealth >= 0) {
            this.health = newHealth;
        } else {
            this.health = 0;
        }

        var ratio = this.health / this.maxHealth;
        this.healthbar.height = ratio * this.healthbar.maxHeight;
        this.healthbar.y = 0.742 * A06.game.height + (this.healthbar.maxHeight - this.healthbar.height);

    },

    collectCoin: function(coin){
        coin.pendingDestroy = true;
        this.gold++;
        this.goldText.text = String(this.gold);
    }

}