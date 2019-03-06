from PIL import Image

def ascii_art(filepath):
    # Open the file
    im = Image.open(filepath)
    # Grayscale it
    im = im.convert('L')
    # Open the file to be written to
    text_file = open(filepath.split('.')[0] + ".ascii.txt", "w")
    # Image width and height
    w, h = im.size
    # Image data as a single grayscale brightness from 0-255
    data = list(im.getdata())
    # Characters used to draw an image (12 chars means index 0-11)
    ascii_chars = [ '#', 'A', '@', '%', 'S', '+', '<', '*', ':', ',', '.', ' ']
    for r in range(h):
        for c in range(w):
            # Write the correct character (0:255) / 23 -> (0:11)
            text_file.write(ascii_chars[data[w * r + c] // 23])
        text_file.write('\n')
