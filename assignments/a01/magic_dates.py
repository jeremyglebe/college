

def main():
    month = input_month()
    day = input_day(month)
    year = input_year()
    if month * day == year:
        print((str(month).zfill(2))+'/'+(str(day).zfill(2)) +
              '/'+(str(year).zfill(2)), 'is magic!')
    else:
        print((str(month).zfill(2))+'/'+(str(day).zfill(2)) +
              '/'+(str(year).zfill(2)), 'is not magic...')


def input_month():
    month_key = {
        'january': 1,
        'february': 2,
        'march': 3,
        'april': 4,
        'may': 5,
        'june': 6,
        'july': 7,
        'august': 8,
        'september': 9,
        'october': 10,
        'november': 11,
        'december': 12
    }
    month = 0
    while month not in range(1, 13):
        user_input = input("Enter a month\n> ")
        try:
            # Try getting the month as an integer
            month = int(user_input)
        except ValueError:
            # If it can't be read as an integer, see if its a valid month name
            if user_input.lower() in month_key.keys():
                month = month_key[user_input.lower()]
            else:
                month = 0
    return month


def input_day(month):
    day = 0
    thirty_days = [4, 6, 9, 11]
    thirty_one_days = [1, 3, 5, 7, 8, 10, 12]
    if month in thirty_days:
        while day not in range(1, 31):
            try:
                day = int(input("Enter a day\n> "))
            except ValueError:
                day = 0
    elif month in thirty_one_days:
        while day not in range(1, 32):
            try:
                day = int(input("Enter a day\n> "))
            except ValueError:
                day = 0
    elif month == 2:
        while day not in range(1, 30):
            try:
                day = int(input("Enter a day\n> "))
            except ValueError:
                day = 0
    return day


def input_year():
    # Two digit representation of a year
    # ex) 1954 should just be '54'
    short_year = 0
    while short_year < 1:
        try:
            # Have the user enter a year in whatever format they please
            full_year = input("Enter a year (No distinction between A.D. or B.C.)\n> ")
            # Get start and end index of the last two digits
            # Getting the index still works with one digit numbers because
            # [-1:1] will start at the end and wrap around back to the end
            start_index = len(full_year) - 2
            end_index = len(full_year)
            short_year = full_year[start_index:end_index]
            # Try to convert the last two characters of input to an integer
            # If they entered a number, this should work
            short_year = int(short_year)
        except ValueError:
            # Tsk tsk, user didn't enter a number. Set to zero and try again.
            short_year = 0
    return short_year


if __name__ == '__main__':
    main()
