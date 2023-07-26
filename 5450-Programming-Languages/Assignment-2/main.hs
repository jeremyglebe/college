{-START OF PROBLEM 1-}
worm  = 1:2:3:worm
eel   = [1,2,3,1,2,3,1,2,3]
snake = 3:2:1:snake
bird  = 1:2:bird
whale = [1..100]

which [1,2,3,1,2,3,1,2,3] = "eel"
which (1:2:1:x) = "bird"
which (3:2:1:x) = "snake"
which (1:2:3:1:x) = "worm"
which (1:2:3:4:x) = "whale"

print_prob1 = do
    putStrLn "[PROBLEM 1]"
    print (which worm)
    print (which eel)
    print (which snake)
    print (which bird)
    print (which whale)
{-END OF PROBLEM 1-}

{-START OF PROBLEM 2-}
-- Data type just to enumerate rose color values
data RoseColor = RED | WHITE deriving (Show)
-- Data type representing a rose tree
data RT a = Rose a | Tree [RT a] deriving (Show,Read,Eq)
-- Function which recursively paints all roses in a rose tree to be RED
paint_tree_red (Tree branches) = (Tree (map paint_tree_red branches))
paint_tree_red (Rose color) = (Rose RED)
-- Trees to test painting function on
tree_0_9roses = Tree [ Rose WHITE, Tree [ Rose RED, Rose WHITE, Rose RED ], Tree [ Rose WHITE, Rose WHITE, Tree [ Rose WHITE, Rose WHITE, Rose RED ] ] ]
tree_1_5roses = Tree [ Rose WHITE, Tree [ Tree [ Rose WHITE, Rose WHITE, Rose WHITE ] ], Rose WHITE ]
tree_2_7roses = Tree [ Rose RED, Tree [ Tree [ Rose WHITE, Rose WHITE ], Rose WHITE, Tree [ Rose RED, Rose WHITE, Rose WHITE ] ] ]
tree_3_7roses = Tree [ Rose WHITE, Tree [ Rose RED, Tree [ Rose WHITE, Rose WHITE, Rose WHITE ], Rose RED ], Rose RED ]
tree_4_5roses = Tree [ Tree [ Tree [ Rose WHITE, Rose WHITE, Rose WHITE ], Rose RED, Rose WHITE ] ]
print_prob2 = do
    putStrLn "[PROBLEM 2]"
    putStrLn "(Un-painted Trees)"
    print tree_0_9roses
    print tree_1_5roses
    print tree_2_7roses
    print tree_3_7roses
    print tree_4_5roses
    putStrLn "(Painted Trees)"
    print (paint_tree_red tree_0_9roses)
    print (paint_tree_red tree_1_5roses)
    print (paint_tree_red tree_2_7roses)
    print (paint_tree_red tree_3_7roses)
    print (paint_tree_red tree_4_5roses)
{-END OF PROBLEM 2-}

main = do
    print_prob1
    print_prob2