"""
Program: Matching Images
File: match_functions.py
Python program that finds the nearest match to an image within a folder of images.
This file contains the functions that compare images and display results.
Author: Jeremy Glebe
Date: 3/15/2019
"""

# import the necessary packages
from skimage.measure import compare_ssim as ssim
import matplotlib.pyplot as plt


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
