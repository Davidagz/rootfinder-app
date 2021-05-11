import React from 'react';
import './App.css';

var Latex = require('react-latex');

class App extends React.Component {
  constructor(props) {
  super(props);
  this.state = {
    equation: null,
    variable: null,
    result: null,
    solutionString: null,
    error: false, 
    errorString: null,
    waitingOnUser: true,
  };
  this.onSubmit = this.onSubmit.bind(this);
  this.handleChange = this.handleChange.bind(this);
  this.checkSolutionType = this.checkSolutionType.bind(this);
  this.formatter = this.formatter.bind(this);
  }

  async onSubmit(event) {
    this.state.loading = true;
    event.preventDefault();
    let equation = this.state.equation;
    let variable = this.state.variable;
    // check to make sure user input exists
    if (equation === null || equation === '' || variable === null || variable === ''){
      this.setState({error: true, loading: false,
      errorString: "No variable or equation found, please enter a variable and equation."})
    }
    // attempt API call
    else {
      equation = equation.replaceAll("/", "--");
      const url = `/rootfinder/${equation}/${variable}`;
      const response = await fetch(url, {method: "GET"});

      // check to make sure we get back a 200 status response, if not we update the error message
      if (!response.ok){
        this.setState({errorString: "Unable to find solution, please check input formatting.",
        loading: false, error: true});
      } else {
        const data = await response.json();
        console.log(data);
        this.checkSolutionType(JSON.stringify(data.solution_type));
        var latex_solution = this.formatter(JSON.stringify(data.solution_latex));
        console.log(latex_solution);
        this.setState({result: latex_solution, loading: false, waitingOnUser: false, error: false});
      }
    }
  }

  // helper function to set the string displayed to the user based on the solution from the API
  checkSolutionType(sol_type) {
    if (sol_type.includes("FiniteSet")) {
      this.setState({ solutionString: "Solution is the finite set" });
    } else if (sol_type.includes("ConditionSet")) {
      this.setState({ solutionString: "The rootfinder app was unable to find an exact solution" });
    } else if (sol_type.includes("EmptySet")) {
      this.setState({ solutionString: "No solutions exist" });
    } else if (sol_type.includes("fancysets")) {
      this.setState({ solutionString: "Solution is the interval" });
    }
  }

  formatter(unformatted_solution){
    unformatted_solution = unformatted_solution.replaceAll("\\\\", "\\");
    unformatted_solution = unformatted_solution.replaceAll("\"", "");
    unformatted_solution  = "$ " + unformatted_solution.replaceAll("\\n", "") + " $";
    return unformatted_solution;
  }

  handleChange(event){
    const target = event.target;
    const value = target.value; 
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
    let waitingOnUser = this.state.waitingOnUser;
    let error = this.state.error;
    return (
      <body>
        <div className="App">
          <header className="App-header">
            Welcome to the Rootfinder App!
          </header>

          <p className="App-instructions">Type in an equation to find the roots of, with respect to a variable</p>
          <form className="App-form" onkeydown="return event.key != 'Enter';">
           <label form="equation" />
           <input className="input" type="text" name="equation" value={this.state.value}
           onChange={this.handleChange} placeholder="Ex: 10x^2 - 3x^3"/>
           &nbsp;&nbsp;
           <label form="variable"/>
           <input className="var-input" type="text" name="variable" value={this.state.value}
           onChange={this.handleChange} placeholder="x"/>
           <br />
           <button className="submit-button" type="button" onClick={this.onSubmit}>
            Submit
           </button>
         </form>
        
        <div className="App-results">
          <p>{waitingOnUser ? '' : this.state.solutionString}</p>
          <Latex>{waitingOnUser ? '' : this.state.result}</Latex>
        </div>
        <div className="App-error">
          <p>{error ? this.state.errorString : ''}</p>
        </div>
        <div className="Info">
          <header className="Info-header">
          Instructions:
          </header>
          <p className="Info-text">
             For syntax, exponents can be entered in the form x^y. The exponential function 
            can be represented as just e and the logarithmic function can be represented as log(x). Division
            can be represented with "/", use parenthesis accordingly. Currently upon division by zero,
            an error will be thrown. <br/> <br/>
            This app will find the roots (intersection of the equation with the X-axis) of any single-variable
            equation using the <a href="https://www.sympy.org/en/index.html" target="_blank">Sympy</a> python library
            There are three types of solutions: a finite set of possible solutions, an interval of valid solutions, 
            or if there are no solutions found then a conditional set is shown of when solutions could exist. More 
            documentation can be found <a href="https://docs.sympy.org/latest/tutorial/solvers.html" target="_blank">
            here.</a>
          </p>
        
        <div className="footer">
          <p className="Info-text"> Created by David Garza </p>
          <p className="Info-text"> For any problems found, please create an issue on &nbsp;
            <a href="https://github.com/Davidagz/rootfinder-app" target="_blank">Github</a>
            &nbsp; :)
          </p>
        </div>
        </div>
        </div>
      </body>
    );
  }

};
export default App;
