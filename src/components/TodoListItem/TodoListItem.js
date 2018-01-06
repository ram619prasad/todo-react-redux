import React from "react";
import Styles from './TodoListItem.css'

const TodoListItem = ({body, completed, clicked}) => {
    return (
        <li 
            className={Styles.TodoListItem}
            onClick={clicked}
            style={{ textDecoration: completed ? 'line-through' : 'none' }} >
            {body}
        </li>
    );
};

export default TodoListItem