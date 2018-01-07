import React from "react";
import Styles from './TodoListItem.css'

const TodoListItem = ({body, completed, clicked, deleteClicked}) => {

    return (
        <div style={{position: 'relative'}}>
            <li 
                className={Styles.TodoListItem}
                onClick={clicked}
                style={{ textDecoration: completed ? 'line-through' : 'none' }} >
                {body}
            </li>
            <span className={Styles.TodoListRemove} onClick={deleteClicked} styles={{cursor: completed ? 'none' : 'pointer'}}>X</span>            
        </ div>
    );
};

export default TodoListItem