/* Program: Assignment 04 - Falling game
** Description: A guy with wings can't fly b/c he sucks now he has to shoot
**     obstacles and try to score points.
** Author: Jeremy Glebe
** File: menu.js
** Purpose: Menu before launching into actual gameplay
*/

var menu = function () { }
menu.prototype = {

    create: function () {

        //World width & height
        var gw = this.world.width;
        var gh = this.world.height;

        //Background
        this.game.stage.backgroundColor = '#00bbff';
        this.border = this.game.add.image(0, 0, 'menu_border')

        //Play "button"
        //(you can click anywhere on the screen, so not really a button)
        this.playBtn = this.game.add.sprite(gw / 2, (3 / 4) * gh, 'btn_play');
        this.playBtn.anchor.setTo(.5, .5);
        this.playBtn.fade = true;

        //If on desktop, create a cursor
        if (Phaser.Device.desktop) {
            console.log("DESKTOP!");
            this.cursor = this.game.add.sprite(0, 0, 'cursor');
            this.cursor.anchor.setTo(.5, .5);
            this.cursor.scale.setTo(.125, .125);
        }

    },

    update: function () {

        //Play button fading effect
        if (this.playBtn.alpha == 1) {
            this.playBtn.fade = true;
        } else if (this.playBtn.alpha <= .25) {
            this.playBtn.fade = false;
        }

        if (this.playBtn.fade == true) {
            this.playBtn.alpha -= .01;
        } else {
            this.playBtn.alpha += .01;
        }


        //If on desktop, move the emulated cursor
        if (Phaser.Device.desktop) {
            this.cursor.x = this.game.input.activePointer.x;
            this.cursor.y = this.game.input.activePointer.y;
        }

        //Start the game once click/tap occurs
        if (this.game.input.activePointer.isDown) {
            this.game.state.start('play');
        }

    }

}