# Algorithm: Adding binary numbers in arrays
# Author: Jeremy Glebe
# Date: 1/28/2020
# Note: Because the problem does not specify, I am assuming binary numbers are
# stored in the array left->right. The far right should be the 1s place and the
# far left is the 2^(N-1)s place for the inputs or the 2^Ns place for output


def addBinLists(A, B, C):
    # Lists are of Length N, storing it in a variable helps keep track
    N = len(A)
    # Carry is 0 or 1 for each bit based on the previous
    carry = 0
    # Start at last bit (1s place), work towards first bit (2^(N-1)s place)
    # (Loop step is -1 rather than the standard +1)
    for i in range(N-1, -1, -1):
        # Add the two bits and any carry from the previous addition
        C[i+1] = A[i] + B[i] + carry
        # If a single bits value is greater than 1, add 1 to carry on to the
        # next addition, and subtract 2 from the bit. (value won't exceed 3)
        if C[i+1] > 1:
            carry = 1
            C[i+1] = C[i+1] - 2
        # If the added bit is 0 or 1, no need to carry. Reset carry to 0.
        else:
            carry = 0
    # Assign the first bit the remaining carry value
    C[0] = carry


A = [1, 1, 0, 1]
B = [1, 0, 0, 0]
C = [0, 0, 0, 0, 0]

print(A)
print(B)

addBinLists(A, B, C)

print(C)
