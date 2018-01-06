import * as actionTypes from '../ActionTypes';
import axios from 'axios';
import todoRef from '../../../firebaseRef';

export const fetchTodosStart = () => {
    return {
        type: actionTypes.FETCH_TODOS_START
    }
}

export const fetchTodosSuccess = (todos) => {
    return {
        type: actionTypes.FETCH_TODOS_SUCCESS,
        todos: todos
    }
}

export const fetchTodosFail = (error) => {
    return {
        type: actionTypes.FETCH_TODOS_FAIL,
        errors: error
    }
}

export const createTodoSuccess = (todo) => {
    return {
        type: actionTypes.CREATE_TODO_SUCCESS,
        todo: todo
    };
};

export const createTodoFail = (err) => {
    return {
        type: actionTypes.CREATE_TODO_FAIL,
        errors: err
    };
};

export const createTodo = (todoData) => {
    return (dispatch) => {
        axios.post('https://react-burger-app-1c48d.firebaseio.com/todos.json', { todo: todoData })
            .then((res) => {
                let newTodo = null;
                // Need to re-fetch the todo which just got created
                todoRef.child(res.data.name).on('value', dataSnapshot => {   
                    dataSnapshot.forEach(function(childSnapshot) {
                        newTodo = childSnapshot.val();
                        newTodo['.key'] = childSnapshot.key;
                    });
                    dispatch(createTodoSuccess(newTodo))
                });
            })
            .catch((err) => {
                dispatch(createTodoFail(err));
            });
    };
};

export const fetchTodos = () => {
    return (dispatch) => {
        dispatch(fetchTodosStart())
        axios.get('https://react-burger-app-1c48d.firebaseio.com/todos.json')
        .then((res) => {
            let fetchedTodos = [];
            for(let i in res.data) {
                fetchedTodos.push(res.data[i])
            }
            dispatch(fetchTodosSuccess(fetchedTodos))
        })
        .catch((err) => {
            dispatch(fetchTodosFail(err))
        });
    }
}