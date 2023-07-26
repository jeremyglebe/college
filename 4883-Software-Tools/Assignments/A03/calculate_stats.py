"""
Course: Software Tools (CMPS 4883)
Assignemt: A03
Date: 2/13/19
Github username: jeremyglebe
Repo url: https://github.com/jeremyglebe/4883-SWTools-Glebe
Name: Jeremy Glebe
Description: 
    Defines functions to process scraped data and get stats
    about the NFL.
"""

import os
import json
from functools import reduce
from pprint import pprint as Print

##############################################################
# plyMostTeams(*, numFiles=0, folder='game_data')
#
# This function grabs some number of game files from some
# folder in the current directory. It then determines which
# player(s) from all of the given games has played on the most
# teams within that same set of games.
#
# Params:
#    numFiles [int] : number of files from the directory that
#        should be processed. 0=all.
#    folder [string] : name of the folder that game data files
#        should be contained within
# Returns:
#    list of dictionaries of players who had played on the most
#    teams. Structure of returned object:
#        [{
#            'id': str,
#            'teams': [str, str, ...],
#            'numTeams': int,
#            'name': str
#        }]
def plyMostTeams(*, numFiles=0, folder='game_data'):

    # a dictionary (of sets) used to keep track of teams a player has been on
    pteams = {}
    # a dictionary to convert from a player id to a name
    pnames = {}
    # the path to the game data
    path = "./" + folder + "/"
    # determine how many files to process from the folder (files chosen is
    # not determined -- left to the machine)
    if numFiles > 0:
        filesToProcess = numFiles
    else:
        # "0" translates to process ALL the files
        filesToProcess = len(os.listdir(path))

    currFile = 0  # file being processed at any time
    for filename in os.listdir(path)[0:filesToProcess]:
        # Print file currently being processed
        currFile += 1
        print('File ' + str(currFile) + '/'
              + str(filesToProcess), end='\r')

        with open(path + filename) as fp:
            game_file = json.load(fp)
        game_data = game_file[list(game_file.keys())[0]]
        game_data['drives'].pop('crntdrv', None)

        for drive in game_data['drives'].values():

            for play in drive['plays'].values():

                for plyid, stats in play['players'].items():
                    # Let's get the names of players for later
                    pnames[plyid] = stats[0]['playerName']
                    # id 0 is a player named ''
                    nonPlayers = ("0")
                    if not plyid in nonPlayers:
                        if not plyid in pteams.keys():
                            pteams[plyid] = set()
                        pteams[plyid].add(stats[0]['clubcode'])

    print('File ' + str(currFile) + '/'
            + str(filesToProcess))

    # We put player names in sorted list so we can loop highest->lowest
    pids = sorted(pteams, key=lambda k: len(pteams[k]), reverse=True)
    # We can now just grab the highest number teams for a single player
    highest = len(pteams[pids[0]])
    # Reduce our list to just players with the highest # of teams
    # (There could be more than one with equal #'s)
    k = 0
    while k < len(pids) and len(pteams[pids[k]]) == highest:
        k += 1
    highids = pids[0:k]
    # Define the results
    results = [{
        'id': plyid,
        'teams': pteams[plyid],
        'numTeams': len(pteams[plyid]),
        'name': pnames[plyid]
    } for plyid in highids]

    return results

##############################################################
# plyMultiTeams(*, numFiles=0, folder='game_data')
#
# Gets a list of players that have played for more than one
# team within the games given.
#
# Params:
#    numFiles [int] : number of files from the directory that
#        should be processed. 0=all.
#    folder [string] : name of the folder that game data files
#        should be contained within
# Returns:
#    list of dictionaries of players who had played on multiple
#    teams. Structure of returned object:
#        [{
#            'id': str,
#            'teams': [str, str, ...],
#            'numTeams': int,
#            'name': str
#        }]
def plyMultiTeams(*, numFiles=0, folder='game_data'):

    # a dictionary (of sets) used to keep track of teams a player has been on
    pteams = {}
    # a dictionary to convert from a player id to a name
    pnames = {}
    # the path to the game data
    path = "./" + folder + "/"
    # determine how many files to process from the folder (files chosen is
    # not determined -- left to the machine)
    if numFiles > 0:
        filesToProcess = numFiles
    else:
        # "0" translates to process ALL the files
        filesToProcess = len(os.listdir(path))

    currFile = 0  # file being processed at any time
    for filename in os.listdir(path)[0:filesToProcess]:
        # Print file currently being processed
        currFile += 1
        print('File ' + str(currFile) + '/'
              + str(filesToProcess), end='\r')

        with open(path + filename) as fp:
            game_file = json.load(fp)
        game_data = game_file[list(game_file.keys())[0]]
        game_data['drives'].pop('crntdrv', None)

        for drive in game_data['drives'].values():

            for play in drive['plays'].values():

                for plyid, stats in play['players'].items():
                    # Let's get the names of players for later
                    pnames[plyid] = stats[0]['playerName']
                    # id 0 is a player named ''
                    nonPlayers = ("0")
                    if not plyid in nonPlayers:
                        if not plyid in pteams.keys():
                            pteams[plyid] = set()
                        pteams[plyid].add(stats[0]['clubcode'])

    print('File ' + str(currFile) + '/'
            + str(filesToProcess))

    # We put player names in sorted list so we can loop highest->lowest
    pids = sorted(pteams, key=lambda k: len(pteams[k]), reverse=True)
    # Reduce our list to just players with more than 1 team
    k = 0
    while k < len(pids) and len(pteams[pids[k]]) > 1:
        k += 1
    highids = pids[0:k]
    # Define the results
    results = [{
        'id': plyid,
        'teams': pteams[plyid],
        'numTeams': len(pteams[plyid]),
        'name': pnames[plyid]
    } for plyid in highids]

    return results

##############################################################
# plyNegRush(*, numFiles=0, folder='game_data')
#
# This function grabs some number of game files from some
# folder in the current directory. It then determines which
# player(s) from all of the given games has rushed the most
# yards for a loss.
#
# Params:
#    numFiles [int] : number of files from the directory that
#        should be processed. 0=all.
#    folder [string] : name of the folder that game data files
#        should be contained within
# Returns:
#    list of dictionaries of players who had played on the most
#    teams. Structure of returned object:
#        [{
#            'id': str,
#            'teams': [str, str, ...],
#            'numTeams': int,
#            'name': str
#        }]
def plyNegRush(*, numFiles=0, folder='game_data'):

    # a dictionary containing total negative yards rushed by players
    pnegs = {}
    # a dictionary containing how many times a player rushed for a loss
    pnegcount = {}
    # a dictionary to convert from a player id to a name
    pnames = {}
    # the path to the game data
    path = "./" + folder + "/"
    # determine how many files to process from the folder (files chosen is
    # not determined -- left to the machine)
    if numFiles > 0:
        filesToProcess = numFiles
    else:
        # "0" translates to process ALL the files
        filesToProcess = len(os.listdir(path))

    currFile = 0  # file being processed at any time
    for filename in os.listdir(path)[0:filesToProcess]:
        # Print file currently being processed
        currFile += 1
        print('File ' + str(currFile) + '/'
              + str(filesToProcess), end='\r')

        with open(path + filename) as fp:
            game_file = json.load(fp)
        game_data = game_file[list(game_file.keys())[0]]

        for key in ['home', 'away']:

            for plyid,rush in game_data[key]['stats']['rushing'].items():

                if rush['yds'] < 0:

                    if not plyid in pnegs.keys():
                        pnegs[plyid] = 0
                        pnegcount[plyid] = 0
                        pnames[plyid] = rush['name']
                    
                    pnegs[plyid] += rush['yds']
                    pnegcount[plyid] += 1

    print('File ' + str(currFile) + '/'
            + str(filesToProcess))

    # We put player names in sorted list so we can loop lowest->highest
    pids = sorted(pnegs, key=lambda k: pnegs[k], reverse=False)
    # Getting the lowest is now trivial
    lowest = pnegs[pids[0]]
    # Reduce our list to just players with the lowest yards
    # (There could be more than one with equal yards)
    k = 0
    while k < len(pids) and pnegs[pids[k]] == lowest:
        k += 1
    lowids = pids[0:k]
    # Define the results
    results = [{
        'id': plyid,
        'yards': pnegs[plyid],
        'lossRushes': pnegcount[plyid],
        'name': pnames[plyid]
    } for plyid in lowids]

    return results

##############################################################
# plyNegRushByCount(*, numFiles=0, folder='game_data')
#
# This function grabs some number of game files from some
# folder in the current directory. It then determines which
# player(s) from all of the given games has rushed for a loss
# the most times
#
# Params:
#    numFiles [int] : number of files from the directory that
#        should be processed. 0=all.
#    folder [string] : name of the folder that game data files
#        should be contained within
# Returns:
#    list of dictionaries of players who had played on the most
#    teams. Structure of returned object:
#        [{
#            'id': str,
#            'teams': [str, str, ...],
#            'numTeams': int,
#            'name': str
#        }]
def plyNegRushByCount(*, numFiles=0, folder='game_data'):

    # a dictionary containing total negative yards rushed by players
    pnegs = {}
    # a dictionary containing how many times a player rushed for a loss
    pnegcount = {}
    # a dictionary to convert from a player id to a name
    pnames = {}
    # the path to the game data
    path = "./" + folder + "/"
    # determine how many files to process from the folder (files chosen is
    # not determined -- left to the machine)
    if numFiles > 0:
        filesToProcess = numFiles
    else:
        # "0" translates to process ALL the files
        filesToProcess = len(os.listdir(path))

    currFile = 0  # file being processed at any time
    for filename in os.listdir(path)[0:filesToProcess]:
        # Print file currently being processed
        currFile += 1
        print('File ' + str(currFile) + '/'
              + str(filesToProcess), end='\r')

        with open(path + filename) as fp:
            game_file = json.load(fp)
        game_data = game_file[list(game_file.keys())[0]]

        for key in ['home', 'away']:

            for plyid,rush in game_data[key]['stats']['rushing'].items():

                if rush['yds'] < 0:

                    if not plyid in pnegcount.keys():
                        pnegs[plyid] = 0
                        pnegcount[plyid] = 0
                        pnames[plyid] = rush['name']
                    
                    pnegs[plyid] += rush['yds']
                    pnegcount[plyid] += 1

    print('File ' + str(currFile) + '/'
            + str(filesToProcess))

    # We put player names in sorted list so we can loop highest->lowest
    pids = sorted(pnegcount, key=lambda k: pnegcount[k], reverse=True)
    # Getting the highest is now trivial
    highest = pnegcount[pids[0]]
    # Reduce our list to just players with the highest rushes for a loss
    # (There could be more than one with equal passes)
    k = 0
    while k < len(pids) and pnegcount[pids[k]] == highest:
        k += 1
    highids = pids[0:k]
    # Define the results
    results = [{
        'id': plyid,
        'yards': pnegs[plyid],
        'lossRushes': pnegcount[plyid],
        'name': pnames[plyid]
    } for plyid in highids]

    return results

##############################################################
# plyNegPass(*, numFiles=0, folder='game_data')
#
# This function grabs some number of game files from some
# folder in the current directory. It then determines which
# player(s) from all of the given games has passed for a loss
# the most times
#
# Params:
#    numFiles [int] : number of files from the directory that
#        should be processed. 0=all.
#    folder [string] : name of the folder that game data files
#        should be contained within
# Returns:
#    list of dictionaries of players who had played on the most
#    teams. Structure of returned object:
#        [{
#            'id': str,
#            'teams': [str, str, ...],
#            'numTeams': int,
#            'name': str
#        }]
def plyNegPass(*, numFiles=0, folder='game_data'):

    # a dictionary containing total negative yards rushed by players
    pnegs = {}
    # a dictionary containing how many times a player rushed for a loss
    pnegcount = {}
    # a dictionary to convert from a player id to a name
    pnames = {}
    # the path to the game data
    path = "./" + folder + "/"
    # determine how many files to process from the folder (files chosen is
    # not determined -- left to the machine)
    if numFiles > 0:
        filesToProcess = numFiles
    else:
        # "0" translates to process ALL the files
        filesToProcess = len(os.listdir(path))

    currFile = 0  # file being processed at any time
    for filename in os.listdir(path)[0:filesToProcess]:
        # Print file currently being processed
        currFile += 1
        print('File ' + str(currFile) + '/'
              + str(filesToProcess), end='\r')

        with open(path + filename) as fp:
            game_file = json.load(fp)
        game_data = game_file[list(game_file.keys())[0]]

        for key in ['home', 'away']:

            for plyid,pas in game_data[key]['stats']['passing'].items():

                if pas['yds'] < 0:

                    if not plyid in pnegcount.keys():
                        pnegs[plyid] = 0
                        pnegcount[plyid] = 0
                        pnames[plyid] = pas['name']
                    
                    pnegs[plyid] += pas['yds']
                    pnegcount[plyid] += 1

    print('File ' + str(currFile) + '/'
            + str(filesToProcess))

    # We put player names in sorted list so we can loop highest->lowest
    pids = sorted(pnegcount, key=lambda k: pnegcount[k], reverse=True)
    # Getting the highest is now trivial
    highest = pnegcount[pids[0]]
    # Reduce our list to just players with the highest passes for a loss
    # (There could be more than one with equal passes)
    k = 0
    while k < len(pids) and pnegcount[pids[k]] == highest:
        k += 1
    highids = pids[0:k]
    # Define the results
    results = [{
        'id': plyid,
        'yards': pnegs[plyid],
        'lossPasses': pnegcount[plyid],
        'name': pnames[plyid]
    } for plyid in highids]

    return results

##############################################################
# teamMostPenalties(*, numFiles=0, folder='game_data')
#
# Function gets a list of teams with the most penalties
#
# Params:
#    numFiles [int] : number of files from the directory that
#        should be processed. 0=all.
#    folder [string] : name of the folder that game data files
#        should be contained within
# Returns:
#    list of dictionaries of teams
#    Structure of returned object:
#        [{
#            'team': Abbreviation of the team,
#            'penalties': number of penalties the team received
#        }]
def teamMostPenalties(*, numFiles=0, folder='game_data'):

    # dictionary to see how many penalties a team has
    team_penalties = {}
    # the path to the game data
    path = "./" + folder + "/"
    # determine how many files to process from the folder (files chosen is
    # not determined -- left to the machine)
    if numFiles > 0:
        filesToProcess = numFiles
    else:
        # "0" translates to process ALL the files
        filesToProcess = len(os.listdir(path))

    currFile = 0  # file being processed at any time
    for filename in os.listdir(path)[0:filesToProcess]:
        # Print file currently being processed
        currFile += 1
        print('File ' + str(currFile) + '/'
              + str(filesToProcess), end='\r')

        with open(path + filename) as fp:
            game_file = json.load(fp)
        game_data = game_file[list(game_file.keys())[0]]
        
        game_data['drives'].pop('crntdrv')
        for drive in game_data['drives'].values():
            
            for play in drive['plays'].values():

                if play['note'] == "PENALTY":

                    if not play['posteam'] in team_penalties.keys():
                        team_penalties[play['posteam']] = 0
                    
                    team_penalties[play['posteam']] += 1

    print('File ' + str(currFile) + '/'
            + str(filesToProcess))

    # Sort a list of team names
    teams = sorted(team_penalties, key=lambda k: team_penalties[k], reverse=True)
    # Getting the highest is now trivial
    highest = team_penalties[teams[0]]
    # Reduce our list to just teams with the most penalties, could be equal
    k = 0
    while k < len(teams) and team_penalties[teams[k]] == highest:
        k += 1
    highids = teams[0:k]
    # Define the results
    results = [{
        'team': teamid,
        'penalties': team_penalties[teamid]
    } for teamid in highids]

    return results

##############################################################
# teamMostPenaltyYards(*, numFiles=0, folder='game_data')
#
# Function gets a list of teams with the most penalty yards
#
# Params:
#    numFiles [int] : number of files from the directory that
#        should be processed. 0=all.
#    folder [string] : name of the folder that game data files
#        should be contained within
# Returns:
#    list of dictionaries of teams
#    Structure of returned object:
#        [{
#            'team': Abbreviation of the team,
#            'penalty_yards': number of yards in penalties
#        }]
def teamMostPenaltyYards(*, numFiles=0, folder='game_data'):

    # dictionary to see how many penalties a team has
    team_penalties = {}
    # the path to the game data
    path = "./" + folder + "/"
    # determine how many files to process from the folder (files chosen is
    # not determined -- left to the machine)
    if numFiles > 0:
        filesToProcess = numFiles
    else:
        # "0" translates to process ALL the files
        filesToProcess = len(os.listdir(path))

    currFile = 0  # file being processed at any time
    for filename in os.listdir(path)[0:filesToProcess]:
        # Print file currently being processed
        currFile += 1
        print('File ' + str(currFile) + '/'
              + str(filesToProcess), end='\r')

        with open(path + filename) as fp:
            game_file = json.load(fp)
        game_data = game_file[list(game_file.keys())[0]]
        
        game_data['drives'].pop('crntdrv')
        for drive in game_data['drives'].values():
            
            for play in drive['plays'].values():

                if play['note'] == "PENALTY":

                    if not play['posteam'] in team_penalties.keys():
                        team_penalties[play['posteam']] = 0
                    
                    team_penalties[play['posteam']] += play['ydsnet']

    print('File ' + str(currFile) + '/'
            + str(filesToProcess))

    # Sort a list of team names
    teams = sorted(team_penalties, key=lambda k: team_penalties[k], reverse=True)
    # Getting the highest is now trivial
    highest = team_penalties[teams[0]]
    # Reduce our list to just teams with the most penalties, could be equal
    k = 0
    while k < len(teams) and team_penalties[teams[k]] == highest:
        k += 1
    highids = teams[0:k]
    # Define the results
    results = [{
        'team': teamid,
        'penalty_yards': team_penalties[teamid]
    } for teamid in highids]

    return results


# JUST DONT MESS WITH THIS
def _teamsWithHighPenaltiesAvgWins(*, numFiles=0, folder='game_data'):

    # dictionary to see how many penalties a team has
    team_penalties = {}
    # number of wins a team has achieved
    team_wins = {}
    # the path to the game data
    path = "./" + folder + "/"
    # determine how many files to process from the folder (files chosen is
    # not determined -- left to the machine)
    if numFiles > 0:
        filesToProcess = numFiles
    else:
        # "0" translates to process ALL the files
        filesToProcess = len(os.listdir(path))

    currFile = 0  # file being processed at any time
    for filename in os.listdir(path)[0:filesToProcess]:
        # Print file currently being processed
        currFile += 1
        print('File ' + str(currFile) + '/'
              + str(filesToProcess), end='\r')

        with open(path + filename) as fp:
            game_file = json.load(fp)
        game_data = game_file[list(game_file.keys())[0]]
        
        game_data['drives'].pop('crntdrv')
        for drive in game_data['drives'].values():
            
            for play in drive['plays'].values():

                if play['note'] == "PENALTY":

                    if not play['posteam'] in team_penalties.keys():
                        team_penalties[play['posteam']] = 0
                    
                    team_penalties[play['posteam']] += 1

        # Get winners of each game
        home_score = game_data['home']['score']['T']
        home_name = game_data['home']['abbr']
        away_score = game_data['away']['score']['T']
        away_name = game_data['away']['abbr']

        if home_score > away_score:

            if not home_name in team_wins.keys():
                team_wins[home_name] = 0

            team_wins[home_name] += 1
        
        else:

            if not away_name in team_wins.keys():
                team_wins[away_name] = 0

            team_wins[away_name] += 1
       
    print('File ' + str(currFile) + '/'
            + str(filesToProcess))
 
    # Sort a list of team names
    teams = sorted(team_penalties, key=lambda k: team_penalties[k], reverse=True)
    # Reduce our list to just teams with the most penalties, could be equal
    teams = teams[0:10]

    # LOGIC HERE
    avg_wins = 0
    for team in teams:
        if team in team_wins.keys():
            avg_wins += team_wins[team]
    avg_wins /= len(teams)

    return avg_wins

# DO NOT USE IS PRIVATE BYE
def _teamsWithHighPenaltiesAvgLosses(*, numFiles=0, folder='game_data'):

    # dictionary to see how many penalties a team has
    team_penalties = {}
    # number of wins a team has achieved
    team_losses = {}
    # the path to the game data
    path = "./" + folder + "/"
    # determine how many files to process from the folder (files chosen is
    # not determined -- left to the machine)
    if numFiles > 0:
        filesToProcess = numFiles
    else:
        # "0" translates to process ALL the files
        filesToProcess = len(os.listdir(path))

    currFile = 0  # file being processed at any time
    for filename in os.listdir(path)[0:filesToProcess]:
        # Print file currently being processed
        currFile += 1
        print('File ' + str(currFile) + '/'
              + str(filesToProcess), end='\r')

        with open(path + filename) as fp:
            game_file = json.load(fp)
        game_data = game_file[list(game_file.keys())[0]]
        
        game_data['drives'].pop('crntdrv')
        for drive in game_data['drives'].values():
            
            for play in drive['plays'].values():

                if play['note'] == "PENALTY":

                    if not play['posteam'] in team_penalties.keys():
                        team_penalties[play['posteam']] = 0
                    
                    team_penalties[play['posteam']] += 1

        # Get winners of each game
        home_score = game_data['home']['score']['T']
        home_name = game_data['home']['abbr']
        away_score = game_data['away']['score']['T']
        away_name = game_data['away']['abbr']

        if home_score > away_score:

            if not away_name in team_losses.keys():
                team_losses[away_name] = 0

            team_losses[away_name] += 1
        
        else:

            if not home_name in team_losses.keys():
                team_losses[home_name] = 0

            team_losses[home_name] += 1

    print('File ' + str(currFile) + '/'
            + str(filesToProcess))

    # Sort a list of team names
    teams = sorted(team_penalties, key=lambda k: team_penalties[k], reverse=True)
    # Reduce our list to just teams with the most penalties, could be equal
    teams = teams[0:10]

    # LOGIC HERE
    avg_losses = 0
    for team in teams:
        if team in team_losses.keys():
            avg_losses += team_losses[team]
    avg_losses /= len(teams)

    return avg_losses

##############################################################
# teamPenaltyWinRatio(*, numFiles=0, folder='game_data')
#
# Ratio of wins/losses for teams with high numbers of penalties
#
# Params:
#    numFiles [int] : number of files from the directory that
#        should be processed. 0=all.
#    folder [string] : name of the folder that game data files
#        should be contained within
# Returns: number, ratio of wins to losses of top 10 teams with
#              highest penalties
def teamPenaltyWinRatio(*, numFiles=0, folder='game_data'):
    ratio = _teamsWithHighPenaltiesAvgWins(numFiles=numFiles, folder=folder) / _teamsWithHighPenaltiesAvgLosses(numFiles=numFiles, folder=folder)
    return ratio

##############################################################
# avgPlaysInGame(*, numFiles=0, folder='game_data')
#
# Average number of plays in a game
#
# Params:
#    numFiles [int] : number of files from the directory that
#        should be processed. 0=all.
#    folder [string] : name of the folder that game data files
#        should be contained within
# Returns: number, average plays
def avgPlaysInGame(*, numFiles=0, folder='game_data'):

    # Number of plays in each game
    plays_in_games = []
    # the path to the game data
    path = "./" + folder + "/"
    # determine how many files to process from the folder (files chosen is
    # not determined -- left to the machine)
    if numFiles > 0:
        filesToProcess = numFiles
    else:
        # "0" translates to process ALL the files
        filesToProcess = len(os.listdir(path))

    currFile = 0  # file being processed at any time
    for filename in os.listdir(path)[0:filesToProcess]:
        # Print file currently being processed
        currFile += 1
        print('File ' + str(currFile) + '/'
              + str(filesToProcess), end='\r')

        with open(path + filename) as fp:
            game_file = json.load(fp)
        game_data = game_file[list(game_file.keys())[0]]
        
        # number of plays in THIS game
        this_plays = 0

        game_data['drives'].pop('crntdrv')
        for drive in game_data['drives'].values():
            
            this_plays += len(drive['plays'])
        
        plays_in_games.append(this_plays)
    
    print('File ' + str(currFile) + '/'
            + str(filesToProcess))

    return reduce(lambda a, b: a + b, plays_in_games) / len(plays_in_games)

##############################################################
# longestFieldGoal(*, numFiles=0, folder='game_data')
#
# Longest field goal in a game.
#
# Params:
#    numFiles [int] : number of files from the directory that
#        should be processed. 0=all.
#    folder [string] : name of the folder that game data files
#        should be contained within
# Returns: number, longest field goal in a game
def longestFieldGoal(*, numFiles=0, folder='game_data'):

    # longest field goal
    longest = 0
    # the path to the game data
    path = "./" + folder + "/"
    # determine how many files to process from the folder (files chosen is
    # not determined -- left to the machine)
    if numFiles > 0:
        filesToProcess = numFiles
    else:
        # "0" translates to process ALL the files
        filesToProcess = len(os.listdir(path))

    currFile = 0  # file being processed at any time
    for filename in os.listdir(path)[0:filesToProcess]:
        # Print file currently being processed
        currFile += 1
        print('File ' + str(currFile) + '/'
              + str(filesToProcess), end='\r')

        with open(path + filename) as fp:
            game_file = json.load(fp)
        game_data = game_file[list(game_file.keys())[0]]
        
        game_data['drives'].pop('crntdrv')

        for drive in game_data['drives'].values():

            for play in drive['plays'].values():

                for players in play['players'].values():

                    for player in players:

                        # If player yards is even a thing
                        if player['yards']:

                            if player['statId'] == 70 and player['yards'] > longest:
                                longest = player['yards']

    print('File ' + str(currFile) + '/'
            + str(filesToProcess))

    return longest

##############################################################
# mostFieldGoals(*, numFiles=0, folder='game_data')
#
# Most field goals in a single game
#
# Params:
#    numFiles [int] : number of files from the directory that
#        should be processed. 0=all.
#    folder [string] : name of the folder that game data files
#        should be contained within
# Returns: number
def mostFieldGoals(*, numFiles=0, folder='game_data'):

    # most number of field goals in a single game
    most = 0
    # the path to the game data
    path = "./" + folder + "/"
    # determine how many files to process from the folder (files chosen is
    # not determined -- left to the machine)
    if numFiles > 0:
        filesToProcess = numFiles
    else:
        # "0" translates to process ALL the files
        filesToProcess = len(os.listdir(path))

    currFile = 0  # file being processed at any time
    for filename in os.listdir(path)[0:filesToProcess]:
        # Print file currently being processed
        currFile += 1
        print('File ' + str(currFile) + '/'
              + str(filesToProcess), end='\r')

        with open(path + filename) as fp:
            game_file = json.load(fp)
        game_data = game_file[list(game_file.keys())[0]]
        
        game_data['drives'].pop('crntdrv')

        game_count = 0

        for drive in game_data['drives'].values():

            for play in drive['plays'].values():

                for players in play['players'].values():

                    for player in players:

                        if player['statId'] == 70:
                            game_count += 1

        if game_count > most:
            most = game_count

    print('File ' + str(currFile) + '/'
            + str(filesToProcess))

    return most

##############################################################
# mostMissedFieldGoals(*, numFiles=0, folder='game_data')
#
# Most missed field goals in a single game
#
# Params:
#    numFiles [int] : number of files from the directory that
#        should be processed. 0=all.
#    folder [string] : name of the folder that game data files
#        should be contained within
# Returns: number
def mostMissedFieldGoals(*, numFiles=0, folder='game_data'):

    # most number of missed field goals in a single game
    most = 0
    # the path to the game data
    path = "./" + folder + "/"
    # determine how many files to process from the folder (files chosen is
    # not determined -- left to the machine)
    if numFiles > 0:
        filesToProcess = numFiles
    else:
        # "0" translates to process ALL the files
        filesToProcess = len(os.listdir(path))

    currFile = 0  # file being processed at any time
    for filename in os.listdir(path)[0:filesToProcess]:
        # Print file currently being processed
        currFile += 1
        print('File ' + str(currFile) + '/'
              + str(filesToProcess), end='\r')

        with open(path + filename) as fp:
            game_file = json.load(fp)
        game_data = game_file[list(game_file.keys())[0]]
        
        game_data['drives'].pop('crntdrv')

        game_count = 0

        for drive in game_data['drives'].values():

            for play in drive['plays'].values():

                for players in play['players'].values():

                    for player in players:

                        if player['statId'] == 69:
                            game_count += 1

        if game_count > most:
            most = game_count

    print('File ' + str(currFile) + '/'
            + str(filesToProcess))

    return most

##############################################################
# mostDroppedPasses(*, numFiles=0, folder='game_data')
#
# Most dropped passes in a single game
#
# Params:
#    numFiles [int] : number of files from the directory that
#        should be processed. 0=all.
#    folder [string] : name of the folder that game data files
#        should be contained within
# Returns: number
def mostDroppedPasses(*, numFiles=0, folder='game_data'):

    # most number of dropped passes in a single game
    most = 0
    # the path to the game data
    path = "./" + folder + "/"
    # determine how many files to process from the folder (files chosen is
    # not determined -- left to the machine)
    if numFiles > 0:
        filesToProcess = numFiles
    else:
        # "0" translates to process ALL the files
        filesToProcess = len(os.listdir(path))

    currFile = 0  # file being processed at any time
    for filename in os.listdir(path)[0:filesToProcess]:
        # Print file currently being processed
        currFile += 1
        print('File ' + str(currFile) + '/'
              + str(filesToProcess), end='\r')

        with open(path + filename) as fp:
            game_file = json.load(fp)
        game_data = game_file[list(game_file.keys())[0]]
        
        game_data['drives'].pop('crntdrv')

        game_count = 0

        for drive in game_data['drives'].values():

            for play in drive['plays'].values():

                description = play['desc'].split()
                
                # Originally this was 
                # if 'pass' in description and 'dropped' in description:
                # but 'pass' is unnecessary as statid 115 implies a pass
                # and "dropped" or "drop" or "drops" seem useful
                # Still, it didn't affect my results and a simple google search
                # will reveal their inaccuracy. Perhaps dropped passes can
                # be coded another way in the NFL data?
                if 'drop' in description or 'drops' in description or 'dropped' in description:

                    for players in play['players'].values():

                        for player in players:

                            if player['statId'] == 115:
                                game_count += 1

        if game_count > most:
            most = game_count

    print('File ' + str(currFile) + '/'
            + str(filesToProcess))

    return most

if __name__ == '__main__':

    # 0 for the entire directory
    NUM_FILES = 0

    print("Name: Jeremy Glebe")
    print("Assignment: A03 - Nfl Stats")
    print("Date: 2/17/2019")

    print()
    print("==================================================================================")
    print("Find the player(s) that played for the most teams.")
    answer = plyMostTeams(numFiles=NUM_FILES)
    print()
    print("***List of players who played on the most teams***")
    for player in answer:
        print()
        print("Player:", player['name'])
        print("Number of Teams:", player['numTeams'])
        print("Teams:", player['teams'])

    print()
    print("==================================================================================")
    print("Find the player(s) that played for multiple teams in one year.")
    answer = plyMultiTeams(numFiles=NUM_FILES)
    print()
    print("***List of players who played on multiple teams***")
    for player in answer[:10]:
        print()
        print("Player:", player['name'])
        print("Number of Teams:", player['numTeams'])
        print("Teams:", player['teams'])
    if len(answer) > 10:
        print()
        print("...")

    print()
    print("==================================================================================")
    print("Find the player(s) that had the most yards rushed for a loss.")
    answer = plyNegRush(numFiles=NUM_FILES)
    print()
    print("***List of players who has the most yards rushed for a loss***")
    for player in answer[:10]:
        print()
        print("Player:", player['name'])
        print("Rushes for a loss:", player['lossRushes'])
        print("Yards lost:", player['yards'])
    if len(answer) > 10:
        print()
        print("...")
        
    print()
    print("==================================================================================")
    print("Find the player(s) that had the most rushes for a loss.")
    answer = plyNegRushByCount(numFiles=NUM_FILES)
    print()
    print("***List of players who had the most rushes for a loss***")
    for player in answer[:10]:
        print()
        print("Player:", player['name'])
        print("Rushes for a loss:", player['lossRushes'])
        print("Yards lost:", player['yards'])
    if len(answer) > 10:
        print()
        print("...")
        
    print()
    print("==================================================================================")
    print("Find the player(s) with the most number of passes for a loss.")
    answer = plyNegPass(numFiles=NUM_FILES)
    print()
    print("***List of players who had the most passes for a loss***")
    for player in answer[:10]:
        print()
        print("Player:", player['name'])
        print("Passes for a loss:", player['lossPasses'])
        print("Yards lost:", player['yards'])
    if len(answer) > 10:
        print()
        print("...")
        
    print()
    print("==================================================================================")
    print("Find the team with the most penalties.")
    answer = teamMostPenalties(numFiles=NUM_FILES)
    print()
    print("***List of teams with the most penalties***")
    for team in answer[:10]:
        print()
        print("Team:", team['team'])
        print("Penalties:", team['penalties'])
    if len(answer) > 10:
        print()
        print("...")
        
    print()
    print("==================================================================================")
    print("Find the team with the most yards in penalties.")
    answer = teamMostPenaltyYards(numFiles=NUM_FILES)
    print()
    print("***List of teams with the most yards in penalties***")
    for team in answer[:10]:
        print()
        print("Team:", team['team'])
        print("Yards:", team['penalty_yards'])
    if len(answer) > 10:
        print()
        print("...")
        
    print()
    print("==================================================================================")
    print("Find the correlation between most penalized teams and games won / lost.")
    answer = teamPenaltyWinRatio(numFiles=NUM_FILES)
    print()
    print("Average Win/Loss Ratio for teams with highest number of penalties:", answer)
    if answer < 0.95:
        print("Teams that get penalized a lot also lose a lot.")
    elif answer > 1.05:
        print("Teams that get penalized a lot also win often.")
    else:
        print("Teams that get penalized a lot do not see an impact on their win/loss ratio")
        
    print()
    print("==================================================================================")
    print("Average number of plays in a game.")
    answer = avgPlaysInGame(numFiles=NUM_FILES)
    print()
    print("Answer:", answer)
  
    print()
    print("==================================================================================")
    print("Longest field goal.")
    answer = longestFieldGoal(numFiles=NUM_FILES)
    print()
    print("Answer:", answer)

    print()
    print("==================================================================================")
    print("Most field goals.")
    answer = mostFieldGoals(numFiles=NUM_FILES)
    print()
    print("Most field goals in a single game:", answer)

    print()
    print("==================================================================================")
    print("Most missed field goals.")
    answer = mostMissedFieldGoals(numFiles=NUM_FILES)
    print()
    print("Most missed field goals in a single game:", answer)

    print()
    print("==================================================================================")
    print("Most dropped passes (Search for \"pass\" and \"dropped\" in play description, and stat-id 115).")
    answer = mostDroppedPasses(numFiles=NUM_FILES)
    print()
    print("Most dropped passes in a single game:", answer)
