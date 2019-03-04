<?php

function getMostTeams()
{
    global $mysqli;

    $sql = 'SELECT id, name, count(distinct(club))
    FROM players
    GROUP BY id, name
    ORDER BY count(distinct(club))
    DESC LIMIT 10';

    $result = $mysqli->query($sql);

    // If we were successful
    if ($result) {

        echo "<pre>";
        echo "#   PlayerID      Name            #Teams\n";
        echo "========================================\n";

        $counter = 1;
        // loop through the result printing each row
        while ($row = $result->fetch_assoc()) {
            echo str_pad($counter, 4, ' ');
            echo str_pad($row['id'], 14, ' ');
            echo str_pad($row['name'], 16, ' ');
            echo str_pad($row["count(distinct(club))"], 6, ' ', STR_PAD_BOTH);
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
