#!/usr/bin/env node
/**
 * @author Jeremy Glebe
 * CSCE 5580.001 Computer Networks
 * 2/13/2021
 * UDP socket-based server that listens for PING messages and responds with PONG.
 */

const dgram = require('dgram');
const server_socket = dgram.createSocket('udp4');

// ---MAIN SCRIPT---
// Check if the number of arguments is correct
if (process.argv.length != 3) {
    console.log('usage: ./project1svr.js <port>');
    process.exit();
}
// Port to run on
const server_port = process.argv[2];
// Callbacks for socket eventss
server_socket.on('error', onServerError);
server_socket.on('message', onMessageReceived);
server_socket.on('listening', onServerStart);
// Start the server on the given port
server_socket.bind(server_port);
// ---END OF MAIN SCRIPT---

// ---FUNCTION DEFINITIONS---
function onMessageReceived(message, client_info) {
    // Check if the message is a PING message
    if (message == "PING") {
        // Random 30% chance to discard PINGs
        if (Math.random() > .3) {
            // Ping was received
            console.log(`[client]: PING`);
            // Send a message "PONG" to the client
            server_socket.send("PONG", client_info.port, client_info.address, (err) => {
                // If there was an error sending, report it
                if (err) {
                    console.log("[ERROR]: FAILED TO SEND MESSAGE;", err);
                    server_socket.close();
                }
            });
        }
        else {
            // Ping was dropped
            console.log("[client]: dropped packet")
        }
    }
    // Run the following if the message was not a PING
    else {
        // This shouldn't ever happen when running my client application,
        // but just in case, throw errors for other messages
        console.log('[ERROR]: Unexpected message from client!');
        console.log(`    (${client_info.address}:${client_info.port})> ${message}`);
        console.log('    No response will be sent.');
    }
}

// Function in the event of a server-side error
function onServerError(error) {
    console.log(`[ERROR]: (${address.address}:${address.port})`);
    console.log("    A server-side error occurred...");
    console.log(`    ${error.stack}`);
    server_socket.close();
}

// Function to run when the server is first started/bound
function onServerStart() {
    const address = server_socket.address();
    console.log(`Listening on ${address.address}:${address.port}; press CTRL+C to exit.`);
    console.log("[server]: ready to accept data...")
}
// ---END OF FUNCTION DEFINITIONS---