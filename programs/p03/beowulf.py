'''
Beowulf Translation Program
Author: Jeremy Glebe
Date: 9/25/2019

Translates a few old English words to more modern language in the UTF-8 text
file of "Beowulf". Translated words are defined in the translation key at the
top of the program.
'''

import re

TRANSLATION_KEY = {
    'bairn': 'child',
    'bight': 'bay',
    'float': 'ship',
    'carle': 'hero',
}

CORRECTION_KEY = {
    'childs': 'children'
}


def main():
    '''Driver of the program. Handles input and output.'''
    with open('Beowulf.txt', encoding='utf8') as ifile, \
            open('Beowulf2.txt', 'w', encoding='utf8') as ofile:
        # read text from the file
        text = ifile.read()
        # The story is between "BEOWULF." and "ADDENDA."
        # findall returns a list, need the first (only) element
        text = re.findall(r'BEOWULF\..*ADDENDA\.', text, re.DOTALL)[0]
        # Translate and then correct the text
        # counters keeps track of how many replacements have occured
        text, counters = translate(text)
        text = correct(text)
        # write out general header stuff
        ofile.write(header_string() + '\n')
        ofile.write(translation_key_string() + '\n')
        ofile.write(correction_key_string() + '\n')
        # write the number of replacements to the output file
        ofile.write('[REPLACEMENTS]\n')
        for key, num in counters.items():
            line = 'Replaced {0} instances of \'{1}\'.\n'.format(num, key)
            ofile.write(line)
        # write the modified poem to the output file
        ofile.write('\n[TRANSLATED POEM]\n')
        ofile.write(text)


def translate(string):
    '''Translates the poem (or old english string) and returns the new string
    and a dictionary of counters for the number of translations made'''
    # counting replacements made
    rep_count = {}
    # replace text in the poem for each word in the translation key
    for key, repl in TRANSLATION_KEY.items():
        # get new text with replacement and number of replacements made
        string, count = re.subn(key, repl, string, flags=re.IGNORECASE)
        # make sure that the key we're using is in the count object
        if not key in rep_count.keys():
            rep_count[key] = 0
        # increase the replacement count for the given word
        rep_count[key] += count
    # returns a tuple containing the translated string and a dictionary of
    # counters for the number of translations made
    return string, rep_count


def correct(string):
    '''Corrects the poem (or old english string) and returns the new string'''
    # replace text in the poem for each word in the corrections key
    for key, repl in CORRECTION_KEY.items():
        # get new text with replacement
        string = re.sub(key, repl, string, flags=re.IGNORECASE)
        return string


def header_string():
    '''Just returns a header string for the program'''
    msg = '''\
Jeremy Glebe\n
[Beowulf Translation Program] Translates a few old English words
to more modern language in the UTF-8 text file of "Beowulf". Counts
the number of replacements made.\n\
'''
    return msg


def translation_key_string():
    '''Returns a string of the translation key in case you want to print it'''
    msg = '[Translation Key]\n'
    for key, val in TRANSLATION_KEY.items():
        msg += '{0}: {1}\n'.format(key.rjust(10), val)
    return msg


def correction_key_string():
    '''Returns a string of the correction key in case you want to print it'''
    msg = '[Correction Key]\n'
    for key, val in CORRECTION_KEY.items():
        msg += '{0}: {1}\n'.format(key.rjust(10), val)
    return msg


if __name__ == '__main__':
    main()
