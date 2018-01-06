import React, { Component  } from "react";
import TodoListItem from '../../components/TodoListItem/TodoListItem';
import Styles from './TodoList.css';
import axios from 'axios';
import Spinner from '../../components/UI/Spinner';

export default class TodoList extends Component {

    state = {
        todos: [],
        errors: false
    };

    componentDidMount() {
        axios.get('https://react-burger-app-1c48d.firebaseio.com/todos.json')
            .then((res) => {
                let fetchedTodos = [];
                for(let i in res.data) {
                   fetchedTodos.push(res.data[i])
                }
                this.setState({ todos: this.state.todos.concat(fetchedTodos) })
            })
            .catch((err) => {
                console.log('====================================');
                console.log('error', err);
                console.log('====================================');
            })
    }

    render() {
        let todos = <Spinner />
        if(!this.state.errors) {
            if(this.state.todos.length > 0) {
                todos = (
                    <React.Fragment>
                        <h1>Here are your todos...</h1>
                        <ul className={Styles.TodoList}>
                            {
                                this.state.todos.map((todo) => {
                                    return (
                                        <TodoListItem 
                                            body={todo.todo.body}
                                            completed={todo.todo.completed}
                                            key={todo.todo.id}
                                            clicked={() => this.props.clicked(todo.id)}
                                        />
                                    );
                                })
                            }
                        </ul>
                    </React.Fragment>
                );
            };
        };

        return todos;
    };
};