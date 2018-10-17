import React, { Component } from 'react';

class Todo extends Component {
  constructor(props, context) {
    super(props, context);

    console.log('props', this.props)

    let stateFromLocalStorage = localStorage.getItem('state')
    console.log('localStoragestate', stateFromLocalStorage)
    if (stateFromLocalStorage) {
      this.state = JSON.parse(stateFromLocalStorage)
      if (this.props.match.params.label) {
        this.state.filterLabel = this.props.match.params.label
      } else {
        this.state.filterLabel = 'all'
      }
    } else {

      this.state = {
        todos: [],
        newTodo: {
          label: '',
          content: ''
        },
        labelForNewTodo: 'blue',
        filterLabel: 'all'
      }
    }


    this.setNewTodoContent = this.setNewTodoContent.bind(this)
    this.addTodo = this.addTodo.bind(this)
    this.setLabelForNewTodo = this.setLabelForNewTodo.bind(this)
    this.filterLabel = this.filterLabel.bind(this)
    this.saveToLocalStorage = this.saveToLocalStorage.bind(this)
  }

  filterLabel(value) {
    console.log(value)
    let url = '/' + value
    this.props.history.push(url)
    this.setState({
      filterLabel: value
    }, this.saveToLocalStorage())
  }

  setNewTodoContent(value) {
    let newTodo = this.state.newTodo
    newTodo.content = value
    this.setState({
      newTodo: newTodo
    }, this.saveToLocalStorage())
  }

  setLabelForNewTodo(value) {
    this.setState({
      labelForNewTodo: value
    }, this.saveToLocalStorage())
  }

  addTodo() {
    let todos = this.state.todos
    let todo = this.state.newTodo
    todo.label = this.state.labelForNewTodo
    todo.id = this.state.todos.length + 1

    todos.push(todo)
    this.setState({
      todos: todos,
      newTodo: {
        content: '',
        label: ''
      }
    }, this.saveToLocalStorage())
  }

  saveToLocalStorage(label) {
    let state = this.state
    if (label) {
      state.filterLabel = label
    }
    console.log('state', state)
    localStorage.setItem('state', JSON.stringify(state))
  }

  goToTodo(id) {
    let url = '/todo/' + id
    this.props.history.push(url)
  }
  render() {
    let firstTodo
    console.log('state', this.state)
    let todos = filterTodos(this.state.filterLabel, this.state.todos)
    console.log('todos', this.state.todos)
    console.log('filterTodos', todos)
    if (todos.length > 0) {

      firstTodo = <TodoCard todo={todos[0]}></TodoCard>
    }

    let todoRows = []
    if (todos.length > 1) {
      let todosInChunk = splitArray(todos.slice(1))

      todosInChunk.forEach((todoArray) => {
        let todoRow = createTodoRow(todoArray)
        todoRows.push(todoRow)
      })
    }

    return (
      <div className="container">

        <div className="row">
          <div className="col-3">
            <button type="button" className="btn btn-primary" style={{width: '100%'}} onClick={() => this.filterLabel('all')} >All</button>
          </div>
          <div className="col-3">
            <button type="button" className="btn btn-primary" style={{width: '100%', backgroundColor: getBackgroundColor('red')}} onClick={() => this.filterLabel('red')} >Red</button>
          </div>
          <div className="col-3">
            <button type="button" className="btn btn-primary" style={{width: '100%', backgroundColor: getBackgroundColor('green')}} onClick={() => this.filterLabel('green')} >Green</button>
          </div>
          <div className="col-3">
            <button type="button" className="btn btn-primary" style={{width: '100%', backgroundColor: getBackgroundColor('blue')}} onClick={() => this.filterLabel('blue')} >Blue</button>
          </div>
        </div>

        <div className="row mt-3">

          <div className='col-sm-8 col-12'>
            <div className="card">
              <div className="card-body">
                <input type="text" value={this.state.newTodo.content} onChange={(e) => this.setNewTodoContent(e.target.value)}/>
              </div>
              <div className="btn-group" role="group" aria-label="Basic example">
                <button type="button" className="btn btn-secondary" style={{backgroundColor:  getBackgroundColor('blue')}} onClick={() => this.setLabelForNewTodo('blue')}>Blue</button>
                <button type="button" className="btn btn-secondary" style={{backgroundColor:  getBackgroundColor('green')}} onClick={() => this.setLabelForNewTodo('green')}>Green</button>
                <button type="button" className="btn btn-secondary" style={{backgroundColor:  getBackgroundColor('red')}} onClick={() => this.setLabelForNewTodo('red')}>Red</button>
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
    <div className="row mt-3">
      {todoColumns}
    </div>
  )
}

function TodoCard(props) {
  let todo = props.todo
  return (
    <div className="col-sm-4 col-12 mb-3" onClick={() => goToTodo(todo.id)}>
      <div className="card">
      <div className="card-header" style={{backgroundColor: getBackgroundColor(todo.label)}}>

      </div>
        <div className="card-body">
          {todo.content}
        </div>
      </div>
    </div>
  )
}

function filterTodos(label, todos) {
  if (label == 'all') {
    return todos
  }
  return todos.filter(todo => todo.label == label)
}

function goToTodo(id) {
  window.location.href = `localhost:3000/todo/{id}`
}

function getBackgroundColor(color) {
  if (color == 'red') {
    return '#D32F2F'
  } else if (color == 'blue') {
    return '#2E86C1'
  } else if (color == 'green') {
    return '#28B463'
  }
}
