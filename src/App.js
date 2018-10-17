import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import logo from './logo.svg';
//import './App.css';
import Todo from './Todo.js'

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route path="/:label?" component={Todo} />
        </div>
      </Router>
    );
  }
}

export default App;
