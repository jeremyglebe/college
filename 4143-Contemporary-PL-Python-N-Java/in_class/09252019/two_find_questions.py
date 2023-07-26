import re
import textwrap
with open('alice.txt', encoding='utf8') as f, open('alice2.txt', 'w', encoding='utf8') as of:
    # get the text, but skip everything before the first non-chapter line of the story
    story = re.findall(r'Alice was .*THE END', f.read(), re.DOTALL)[0]
    # get all the questions
    for line in re.findall(r'[A-Z][^\?!\.]*\?', story, re.MULTILINE):
        # for each line remove internal newlines and add newlines to the end
        # then write it to the output file
        of.write(textwrap.fill(re.sub(r'\n', ' ', line)) + '\n\n')
