import React, { Component } from 'react';

class SingleTodo extends Component {
  constructor(props, context) {
    super(props, context);

    console.log('props', this.props)

    let stateFromLocalStorage = localStorage.getItem('state')
    console.log('localStoragestate', stateFromLocalStorage)
    if (stateFromLocalStorage) {
      this.state = JSON.parse(stateFromLocalStorage)
    }

  }


  render() {
    let todo = this.state.todos.find(() => todo.id == this.props.match.params.id)

    return (
      <div className="container">
        <div className="col-sm-4 col-12 mb-3">
          <div className="card">
          <div className="card-header" style={{backgroundColor: todo.label}}>

          </div>
            <div className="card-body">
              {todo.content}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SingleTodo;
