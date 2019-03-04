<?php

/**
 * Prints a table with
 * the teams of the nfl ranked worst->best
 */
function getWorstTeams()
{
    global $mysqli;

    // Stat codes for rushing yards are 15, 16, 17, 18
    $sql = 'SELECT club,
	    SUM(wonloss = \'won\') AS wins,
        SUM(wonloss = \'loss\') AS losses,
        SUM(wonloss = \'won\') / SUM(wonloss = \'loss\') AS win_ratio,
        (SUM(wonloss = \'won\') / (SUM(wonloss = \'won\') + SUM(wonloss = \'loss\'))) * 100 AS win_percentage
    FROM game_totals
    GROUP BY club
    ORDER BY wins
    ASC';

    $result = $mysqli->query($sql);

    // If we were successful
    if ($result) {

        echo "<pre>";
        echo "#   Club    Win/Loss Ratio    Win Percentage\n";
        echo "============================================\n";

        $counter = 32;
        // loop through the result printing each row
        while ($row = $result->fetch_assoc()) {

            echo str_pad($counter, 4, ' ');
            echo str_pad($row['club'], 8, ' ');
            echo str_pad($row['win_ratio'], 18, ' ');
            echo (int) $row['win_percentage'] . '%';
            echo "\n";
            $counter--;
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
