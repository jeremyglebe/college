"""
Write a program that will ask the user to enter a number, num, and will
then print a list form 1 to num along with the square and cube of each number
"""


def main():
    """main function that runs the program"""
    num = -1
    while num < 1:
        try:
            num = int(input("Enter a number greater than 1: "))
        except ValueError:
            num = -1
    num_list = range(1, num + 1)
    for item in num_list:
        print("num: " + str(item))
        print("square: " + str(item ** 2))
        print("cube: " + str(item ** 3), end='\n\n')


if __name__ == '__main__':
    main()
