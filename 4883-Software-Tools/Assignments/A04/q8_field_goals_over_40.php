<?php

/**
 * Prints a table with
 * the top 5 players with field goals over 40 yds
 */
function getFieldGoalsOver40()
{
    global $mysqli;

    // Stat codes for rushing yards are 15, 16, 17, 18
    $sql = 'SELECT playerid, yards
    FROM players_stats
    WHERE (statid = 70 OR statid = 201) AND yards >= 40
    ORDER BY yards
    DESC LIMIT 5';

    $result = $mysqli->query($sql);

    // If we were successful
    if ($result) {

        echo "<pre>";
        echo "#   PlayerID      Name            Length(yds) of Field Goal\n";
        echo "===========================================================\n";

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

            echo str_pad($row['yards'], 8, ' ');
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
