"""Creates an adjacency matrix from an input file of edges.

Author: Jeremy Glebe
Project: Adjacency Matrix Generator
Course: 5243 Algorithm Analysis
Due: 4/26/2020
Receives an input file containing a list of edges between vertices. Parses the
input to determine what unique vertices are present in the graph and what edges
exist in the graph. Then constructs the graph in the form of Adjacency Matrix.

Algorithm:
    1) Read contents of file into a string
    2) Create set of unique vertices
    3) Sort the set of vertices
    4) Assign corresponding indices to each vertex (keep a map for lookup)
        * Even numeric vertices should be assigned a corresponding index as a
          graph containing vertices 1, 5, and 99 should still be
          indexed 0-2 instead of 0-99, for efficiency's sake
    5) Determine number of vertices
    6) Create a 2D array representing edges between vertices
        * Initialize the array with 'False' in each slot
    7) For each line of input, for vertices U and V, assign Matrix[U][V] to
       True and Matrix[V][U] to true.
    8) Output each vertex and it's adjacent vertices
        * Output to file in append mode for multiple outputs in one file
"""

# Prompt user for input file to be read on this run
InputFileName = input('Input file: ')
# 1) Read contents of file into a string
with open(InputFileName, 'r') as infile:
    InputString = infile.read()
# 2) Create set of unique vertices
# Split the input string to get all values from input, cast to set to reduce
# to unique vertex identifiers only (sets do not contain repeats), cast back
# to list because sets are unordered and thus can't be sorted
Vertices = list(set(InputString.split()))
# 3) Sort the set of vertices, compares strings using integer representation
# where applicable and normal string comparison elsewhere
try:
    Vertices.sort(key=lambda vertex: int(vertex))
except ValueError:
    Vertices.sort()
# 4) Assign corresponding indices to each vertex (keep a map for lookup)
# The corresponding index will simply be the items position in the sorted list
# of vertices
Lookup = {vertex: Vertices.index(vertex) for vertex in Vertices}
# 5) Determine number of vertices
Size = len(Vertices)
# 6) Create a 2D array representing edges between vertices
# Initialize the array with 'False' in each slot
Matrix = [None] * Size
for row in range(Size):
    Matrix[row] = [False] * Size
# 7) For each line of input, for vertices U and V, assign Matrix[U][V] to
# True and Matrix[V][U] to true.
for line in InputString.splitlines():
    U, V = tuple(line.split())
    Matrix[Lookup[U]][Lookup[V]] = True
    Matrix[Lookup[V]][Lookup[U]] = True
# 8) Output each vertex and it's adjacent vertices
# Open a file in append mode
with open('OutputAdjMatrix.txt', 'a') as outfile:
    # Output labels for the table
    outfile.write('Vertices*    Adjacent^\n')
    # Loop through all rows (vertices, sorted) of the Matrix
    for row in range(Size):
        # Output the vertex represented by the current row's index
        outfile.write(Vertices[row].center(8) + '     ')
        for col in range(Size):
            # If there is edge between two vertices (signifed by True value) then
            # print adjacent vertex represented by current column's index
            if Matrix[row][col]:
                outfile.write(Vertices[col] + ' ')
        # Go to a new line between outputting vertices
        outfile.write('\n')
    # One last new line to separate outputs
    outfile.write('\n')
