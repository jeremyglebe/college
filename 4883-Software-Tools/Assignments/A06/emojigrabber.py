#!/usr/bin/env python
"""EMOJI SCRAPER: Scrapes all the emojis from webfx. Zips them into a file (emojis.zip)
Author: Jeremy Glebe
Date: 3/11/19"""
__author__ = "Jeremy Glebe"
__email__ = "jeremyglebe@gmail.com"

from beautifulscraper import BeautifulScraper
import os
import shutil
import urllib.request
from time import sleep
from random import random as rnd

# Url to get emojis from
url = 'https://www.webfx.com/tools/emoji-cheat-sheet/'
# Scraper object
scraper = BeautifulScraper()
# Get the page where all the emojis are
page = scraper.go(url)
# Create a temporary folder to store downloads before the zip
temp_path = os.getcwd() + '\\tmp\\'
if not os.path.exists(temp_path):
    os.makedirs(temp_path)
# Total number of emojis
tot_cnt = len(page.find_all("span", {"class": "emoji"}))
# Counter
count = 1
# Loop through the page
for emoji in page.find_all("span", {"class": "emoji"}):
    # Get the path to each emojis image
    image_path = emoji['data-src']
    # Get the name of the emoji's file
    emoji_file = image_path.split('/')[2]
    # See the progress of the scraping
    print('(' + str(count) + '/' + str(tot_cnt) + ')   ' + url+image_path)
    # Save the image using requests library
    urllib.request.urlretrieve(url + image_path, 'tmp/' + emoji_file)
    # Don't harass the website
    sleep(rnd() / 100)
    # Increment the counter
    count += 1
# We need to zip the results
shutil.make_archive('emojis', 'zip', 'tmp/')
# And remove the large folder
shutil.rmtree('tmp/')