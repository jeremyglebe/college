        notes = re.findall(r'^ {4}\[.*?\].*?\n\n', text, re.DOTALL | re.MULTILINE)
        for note in notes:
           print(note)