"""Ask the user to enter a number, num. Print the sum from 1 to num"""

def main():
    """main function that runs the program"""
    num = -1
    while num < 1:
        try:
            num = int(input("Enter a number greater than 1: "))
        except ValueError:
            num = -1
    print(sum(range(num + 1)))

if __name__ == '__main__':
    main()
