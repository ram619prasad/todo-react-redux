import React, { Component } from 'react';
import Styles from './App.css';
import NewTodo from './components/NewTodo/NewTodo';
import TodoList from './containers/TodoList/TodoList';
import Filters from './containers/Filters/Filters';
import { connect } from 'react-redux';
import * as actions from './store/actions/todos/todos';

class App extends Component {

  state = {
    filters: ['All', 'Completed', 'In Progress']
  };

  componentDidMount() {
    this.setState({ todos: this.state.todos });
  }

  toggleTodo = (id) => {
    let todos = this.state.todos.map((todo) => {
          return ( todo.id === id ? {...todo, completed: !todo.completed} : todo )
    });
    this.setState({ todos: todos });
  }

  saveTodo = (e) => {
    e.preventDefault();
    let form = document.forms.todoForm;
    let todoBody = form.elements.todo.value;
    let id = Math.floor(Math.random() * 1000)

    if(todoBody.trim().length > 0) {
      let newTodo = { id: id, body: todoBody, completed: false };
      this.props.onFormSubmit(newTodo);
      form.elements.todo.value = '';      
    }
  }

  render() {
    return (
      <div className={Styles.App}>
        <NewTodo handleFormSubmit={this.saveTodo}/>
        <Filters filters={this.state.filters} />
        <TodoList todos={this.state.todos} clicked={this.toggleTodo} />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onFormSubmit: (todoData) => dispatch(actions.createTodo(todoData))
  }
}

export default connect(null, mapDispatchToProps)(App);
