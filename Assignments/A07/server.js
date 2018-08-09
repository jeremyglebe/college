var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io').listen(server);

//Game data
var players = {};
var obstacles = [];
var crashes = [];

//Set public as the root folder
app.use(express.static(__dirname + '/public'));

//Set public/index.html as the root page
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

//Event: User has connected
io.on('connection', function (socket) {
    console.log('User connected...');

    //Give the player a slot in the players list, blank for now
    players[socket.id] = null;

    //Note: socket refers to the socket that connected. We are adding event
    //listeners for every socket that is connected

    //Event: User has disconnected
    socket.on('disconnect', function () {
        console.log('User disconnected...');

        //Remove player from players object
        players[socket.id] = null;
        //Emit a message to all players to remove this player
        io.emit('order plyDisconnect', socket.id);

    });

    //Event: Player has spawned
    socket.on('alert plySpawn', function () {

        //Create the object for the spawned player's data
        players[socket.id] = {
            plyId: socket.id,
            ship: Math.floor(Math.random() * 3) + 1,
            colR: Math.floor(Math.random() * 256),
            colG: Math.floor(Math.random() * 256),
            colB: Math.floor(Math.random() * 256),
            x: Math.floor(Math.random() * 980) + 50,
            y: Math.floor(Math.random() * 860) + 50,
            hp: 100,
            score: 0,
            busy: false,
            busyTimer: 0,
            velocity: {
                x: 0,
                y: 0
            },
            shots: []
        };

        //Send the players object to the new player
        socket.emit('order plyCreateAll', players, socket.id);
        //Make the player spawn all the current obstacles
        for (var i = 0; i < obstacles.length; i++) {
            socket.emit('order obCreate', obstacles[i]);
        }

        //Broadcast new player's data to all other clients
        socket.broadcast.emit('order plyCreate', players, socket.id);

    });

    //Event: Ship crashes into obstacle
    socket.on('alert obCrash', function (plyID, obIndex) {
        console.log("Obstacle crash occured.");
        //Destroy the obstacle
        obstacles.splice(obIndex, 1);
        //Order clients to destroy the obstacle
        io.emit('order obDestroy', obIndex);
        //Set player health
        players[plyID].hp -= 10;
        //Order the client to set player health
        io.emit('order setHP', plyID, players[plyID].hp);
        //Destroy the player?
        if (players[plyID].hp <= 0) {
            io.emit('order plyDestroy', plyID);
            //Remove player from players object
            players[plyID] = null;
        }
    });

    //Event: Ships crash into each other
    socket.on('alert shipsCrash', function (id1, id2) {

        //Only do ANY of this if the ships both still exist
        if (players[id1] && players[id2]) {

            //If no crash has been reported yet
            if (crashes.length == 0) {
                //Set the ships status in the server
                players[id1].busy = true;
                players[id2].busy = true;
                //Determine their velocity
                //Move away
                var angle = Math.atan2(players[id1].y - players[id2].y, players[id1].x - players[id2].x);
                players[id1].velocity.x = 12 * Math.cos(angle);
                players[id1].velocity.y = 12 * Math.sin(angle);
                players[id2].velocity.x = -12 * Math.cos(angle);
                players[id2].velocity.y = -12 * Math.sin(angle);
                //Order the clients to set the ships to busy
                io.emit('order shipBusy', id1);
                io.emit('order shipBusy', id2);
                crashes.push[id1, id2];
                //Set the health of the ships
                if (players[id1].y < players[id2].y) {
                    players[id2].hp -= 1;
                } else {
                    players[id1].hp -= 1;
                }
                //Order the clients to set the health of the ship
                io.emit('order setHP', id1, players[id1].hp);
                io.emit('order setHP', id2, players[id2].hp);
                //If the health is 0, order the clients to destroy the ship
                if (players[id1].hp <= 0) {
                    io.emit('order plyDestroy', id1);
                    //Remove player from players object
                    players[id1] = null;
                }
                if (players[id2].hp <= 0) {
                    io.emit('order plyDestroy', id2);
                    //Remove player from players object
                    players[id2] = null;
                }
            } else {
                //If crash was already reported, empty the crashes list
                crashes.pop();
            }

        }
        //If one or both of the ships don't exist anymore
        else {

            //If the crashes list already contains something
            if (crashes.length > 0) {
                crashes.pop();
            }

        }

    });

    //Request: Move the obstacles
    socket.on('request obMove', function (index, x, y) {

        //Verify the obstacle still exists
        if (obstacles[index]) {

            //x,y is where the client thinks the object currently is
            //We don't want to do this multiple times, so confirm that it hasn't
            //already moved from where client thinks it is
            if (obstacles[index].x == x && obstacles[index].y == y) {
                obstacles[index].y -= obstacles[index].speed;
                io.emit('order obPosSet', obstacles, index);
            }

        }

    });

    //Request: Move the player's ship
    socket.on('request plyMove', function (x, y) {

        //Only do ANY of this if the player is still defined
        if (players[socket.id]) {

            //Current player coordinates
            plyX = players[socket.id].x;
            plyY = players[socket.id].y;

            //If the ship is drifting/can't be controlled
            if (players[socket.id].busy) {
                players[socket.id].x += players[socket.id].velocity.x;
                players[socket.id].y += players[socket.id].velocity.y;
                //Keep track of how long the ship has been drifting
                players[socket.id].busyTimer = (players[socket.id].busyTimer + 1) % 15
                if (players[socket.id].busyTimer == 0) {
                    //Free the ship after 15 updates (.25s)
                    io.emit('order shipFree', socket.id);
                    players[socket.id].busy = false;
                }
            } else {
                //Move towards the mouse at a set pace
                var angle = Math.atan2(y - plyY, x - plyX);
                players[socket.id].x += 8 * Math.cos(angle);
                players[socket.id].y += 8 * Math.sin(angle);
            }

            io.emit('order plyPosSet', players, socket.id);

        }

    });

    //Request: Let the player ship fire
    socket.on('request plyShoot', function(){
        var shot = {
            x: players[socket.id].x,
            y: players[socket.id].y
        }
        players[socket.id].shots.push(shot);
        io.emit('order shotCreate', shot, socket.id);
    })

    //Request: Move a laser shot
    socket.on('request shotMove', function(index){

        players[socket.id].shots[index].y += 16;
        io.emit('order shotPosSet', players, socket.id, index);

    });

    //Request: Spawn an obstacle
    socket.on('request spawnOb', function () {

        //Create the object for the spawned obstacle
        ob = {
            planet: Math.floor(Math.random() * 7) + 1,
            x: Math.floor(Math.random() * 980) + 50,
            y: 1920,
            size: Math.random() + 0.2,
            speed: Math.floor(Math.random() * 10) + 1
        };

        obstacles.push(ob);

        //Order clients to create the obstacle
        io.emit('order obCreate', ob);

    });

});

//Start the server listener
server.listen(8081, function () {
    console.log(`Listening on ${server.address().port}`);
});