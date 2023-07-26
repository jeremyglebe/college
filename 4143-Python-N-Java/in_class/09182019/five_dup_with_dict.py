def has_duplicates(inlist):
    items = {}
    for item in inlist:
        if item in items.keys():
            return True
        else:
            items[item] = True
    return False


mylist = ['a', 'b', 'b', 'c']
print("original:", mylist)
print("duplicates?", has_duplicates(mylist))
print("after:", mylist)
print()
mylist = ['a', 'b', 'c']
print("original:", mylist)
print("duplicates?", has_duplicates(mylist))
print("after:", mylist)
