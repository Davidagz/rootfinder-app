# Program for CSCE440 HW1
# This program will show how to use newtons method for the root finding problem

import math

def newtons(p_0, TOL, N):
    i = 1
    approximations = []
    while i <= N:
        p = p_0 - (func(p_0) / funcd(p_0))
        approximations.append(p)
        print("P is " + str(p) + " at iteration " + str(i))
        if (abs(p-p_0) < TOL):
            return p
        i+=1
        p_0 = p
    print("Method failed after " + str(N) + " iterations")
    return None

# Define the function and appropriate parameters
def func(x):
    return x - math.cos(x)

# Define the derivative of the function, used for newtons method
def funcd(x):
    return 1 + math.sin(x)


TOL = 0.0001
N = 50
p_0 = 1

# Call newtons method
approximation = newtons(p_0, TOL, N)
if (approximation != None):
    print("Success, final approximation is: ")
    print(approximation)
