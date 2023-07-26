#!/usr/bin/env python
"""
* Program: Mosaics
** Creates a mosaic out of some folder of tiles.
* File: mosaic.py
** Driver of the program. main() executes all necessary commands to create the
** mosaic.
* Author: Jeremy Glebe
* Date: 4/1/19
"""
__author__ = "Jeremy Glebe"
__email__ = "jeremyglebe@gmail.com"

import os
import sys
import multiprocessing as mp
from threading import Thread
from time import sleep, time
import cv2
import numpy as np
import match_functions as match


def print_progress():
    """Outputs the current progress of the program to the console."""
    time_left = int(TIME_PER_SEGMENT *
                    (MOSAIC_SEGMENTS - SEGMENTS_PROCESSED))
    minutes_left = int(time_left / 60)
    seconds_left = int(time_left % 60)
    update = "Processing segment # " + \
        str(SEGMENTS_PROCESSED + 1) + \
        " out of " + str(int(MOSAIC_SEGMENTS)) + " About " + \
        str(minutes_left) + 'm' + str(seconds_left) + "s remaining..."
    print(str(update), end='\r')


def progress_thread():
    while not ALL_SEGMENTS_DONE:
        print_progress()
        sleep(0.1)
    print_progress()


def processSegment(args):
    # Arguments
    tiles = args['tiles']
    image = args['image']
    data_queue = args['data_queue']
    x = args['x']
    y = args['y']
    tile_length = args['tile_length']
    # Get the segment of the image
    image_region = image[tile_length*y:tile_length*y +
                         tile_length, tile_length*x:tile_length*x+tile_length]
    # Load the best match for the section
    piece = match.best_match(image_region, tiles, tile_length, tile_length)
    # Send a signal to the data queue so that the program knows we've finished a segment
    data_queue.put(1)
    return piece


def main():
    # Globals
    global ALL_SEGMENTS_DONE
    global MOSAIC_SEGMENTS
    global SEGMENTS_PROCESSED
    global TIME_PER_SEGMENT

    # Getting command line arguments
    ARGS = {
        # Default arguments
        # Width should be a multiple of TILE_LENGTH
        'width': '1920',
        # Height should be a multiple of TILE_LENGTH
        'height': '1088',
        # Width and height of the tiles
        'tile_length': '64'
    }
    # This assumes arguments are like: key1=val1 key2=val2 (with NO spaces between key equal val!)
    for arg in sys.argv[1:]:
        k, v = arg.split('=')
        ARGS[k] = v

    # Set the length of the tiles being used in the mosaic (They should be square)
    tile_length = int(ARGS['tile_length'])

    # Directory of mosaic.py
    dir_path = os.path.dirname(os.path.realpath(__file__))
    # Width of the mosaic (must be a multiple of TILE_LENGTH)
    m_width = int(ARGS['width'])
    # Height of the mosaic (must be a multiple of TILE_LENGTH)
    m_height = int(ARGS['height'])
    # Number of segments of TILE_LENGTH across the width of the mosaic
    mosaic_width_in_segments = m_width / tile_length
    # Number of segments of TILE_LENGTH across the height of the mosaic
    mosaic_height_in_segments = m_height / tile_length
    # Total number of segments in the mosaic
    MOSAIC_SEGMENTS = mosaic_width_in_segments * mosaic_height_in_segments
    # Variables for live updates on program progress
    ALL_SEGMENTS_DONE = False
    SEGMENTS_PROCESSED = 0
    TIME_PER_SEGMENT = -1

    # Create an updates thread
    updates = Thread(target=progress_thread, name='updates')
    updates.start()

    # Read in an image
    image = cv2.imread(dir_path + '\\' + ARGS['image'])
    # Resize the image
    image = cv2.resize(image, (m_width, m_height),
                       interpolation=cv2.INTER_AREA)

    # Read in all of the tile images
    folder = dir_path + '\\' + ARGS['folder']
    tile_images = []
    for filename in os.listdir(folder):
        tile_images.append(cv2.imread(folder + '\\' + filename))

    # Initialize the mosaic
    mosaic = np.zeros((m_height, m_width, 3), np.uint8)
    # Create a queue of shared data between processes
    que = mp.Manager().Queue()
    # For each TILE_LENGTHxTILE_LENGTH segment of the image, queue up a segment to be processed
    segments = []
    for x in range(int(mosaic_width_in_segments)):
        for y in range(int(mosaic_height_in_segments)):
            segments.append({
                'image': image,
                'x': x,
                'y': y,
                'tiles': tile_images,
                'data_queue': que,
                'tile_length': tile_length
            })

    # Start the processes
    pool = mp.Pool()
    results = pool.map_async(processSegment, segments)

    # Lets keep track of the time it takes to complete
    start_time = time()
    while not results.ready():
        for _ in range(que.qsize()):
            SEGMENTS_PROCESSED += que.get()
            TIME_PER_SEGMENT = (time()-start_time) / SEGMENTS_PROCESSED
        sleep(0.2)
    results = results.get()
    ALL_SEGMENTS_DONE = True

    # Create the composite image
    for i in range(len(results)):
        x = int(i // mosaic_height_in_segments)
        y = int(i % mosaic_height_in_segments)
        mosaic[tile_length*y:tile_length*y+tile_length, tile_length *
               x:tile_length*x+tile_length] = results[i][0:tile_length, 0:tile_length]

    # Save the completed mosaic
    cv2.imwrite(dir_path + '\\mosaic.' + ARGS['image'], mosaic)

    # Join to the updates thread to finish output
    updates.join()


if __name__ == '__main__':
    main()
