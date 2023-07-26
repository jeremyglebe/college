/* EnemyManager.js
** Author: Jeremy Glebe
** Description: It handles the controlling of enemies within each level
*/

//if A06 exists, use it, otherwise initiate it as empty object
var A06 = A06 || {};

A06.EnemyManager = function (sprites) {

    //Establish what group of sprites this manager controls
    this.sprites = sprites;

    //Simulated control keys
    this.simUp = { isDown: false }
    this.simDown = { isDown: false }
    this.simLeft = { isDown: false }
    this.simRight = { isDown: false }

    //Some work needs to be done on every sprite
    this.sprites.forEach(function (child) {

        //NEEDED: A more parameterized way of handling this! For now its ok!
        //Add animations for every sprite
        child.animations.add('sIdle', ['idle0', 'idle1'], 5, true);
        child.animations.add('nIdle', ['idle2', 'idle3'], 5, true);
        child.animations.add('wIdle', ['idle4', 'idle5'], 5, true);
        child.animations.add('eIdle', ['idle6', 'idle7'], 5, true);
        child.animations.add('swIdle', ['idle8', 'idle9'], 5, true);
        child.animations.add('seIdle', ['idle10', 'idle11'], 5, true);
        child.animations.add('nwIdle', ['idle12', 'idle13'], 5, true);
        child.animations.add('neIdle', ['idle14', 'idle15'], 5, true);
        child.animations.add('sMove', Phaser.Animation.generateFrameNames('move', 0, 2), 5, true);
        child.animations.add('nMove', Phaser.Animation.generateFrameNames('move', 3, 5), 5, true);
        child.animations.add('wMove', Phaser.Animation.generateFrameNames('move', 6, 8), 5, true);
        child.animations.add('eMove', Phaser.Animation.generateFrameNames('move', 9, 11), 5, true);
        child.animations.add('swMove', Phaser.Animation.generateFrameNames('move', 12, 14), 5, true);
        child.animations.add('seMove', Phaser.Animation.generateFrameNames('move', 15, 17), 5, true);
        child.animations.add('nwMove', Phaser.Animation.generateFrameNames('move', 18, 20), 5, true);
        child.animations.add('neMove', Phaser.Animation.generateFrameNames('move', 21, 23), 5, true);
        //Create movement configuration for each sprite
        child._moveConfig = {
            sprite: child,
            speed: child.speed || 25,
            nKey: this.simUp,
            sKey: this.simDown,
            wKey: this.simLeft,
            eKey: this.simRight,
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

        //Add a movement object to each sprite
        child._moveController = new Move8(child._moveConfig);

    }, this);

}

A06.EnemyManager.prototype = {

    'chaser': {

        move: function (enemy, target, manager, targetRadius = 1) {

            if (target.body.x > enemy.body.x + targetRadius) {
                manager.simRight.isDown = true;
                manager.simLeft.isDown = false;
            } else if (target.body.x < enemy.body.x - targetRadius) {
                manager.simLeft.isDown = true;
                manager.simRight.isDown = false;
            } else {
                manager.simLeft.isDown = false;
                manager.simRight.isDown = false;
            }

            if (target.body.y > enemy.body.y + targetRadius) {
                manager.simDown.isDown = true;
                manager.simUp.isDown = false;
            } else if (target.body.y < enemy.body.y - targetRadius) {
                manager.simDown.isDown = false;
                manager.simUp.isDown = true;
            } else {
                manager.simDown.isDown = false;
                manager.simUp.isDown = false;
            }

            enemy._moveController.move();

        }

    },

    moveAll: function (target) {

        this.sprites.forEach(function (child) {

            this[child.logic].move(child, target, this);

        }, this);

    }

}