from PIL import Image, ImageDraw, ImageFont

def ascii_image(filepath):
    # Open the file
    base = Image.open(filepath).convert('RGB')
    gray = Image.open(filepath).convert('L')
    # Image width and height
    w, h = base.size
    # Create a new, blank white image to use for the ascii image
    txt = Image.new('RGB', (w*10, h*10), (255,255,255))
    # We need a font to print the characters in
    fnt = ImageFont.truetype("arial.ttf", 18)
    # We need an instance of imagedraw to draw with
    d = ImageDraw.Draw(txt)

    # Image data as a single grayscale brightness from 0-255
    brightness = list(gray.getdata())
    # Characters used to draw an image (12 chars means index 0-11)
    ascii_chars = [ '#', 'A', '@', '%', 'S', '+', '<', '*', ':', ',', '.', ' ']
    for y in range(h):
        for x in range(w):
            r, g, b = base.getpixel((x, y))
            # Write the correct character (0:255) / 23 -> (0:11)
            d.text((x * 10, y * 10), ascii_chars[brightness[w * y + x] // 23], font=fnt, fill=(r, g, b) )

    txt.save(filepath.split('.')[0] + '.color_ascii.jpg', 'jpeg')

if __name__ == '__main__':
    ascii_image('apple.png')