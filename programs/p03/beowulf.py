#!/usr/bin/env python
'''
Beowulf Translation Program
Author: Jeremy Glebe
Date: 9/25/2019

Translates a few old English words to more modern language in the UTF-8 text
file of "Beowulf". Translated words are defined in the translation key at the
top of the program.
'''

import re


# Translation key to describe how to translate old English words in the program
# Structure is as follows:
# old word that should be replaced: {
#     'replace': word that should replace the old word,
#     'count': the counter that should be added to by replacements of this word
# }
# We list 'count' separately because in some cases (such as bairns and bairn),
# both are instances of the root word 'bairn' but we need to replace them with
# different modern words. We still want to count them together. So both use
# 'bairn' as their 'count' value but have different 'replace' values.
TRANSLATION_KEY = {
    'bairns': {
        'replace': 'children',
        'count': 'bairn'
    },
    'bairn': {
        'replace': 'child',
        'count': 'bairn'
    },
    'bight': {
        'replace': 'bay',
        'count': 'bight'
    },
    'float': {
        'replace': 'ship',
        'count': 'float'
    },
    'carle': {
        'replace': 'hero',
        'count': 'carle'
    }
}


def main():
    with open('Beowulf.txt', encoding='utf8') as ifile, open('Beowulf2.txt', 'w', encoding='utf8') as ofile:
        # counting replacements made
        rep_count = {}
        # read in the file
        text = ifile.read()
        # get only everything between "BEOWULF." and "ADDENDA."
        # DOTALL makes the . character match with \n as well
        text = re.findall(r'BEOWULF\..*ADDENDA\.', text, re.DOTALL)[0]
        # replace text in the poem for each word in the translation key
        for key, obj in TRANSLATION_KEY.items():
            # get new text with replacement and number of replacements made
            text, count = re.subn(
                key, obj['replace'], text, flags=re.IGNORECASE)
            # make sure that the key we're using is in the count object
            if not obj['count'] in rep_count.keys():
                rep_count[obj['count']] = 0
            # increase the replacement count for the given word
            rep_count[obj['count']] += count
        # write the number of replacements to the output file
        ofile.write('[REPLACEMENTS]\n')
        for key, num in rep_count.items():
            ofile.write('Replaced ' + str(num) +
                        ' instances of \'' + key + '\'.\n')
        # write the modified poem to the output file
        ofile.write('\n[TRANSLATED POEM]\n')
        ofile.write(text)


if __name__ == '__main__':
    main()
