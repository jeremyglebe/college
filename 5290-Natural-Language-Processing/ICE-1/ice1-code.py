'''
ICE-1 9/2/2021
Program to tokenize a web page about SpaceX.
Author(s): Jeremy Glebe
'''

from nltk.corpus import stopwords
import urllib.request
import nltk
import matplotlib.pyplot as plt
from bs4 import BeautifulSoup
nltk.download('stopwords', quiet=True)

# Request to the SpaceX wikipedia page
response = urllib.request.urlopen('https://en.wikipedia.org/wiki/SpaceX')
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
# Create a "high frequency" distribution which ignores frequencies less than 5
high_freq = nltk.FreqDist({k: v for k, v in freq.items() if v >= 5})
# Print pairs of word and frequency
for k, v in high_freq.items():
    print(f'{k}: {v}')

# Use matplotlib to show a graph of the frequency (only including first 10 items)
high_freq.plot(10, cumulative=False)

# Create a bar chart as an alternate visualization
even_higher = {k:v for k,v in high_freq.items() if v > 80}
plt.bar(even_higher.keys(), even_higher.values())
plt.show()
