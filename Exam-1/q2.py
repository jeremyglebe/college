'''
Jeremy Glebe
Programming Languages: Exam 1

Q2. A directed graph with N nodes is given to you as a list of edges, each
represented as a pair of integers between 1 and N. Write a program that returns
the list of all nodes of the graph, ordered by the number of incoming edges, in
decreasing order. If  nodes x and y have the same number of incoming edges then
the smallest among x and y should be placed first in the list. Test your
program on a graph having at least 10 nodes and 20 edges.

Written in Python
We will be using the matrix representation of a graph. (Lists of lists)
'''

def NodeI(id):
    '''Gets the index of a node based on it's id'''
    # Node ids are from 1 to N, whereas indices are 0 to N-1
    # So we have to convert real quick
    return id-1

def addEdge(graph, source, dest):
    '''Adds a node to a Matrix representation of a graph'''
    # Add a directed edge from a node to another
    graph[NodeI(source)][NodeI(dest)] = 1

def countIncomingEdges(graph, nodeID):
    '''Counts all incoming edges for a given node in a graph'''
    N = len(graph) # Get the "N" (node count) for this graph
    ind = NodeI(nodeID) # Get the index of the node
    sum=0 # Start sum at 0
    for i in range(N):
        # Add up all edges with node's index as the column
        # (The column represents the destination, see addEdge())
        sum += graph[i][ind]
    return sum

N = 10 # some given value of N
# A graph with N nodes, all of which start disconnected (represented by zero)
matrix_graph = [[0 for _ in range(N)] for _ in range(N)]
# Add somewhat arbitrary edges, 20 of them, to the graph
# I included a method to generate random edges in a comment at the end of file
addEdge(matrix_graph, 5, 4)
addEdge(matrix_graph, 6, 2)
addEdge(matrix_graph, 10, 6)
addEdge(matrix_graph, 2, 2)
addEdge(matrix_graph, 6, 8)
addEdge(matrix_graph, 7, 9)
addEdge(matrix_graph, 7, 5)
addEdge(matrix_graph, 6, 7)
addEdge(matrix_graph, 2, 9)
addEdge(matrix_graph, 2, 8)
addEdge(matrix_graph, 1, 1)
addEdge(matrix_graph, 3, 8)
addEdge(matrix_graph, 5, 10)
addEdge(matrix_graph, 8, 9)
addEdge(matrix_graph, 9, 7)
addEdge(matrix_graph, 5, 3)
addEdge(matrix_graph, 9, 9)
addEdge(matrix_graph, 10, 9)
addEdge(matrix_graph, 1, 10)
addEdge(matrix_graph, 1, 8)
'''
Note on Node/Edge Input:

There are more dynamic ways to get the value of N and the graph edges.
I thought about having them read in from a file or the keyboard.

I think it will be easier on the grader to just see the code demonstrated
with a given N and given edges that already fit the requirements.

It would be trivial to adjust the code for another input method if needed.
'''

# Print the graph to see our edges we generated
from pprint import pprint
print("Matrix Representation of Directed Graph:")
pprint(matrix_graph)

# A list of nodes paired with the number of incoming edges they have
node_incounts = [(nid, countIncomingEdges(matrix_graph, nid)) for nid in range(1, N+1)]
print("\n(Node ID, # of Incoming Edges):")
print(node_incounts)

# Sort the nodes by their incoming edge counts.
sorted_nodes = sorted(node_incounts, reverse=True, key=lambda node_incount: node_incount[1])
# The problem also requires that we break ties by placing the smaller node
# first. This is already the case since the original list was in that order.
# So, no need to change anything!

# Print just the sorted Node IDs without their incoming edge counts
sorted_nodes = [p for p,q in sorted_nodes]
print("\n[FINAL RESULT]\nSorted Node IDs:")
print(sorted_nodes)

'''
TEST RESULTS:
For N=10 and the 20 given edges
Sorted Node IDs:
[9, 8, 2, 7, 10, 1, 3, 4, 5, 6]


ALTERNATE METHOD OF GENERATING EDGES
# Here is a method we could have used to generate random edges instead of using
# hardcoded ones.
# Add 20 random edges to the graph
from random import randint
for _ in range(20):
    # Generate random nodes for edges
    source = randint(1,N)
    dest = randint(1,N)
    # Verify we haven't already added this edge, and if we have, generate again
    while matrix_graph[NodeI(source)][NodeI(dest)] > 0:
        source = randint(1,N)
        dest = randint(1,N)
    # After we have a unique, random edge add it to the graph
    addEdge(matrix_graph, source, dest)
'''