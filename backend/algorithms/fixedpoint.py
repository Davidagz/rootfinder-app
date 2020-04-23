# Program for CSCE440 HW1
# This program will show how to use newtons method for the root finding problem

import math

def fixed_point(p_0, TOL, N):
    i = 1
    approximations = []
    while i <= N:
        p = g(p_0)
        approximations.append(p)
        print("P is " + str(p) + " at iteration " + str(i))
        if (abs(p-p_0) < TOL):
            return p
        i+=1
        p_0 = p
    print("Method failed after " + str(N) + " iterations")
    return None

# Define function and appropraite parameters
# This is the fixed point function, not the polynomial function being solved

def g(x):
    return math.cos(x)

TOL = 0.0001
N = 50
p_0 = 1

# Call fixed_point method
approximation = fixed_point(p_0, TOL, N)
if (approximation != None):
    print("Success, final approximation is: ")
    print(approximation)
