<?php

function leastAvgPlays()
{
    global $mysqli;

    echo "<pre>";
    echo "Year  Club   Avg Plays-Per-Game\n";
    echo "===============================\n";

    // We need to choose what seasons we want to do this for
    $seasons = [
        2009,
        2010,
        2011,
        2012,
        2013,
        2014,
        2015,
        2016,
        2017,
        2018,
    ];
    // Do this for each one
    foreach ($seasons as $year) {

        // Define our query to get the lowest plays per game that year
        $sql = "SELECT clubid, SUM(num_plays)/COUNT(gameid) as plays_per_game
        FROM
        /* We get number of plays for each game here */
            (
            SELECT
                clubid,
                COUNT(DISTINCT(playid)) as num_plays,
                plays.gameid,
                season
            FROM plays LEFT JOIN games ON plays.gameid = games.gameid
            GROUP BY clubid, plays.gameid
            ) plays_and_games
        WHERE season = " . $year . "
        GROUP BY clubid
        ORDER BY plays_per_game
        ASC LIMIT 1";

        $result = $mysqli->query($sql);

        // If we were successful
        if ($result) {

            // loop through the result printing each row
            while ($row = $result->fetch_assoc()) {

                echo str_pad($year, 6, ' ');
                echo str_pad($row['clubid'], 8, ' ');
                echo $row['plays_per_game'];
                echo "\n";
            }

        } else {
            // Print the error :)
            echo "{$mysqli->error}";
        }

        // If we were successful, then free the result
        if ($result) {
            $result->free();
        }

    }

    echo "</pre>";

    echo "<pre>This one is really hard.</pre>";

}
