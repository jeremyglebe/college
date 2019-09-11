#!/usr/bin/env python
"""Magic Dates Program

This module asks the user to input a full date and determines if that date is
'magic'. A date is magic if the month multiplied by the day is equal to the
last two digits of the year. For example, April 10th, 1940 is magic because
4 * 10 = 40; but December 3rd, 1998 is not magic because 12 * 3 = 36 (not 98).
"""


def main():
    """
    Main function of the program, determines if an inputted date is magic.
    """
    # get the users input
    month = input_month()
    day = input_day(month)
    year = input_year()
    # determine if the date is magic
    if month * day == year:
        # prints single digit numbers as two digit numbers ('6' becomes '06')
        print((str(month).zfill(2))+'/'+(str(day).zfill(2)) +
              '/'+(str(year).zfill(2)), 'is magic!')
    else:
        print((str(month).zfill(2))+'/'+(str(day).zfill(2)) +
              '/'+(str(year).zfill(2)), 'is not magic...')


def input_month():
    """
    Asks the user to enter a month and verifies if the user has inputted a
    valid month. If they have not, it will ask again.

    Args: None

    Returns:
        An integer between 1 and 12 representing the month of the year.
    """
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
    }  # this key helps convert months entered as a string to numeric months
    month = 0
    while month not in range(1, 13):
        user_input = input("\nEnter a month\n> ").strip()
        try:
            # Try getting the month as an integer
            month = int(user_input)
        except ValueError:
            # If it can't be read as an integer, see if its a valid month name
            if user_input.lower() in month_key.keys():
                month = month_key[user_input.lower()]
            else:
                month = 0
                print("\nNot a valid month (must be a number or month name)")
        if month not in range(1, 13):
            print("\nMonth must be between 1 and 12!")
    return month


def input_day(month):
    """
    Asks the user to enter a day and verifies if the user has inputted a valid
    day. If they have not, it will ask again.

    Args:
        month: An integer 1-12, the month is used for day input validation.
        Certain months have a max day of 30 or 31. February (2) has a max day
        of 29.

    Returns:
        An integer between 1 and 31 representing the day of the month.
    """
    day = 0
    # months with 30 days
    thirty_days = [4, 6, 9, 11]
    # months with 31 days
    thirty_one_days = [1, 3, 5, 7, 8, 10, 12]
    if month in thirty_days:
        # if the month has 30 days, check input until they enter a number 1-30
        while day not in range(1, 31):
            try:
                day = int(input("\nEnter a day\n> "))
            except ValueError:
                # this happens if they don't enter an integer
                day = 0
                print("\nNot a valid day (must be a number)")
            if day not in range(1, 31):
                print("\nDay must be between 1 and 30 for month", month)
    elif month in thirty_one_days:
        # if the month has 31 days, check input until they enter a number 1-31
        while day not in range(1, 32):
            try:
                day = int(input("\nEnter a day\n> "))
            except ValueError:
                # this happens if they don't enter an integer
                day = 0
                print("\nNot a valid day (must be a number)")
            if day not in range(1, 32):
                print("\nDay must be between 1 and 31 for month", month)
    elif month == 2:
        # February has 28 (or 29) days, check input until they enter a number 1-29
        while day not in range(1, 30):
            try:
                day = int(input("\nEnter a day\n> "))
            except ValueError:
                # this happens if they don't enter an integer
                day = 0
                print("\nNot a valid day (must be a number)")
            if day not in range(1, 30):
                print("\nDay must be between 1 and 29 for month", month)
    return day


def input_year():
    """
    Asks the user to enter a year and verifies if the user has inputted a valid
    year. If they have not, it will ask again.

    Args: None

    Returns:
        A year greater than 0.
    """
    # Two digit representation of a year
    # ex) 1954 should just be '54'
    short_year = 0
    while short_year < 1:
        try:
            # Have the user enter a year in whatever format they please
            full_year = input(
                "\nEnter a year (No distinction between A.D. or B.C.)\n> ")
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
            print("\nNot a valid year (must be a number)")
    return short_year


if __name__ == '__main__':
    main()
