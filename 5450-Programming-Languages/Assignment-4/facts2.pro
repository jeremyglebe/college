/* CSCE5450 Team1: Julie Germain, Jeremy Glebe, Stanley Depp
 * Assignment 4

due Thursday March 11, at noon.
Write a Prolog program that generates all the permutations of an ordered set that do not have their largest element before their smallest one. For instance, if the set is [1,2,3,4,5] a good permutation is [4,1,3,2,5] because 1 is before 5 in it and a bad one is [4,5,3,1,2] because 1 is after 5 in it.
Test your program on the set [1,2,3,4,5] and paste the resulting permutations, one per line, inside a  comment at the end of your .pro code file.

Submit your .pro file on Canvas, one file per team. */

%=====================================
all_perms_minBeforeMax(Xs, Ys) :-
    findall(Perm, (permutation(Xs, Perm), comp_index(Perm)), Ys).
% Usage:
% ?- all_perms_minBeforeMax([1,2,3], Results).

% =====================================
max_list(Lst, Max, Ind_max) :-
   member(Max, Lst),
   \+((member(X, Lst), X > Max)),
   nth0(Ind_max, Lst, Max).
% Usage:
% ?- max_list([2,3,4],M,I).

min_list(Lst, Min, Ind_min) :-
   member(Min, Lst),
   \+((member(X, Lst), X < Min)),
   nth0(Ind_min, Lst, Min).
% Usage:
% ?- min_list([2,3,4],M,I).

%=====================================
comp_index(Lst) :-
    max_list(Lst,_,Imax),
    min_list(Lst,_,Imin),
    Imax-Imin >= 1.
% Usage:
% ?- comp_index([2,1,5]).

/* Results:
?- all_perms_minBeforeMax([1,2,3,4,5],Results).
Results = [[1,2,3,4,5],[1,2,3,5,4],[1,2,4,3,5],[1,2,4,5,3],[1,2,5,3,4],[1,2,5,4,3],[1,3,2,4,5],[1,3,2,5,4],[1,3,4,2,5],[1,3,4,5,2],[1,3,5,2,4],[1,3,5,4,2],[1,4,2,3,5],[1,4,2,5,3],[1,4,3,2,5],[1,4,3,5,2],[1,4,5,2,3],[1,4,5,3,2],[1,5,2,3,4],[1,5,2,4,3],[1,5,3,2,4],[1,5,3,4,2],[1,5,4,2,3],[1,5,4,3,2],[2,1,3,4,5],[2,1,3,5,4],[2,1,4,3,5],[2,1,4,5,3],[2,1,5,3,4],[2,1,5,4,3],[2,3,1,4,5],[2,3,1,5,4],[2,3,4,1,5],[2,4,1,3,5],[2,4,1,5,3],[2,4,3,1,5],[3,1,2,4,5],[3,1,2,5,4],[3,1,4,2,5],[3,1,4,5,2],[3,1,5,2,4],[3,1,5,4,2],[3,2,1,4,5],[3,2,1,5,4],[3,2,4,1,5],[3,4,1,2,5],[3,4,1,5,2],[3,4,2,1,5],[4,1,2,3,5],[4,1,2,5,3],[4,1,3,2,5],[4,1,3,5,2],[4,1,5,2,3],[4,1,5,3,2],[4,2,1,3,5],[4,2,1,5,3],[4,2,3,1,5],[4,3,1,2,5],[4,3,1,5,2],[4,3,2,1,5]]
*/
