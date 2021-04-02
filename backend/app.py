import re, io, sys
from flask import Flask, jsonify, json
from werkzeug.exceptions import HTTPException
from sympy import sympify, solveset, sets, latex

import approximate

app = Flask(__name__)

@app.route('/rootfinder/<equation>/<variable>', methods=['GET'])
def find_roots(equation, variable):
    body = {}
    # Convert user input into syntax readable by Python
    eqn = equation.replace("^", "**")
    regex = r"(?i)(?<=\d)(?=[a-z])|(?<=[a-z])(?=\d)"
    sub = "*"
    eqn = re.sub(regex, sub, eqn, 0)

    # Transform into sympy object, catching any syntax errors
    # We set evaluation to false in order to prevent eval calls on unsanitzed input
    eqn = sympify(eqn, evaluate=False)

    # now we can solve using solveset from sympy
    solution = solveset(eqn, variable)

    solution_type = str(type(solution))
    # empty set = no solution
    if 'emptyset' in solution_type:
        pass
    # condition set = unable to find solution
    elif 'ConditionSet' in solution_type:
        pass
    
    # valid solutions
    elif ('FiniteSet' in solution_type) or ('fancysets' in solution_type):
        body['solution'] = str(solution)
        body['solution_latex'] = get_latex(solution)
        body['solution_type'] = solution_type
        return jsonify(body)
        
    else: 
        # unknown type, return error 
        pass

def get_latex(solution):
    # we have to redirect stdout for the latex print function to work properly
    old_stdout = sys.stdout
    new_stdout = io.StringIO()
    sys.stdout = new_stdout
    print(latex(solution))
    latex_output = new_stdout.getvalue()
    sys.stdout = old_stdout
    return latex_output


@app.errorhandler(HTTPException)
def handle_exception(e):
    """Return JSON instead of HTML for HTTP errors."""
    # start with the correct headers and status code from the error
    response = e.get_response()
    # replace the body with JSON
    response.data = json.dumps({
        "code": e.code,
        "name": e.name,
        "description": e.description,
    })
    response.content_type = "application/json"
    return response
