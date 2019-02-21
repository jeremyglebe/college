"""
Course: Software Tools (CMPS 4883)
Assignemt: A03
Date: 2/06/19
Github username: jeremyglebe
Repo url: https://github.com/jeremyglebe/4883-SWTools-Glebe
Name: Jeremy Glebe
Description: 
    Scrapes NFL game data using a set of game ids found in game_ids.json
    Requires scrape_game_ids.py to be used first
"""

import json
import urllib.request
from time import sleep
from random import random as rnd

with open('game_ids.json') as f:
    data = json.load(f)

for year in data:
    for week in data[year]:
        for i in range(len(data[year][week])):
            #Get the game id
            game = data[year][week][i]
            #Get the game data for the game id
            try:
                #Setup the url
                url = "http://www.nfl.com/liveupdate/game-center/%s/%s_gtd.json" % (game, game)
                #Download the file
                urllib.request.urlretrieve(url, 'game_data/' + game + '.json')
                print("[" + year + "][" + week + "][" + str(i) + "]Data retrieval successful!")
            except:
                print("[" + year + "][" + week + "][" + str(i) + "]Something went wrong! (Maybe no data is available?)")
        #Don't harass the NFL
        sleep(rnd() / 100)