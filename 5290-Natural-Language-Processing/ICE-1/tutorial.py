import urllib.request
import nltk
from bs4 import BeautifulSoup
nltk.download('stopwords', quiet=True)
from nltk.corpus import stopwords

# Make a get request to a url
response = urllib.request.urlopen('http://php.net/')
# Get the HTML objects from the request response
html = response.read()

# Cleanly traverse HTML with beautiful soup
soup = BeautifulSoup(html, 'html5lib')
# Extract the text of the page's body
text = soup.get_text(strip=True)

# Split the text into tokens
# Why not tokens = text.split() ???
tokens = [t for t in text.split()]

# Obtain stop words for english text
sr = stopwords.words('english')
# Create a list of clean tokens
clean_tokens = [t for t in tokens if not t in sr]

# Get word frequency using Natural Language Toolkit (stored as a dictionary from word to frequency)
freq = nltk.FreqDist(clean_tokens)
# Print pairs of word and frequency
for k,v in freq.items():
    print(f'{k}: {v}')

# Use matplotlib to show a graph of the frequency
freq.plot(20, cumulative=False)
