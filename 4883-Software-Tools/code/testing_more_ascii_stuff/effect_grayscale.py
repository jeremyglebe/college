from PIL import Image

def grayscale(filepath):
    im = Image.open(filepath)
    im.convert('L').save(im.filename.split('.')[0] + '.grayscale.jpg', 'jpeg')