var DoW = DoW || {};

DoW.Menu = function () { };
DoW.Menu.prototype = {

    create: function () {
        console.log('State: Menu');
    },

    update: function () {

        //Start the game once click/tap occurs
        if (this.game.input.activePointer.isDown) {
            this.game.state.start('Play');
        }

    }

}