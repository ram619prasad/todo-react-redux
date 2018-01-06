import React from "react";
import Styles from './TodoListItem.css'

const TodoListItem = ({body, completed, clicked}) => {

    console.log('====================================');
    console.log('todo data', body, completed);
    console.log('====================================');
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