var DoW = DoW || {};

DoW.Play = function () { };
DoW.Play.prototype = {

    create: function () {
        console.log('State: Play');

        //Very dark blue as background
        this.game.stage.backgroundColor = '#000010';

        //Create necessary variables
        this.players = {}

        //Spawn the player
        this.game.socket.emit('alert plySpawn');

        //Listeners for server orders
        //We bind the methods to this, or esle they will not see this.game
        this.game.socket.on('order plyCreate', this.plyCreate.bind(this));
        this.game.socket.on('order plyCreateAll', this.plyCreateAll.bind(this));
        this.game.socket.on('order plyDisconnect', this.plyDisconnect.bind(this));
        this.game.socket.on('order plyPosSet', this.plyPosSet.bind(this));

    },

    update: function () {

        //Touch/click control
        var pointer = this.game.input.activePointer;
        //Controlling ship movement
        if (pointer.isDown) {
            this.game.socket.emit('request plyMove', pointer.x, pointer.y);
        }

    },

    plyCreate: function (plys, idkey) {

        for (id in plys) {
            //Verifies that this is the correct id
            if (id == idkey) {
                this.players[id] = this.add.sprite(plys[id].x, plys[id].y, 'ship' + String(plys[id].ship));
                this.players[id].tint = Phaser.Color.RGBtoString(plys[id].colR, plys[id].colG, plys[id].colB, 255, '0x');
            }
        }

    },

    plyCreateAll: function (plys) {

        for (id in plys) {
            //This verifies that the player has actually spawned, if they're
            //on  the menu screen, plys[id] will be null
            if (plys[id]) {
                this.players[id] = this.add.sprite(plys[id].x, plys[id].y, 'ship' + String(plys[id].ship));
                this.players[id].tint = Phaser.Color.RGBtoString(plys[id].colR, plys[id].colG, plys[id].colB, 255, '0x');
            }
        }

    },

    plyDisconnect: function (plyID) {

        if (this.players[plyID]) {
            this.players[plyID].destroy();
            this.players[plyID] = null;
        }

    },

    plyPosSet: function (plys, idkey) {

        for (id in plys) {
            //Verifies that this is the correct id
            if (id == idkey) {
                this.players[id].x = plys[id].x;
                this.players[id].y = plys[id].y;
            }
        }

    }

}