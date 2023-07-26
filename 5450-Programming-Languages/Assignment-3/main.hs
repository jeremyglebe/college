-- Jeremy Glebe, Julie Germain, Stanley Dappa

{-  Filters the "universe" list to only elements which are not an element of "set"
        `elem` returns if the left item is an element of the right item
        filter returns a sublist of elements for which a provided condition is true
        \var gives an explicit name to the element of the universe -}
complement universe set = filter (\el -> not (el `elem` set)) universe

{-  Function which generates all combinations of all items in a  list
    Exhaustive Explanation
        Operations:
            (x:xs) extracts head of the list
            map runs some operation on each item of some list
            (x:) is an operation which will prepend x to the head of the list
            ++ extends the list with the elements of another list
        Recursive Algorithm:
            map (x:)(combinations xs) gets all combinations which contain x
            combinations xs gets all combinations which do not contain x
            When we combine the two together, we get all combinations
        [] = [[]]
            Base case. Since we are appending the elements of each call to
            combinations, and not the list itself, we need to have a list with
            an empty list so that the empty list is added. I hope that makes 
            sense. It's weird. -}
combinations [] = [[]]
combinations (x:xs) = map (x:)(combinations xs) ++ combinations xs

-- Simple function to compare lengths of lists
eqlen l1 l2 = (length l1) == (length l2)

{-  Function which gets all subsets that consist of half the elements in the original set
        (combinations universe) gets all the combinations
        filter extracts only those combinations which meet a given condition
        eqlen combo (complement universe combo) checks whether a given combination is equal
            in length to it's complement -}
halfsets universe = filter (\combo -> eqlen combo (complement universe combo) ) (combinations universe)

-- Main code to be executed in environment
main = do
    let testset = [1..166]
    print (halfsets testset)

{-  For testset = [1..6] (in other words, n=6), the output is:
        [[1,2,3],[1,2,4],[1,2,5],[1,2,6],[1,3,4],[1,3,5],[1,3,6],[1,4,5],[1,4,6],[1,5,6],
        [2,3,4],[2,3,5],[2,3,6],[2,4,5],[2,4,6],[2,5,6],[3,4,5],[3,4,6],[3,5,6],[4,5,6]]
-}