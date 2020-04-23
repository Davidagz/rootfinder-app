# Program for CSCE440 HW1
# This program will show how to use newtons method for the root finding problem

import math

def secant(p_0, p_1, TOL, N):
    i = 2
    q_0 = func(p_0)
    q_1 = func(p_1)
    while i <= N:
        p = p_1 - q_1 * ((p_1 - p_0)/(q_1 - q_0))
        print("P is " + str(p) + " at iteration " + str(i))
        if (abs(p-p_0) < TOL):
            return p
        i+=1
        p_0 = p_1
        q_0 = q_1
        p_1 = p
        q_1 = func(p)
    print("Method failed after " + str(N) + " iterations")
    return None

# Define function and appropriate parameters
def func(x):
    return x**4 + 3*x**2 -2

TOL = 0.0001
N = 50
p_0 = 0
p_1 = 1

# Call secant method
approximation = secant(p_0, p_1, TOL, N)
if (approximation != None):
    print("Success, final approximation is: ")
    print(approximation)
