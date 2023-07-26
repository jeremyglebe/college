"""
Course: Software Tools (CMPS 4883)
Assignemt: A03
Date: 2/06/19
Github username: jeremyglebe
Repo url: https://github.com/jeremyglebe/4883-SWTools-Glebe
Name: Jeremy Glebe
Description: 
    Scrapes NFL game ids so that those ids can later be used to scrape data
"""

import json
from beautifulscraper import BeautifulScraper
from time import sleep
from random import random as rnd

#Scraper object
scraper = BeautifulScraper()
#Year and week ranges
years = [x for x in range(2009,2019)]
weeks = [x for x in range(1,19)]
#Object to store game ids
game_ids = {}

#For each year we are getting data from
for year in years:
    #Initialize the year
    game_ids[year] = {}
    #Week by week
    for week in weeks:
        #Initialize the list of games for that week
        game_ids[year][week] = []
        #Get the correct url for the week
        url = "http://www.nfl.com/schedules/%d/REG%s" % (year,str(week))
        #Collect all the divs containing game ids on the page
        try:
            page = scraper.go(url)
        except:
            print("Error! URL", url, "could not be reached!")
        print("Retrieving divs from", url, " now...", end='')
        try:
            divs = page.find_all('div',{
                "class":"schedules-list-content"
            })
            print("Done!")
        except:
            print("Failed!")
        #For each div, add its id to the list
        for div in divs:
            game_ids[year][week].append(div["data-gameid"])
        #Don't harass the NFL
        sleep(rnd() / 100)
    #Initialize the list for the post season
    game_ids[year]["post"] = []
    #Get the url for that years post season
    url = "http://www.nfl.com/schedules/%d/POST" % (year)
    #Collect all the divs containing game ids on the page
    try:
        page = scraper.go(url)
    except:
        print("Error! URL", url, "could not be reached!")
    print("Retrieving divs from", url, " now...", end='')
    try:
        divs = page.find_all('div',{
            "class":"schedules-list-content"
        })
        print("Done!")
    except:
        print("Failed!")
    #For each div, add its id to the list
    for div in divs:
        game_ids[year]["post"].append(div["data-gameid"])
    #Don't harass the NFL
    sleep(rnd() / 100)

f = open("game_ids.json", "w")
f.write(json.dumps(game_ids, indent=4))
f.close()
