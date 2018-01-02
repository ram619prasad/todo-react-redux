import React, { Component } from 'react';
import Styles from './App.css';
import NewTodo from './components/NewTodo/NewTodo';
import TodoList from './containers/TodoList/TodoList';

class App extends Component {

  state = {
    todos: [
        { id: 1, body: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to', completed: false },
        { id: 2, body: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.', completed: false },
        { id: 3, body: 'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" ', completed: false },
        { id: 4, body: ' All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words', completed: false },
    ],
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
      let newState = this.state.todos.concat(newTodo)
      this.setState({todos: newState});
      form.elements.todo.value = '';      
    }
  }

  render() {
    return (
      <div className={Styles.App}>
        <NewTodo handleFormSubmit={this.saveTodo}/>
        <TodoList todos={this.state.todos} clicked={this.toggleTodo} />
      </div>
    );
  }
}

export default App;
