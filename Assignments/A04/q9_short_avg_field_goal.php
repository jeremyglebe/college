<?php

/**
 * Prints a table with
 * the top 5 players with shortest average field goal
 */
function getShortAvgFieldGoal()
{
    global $mysqli;

    // Stat codes for rushing yards are 15, 16, 17, 18
    $sql = 'SELECT playerid, SUM(yards)/COUNT(statid) AS avg_length
    FROM players_stats
    WHERE statid = 70
    GROUP BY playerid
    ORDER BY avg_length
    ASC LIMIT 5';

    $result = $mysqli->query($sql);

    // If we were successful
    if ($result) {

        echo "<pre>";
        echo "#   PlayerID      Name            Average Length(yds) of Field Goals\n";
        echo "====================================================================\n";

        $counter = 1;
        // loop through the result printing each row
        while ($row = $result->fetch_assoc()) {

            echo str_pad($counter, 4, ' ');
            echo str_pad($row['playerid'], 14, ' ');

            // Print the name of the person
            $theID = $row['playerid'];
            $sql_name = "SELECT `name` FROM players WHERE id = '{$theID}' LIMIT 1";
            $name_result = $mysqli->query($sql_name);
            while ($names = $name_result->fetch_assoc()) {
                foreach ($names as $col => $name) {
                    echo str_pad($name, 16, ' ');
                }
            }

            echo str_pad($row['avg_length'], 8, ' ');
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
