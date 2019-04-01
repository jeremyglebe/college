#!/usr/bin/env python
"""
* Program: Mosaics
** Creates a mosaic out of some folder of tiles.
* File: match_functions.py
** Python program that finds the nearest match to an image within a folder of
** images. This file contains the functions that compare images and display
** results.
* Author: Jeremy Glebe
* Date: 4/1/19
"""
__author__ = "Jeremy Glebe"
__email__ = "jeremyglebe@gmail.com"

# import the necessary packages
import os
from random import random as rnd
from skimage.measure import compare_ssim as ssim
import matplotlib.pyplot as plt
import cv2


def compare(image_a, image_b):
    """Compare two images and return a SSI value"""
    # compute the structural similarity index for the images
    return ssim(image_a, image_b, multichannel=True)


def compare_and_show(image_a, image_b, title):
    """Compare two images with SSI and display the results in a figure"""
    # compute the structural similarity index for the images
    similarity = ssim(image_a, image_b, multichannel=True)
    # setup the figure
    fig = plt.figure(title)
    plt.suptitle("SSIM: %.2f" % (similarity))

    # show first image
    fig.add_subplot(1, 2, 1)
    plt.imshow(image_a)
    plt.axis("off")

    # show the second image
    fig.add_subplot(1, 2, 2)
    plt.imshow(image_b)
    plt.axis("off")

    # show the images
    plt.show()


def best_match(image, match_list, width, height):
    bmatch = None
    match_val = -2
    for match_image in match_list:
        # Resize to correct size
        match_image = cv2.resize(
            match_image, (width, height), interpolation=cv2.INTER_AREA)
        # Convert to RGB instead of BGR
        similarity = compare(image, match_image)
        if similarity > match_val:
            bmatch = match_image
            match_val = similarity
    return bmatch


def close_match(image, match_list, width, height):
    bmatch = None
    match_val = -2
    for match_image in match_list:
        # Resize to correct size
        match_image = cv2.resize(
            match_image, (width, height), interpolation=cv2.INTER_AREA)
        # Convert to RGB instead of BGR
        similarity = compare(image, match_image)
        if similarity > match_val and rnd() > .5:
            bmatch = match_image
            match_val = similarity
    return bmatch
