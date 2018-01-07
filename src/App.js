import React, { Component } from 'react';
import Styles from './App.css';
import NewTodo from './containers/NewTodo/NewTodo';
import TodoList from './containers/TodoList/TodoList';
import Filters from './containers/Filters/Filters';

class App extends Component {

  state = {
    filters: ['All', 'Completed', 'In Progress']
  };

  render() {
    return (
      <div className={Styles.App}>
        <NewTodo handleFormSubmit={this.saveTodo}/>
        <Filters filters={this.state.filters} />
        <TodoList />
      </div>
    );
  }
}

export default App;
