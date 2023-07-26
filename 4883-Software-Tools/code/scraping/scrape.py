# We're going to steal memes from a website today
from beautifulscraper import BeautifulScraper

# Declare a scraper and page
scraper = BeautifulScraper()
url = "https://github.com/jeremyglebe/4883-SWTools-Glebe"
page = scraper.go(url)

# Print the title (text vs title)
print( page.title )
#print( page.title.text )

# Printing all divs
divs = page.find_all('div')
#print( divs )

# Let's narrow that down a bit...
less_divs = page.find_all('div', {"class":"Box"})
#print( less_divs )

# What about images?
imgs = page.find_all('img')
#print( imgs )

# Can we get just the source links?
sources = []
for img in imgs:
    if len(img["src"]) > 0:
        if "http" not in img["src"]:
            if img["src"][0] == '/':
                sources.append("https://github.com" + img["src"])
            else:
                sources.append("ERROR: Unrecognized src format")
        else:
            sources.append(img["src"])
    else:
        sources.append("ERROR: No image src")
print("\nImage Sources:")
for src in sources:
    print('\t- ' + src)
