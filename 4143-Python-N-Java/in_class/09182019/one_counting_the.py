filename = input("Enter and input file: ")
the_count = 0
with open(filename) as f:
    full_text = f.read()
words = full_text.split()
for word in words:
    if word.lower() == 'the':
        the_count += 1
print('"The" occurs', the_count, 'times in the input string.')
