/* Player.js
** Author: Jeremy Glebe
** Description: A class for the player object.
*/

//if A06 exists, use it, otherwise initiate it as empty object
var A06 = A06 || {};

A06.Player = function (x = 0, y = 0) {

    //Creating the player's main sprite and body
    this.sprite = A06.game.add.sprite(x, y, 'player');
    A06.game.physics.arcade.enable(this.sprite);
    this.sprite.anchor.setTo(0.5);

    //Animations
    this.sprite.animations.add('sMove', Phaser.Animation.generateFrameNames('move', 0, 2), 5, true);
    this.sprite.animations.add('nMove', Phaser.Animation.generateFrameNames('move', 3, 5), 5, true);

    //Creating the player's attack box sprite and body
    //this.atkBox = A06.game.add.sprite();

    //This configures the movement object
    this._moveConfig = {
        sprite: this.sprite,
        speed: 100,
        nKey: A06.game.input.keyboard.addKey(Phaser.Keyboard.W),
        sKey: A06.game.input.keyboard.addKey(Phaser.Keyboard.S),
        wKey: A06.game.input.keyboard.addKey(Phaser.Keyboard.A),
        eKey: A06.game.input.keyboard.addKey(Phaser.Keyboard.D),
        nAnim: 'nMove',
        sAnim: 'sMove'
    };
    //This object controls the movement of the main sprite
    this._moveController = new Move8(this._moveConfig);

}

A06.Player.prototype = {

    move: function () {

        //Movement
        this._moveController.move();
        // this.atkBox.body.x = this.sprite.body.x;
        // this.atkBox.body.y = this.sprite.body.y;

    },

    attack: function () {

        return;

    }

}