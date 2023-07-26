from random import random, randint

def genTree(rose_chance, white_chance, rose_chance_multiplier_per_level):
    if random() < rose_chance:
        if random() < white_chance:
            return "WHITE"
        else:
            return "RED"
    else:
        return [genTree(rose_chance * rose_chance_multiplier_per_level, white_chance, rose_chance_multiplier_per_level) for _ in range(randint(1,3))]

def countTreeRoses(tree):
    if isinstance(tree, str):
        return 1
    counter = 0
    for branch in tree:
        if isinstance(branch, str):
            counter += 1
        else:
            counter += countTreeRoses(branch)
    return counter

def printTree(tree):
    if isinstance(tree, str):
        print(f'Rose {tree}', end='')
    else:
        for i, branch in enumerate(tree):
            if isinstance(branch, str):
                printTree(branch)
                # add a comma if there's more in the list
                if i != len(tree) - 1:
                    print(', ', end='')
            else:
                print('Tree [ ', end='')
                printTree(branch)
                print(' ]', end='')
                # add a comma if there's more in the list
                if i != len(tree) - 1:
                    print(', ', end='')

fav_trees = []
while len(fav_trees) < 5:
    tr = genTree(0.3, 0.7, 1.6)
    num = countTreeRoses(tr)
    if num > 4 and num < 10:
        fav_trees.append(tr)
for i, tree in enumerate(fav_trees):
    print(f'tree_{i}_{countTreeRoses(tree)}roses = ', end='')
    printTree(tree)
    print()