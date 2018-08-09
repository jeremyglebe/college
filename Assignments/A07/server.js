var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io').listen(server);

//Game data
var players = {};
var obstacles = {};

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
            x: Math.floor(Math.random() * 700) + 50,
            y: Math.floor(Math.random() * 500) + 50,
            hp: 100,
            score: 0,
            busy: false,
            velocity: {
                x: 0,
                y: 0
            },
            shots: {}
        };

        //Send the players object to the new player
        socket.emit('order plyCreateAll', players);

        //Broadcast new player's data to all other clients
        socket.broadcast.emit('order plyCreate', players, socket.id);

    });

    //Request: Move the player's ship
    socket.on('request plyMove', function(x,y){

        //Current player coordinates
        plyX = players[socket.id].x;
        plyY = players[socket.id].y;

        //If the ship is drifting/can't be controlled
        if(players[socket.id].busy){
            players[socket.id].x += players[socket.id].velocity.x;
            players[socket.id].y += players[socket.id].velocity.y;
        }else{
            //Move towards the mouse at a set pace
            var angle = Math.atan2(y - plyY, x - plyX);
            players[socket.id].x += 2 * Math.cos(angle);
            players[socket.id].y += 2 * Math.sin(angle);
        }

        io.emit('order plyPosSet', players, socket.id);

    });

});

//Start the server listener
server.listen(8081, function () {
    console.log(`Listening on ${server.address().port}`);
});