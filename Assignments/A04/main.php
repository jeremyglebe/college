<?php

// Output a header
echo '
<div style="text-align: center">
    <h1>Assignment 4 - NFL Stats</h1>
    <h3>by Jeremy Glebe (March 1st, 2019)</h3>
</div>
';

// Connect to the database
// Server/Database info
$host = "cs2.mwsu.edu"; // server name
$database = "nfl_data"; // database
// Login info file defines $USER and $PW
require '.CONFIG/db_login.config.php';
$user = $USER; // Username from config
$password = $PW; // Password from config
// Create a connection to the database on the CS servers
$mysqli = mysqli_connect($host, $user, $password, $database);
if (mysqli_connect_errno($mysqli)) {
    // Output any connection errors
    echo "<h3 style=\"color: red;\">";
    echo "Failed to connect to MySQL: " . mysqli_connect_error();
    echo "</h3>";
} else {
    // Output a success message
    echo "<h3 style=\"color: blue;\">";
    echo "Connection to the database established!";
    echo "</h3>";
}

// Run the script for question 1
echo '<h3>Q1 - Count number of teams an individual player played for</h3>';
include "q1_ply_most_teams.php";
getMostTeams();

// Run the script for question 2
echo '<h3>Q2 - Find the players with the highest total rushing yards by year</h3>';
include "q2_rushing_by_year.php";
getRushingByYear();

// Run the script for question 3
echo '<h3>Q3 - Find the bottom 5 passing players per year</h3>';
include "q3_passing_by_year.php";
getPassingByYear();

// Run the script for question 4
echo '<h3>Q4 - Find the top 5 players that had the most rushes for a loss</h3>';
include "q4_rushes_for_loss.php";
getRushesForLoss();

// Run the script for question 5
echo '<h3>Q5 - Find the top 5 teams with the most penalties</h3>';
include "q5_most_penalties.php";
getMostPenalties();

// Run the script for question 6
echo '<h3>Q6 - Find the average number of penalties per year</h3>';
include "q6_average_penalties.php";
avgPenaltiesByYear();

// Run the script for question 7
echo '<h3>Q7 - Find the Team with the least amount of average plays every year</h3>';
include "q7_least_avg_plays.php";
leastAvgPlays();

// Run the script for question 8
echo '<h3>Q8 - Find the top 5 players that had field goals over 40 yards</h3>';
include "q8_field_goals_over_40.php";
getFieldGoalsOver40();

// Run the script for question 8
echo '<h3>Q9 - Find the top 5 players with the shortest avg field goal length</h3>';
include "q9_short_avg_field_goal.php";
getShortAvgFieldGoal();
