import React, { Component  } from "react";
import {connect} from 'react-redux';
import TodoListItem from '../../components/TodoListItem/TodoListItem';
import Styles from './TodoList.css';
import Spinner from '../../components/UI/Spinner';
import * as actions from '../../store/actions/todos/todos';
import axios from 'axios';

class TodoList extends Component {

    componentDidMount() {
        console.log('====================================');
        console.log('I doubt component did mount    ');
        console.log('====================================');
        this.props.fetchTodos();
    }

    handleDeleteClick = (id) => {
        console.log('====================================');
        console.log('delete click');
        console.log('====================================');
        this.props.onDeleteClick(id);
    }

    handleUpdateClick = (todo) => {
        console.log('====================================');
        console.log('update click');
        console.log('====================================');
        this.props.updateTodo(todo)
    }

    render() {

        let todos = <Spinner />;

        if(this.props.errors.length > 0) {
            todos = <p className={Styles.TodoListError}>Error while loading your todo's :( </p>
        }

        if(this.props.todos.length == 0 && !this.props.loading) {
            todos = <p className={Styles.TodoListError}>Seems like you didn't create any todos. Start creating one now.. </p>
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
                                        body={todo.body}
                                        completed={todo.completed}
                                        key={todo.key}
                                        clicked={this.handleUpdateClick.bind(this, todo)}
                                        deleteClicked={this.handleDeleteClick.bind(this, todo.key)}
                                    />
                                );
                            })
                        }
                    </ul>
                </React.Fragment>
            );
        }

        return (
            todos
        )
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
        fetchTodos: () => dispatch(actions.fetchTodos()),
        onDeleteClick: (id) => {
            console.log('====================================');
            console.log('coming to delete click');
            console.log('====================================');
            dispatch(actions.deleteTodo(id)) 
        },
        updateTodo: ((todo) => {
            console.log('====================================');
            console.log('comig to update click');
            console.log('====================================');
            dispatch(actions.updateTodo(todo))
        })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);