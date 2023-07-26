#!/usr/bin/env node
/**
 * @author Jeremy Glebe
 * CSCE 5580.001 Computer Networks
 * 2/19/2021
 * Port scanner that checks all TCP or UDP ports in a given range.
 */

const dgram = require('dgram'); // For UDP sockets
const net = require('net'); // For TCP sockets
const ports_raw = require('./ports.js'); // Port file

// Parse ports data
let ports = {udp:{}, tcp: {}};
for (let port of ports_raw){
    try{
        ports[port["TransportProtocol"]][port["PortNumber"]] = port["ServiceName"];
    }
    catch(e){} // Get as many as possible, but don't crash if one fails
}

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
    printit(`scanning host=${hostname}, protocol=${protocol}, ports: ${portlow} -> ${porthigh}\n`);
    // For loop that covers all values for the port
    for (let i = portlow; i <= porthigh; i++) {
        let open;
        // Check the TCP port and wait for it's value
        if(protocol == 'tcp'){
            open = await checkTCP(hostname, i);
        }
        else{
            open = await checkUDP(hostname, i);
        }
        // Output the port number
        printit(`port ${i}`.padEnd(14, ' '));
        // Output whether the port is open
        if (open) {
            printit('open  ');
        }
        else {
            printit('closed');
        }
        // Output the service (if known) and a newline
        if(ports[protocol][i]){
            let service = ports[protocol][i];
            printit(': ' + service);
        }else{
            printit(': svc name unavail');
        }
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

function checkUDP(host, port) {
    return new Promise((resolve, reject)=>{
        const socket = dgram.createSocket('udp4');
        // Handle errors
        socket.on('error', (err)=>{
            if(err.code == 'EACCES'){
                resolve(false);
            }
            else{
                reject(err);
            }
        });
        // Try to connect
        socket.bind(port, host, ()=>{
            socket.close();
            resolve(true);
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

