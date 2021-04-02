import React from 'react';
import './App.css';

var Latex = require('react-latex');

function replacer(key, value) {
  return value.replace('\\', '');
}

class App extends React.Component {
  constructor(props) {
  super(props);
  this.state = {
    equation: null,
    variable: null,
    loading: false,
    result: null,
    latex_result: null
  };
  this.onSubmit = this.onSubmit.bind(this);
  this.handleChange = this.handleChange.bind(this);
  }

  async onSubmit(event) {
    this.state.loading = true;
    event.preventDefault();
    const equation = this.state.equation;
    const variable = this.state.variable;
    const url = `/rootfinder/${equation}/${variable}`;
    const response = await fetch(url, {
        method: "GET"
    });
    const data = await response.json();
    console.log(data);
    var nonescaped_latex = JSON.stringify(data.solution_latex, replacer)
    console.log(nonescaped_latex);
    this.setState({result: data.solution, latex_result: nonescaped_latex, loading: false})
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
    let user_result = null;
    if (this.state.result == null) {
      user_result = <div></div>;
    } else {
      user_result = <Latex>{this.state.latex_result}</Latex>;
    }
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
        </div>
        <div className="App-results">
          {user_result}
        </div>
        <div>
          <header className="Info-header">
          How does it work?
          </header>
          <p className="Info-text">
            Text here
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
