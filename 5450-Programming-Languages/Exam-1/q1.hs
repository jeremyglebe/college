{- Jeremy Glebe
   Programming Languages: Exam 1

   Q1. Write a program that generates the set of all subsets of {1,2,3,...,N}
   such that the sum of a subset's elements is the same as the sum of the
   elements of its complement.

   Written in Haskell -}

-- Filters the "universe" list to only elements which are not an element of "set"
complement universe set = filter (\el -> not (el `elem` set)) universe
-- Function which generates all combinations of all items in a list
combinations [] = [[]]
combinations (x:xs) = map (x:)(combinations xs) ++ combinations xs
-- Simple recursion to sum a list
listsum [] = 0
listsum (x:xs) = x + listsum xs
-- Check if two lists have equal sums
eqsum l1 l2 = (listsum l1) == (listsum l2)
-- Gets all sets which when summed are equal to the sum of the set's complement
equalsets universe = filter (\combo -> eqsum combo (complement universe combo) ) (combinations universe)
-- Main code to be executed in environment
main = do
    let testset = [1..6]
    print (equalsets testset)

{-  RESULTS:
    
    For testset = [1..6] (in other words, n=6), the output is:
    
    []
    
    This makes sense because the sum of the original set, 1+2+3+4+5+6=21
    21 is not divisible by 2, therefore no subset exists with an equal
    sum to it's complement
-}