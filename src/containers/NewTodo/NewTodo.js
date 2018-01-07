import React from "react";
import Styles from './NewTodo.css';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/todos/todos';

class NewTodo extends React.Component {

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
            <form className={Styles.NewTodo} onSubmit={this.saveTodo.bind(this)} name="todoForm" >
                <input type='text' placeholder="Enter your todo here ...." className={Styles.Input} name="todo"/>
                <button className={Styles.Button}>Create Todo</button>
            </form>
        );
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
      onFormSubmit: (todoData) => dispatch(actions.createTodo(todoData))
    }
  }

export default connect(null, mapDispatchToProps)(NewTodo);