import React, { Component  } from "react";
import {connect} from 'react-redux';
import TodoListItem from '../../components/TodoListItem/TodoListItem';
import Styles from './TodoList.css';
import axios from 'axios';
import Spinner from '../../components/UI/Spinner';
import * as actions from '../../store/actions/todos/todos';

import todoRef from '../../firebaseRef';
import { DataSnapshot } from "@firebase/database/dist/esm/src/api/DataSnapshot";

class TodoList extends Component {

    componentDidMount() {
        this.props.fetchTodos()
    }

    render() {

        let todos = <Spinner />;

        if(this.props.errors.length > 0) {
            todos = <p className={Styles.TodoListError}>Error while loading your todo's :( </p>
        }

        if(this.props.todos.length > 0) {
            todos = (
                <React.Fragment>
                    <h1>Here are your todos...</h1>
                    <ul className={Styles.TodoList}>
                        {
                            this.props.todos.map((todo) => {
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

        return todos;
    };
};

const mapStateToProps = (state) => {
    return {
        todos: state.todos,
        loading: state.loading,
        errors: state.errors
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchTodos: () => dispatch(actions.fetchTodos())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);