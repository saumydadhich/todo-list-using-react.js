import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Header from './components/layout/Header';
import Todos from './components/Todos';
import AddTodo from './components/AddTodo';
import About from './components/pages/About';

import './App.css';

class App extends Component {
  state = {
    todos: []
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/todos?_limit=10')
    .then(res => res.json())
    .then(json => this.setState({todos : json}));
  }

  markComplete = (id) =>{
    this.setState({
      todos: this.state.todos.map(todo =>{
        if(todo.id === id){
          todo.completed = !todo.completed
        }
        return todo;
      })
    });
  }

  delItem = (id) =>{
    fetch('https://jsonplaceholder.typicode.com/todos/'+id, {
      method: 'DELETE'
    }).then(res => this.setState({
      todos: [...this.state.todos.filter(todo => todo.id !== id)]
    }))
  }

  addTodo = (title) => {
    fetch('https://jsonplaceholder.typicode.com/todos', {
      method: 'POST',
      body: JSON.stringify({title, completed: false}),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    }).then(res => res.json())
    .then(json => this.setState({todos: [...this.state.todos, json] }));
  }

  render() {
    return (
      <Router>
        <div className="App">
          <div className="container">
            <Header />
            <Route exact path='/' render={props => (
                <React.Fragment>
                  <AddTodo addTodo={this.addTodo}/>
                  <Todos todos={this.state.todos} markComplete={this.markComplete} delItem={this.delItem} />
                </React.Fragment>
            )} />
          <Route path='/about' component={About} />

          </div>
        </div>
      </Router>
    );
  }
}

export default App;
