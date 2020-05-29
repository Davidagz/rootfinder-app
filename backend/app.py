import time
from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/time')
def get_current_time():
    return {'time': time.time()}


@app.route('/rootfinder/bisection/<equation>', methods=['GET'])
def solve_bisection(equation):
    error = False
    body = {}
    try:
        body['equation'] = equation
    except:
        error=True
        print(sys.exc_info())
    if error:
        abort (400)
    else:
        return jsonify(body)

@app.route('/rootfinder/fixedpoint/<equation>', methods=['GET'])
def solve_fixedpoint(equation):
    error = False
    body = {}
    try:
        body['equation'] = equation
    except:
        error=True
        print(sys.exc_info())
    if error:
        abort (400)
    else:
        return jsonify(body)


@app.route('/rootfinder/newtons/<equation>', methods=['GET'])
def solve_newtons(equation):
    error = False
    body = {}
    try:
        body['equation'] = equation
    except:
        error=True
        print(sys.exc_info())
    if error:
        abort (400)
    else:
        return jsonify(body)


@app.route('/rootfinder/secant/<equation>', methods=['GET'])
def solve_secant(equation):
    error = False
    body = {}
    try:
        body['equation'] = equation
    except:
        error=True
        print(sys.exc_info())
    if error:
        abort (400)
    else:
        return jsonify(body)
