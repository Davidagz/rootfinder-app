import React from 'react';
import PropTypes from "prop-types";
import logo from './logo.svg';
import './App.css';

class App extends React.Component {
  constructor(props) {
  super(props);
  // Don't call this.setState() here!
  this.state = {
    equation: "",
    method: "bisection"
  };
  this.onSubmit = this.onSubmit.bind(this);
  this.handleChange = this.handleChange.bind(this);
  }

  async onSubmit(event) {
    event.preventDefault();
    const equation = this.state.equation;
    const method = this.state.method;
    const url = `/rootfinder/${method}/${equation}`;
    console.log(url);
    try {
      const response = await fetch(url, {
        method: "GET"
      });
      const response_json = await response.json();
      console.log(response_json);
      const { success, data } = {
        success: response.status === 200,
        data: response_json
      };

      success ? console.log(response) : this.handleError(data);
    } catch (err) {
      return console.log(`SERVER ERROR: Something went wrong. ${err}`);
    }
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
    return (
      <body>
        <div className="App">
          <header className="App-header">
            Welcome to the Rootfinder App!
          </header>
          <p className="App-instructions">Type an equation to find the roots of</p>
          <form className="App-form">
           <label form="equation" /><br/>
           <input className="input" type="text" name="equation" value={this.state.value}
           onChange={this.handleChange} placeholder="Ex: 10x^2 - 3x^3"/>
           <br/><br/>
           <p className="App-instructions"> Numerical method to use </p>
           <select id="method" name="method" value={this.state.value} onChange={this.handleChange}>
             <option value="bisection">Bisection Method</option>
             <option value="fixedpoint">Fixedpoint Method</option>
             <option value="newtons">Newtons Method</option>
             <option value="secant">Secant Method</option>
           </select>
           <button type="button" onClick={this.onSubmit}>
            Submit
           </button>
         </form>
        </div>
        <div className="App-results">
          Roots of the equation:
        </div>
        <div>
          <header className="Info-header">
          How does it work?
          </header>
          <p className="Info-text">
          Depending on the numerical method chosen, the submit button sends a GET request to the backend API.
          The API has four endpoints, one for each method. This was built in mind that the API can stand alone.
          Each endpoint parses the input and runs the numerical method
          on the input with some default parameters. These parameters depend on the method, but shared default parameters
          are the number of iterations (50 iterations) and the tolerance of error (0.0001). The API then returns a
          response to our frontend, which is shown.
          <br/> <br/>
          References for the numerical methods are from the text
          <strong> Numerical Analysis 9th Ed. by Burden & Faires, Ch 2. </strong>
          </p>
        </div>
        <div className="footer">
          <p className="Info-text"> Created by David Garza </p>
          <p className="Info-text"> For any problems found, please create an issue on &nbsp;
            <a href="https://github.com/Davidagz/rootfinder-app" target="_blank">Github</a>
            &nbsp; :)
          </p>
        </div>
      </body>
    );
  }

};
export default App;
