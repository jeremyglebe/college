import json
import os
import praw
import datetime as dt
from pprint import pprint


def rpost2obj(post):
    '''Creates a dictionary object out of a single reddit submission'''
    return {
        "title": post.title,
        "score": post.score,
        "id": post.id,
        "url": post.url,
        "num_comments": post.num_comments,
        "created": post.created,
        "selftext": post.selftext
    }


def reddit2dict(submissions):
    '''Creates a dictionary out of a set of reddit submissions'''
    i = 1
    dictionary = {}
    for post in submissions:
        print(f"\rProcessing post #{i}/1000", end="")
        if not post.id in dictionary:
            dictionary[post.id] = rpost2obj(post)
        i += 1
    print()
    return dictionary


def reddit2files(submissions, dir):
    '''Creates files out of a set of reddit submissions'''
    i = 1
    for post in submissions:
        print(f"\rProcessing post #{i}/1000", end="")
        # We can further specify things to only save posts with a text body
        # Uncomment the next two lines to use this filtering
        # if post.selftext == '':
        #     continue
        # If a file corresponding with this post does not already exist
        if not os.path.isfile(os.path.join(dir, f'{post.id}.json')):
            post_obj = rpost2obj(post)
            with open(os.path.join(dir, f'{post.id}.json'), 'w') as f:
                f.write(json.dumps(post_obj))
        i += 1
    print()


# Get client's info to connect to Reddit
with open('client_info.json', 'r') as f:
    client_info = json.loads(f.read())

# Reddit API instance
print("Connecting to Reddit...")
reddit = praw.Reddit(client_id=client_info['client_id'],
                     client_secret=client_info['client_secret'],
                     user_agent=client_info['user_agent'],
                     username=client_info['username'],
                     password=client_info['password'])

# Subreddits for American politics
print("Establishing subreddits...")
subreddit_democrats = reddit.subreddit('democrats')
subreddit_republicans = reddit.subreddit('republicans')

# Get most recent data from each
print("Pulling recent posts from r/democrats...")
recent_democrats = subreddit_democrats.new(limit=1000)
print("Pulling recent posts from r/republicans...")
recent_republicans = subreddit_republicans.new(limit=1000)

# Get "hot" posts from each subreddit
print("Pulling hot posts from r/democrats...")
hot_democrats = subreddit_democrats.hot(limit=1000)
print("Pulling hot posts from r/republicans...")
hot_republicans = subreddit_republicans.hot(limit=1000)

# Dump all the data to files
reddit2files(recent_democrats, 'democrats')
reddit2files(hot_democrats, 'democrats')
reddit2files(recent_republicans, 'republicans')
reddit2files(hot_republicans, 'republicans')

# ------------------------------------------------------------------------------
# This block of code compiles each set of submissions into python dictionaries
# in case we want to dump all the submissions into one file together.
# We will not be doing that, but I want to leave the code in the event that
# we need a reference to do so later.
# ------------------------------------------------------------------------------
# print("Compiling dictionary of democrat posts...")
# submissions_democrats = {
#     **reddit2dict(recent_democrats),
#     **reddit2dict(hot_democrats)
# }
# print("Compiling dictionary of republican posts...")
# submissions_republicans = {
#     **reddit2dict(recent_republicans),
#     **reddit2dict(hot_republicans)
# }
# # Output all submissions as json files
# with open('democrats.json', 'w') as f:
#     f.write(json.dumps(submissions_democrats))
