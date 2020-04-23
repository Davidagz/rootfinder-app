# Program for CSCE440 HW1
# This program will show how to use the bisection method for the root finding problem

import math

def bisection(TOL, a, b, N):
    i = 1
    FA = func(a)
    approximations = []
    while (i <= N):
        p = a + (b - a)/2                   # Compute p_i
        approximations.append(p)
        print("P is " + str(p) + " at iteration " + str(i))
        FP = func(p)
        if (FP == 0 or (b - a)/2 < TOL):
            return (p)                      # Success
        if ((FA * FP) > 0):
            a = p
            FA = FP
        else:
            b = p
        i += 1
    print("Method failed after " + N + " iterations")
    return None

# Define the function and appropriate parameters
def func(x):
    return x - math.cos(x)

TOL = 0.0001
a = -2
b = 2
N = 50

# Call bisection method
approximation = bisection(TOL, a, b, N)
if (approximation != None):
    print("Success, final approximation is: ")
    print(approximation)
