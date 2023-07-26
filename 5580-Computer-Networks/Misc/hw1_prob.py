# Exponents recursive
def exponent(x, y):
    if y == 0: return 1
    else: return x * exponent(x, y - 1)
# Factorials recursive
def factorial(x):
    if x > 1: return x * factorial(x - 1)
    else: return 1
# For probability formulas
def n_choose_k(n, k):
    return factorial(n) / (factorial(k) * factorial(n - k))
# Probability of exactly k users at once
# p: probability per user, n: total users, k: number of active users
def exactly_k(p, n, k):
    return n_choose_k(n, k) * exponent(p,k) * exponent(1-p, n-k)
# Truncate to a number of digits, sometimes rounding just shows ints
def trunc(number, digits):
    return int(number * exponent(10, digits)) / exponent(10, digits)
# Question 3 homework results
probability_of_1 = exactly_k(.1, 29, 1) # 0.1517708135779347
probability_of_0_to_15 = sum([exactly_k(.1, 29, k) for k in range(16)]) # 0.999999998116826
probability_of_more_than_15 = 1 - probability_of_0_to_15 # 1.8831739501123934e-09
# probability_of_more_than_15 = sum([exactly_k(.1, 29, k) for k in range(16, 30)]) # 1.883175238343231e-09
# Printing for convenience
print('Probability of exactly 1 user')
print(f'    Rounded to 6 Decimals: {round(probability_of_1, 6)}')
print(f'    Truncated to 6 Decimals: {trunc(probability_of_1, 6)}')
print('Probability of 0-15 users')
print(f'    Rounded to 6 Decimals: {round(probability_of_0_to_15, 6)}')
print(f'    Truncated to 6 Decimals: {trunc(probability_of_0_to_15, 6)}')
print('Probability of 15-29 users')
print(f'    Rounded to 6 Decimals: {round(probability_of_more_than_15, 6)}')
print(f'    Truncated to 6 Decimals: {trunc(probability_of_more_than_15, 6)}')