find_i([Value|_], Value, 0).
find_i([_|Sublist], Value, LocationInList) :-
    find_i(Sublist, Value, LocationInSublist),
    LocationInList is LocationInSublist + 1.

max_el([SingleElement], SingleElement).
max_el([El|Sublist], Return) :-
    max_el(Sublist, SubMax),
    Return is max(El, SubMax).

min_el([SingleElement], SingleElement).
min_el([El|Sublist], Return) :-
    min_el(Sublist, SubMin),
    Return is min(El, SubMin).

min_before_max(Elements) :-
    length(Elements, Len),
    min_el(Elements, MinEl),
    max_el(Elements, MaxEl),
    % format('Min: ~w Max: ~w ~n', [MinEl, MaxEl]),
    find_i(Elements, MinEl, MinI),
    find_i(Elements, MaxEl, MaxI),
    % format('Len: ~w MinI: ~w MaxI: ~w ~n', [Len, MinI, MaxI]),
    MinI < MaxI.

get_perms(SourceList, AllPermutations) :-
    findall(Permutation, permutation(SourceList, Permutation), AllPermutations).

mbm_perms(SourceList, MbmPermutations) :-
    findall(Permutation, (permutation(SourceList, Permutation), min_before_max(Permutation)), MbmPermutations).

%mbm_sublists(OneList, MbmLists) :-
%    MbmLists is [OneList].
%mbm_sublists([FirstList|Sublists], MbmLists) :-
%    mbm_sublists(Sublists, MbmLists),
%    MbmLists is [FirstList|MbmLists].
