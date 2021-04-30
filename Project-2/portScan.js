#!/usr/bin/env node
/**
 * @author Jeremy Glebe
 * CSCE 5580.001 Computer Networks
 * 2/19/2021
 * Port scanner that checks all TCP or UDP ports in a given range.
 */


const net = require('net'); // For TCP sockets

// Check if the correct number of arguments was used
if (process.argv.length != 6) {
    console.log('usage: ./portScan.js <hostname> <protocol> <portlow> <porthigh>');
    console.log('usage (explicit): node ./portScan.js <hostname> <protocol> <portlow> <porthigh>');
    process.exit();
}

// Constant values pulled from command line args
const hostname = process.argv[2];
const protocol = process.argv[3];
const portlow = process.argv[4];
const porthigh = process.argv[5];

// "main" function (just an anonymous function being called once)
(async () => {
    // For loop that covers all values for the port
    for (let i = portlow; i <= porthigh; i++) {
        // Check the TCP port and wait for it's value
        let open = await checkTCP(hostname, i);
        // Output the port number
        printit(`port ${i}`.padEnd(14, ' '));
        // Output whether the port is open
        if (open) {
            printit('open');
        }
        else {
            printit('closed');
        }
        // Output the service (if known) and a newline
        printit('\n');
    }
})();

/**
 * Function to determine if a TCP port is open
 * @param {string} host the name of the host we are scanning
 * @param {number} port the port which we are checking for
 * @returns a promise which will resolve to true if the port is open, false if it is closed
 */
function checkTCP(host, port) {
    // Return a promise of the result
    return new Promise((resolve, reject) => {
        let socket = net.connect(port, host, () => {
            // After confirming the socket it open, end the connection
            socket.end(null, () => {
                // Resolve with return value true (open)
                resolve(true);
            });
        });
        // Handle any connection errors
        socket.on('error', (err) => {
            if (err.code == 'ECONNREFUSED') {
                // Resolve with return value false (closed)
                resolve(false);
            } else {
                // Reject and send back the error
                reject(err);
            }
        });
    });
}

/**
 * Just a smaller way of writing to standard out
 * process.stdout.write is just so verbose...
 * @param {string} str the data to be sent to stdout
 */
function printit(str) {
    process.stdout.write(str);
}
