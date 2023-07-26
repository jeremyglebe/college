#!/usr/bin/env python
'''
Decimal -> Binary Program
Author: Jeremy Glebe
Date: 9/25/2019

Receives any number of non-negative integer inputs and outputs the given number
in binary. (base 2) The program stops when it receives a '-1' input or when it
receives an invalid input.
'''


def main():
    '''
    Driver of the program. Loops until the user enters a '-1' or an invalid
    input. Prints the binary strings for the inputs.
    '''
    # Prompt the user
    print("[Enter any integer > -1 to see it's binary representation]")
    print("[Enter -1 to terminate the program]")
    # get a decimal number from user input
    num = get_num()
    while num != -1:
        # print the binary number version of the input
        print(num, '=', dec_to_bin(num))
        # get a decimal number input
        num = get_num()


def get_num():
    '''
    Gets an integer user input >= -1
    @return {int} integer number >= -1
    '''
    num = input()
    try:
        # try to conver the input to an integer
        num = int(num)
        # ensure the number is within the correct range
        if num >= -1:
            return num
        else:
            # print if the number is not in the right range
            print('invalid! (must be >= -1)')
            # -1 to flag a bad piece of input
            return -1
    except ValueError:
        # print if the input is not an integer
        print('invalid! (must be an integer)')
        # -1 to flag a bad piece of input
        return -1


def dec_to_bin(deci):
    '''
    Recursively creates a string of binary numbers from a decimal number. This
    function is a front-end that calls _dtb() and then adjusts the output to
    pad the binary string. (ensures there are at least 4 bits shown)
    @param {int} deci: a decimal number >= -1
    @return {string} binary representation of deci
    '''
    bstring = _dtb(deci)
    # adjust string to be >= 4 chars, right justified, pad with 0's
    return bstring.rjust(4, '0')


def _dtb(deci):
    '''
    Backend function used by the public dec_to_bin() function. Does the actual
    value getting and binary string creation. (Recursively creates a string of
    binary numbers from a decimal number.)
    @param {int} deci: a decimal number >= -1
    @return {string} binary representation of deci
    '''
    if deci > 0:
        # get the correct bit for this iteration
        bit = deci % 2
        # adjust the number for the next iteration
        deci = deci // 2
        # call the next iteration
        return _dtb(deci) + str(bit)
    else:
        # if we're at 0, return an empty string to append to
        return ''


# if this file is executed directly, run main()
if __name__ == '__main__':
    main()
