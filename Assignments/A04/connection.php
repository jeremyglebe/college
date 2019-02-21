<?php

// Server/Database info
$host = "cs2.mwsu.edu"; // server name
$database = "nfl_data"; // database

// Login info
require('.CONFIG/db_login.config.php');
$user = $USER; // user name
$password = $PW; // password

// Create a connection to the database on the CS servers
$mysqli = mysqli_connect($host, $user, $password, $database);

// Output any connection errors
if (mysqli_connect_errno($mysqli)) {
    echo "Failed to connect to MySQL: " . mysqli_connect_error();
    echo '\n';
}else{
    echo "Connection to the database established!\n";
}