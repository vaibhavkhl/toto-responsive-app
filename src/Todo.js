import React, { Component } from 'react';

class Todo extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      todos: [],
      newTodo: {
        label: '',
        content: ''
      },
      lebelForNewTodo: ''
    }

    this.setNewTodoContent = this.setNewTodoContent.bind(this)
    this.addTodo = this.addTodo.bind(this)
    this.setLabelForNewTodo = this.setLabelForNewTodo.bind(this)
  }

  setNewTodoContent(value) {
    let newTodo = this.state.newTodo
    newTodo.content = value
    this.setState({
      newTodo: newTodo
    })
  }

  setLabelForNewTodo(value) {
    this.setState({
      labelForNewTodo: value
    })
  }

  addTodo() {
    let todos = this.state.todos
    let todo = this.state.newTodo
    todo.label = this.state.labelForNewTodo
    console.log('label', todo.label)
    console.log('state', this.state)
    console.log('todo', todo)
    todos.push(todo)
    this.setState({
      todos: todos,
      newTodo: {
        content: '',
        label: ''
      }
    })
  }
  render() {
    let firstTodo
    if (this.state.todos.length > 0) {

      firstTodo = <TodoCard todo={this.state.todos[0]}></TodoCard>
    }
    let todos = this.state.todos
    let todoRows = []
    if (todos.length > 1) {
      let todosInChunk = splitArray(todos)

      todosInChunk.forEach((todoArray) => {
        let todoRow = createTodoRow(todoArray)
        todoRows.push(todoRow)
      })
    }

    return (
      <div className="container">
        <div className="row">

          <div className='col-sm-8 col-12'>
            <div className="card">
              <div className="card-body">
                <input type="text" value={this.state.newTodo.content} onChange={(e) => this.setNewTodoContent(e.target.value)}/>
              </div>
              <div className="btn-group" role="group" aria-label="Basic example">
                <button type="button" className="btn btn-secondary" style={{backgroundColor:  'blue'}} onClick={() => this.setLabelForNewTodo('blue')}>Blue</button>
                <button type="button" className="btn btn-secondary" style={{backgroundColor:  'green'}} onClick={() => this.setLabelForNewTodo('green')}>Green</button>
                <button type="button" className="btn btn-secondary" style={{backgroundColor:  'red'}} onClick={() => this.setLabelForNewTodo('red')}>Red</button>
              </div>
              <button type="button" className="btn btn-primary" onClick={this.addTodo} >Add todo</button>
            </div>
          </div>


          {firstTodo}
        </div>

        {todoRows}
      </div>
    );
  }
}

export default Todo;

function splitArray(inputArray) {
  let perChunk = 3 // items per chunk


  let resultArray = inputArray.reduce((resultArray, item, index) => {
    const chunkIndex = Math.floor(index/perChunk)

    if(!resultArray[chunkIndex]) {
      resultArray[chunkIndex] = [] // start a new chunk
    }

    resultArray[chunkIndex].push(item)

    return resultArray
  }, [])

  return resultArray
}

function createTodoRow(todoArray) {
  let todoColumns = []

  todoArray.forEach((todo) => {
    todoColumns.push(
      <TodoCard todo={todo}></TodoCard>
    )
  })

  return (
    <div className="row">
      {todoColumns}
    </div>
  )
}

function TodoCard(props) {
  let todo = props.todo
  return (
    <div className="col-sm-4 col-12">
      <div className="card">
      <div className="card-header" style={{backgroundColor: todo.label}}>

      </div>
        <div className="card-body">
          {todo.content}
        </div>
      </div>
    </div>
  )
}
