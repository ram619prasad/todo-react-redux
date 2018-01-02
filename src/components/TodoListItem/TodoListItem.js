import React from "react";
import Styles from './TodoListItem.css'

const TodoListItem = ({todo, clicked}) => {
    return (
        <li 
            className={Styles.TodoListItem}
            onClick={clicked}
            style={{ textDecoration: todo.completed ? 'line-through' : 'none' }} >
            {todo.body}
        </li>
    );
};

export default TodoListItem