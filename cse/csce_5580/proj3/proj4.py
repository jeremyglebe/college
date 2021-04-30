# Print header of the program
print("OSPF Link-State (LS) Routing:")
print("-----------------------------")

# Get number of routers from user
numNodes = int(input("Enter the number of routers: "))
# Get the input file from the user
inputFile = input("Enter filename with cost matrix values: ")
# Read in the file
try:
    with open(inputFile, 'r') as f:
        inputText = f.read()
except FileNotFoundError:
    print(f"error: unable to open file: {inputFile}")
    exit(1)
# Get the starting label and the source node for paths
startLabel = input("Enter character representation of first node: ")
sourceNode = input("Enter the source router: ")

# Create the cost matrix from the input
cost_matrix = []
# Split by lines
for line in inputText.split('\n'):
    line.strip()
    if line != "":
        line_list = []
        # Split by spaces
        for cost in line.split(' '):
            # Add costs
            line_list.append(int(cost))
        # Add a line's worth of costs
        cost_matrix.append(line_list)

# Create a map from character representation of node to index
c2i = {}
for i in range(numNodes):
    c2i[chr(ord(startLabel) + i)] = i
# Create a map from index to character representation
i2c = [k for k in c2i]

# Create a dictionary representing the shortest paths
paths = {}
for k in c2i:
    paths[k] = None

# Create a dictionary representing the shortest path distances
distance = {}
for k in c2i:
    distance[k] = -1
distance[sourceNode] = 0

# Create a dictionary representing the visited nodes
visited = {}
for k in c2i:
    visited[k] = False

# A queue to determine which nodes to visit next
queue = [sourceNode]

# Shortest path algorithm loop
while len(queue) > 0:
    # Sort the queue to get the smallest item
    queue.sort(key=lambda k:distance[k])
    node = queue.pop(0)
    # Update distances to each of the neighbors
    for nind,cost in enumerate(cost_matrix[c2i[node]]):
        neighbor = i2c[nind]
        if cost > -1:
            # Maybe add the node to the queue if its not already visited
            if not visited[neighbor]:
                queue.append(neighbor)
                # Mark this neighbor as visited
                visited[neighbor] = True
            # If the distance to this neigbor is infinite
            if distance[neighbor] == -1:
                # Update values
                distance[neighbor] = distance[node] + cost
                paths[neighbor] = node
            # If the distance to the current node + the relative distance to the neighbor is
            # less than the known distance to neighbor
            elif distance[node] + cost < distance[neighbor]:
                # Update values
                distance[neighbor] = distance[node] + cost
                paths[neighbor] = node

# from pprint import pprint
# pprint(distance)
# pprint(paths)
# Print the results
for node in c2i:
    print(f'{sourceNode} ==> {node}')
    print(f'path cost : {distance[node]}')
    # Get the whole path to that node
    path = []
    prev = node
    while prev != sourceNode:
        # Keep adding path items to the front of the path
        path_new = [prev]
        path_new.extend(path)
        path = path_new
        # Update the previous node
        prev = paths[prev]
    # Print the path
    print(f"path taken: {sourceNode}", end='')
    for path_node in path:
        print(f" --> {path_node}", end='')
    print()

