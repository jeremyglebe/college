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

        //Background clouds
        this.cloud1 = this.game.add.image(.66*gw, .125*gh, 'clouds');
        this.cloud1.animations.add('poof', [0,1], 5, -1);
        this.cloud1.animations.play('poof');
        this.cloud1.anchor.setTo(.5,0);
        this.cloud2 = this.game.add.image(.32*gw, .37*gh, 'clouds');
        this.cloud2.animations.add('poof', [2,3], 5, -1);
        this.cloud2.animations.play('poof');
        this.cloud2.anchor.setTo(.5,0);
        this.cloud3 = this.game.add.image(.44*gw, .61*gh, 'clouds');
        this.cloud3.animations.add('poof', [4,5], 5, -1);
        this.cloud3.animations.play('poof');
        this.cloud3.anchor.setTo(.5,0);


        //Border
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

        //Cloud movement in background
        this.cloud1.x = (this.cloud1.x + 1) % this.world.width;
        this.cloud2.x = (this.cloud2.x + 3) % this.world.width;
        this.cloud3.x = (this.cloud3.x + 2) % this.world.width;

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