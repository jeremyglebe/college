<?php

/**
 * Prints a table with
 * the average penalties every year
 */
function avgPenaltiesByYear(){
    global $mysqli;
    
    // Stat codes for rushing yards are 10, 11, 12, 13
    $sql = 'SELECT season, COUNT(statid)
    FROM players_stats
    WHERE statid = 93
    GROUP BY season
    ORDER BY COUNT(statid)
    DESC';
    
    $result = $mysqli->query($sql);    

    // If we were successful
    if ($result) {

        echo "<pre>";
        echo "#   Year    Total Penalties    Avg Penalties\n";
        echo "============================================\n";

        $counter = 1;
        // loop through the result printing each row
        while ($row = $result->fetch_assoc()) {
            echo str_pad($counter, 4, ' ');
            echo str_pad($row['season'], 8, ' ');
            echo str_pad($row["COUNT(statid)"], 19, ' ');

            // Get number of games that year
            $year = $row['season'];
            $sql_game = "SELECT COUNT(season) FROM games WHERE season = '{$year}' LIMIT 1";
            $game_result = $mysqli->query($sql_game);
            while ($games = $game_result->fetch_assoc()) {
                foreach ($games as $col => $cnt) {
                    // Print average penalties per game
                    $avg = $row["COUNT(statid)"] / $cnt;
                    echo number_format((float)$avg, 4, '.', '');
                }
            }

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