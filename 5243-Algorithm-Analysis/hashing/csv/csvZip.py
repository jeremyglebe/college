import os


def MergeStrings(string1, string2):
    # List of lists of string lines
    # each inner list is just a list repr of a string
    lineSets = [string1.splitlines(), string2.splitlines()]
    # Zipping creates a tuples of corresponding lines in lists
    # zippedlist[0] is now equal to something like (strlist1[0], strlist2[0])
    # Then we join the elements of each tuple of lines with a ','
    # Now zippedlist[0] is something like 'str1line1,str2line1'
    # Then we join all of our zipped lines with a new line, thus making the
    # list become a single string again
    return '\n'.join( ','.join(lines) for lines in zip(*lineSets) )

result=''

for file in os.listdir("."):
    if file.endswith(".csv"):
        with open(file, 'r') as f:
            fstring=f.read()
            if(len(result) < 1):
                result=fstring
            else:
                result=MergeStrings(result, fstring)

print(result)
