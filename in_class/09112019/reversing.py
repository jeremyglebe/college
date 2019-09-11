string = 'Hello Earth!'
rstring = string[::-1]
print(rstring)

riter = reversed(string)
ristring = ''.join(riter)
print(ristring)

# More concise usages below
mystr = "Goodbye Python!"
print(mystr[::-1])
print(''.join(reversed(mystr)))