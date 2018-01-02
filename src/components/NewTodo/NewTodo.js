import React from "react";
import Styles from './NewTodo.css';

const newTodo = (props) => {
    return (
        <form className={Styles.NewTodo} onSubmit={props.handleFormSubmit} name="todoForm" >
            <input type='text' placeholder="Enter your todo here ...." className={Styles.Input} name="todo"/>
            <button className={Styles.Button}>Create Todo</button>
        </form>
    );
};

export default newTodo;