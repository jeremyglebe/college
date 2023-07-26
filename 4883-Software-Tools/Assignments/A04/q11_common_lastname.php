<?php

/**
 * Prints a table with
 * the 5 most common last names in the NFL
 */
function getCommonLastname()
{
    global $mysqli;

    // Stat codes for rushing yards are 15, 16, 17, 18
    $sql = 'SELECT lname, COUNT(lname) as occurrences
    FROM (SELECT id, SUBSTR(name, INSTR(name,\'.\') + 1) as lname
        FROM players
        GROUP BY id) last_names
    GROUP BY lname
    ORDER BY COUNT(lname)
    DESC LIMIT 5';

    $result = $mysqli->query($sql);

    // If we were successful
    if ($result) {

        echo "<pre>";
        echo "#   Name        Occurrences\n";
        echo "===========================\n";

        $counter = 1;
        // loop through the result printing each row
        while ($row = $result->fetch_assoc()) {

            echo str_pad($counter, 4, ' ');
            echo str_pad($row['lname'], 12, ' ');
            echo $row['occurrences'];
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
