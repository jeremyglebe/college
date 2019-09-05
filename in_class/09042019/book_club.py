"""
Program that determines how many points a book club member should get each month
"""
POINT_DICT = {
    0: 0,
    1: 5,
    2: 15,
    3: 30,
    4: 60
}
VALID = False
while not VALID:
    RESPONSE = input(
        "Enter the number of books the club member has purchased this month: ")
    try:
        NUM_BOOKS = int(RESPONSE)
        VALID = True
    except ValueError:
        print("Try again! Make sure you type a non-decimal number")
if NUM_BOOKS > 4:
    NUM_BOOKS = 4
print("The user has earned {0} points!".format(POINT_DICT[NUM_BOOKS]))
