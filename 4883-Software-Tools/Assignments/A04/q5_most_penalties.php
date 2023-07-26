<?php

/**
 * Prints a table with
 * the top 5 teams who have the most penalties
 */
function getMostPenalties()
{
    global $mysqli;

    // Stat codes for rushing yards are 10, 11, 12, 13
    $sql = 'SELECT club, COUNT(club)
    FROM players_stats
    WHERE statid = 93
    GROUP BY club
    ORDER BY COUNT(club)
    DESC LIMIT 5';

    $result = $mysqli->query($sql);

    // If we were successful
    if ($result) {

        echo "<pre>";
        echo "#   Club      Penalties\n";
        echo "=======================\n";

        $counter = 1;
        // loop through the result printing each row
        while ($row = $result->fetch_assoc()) {
            echo str_pad($counter, 4, ' ');
            echo str_pad($row['club'], 10, ' ');
            echo $row["COUNT(club)"];
            echo "\n";
            $counter++;
        }

        echo "</pre>";

    } else {
        // Print the error :)
        echo "{$mysqli->error}";
    }

    // If we were successful, then free the result
    if ($result) {
        $result->free();
    }

}