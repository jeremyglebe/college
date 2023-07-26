def has_duplicates(inlist):
    return not len(inlist) == len(set(inlist))


mylist = ['a', 'b', 'b', 'c']
print("original:", mylist)
print("duplicates?", has_duplicates(mylist))
print("after:", mylist)
print()
mylist = ['a', 'b', 'c']
print("original:", mylist)
print("duplicates?", has_duplicates(mylist))
print("after:", mylist)
