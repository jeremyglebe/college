#!/usr/bin/env python
"""
Program: Matching Images
File: match.py
Python program that finds the nearest match to an image within a folder of images.
This file contains the main function and logic of the program.
Instructions: Run the program using the command
    match.py folder=FOLDER_PATH image=IMAGE_FILE
    The image file provided should be located in the folder given. The folder should
    also contain the images you wish to compare to the given image. Folder path is
    relative to the current directory.
    Example: match.py folder=images image=test.png
Author: Jeremy Glebe
Date: 3/15/2019
"""

import sys
import os
import cv2
import match_functions as match

# Getting command line arguments
ARGS = {}
# This assumes arguments are like: key1=val1 key2=val2 (with NO spaces between key equal val!)
for arg in sys.argv[1:]:
    k, v = arg.split('=')
    ARGS[k] = v

# The folder to process looking for matches
FOLDER = os.getcwd() + '\\' + ARGS['folder']
# The image file we're looking for matches to -- should also be inside the search folder
IMAGE_PATH = os.getcwd() + '\\' + ARGS['folder'] + '\\' + ARGS['image']

def main():
    """Main function of the program"""
    # Load the main image
    image = cv2.imread(IMAGE_PATH)
    image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    match_name = ''
    match_val = -2
    for filename in os.listdir(FOLDER):
        if filename.lower() != ARGS['image'].lower():
            match_image = cv2.imread(FOLDER + '\\' + filename)
            match_image = cv2.cvtColor(match_image, cv2.COLOR_BGR2RGB)
            similarity = match.compare(image, match_image)
            if similarity > match_val:
                match_name = filename
                match_val = similarity
    final_match = cv2.imread(FOLDER + '\\' + match_name)
    final_match = cv2.cvtColor(final_match, cv2.COLOR_BGR2RGB)
    print("Best Match for " + ARGS['image'] + " is " + match_name)
    match.compare_and_show(
        image, final_match, 'Best Match for ' + ARGS['image'])


main()
