#!/usr/bin/env node
/**
 * @author Jeremy Glebe
 * CSCE 5580.001 Computer Networks
 * 2/13/2021
 * UDP socket-based client that sends messages and awaits responses,
 * calculating neat stats like drop percentage at the end.
 */

const dgram = require('dgram');
const client_socket = dgram.createSocket('udp4');

// ---MAIN SCRIPT---
// Check if the number of arguments is correct
if (process.argv.length != 4) {
    console.log('usage : ./project1cli.js <hostname> <port>');
    process.exit();
}
// Server to connect to
const server_address = process.argv[2];
const server_port = process.argv[3];

// Time that a message was sent out
let time_message_sent = null;
// Time that a response was received
let time_response_received = null;
// Stats data for final results
let received = 0;
let max = 0;
let min = 999999999;
let total_time = 0;

// I created a function to do a timed for loop,
// Here we run the loop 10 times with a second between each run
// Function callbacks for each loop iteration as well as on completion
forIntervalLoop(10, 1000, doSendMessage, doCloseClient);
// Callback when the server sends back a message
client_socket.on('message', onPong);
// ---END OF MAIN SCRIPT---

// ---FUNCTION DEFINITIONS---
// Function to send PING message to the server
function doSendMessage(i) {
    doTestTimeout(i);
    let padded = `${i + 1}: Sent... `.padStart(12, ' ');
    printit(padded);
    // Send a message "PING" to the server
    client_socket.send("PING", server_port, server_address, (error) => {
        // If there was an error sending, close the client
        if (error) {
            console.log("ERROR SENDING MESSAGE:", error);
            client_socket.close();
        }
    });
    time_message_sent = getTime();
}

// Function run at the end of the program to close the client
function doCloseClient(i) {
    // See if the final message timed out
    doTestTimeout(i);
    // Stats output
    min = min.toFixed(6);
    max = max.toFixed(6);
    let avg = (total_time / 10).toFixed(6);
    let percent = ((1 - received / 10) * 100).toFixed(0);
    printit(`10 pkts xmited, ${received} pkts rcvd, ${percent}% pkt loss\n`);
    printit(`min: ${min} ms, max: ${max} ms, avg: ${avg} ms\n`)
    // Message about shutting down
    printit("Client shutting down...\n");
    client_socket.close();
}

// Function that checks if the response has timed out
function doTestTimeout(i) {
    if (i > 0 && time_response_received == null) {
        printit("Timed Out\n")
    }
    time_message_sent = null;
    time_response_received = null;
}

// Function that runs when PONG response is received
function onPong() {
    time_response_received = getTime() - time_message_sent;
    // Stats stuff
    if (time_response_received < min) min = time_response_received;
    if (time_response_received > max) max = time_response_received;
    total_time += time_response_received;
    received++;
    // Pad number
    let time_string = time_response_received.toFixed(6);
    printit(`RTT=${time_string} ms\n`);
}

// Function to get high resolution time (nanosecond precise)
function getTime() {
    // Get NodeJS high resolution time
    let time = process.hrtime()
    // High resolution time is composed of seconds and remaining time not
    // able to be represented in seconds
    let s = time[0];
    let ns = time[1];
    // Combine these times translated to ms (some accuracy will be lost)
    let ms_total = (s * 1000) + (ns / 1000000)
    return ms_total;
}

// Function which serves as a sort of asynchronous, timed for loop
function forIntervalLoop(iterations, delay, onLoop, onFinish) {
    // Iteration counter to simulate for-loop like behavior
    let i = 0;
    // Create the timed interval
    let timer = setInterval(() => {
        // Check whether we've exceeded the maximum iterations
        if (i < iterations) {
            // Run the function specified each loop
            onLoop(i);
            // Increase the iteration counter
            i++;
        }
        else {
            // If the loop is finished, run a final callback
            onFinish(i);
            // Remove the interval so it doesn't lock up the script
            clearInterval(timer);
        }
    }, delay);
}

// Just a smaller way of writing to standard out
// process.stdout.write is just so verbose...
function printit(str) {
    process.stdout.write(str);
}
 // ---END OF FUNCTION DEFINITIONS---