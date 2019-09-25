import re
with open('alice.txt', encoding='utf8') as f, open('alice2.txt', 'w', encoding='utf8') as of:
    of.writelines(re.findall(r'^CHAPTER.*\n', f.read(), re.MULTILINE))
