import React, { Component  } from "react";
import TodoListItem from '../../components/TodoListItem/TodoListItem';
import Styles from './TodoList.css';

export default class TodoList extends Component {

    render() {
        return (
            <React.Fragment>
                <h1>Here are your todos...</h1>
                <ul className={Styles.TodoList}>
                    {this.props.todos.map((todo) => {
                        return (
                            // <TodoListItem todo={todo} key={todo.id} clicked={() => this.toggleTodo(todo.id)} />
                            <TodoListItem todo={todo} key={todo.id} clicked={() => this.props.clicked(todo.id)} />
                        )
                    })}
                </ul>
            </React.Fragment>
        );
    };
};