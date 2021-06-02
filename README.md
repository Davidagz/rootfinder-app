# Rootfinder App
Small react-flask web-app to solve roots of polynomial functions using a flask API with sympy.

## Instructions
You will need to clone the repository.
To run the flask server, simply cd to the backend directory with app.py and run the command "flask run".
To run the frontend, cd to frontend\rootfinder-app\src and run npm-start. 
After running the above commands, you should be able to navigate to localhost:3000 and use the app. 

## Dependencies 
Besides flask and react, the rootfinder app requires the module react-latex for rendering latex results to the user. This can be installed with npm.


## Known issues
Currently, dividing by the target variable will cause the app to return an error. This is caused by sympy being unable to divide by zero. 
