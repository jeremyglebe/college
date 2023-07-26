"""Creates an adjacency list from an input file of edges.

Author: Jeremy Glebe
Project: Adjacency List Generator
Course: 5243 Algorithm Analysis
Due: 4/26/2020
Receives an input file containing a list of edges between vertices. Parses the
input to determine what unique vertices are present in the graph and what edges
exist in the graph. Then constructs the graph in the form of an Adjacency List.

Algorithm:
    1) Read contents of file into a string
    2) Create an array of all the unique vertices (as Nodes)
        * These are the heads of their respective lists, they're not connected
          together.
    3) Sort the set of vertices
    4) Assign corresponding indices to each vertex (keep a map for lookup)
        * Even numeric vertices should be assigned a corresponding index as a
          graph containing vertices 1, 5, and 99 should still be
          indexed 0-2 instead of 0-99, for efficiency's sake
    5) For each line of input, for vertices U and V, push a Node containing V
       to the list starting with U, and push a Node containing U to the list
       starting with V.
    6) Output each vertex and it's list of adjacent vertices
        * Output to file in append mode for multiple outputs in one file
        * The head of each list is the vertex being examined, everything after
          is an adjacent vertex
"""


class NodeList:
    # Constructor, must pass in label and optionally the next item in the list
    def __init__(self, label, next=None):
        self.label = str(label)
        self.next = next

    # "less than" overloads the "<" operator
    def __lt__(self, other):
        try:
            # Try to compare the two Nodes numerically if they're integers
            return int(self.label) < int(other.label)
        except ValueError:
            # Compare the two Nodes' labels as strings
            return self.label < other.label

    # How the list is represented when outputted or converted to a string
    def __repr__(self):
        if self.next:
            return self.label + ' ' + str(self.next)
        return self.label

    # Push an item into the Node list
    def push(self, label):
        if not self.next:
            self.next = NodeList(label)
        else:
            self.next.push(label)
        return self


# Prompt user for input file to be read on this run
InputFileName = input('Input file: ')
# 1) Read contents of file into a string
with open(InputFileName, 'r') as infile:
    InputString = infile.read()
# 2) Create set of unique vertices
# Split the input string to get all values from input, cast to set to reduce
# to unique vertex identifiers only (sets do not contain repeats), cast back
# to list because sets are unordered and thus can't be sorted. Create a node
# out of each of the vertex labels.
Vertices = [NodeList(label) for label in list(set(InputString.split()))]
# 3) Sort the set of vertices
Vertices.sort()
# 4) Assign corresponding indices to each vertex (keep a map for lookup)
# The corresponding index will simply be the items position in the sorted list
# of vertices
Lookup = {vertex.label: Vertices.index(vertex) for vertex in Vertices}
# 5) For each line of input, for vertices U and V, push a Node containing V
#    to the list starting with U, and push a Node containing U to the list
#    starting with V.
for line in InputString.splitlines():
    U, V = tuple(line.split())
    Vertices[Lookup[U]].push(V)
    Vertices[Lookup[V]].push(U)
# 6) Output each vertex and it's list of adjacent vertices
# Open a file in append mode
with open('OutputAdjList.txt', 'a') as outfile:
    # Output labels for the table
    outfile.write('Vertices*    Adjacent^\n')
    for nodelist in Vertices:
        # Output the first element of the list centered, then the rest of the
        # list underneath the adjacent's label
        outfile.write(nodelist.label.center(8) + '     ' + str(nodelist.next))
        # Put a newline between vertices
        outfile.write('\n')
    # One last new line to separate outputs
    outfile.write('\n')
