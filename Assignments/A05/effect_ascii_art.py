from PIL import Image, ImageDraw, ImageFont

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

def ascii_image(filepath):
    # Open the file
    base = Image.open(filepath).convert('L')
    # Image width and height
    w, h = base.size
    # Create a new, blank white image to use for the ascii image
    txt = Image.new('RGB', (w*10, h*10), (255,255,255))
    # We need a font to print the characters in
    fnt = ImageFont.truetype("arial.ttf", 18)
    # We need an instance of imagedraw to draw with
    d = ImageDraw.Draw(txt)

    # Image data as a single grayscale brightness from 0-255
    data = list(base.getdata())
    # Characters used to draw an image (12 chars means index 0-11)
    ascii_chars = [ '#', 'A', '@', '%', 'S', '+', '<', '*', ':', ',', '.', ' ']
    for r in range(h):
        for c in range(w):
            # Write the correct character (0:255) / 23 -> (0:11)
            d.text((c * 10, r * 10), ascii_chars[data[w * r + c] // 23], font=fnt, fill=(0,0,0))

    txt.save(filepath.split('.')[0] + '.ascii_image.jpg', 'jpeg')

ascii_image('apple.png')