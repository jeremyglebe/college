import re
import sys


def interpret():
    # The source file should be passed in through command line
    psu_file = sys.argv[1]
    # Open the file
    with open(psu_file, 'r', encoding='utf-8') as f:
        # First, we read in the original pseudocode
        code = f.read()
        # Replace all PsuAlg symbols with Python symbols
        code = py_symbols(code)
        # Change all loops to Python format
        code = py_loops(code)
    # Execute the final code
    try:
        exec(code)
    except SyntaxError as error:
        print("Error in converted Python code! Python code being dumped to " + psu_file + '.py')
        with open(psu_file + '.py', 'w', encoding='utf-8') as f:
            f.write(code)
        raise(error)


def py_symbols(orig):
    # Convert all instances of '▷' (the PsuAlg comment symbol) with
    # '#' (the Python comment symbol)
    code = orig.replace('▷', '#')
    # Change '←' to '+'
    code = code.replace('←', '=')
    return code

'''
Requires: Symbols to already be converted to Python. Searches involve the '='
operator and will fail if symbols have not be converted.
'''
def py_loops(orig):
    code = orig
    for_loops = re.findall('[?^#]*for i =.*', orig)
    for loop in for_loops:
        data = loop.replace('=',',').replace('to',',').split(',')
        data = [item.strip() for item in data[1:]]
        pyloop = 'for i in range(' + data[0] + ',' + data[1] +'):'
        code = code.replace(loop, pyloop)
    return code
    

interpret()
