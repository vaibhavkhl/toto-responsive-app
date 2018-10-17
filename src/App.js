import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import logo from './logo.svg';
//import './App.css';
import Todo from './Todo.js'
import SingleTodo from './SingleTodo.js'

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route path="/:label?" component={Todo} />
          <Route path="/todo:id" component={SingleTodo} />
        </div>
      </Router>
    );
  }
}

export default App;
