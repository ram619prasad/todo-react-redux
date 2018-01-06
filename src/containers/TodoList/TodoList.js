import React, { Component  } from "react";
import TodoListItem from '../../components/TodoListItem/TodoListItem';
import Styles from './TodoList.css';
import axios from 'axios';

export default class TodoList extends Component {

    state = {
        todos: [],
        loading: true
    };

    componentDidMount() {
        axios.get('https://react-burger-app-1c48d.firebaseio.com/todos.json')
            .then((res) => {
                console.log('====================================');
                console.log('success', res);
                console.log('====================================');
            })
            .catch((err) => {
                console.log('====================================');
                console.log('error', err);
                console.log('====================================');
            })
    }

    render() {
        return (
            <React.Fragment>
                <h1>Here are your todos...</h1>
                <ul className={Styles.TodoList}>
                    {this.state.todos.map((todo) => {
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