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

export const deleteTodoSuccess = (id) => {
    return {
        type: actionTypes.DELETE_TODO_SUCCESS,
        id: id
    };
}

export const deleteTodoFail = (err) => {
    return {
        type: actionTypes.DELETE_TODO_FAIL,
        errors: err
    };
};

export const createTodo = (todoData) => {
    return async (dispatch) => {
        axios.post('https://react-burger-app-1c48d.firebaseio.com/todos.json', { todo: todoData })
            .then((res) => {
                let newTodo = null;
                // Need to re-fetch the todo which just got created
                todoRef.child(res.data.name).on('value', dataSnapshot => {   
                    dataSnapshot.forEach(function(childSnapshot) {
                        newTodo = childSnapshot.val();
                        newTodo['key'] = res.data.name;
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
                let todo = null;
                todo = res.data[i].todo;
                todo['key'] = i;
                fetchedTodos.push(todo);
            }
            dispatch(fetchTodosSuccess(fetchedTodos))
        })
        .catch((err) => {
            dispatch(fetchTodosFail(err))
        });
    }
}

export const deleteTodo = (id) => {
    return async dispatch => {
        try {
            dispatch(deleteTodoSuccess(id))            
            const response = await todoRef.child(id).remove();
        } catch (err) {
            dispatch(deleteTodoFail('Error while deleting todo.'));
        }
        
    }
}

export const updateTodoSuccess = (id) => {
    return {
        type: actionTypes.UPDATE_TODO_SUCCESS,
        id: id
    };
}

export const updateTodoFail = (err) => {
    return {
        type: actionTypes.UPDATE_TODO_FAIL,
        errors: err
    };
};

export const updateTodo = (todo) => {
    return dispatch => {
        todoRef.child(todo.key).update({todo: {id: todo.id, body: todo.body, completed: !todo.completed, key: todo.key}})
            .then((res) => {
                dispatch(updateTodoSuccess(todo.key));
            })
            .catch((err) => {
                dispatch(updateTodoFail('Error while updating todo.'));
            })
    }
}