#!/usr/bin/env python
# -*- coding: utf-8 -*-

import re

with open('Beowulf.txt', encoding='utf8') as f:
    reps = {}
    text = text = f.read()
    text, reps['bairn'] = re.subn(
        r'bairn', 'child', text, flags=re.IGNORECASE)

with open('Beowulf2.txt', 'w', encoding='utf8') as f:
    f.write(text)
