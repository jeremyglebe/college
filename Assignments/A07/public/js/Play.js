var DoW = DoW || {};

DoW.Play = function () { };
DoW.Play.prototype = {

    create: function () {
        console.log('State: Play');

        //Very dark blue as background
        this.game.stage.backgroundColor = '#101020';

        //Create necessary variables
        this.myID = null;
        this.players = {};
        this.obstacles = [];

        //Spawn the player
        this.game.socket.emit('alert plySpawn');

        //Set up a timer system that requests to spawn an obstacle every 5s
        this.obRequest = function () {
            this.game.socket.emit('request spawnOb');
            this.time.events.add(5000, this.obRequest, this);
        }
        this.obRequest();

        //Listeners for server orders
        //We bind the methods to this, or else they will not see this.game
        this.game.socket.on('order obCreate', this.obCreate.bind(this));
        this.game.socket.on('order obDestroy', this.obDestroy.bind(this));
        this.game.socket.on('order obPosSet', this.obPosSet.bind(this));
        this.game.socket.on('order plyCreate', this.plyCreate.bind(this));
        this.game.socket.on('order plyCreateAll', this.plyCreateAll.bind(this));
        this.game.socket.on('order plyDisconnect', this.plyDisconnect.bind(this));
        this.game.socket.on('order plyDestroy', this.plyDestroy.bind(this));
        this.game.socket.on('order plyPosSet', this.plyPosSet.bind(this));
        this.game.socket.on('order setHP', this.setHP.bind(this));
        this.game.socket.on('order shipBusy', this.shipBusy.bind(this));
        this.game.socket.on('order shipFree', this.shipFree.bind(this));

    },

    update: function () {

        //Update the health bar
        for (id in this.players) {
            //This verifies that the player has actually spawned, if they're
            //on  the menu screen, this.players[id] will be null
            if (this.players[id]) {
                this.players[id].hpBar.width = this.players[id].width * (this.players[id].hp / 100);
                this.players[id].hpBar.x = this.players[id].x;
                this.players[id].hpBar.y = this.players[id].y + 0.6 * this.players[id].height;
            }
        }

        //Collisions between ships
        for (id in this.players) {
            if (id != this.myID) {
                this.physics.arcade.overlap(this.players[this.myID], this.players[id], function (cliPly, other) {
                    this.game.socket.emit('alert shipsCrash', this.myID, id);
                }, null, this);
            }
        }

        //Collisions with obstacles
        for (var i = 0; i < this.obstacles.length; i++) {
            this.physics.arcade.overlap(this.players[this.myID], this.obstacles[i], function (ply, ob) {
                console.log("Obstacle crash occured.");
                this.game.socket.emit('alert obCrash', this.myID, i);
            }, null, this);
        }

        //Determine if the ship's "busy"(not controllable)
        var busy = false;
        if (this.players[this.myID]) {
            if (this.players[this.myID].busy) { busy = true; }
        }
        //Touch/click control
        var pointer = this.game.input.activePointer;
        //Controlling ship movement
        if (pointer.isDown || busy) {
            this.game.socket.emit('request plyMove', pointer.x, pointer.y);
        }

        //Request to move the obstacles
        for (var i = 0; i < this.obstacles.length; i++) {
            this.game.socket.emit('request obMove', i, this.obstacles[i].x, this.obstacles[i].y);
        }

    },

    obCreate: function (ob) {
        console.log("Received order to create obstacle");
        console.log(ob);
        var obSpr = this.add.sprite(ob.x, ob.y, 'planet' + String(ob.planet));
        this.game.physics.arcade.enable(obSpr);
        obSpr.animations.add('spin', null, 5, true);
        obSpr.animations.play('spin');
        obSpr.speed = ob.speed;
        obSpr.scale.setTo(ob.size);
        obSpr.anchor.setTo(0.5);
        console.log(obSpr);
        this.obstacles.push(obSpr);
    },

    obDestroy: function(index){
        console.log("Received order to destroy obstacle.")
        console.log(this.obstacles[index]);
        this.obstacles[index].destroy();
        this.obstacles.splice(index, 1);
    },

    obPosSet: function (obs, index) {

        this.obstacles[index].x = obs[index].x;
        this.obstacles[index].y = obs[index].y;

    },

    plyCreate: function (plys, idkey) {

        for (id in plys) {
            //Verifies that this is the correct id
            if (id == idkey) {
                this.players[id] = this.add.sprite(plys[id].x, plys[id].y, 'ship' + String(plys[id].ship));
                this.players[id].tint = Phaser.Color.RGBtoString(plys[id].colR, plys[id].colG, plys[id].colB, 255, '0x');
                this.game.physics.arcade.enable(this.players[id]);
                this.players[id].anchor.setTo(0.5);
                this.players[id].scale.setTo(0.3);
                this.players[id].busy = false;
                this.players[id].hp = 100;
                this.players[id].hpBar = this.add.sprite(plys[id].x, plys[id].y + 0.6 * this.players[id].height, 'hpBar');
                this.players[id].hpBar.anchor.setTo(0.5);
                this.players[id].hpBar.width = this.players[id].width * (this.players[id].hp / 100);
                this.players[id].hpBar.height = this.players[id].height * 0.1;
            }
        }

    },

    plyCreateAll: function (plys, cliID) {

        for (id in plys) {
            //Assign the player their id
            if (id == cliID) {
                this.myID = id;
            }
            //This verifies that the player has actually spawned, if they're
            //on  the menu screen, plys[id] will be null
            if (plys[id]) {
                this.players[id] = this.add.sprite(plys[id].x, plys[id].y, 'ship' + String(plys[id].ship));
                this.players[id].tint = Phaser.Color.RGBtoString(plys[id].colR, plys[id].colG, plys[id].colB, 255, '0x');
                this.game.physics.arcade.enable(this.players[id]);
                this.players[id].anchor.setTo(0.5);
                this.players[id].scale.setTo(0.3);
                this.players[id].busy = false;
                this.players[id].hp = 100;
                this.players[id].hpBar = this.add.sprite(plys[id].x, plys[id].y + 0.6 * this.players[id].height, 'hpBar');
                this.players[id].hpBar.anchor.setTo(0.5);
                this.players[id].hpBar.width = this.players[id].width * (this.players[id].hp / 100);
                this.players[id].hpBar.height = this.players[id].height * 0.1;
            }
        }

    },

    plyDisconnect: function (plyID) {

        if (this.players[plyID]) {
            this.players[plyID].hpBar.destroy();
            this.players[plyID].destroy();
            this.players[plyID] = null;
        }

    },

    plyDestroy: function (plyID) {

        if (this.players[plyID]) {
            this.players[plyID].hpBar.destroy();
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

    },

    setHP: function (idkey, hp) {

        for (id in this.players) {
            //Verifies that this is the correct id
            if (id == idkey) {
                this.players[id].hp = hp;
            }
        }

    },

    shipBusy: function (idkey) {

        for (id in this.players) {
            //Verifies that this is the correct id
            if (id == idkey) {
                this.players[id].busy = true;
            }
        }

    },

    shipFree: function (idkey) {

        for (id in this.players) {
            //Verifies that this is the correct id
            if (id == idkey) {
                this.players[id].busy = false;
            }
        }

    }

}