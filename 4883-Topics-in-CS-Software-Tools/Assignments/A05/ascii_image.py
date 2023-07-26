#!/usr/bin/env python
"""ASCII ART GENERATOR: Converts image files into images composed of ascii chars
Author: Jeremy Glebe
Date: 3/6/19"""
__author__ = "Jeremy Glebe"
__email__ = "jeremyglebe@gmail.com"

import argparse
from os import listdir
from os.path import isfile, join
from PIL import Image, ImageDraw, ImageFont

# Just a general scaler for the size of the image. Not customizable by the user. (yet)
# They can affect the size of the image by changing the font size. This is mostly for
# my own testing purposes.
IMAGE_SIZE_MULT = 1

# Get the command line arguments
parser = argparse.ArgumentParser()
parser.add_argument('--input', help='Relative input file path')
parser.add_argument('--output', help='Relative output file path')
parser.add_argument(
    '--font', help='Path to the true type font used for your ascii art')
parser.add_argument('--fsize', help='Size of the font to be used')
args = parser.parse_args()

# Determine which images we are going to convert to ascii
ifiles = []
if args.input != None and isfile(args.input):
    ifiles.append(args.input)
else:
    ifiles = ['./input_images/' +
              f for f in listdir('./input_images') if isfile(join('./input_images', f))]

# The output file (if not specified, then use the same name in the output images folder)
ofile = args.output

# Determine which font to use
font = './fonts/mytype.ttf'
if args.font != None:
    font = args.font
fsize = 12
if args.fsize != None:
    fsize = int(args.fsize)

# Keep track of the current file being processed
filenum = 1

# Process each input file
for infile in ifiles:
    # Print our progress so far on the files
    print("Processing File [" + str(filenum) + "/" +
          str(len(ifiles)) + "] (" + infile + ")")
    # Get the color and grayscale representations of the image
    input_image = Image.open(infile).convert('RGB')
    mono_input_image = Image.open(infile).convert('L')
    # Get the original width and height of the image
    orig_width, orig_height = input_image.size

    # Create the new image object that will be made of ascii and multiply the number of
    # pixels by the height of the font
    ascii_image = Image.new(
        'RGB', (int(orig_width*fsize*IMAGE_SIZE_MULT) + 1,
                int(orig_height*fsize*IMAGE_SIZE_MULT) + 1), (255, 255, 255))
    # Create the font object to write with
    draw_font = ImageFont.truetype(font, fsize)
    # Create an object for drawing on the image
    pen = ImageDraw.Draw(ascii_image)

    # We will choose WHICH character to print based on the brightness (mono value) of the
    # pixel. Image data as a single grayscale brightness from 0-255
    brightness = list(mono_input_image.getdata())
    # Characters used to draw an image (12 chars means index 0-11)
    ascii_chars = ['#', 'A', '@', '%', 'S', '+', '<', '*', ':', ',', '.', ' ']

    # Keep track of which pixel we are processing
    pixelnum = 1
    # Now we process each pixel of the image
    for y in range(orig_height):
        for x in range(orig_width):
            # Print the current status of which pixel is being processed, total number of
            # pixels happens to correspond with length of brightness
            print("Processing Pixel [" + str(pixelnum)
                  + "/" + str(len(brightness)) + "]  "
                  + str(int(pixelnum / len(brightness) * 100)) + '%', end='\r')
            # Get the red, green, and blue of the pixel
            r, g, b = input_image.getpixel((x, y))
            # How bright is this pixel? (Width * current row. Add the current column)
            bright = brightness[orig_width * y + x]
            # Write the correct character (0:255) // 23 -> (0:11)
            cchar = ascii_chars[bright // 23]
            # Draw the character. Position accounts for scaling to new font & image size
            # and we use the correct character and colors
            pen.text((x * fsize * IMAGE_SIZE_MULT, y * fsize * IMAGE_SIZE_MULT), cchar,
                     font=draw_font, fill=(r, g, b))
            # Increment the current pixel being processed
            pixelnum += 1
    # Go to the next line
    print()

    # Finally, save the image
    if ofile != None:
        ascii_image.save(ofile)
    else:
        ascii_image.save('./output_images/'
                         + infile.split('/')[2].split('.')[0]
                         + '.color_ascii.jpg', 'jpeg')

    # Increment the current file number
    filenum += 1
