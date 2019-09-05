date = None
while date == None:
    print("Please enter a date (Do not include brackets)")
    print("Valid Formats: [DD/MM/YY] [MM/DD/YY] [DD.MM.YY]", end='')
    print(" [MM.DD.YY] [DD MM YY] [MM DD YY]")
    user_date = input("> ")
    if len(user_date.split('/')) == 3:
        date = user_date.split('/')
    elif len(user_date.split('.')) == 3:
        date = user_date.split('.')
    elif len(user_date.split(' ')) == 3:
        date = user_date.split(' ')
    else:
        date = None


def valid_date(dstring):
    valid = True

    # Check whether the string can be split into 3 numbers with one of the
    # designated separators (v_split -> valid split)
    v_split = len(dstring.split('/')) == 3 or len(dstring.split('.')) == 3
    v_split = v_split or len(dstring.split(' ')) == 3
    if not v_split:
        valid = False

    # Return whether the date is valid
    return valid