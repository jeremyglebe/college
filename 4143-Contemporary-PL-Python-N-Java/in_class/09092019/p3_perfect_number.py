"""
A perfect number N is a positive integer such that the sum of the proper
divisors less than N is equal to N. If the sum is greater than N, the number
is abundant. If the sum is less than N, the number is deficient. Write a Python
function that will print perfect, abundant, or deficient based on the integer
passed.
"""

def main():
    """main function that runs the program"""
    num = -1
    while num < 1:
        try:
            num = int(input("Enter a number >= 1: "))
        except ValueError:
            num = -1
    print_perfect_num(num)


def print_perfect_num(n):
    """prints whether a number is perfect, deficient, abundant"""
    sum_of_divisors = 0
    for i in range(1, n):
        if n % i == 0:
            sum_of_divisors += i
    if sum_of_divisors == n:
        print(n, "is perfect!")
    elif sum_of_divisors < n:
        print(n, "is deficient!")
    elif sum_of_divisors > n:
        print(n, "is abundant!")


if __name__ == '__main__':
    main()
