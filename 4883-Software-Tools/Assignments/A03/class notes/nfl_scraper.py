from sys import argv as command_args
from pprint import pprint
import json
import urllib.request

with open('nfldata.json') as f:
    data = json.load(f)

for season_type,subdictionary in data.items():
    if season_type == "REG":
        for year,week_dictionary in subdictionary.items():
            print("Regular Season, Year:",year)
            for week,gameids in week_dictionary.items():
                print("\tWeek:",week)
                for game in gameids:
                    print("\t\tGame Id:",game)
                    print("\t\tURL: http://www.nfl.com/liveupdate/game-center/%s/%s_gtd.json" % (game, game))
                    url = "http://www.nfl.com/liveupdate/game-center/%s/%s_gtd.json" % (game, game)
                    urllib.request.urlretrieve(url, 'nfl_data/' + game + '.json')
    else:
        for year,gameids in subdictionary.items():
            print("Post Season, Year:", year)
            for game in gameids:
                print("\tGame Id:",game)
                print("\tURL: http://www.nfl.com/liveupdate/game-center/%s/%s_gtd.json" % (game, game))
                url = "http://www.nfl.com/liveupdate/game-center/%s/%s_gtd.json" % (game, game)
                urllib.request.urlretrieve(url, 'nfl_data/' + game + '.json')

#For now, any argument runs the full program
if len(command_args) == 1:
    exit()

from beautifulscraper import BeautifulScraper
from time import sleep

scraper = BeautifulScraper()

years = [x for x in range(2016,2019)]

weeks = [x for x in range(1,18)]
weeks = [x for x in range(1,5)]

gameids = {
    "REG":{},
    "POST":{}
}

for year in years:
    #Regular Games
    gameids["REG"][year] = {}
    for week in weeks:
        gameids["REG"][year][week] = []
        url = "http://www.nfl.com/schedules/%d/REG%s" % (year,str(week))
        print(url)

        page = scraper.go(url)

        divs = page.find_all('div',{
            "class":"schedules-list-content"
        })

        for div in divs:
            gameids["REG"][year][week].append(div["data-gameid"])

        sleep(.02) #Don't harass the nfl

    #Post games
    gameids["POST"][year] = []
    url = "http://www.nfl.com/schedules/%d/POST" % (year)
    print(url)

    page = scraper.go(url)

    divs = page.find_all('div',{
        "class":"schedules-list-content"
    })

    for div in divs:
        gameids["REG"][year][week].append(div["data-gameid"])

    sleep(.02) #Don't harass the nfl

pprint(gameids)
pprint(gameids.keys)

for year in gameids:
    print(gameids[year].keys())

f = open("nfldata.json", "w")
f.write(json.dumps(gameids))
f.close()
