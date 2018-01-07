import * as actionTypes from '../actions/ActionTypes';

let initialState = {
    todos: [],
    errors: [],
    loading: false
}

const todosReducer = (state = initialState, action) => {
    console.log('====================================');
    console.log('actionTuype', action.type);
    console.log('====================================');
    switch (action.type) {
        case actionTypes.FETCH_TODOS_START:
            return {
                ...state,
                loading: !state.loading
            }
        case actionTypes.FETCH_TODOS_SUCCESS:
            return {
                ...state,
                todos: state.todos.concat(action.todos),
                loading: !state.loading
            }
        case actionTypes.FETCH_TODOS_FAIL:
            return {
                ...state,
                errors: state.errors.concat(action.errors),
            }
        case actionTypes.CREATE_TODO_SUCCESS:
            return {
                ...state,
                todos: state.todos.concat(action.todo)
            }
        case actionTypes.CREATE_TODO_FAIL:
            return {
                ...state,
                errors: state.errors.concat(action.errors)
            }
        case actionTypes.UPDATE_TODO_SUCCESS: 
            let modifiedTodos = state.todos.map((todo) => {
                return action.id === todo.key ? {...todo, completed: !todo.completed} : todo
            })
            return { ...state, todos: modifiedTodos };
        case actionTypes.DELETE_TODO_SUCCESS:
            let updatedTodos = state.todos.filter((todo) => {
                return action.id !== todo.key ? todo : null
            });
            return {
                ...state,
                todos: updatedTodos
            }
        default:
            return state;
    }
}

export default todosReducer;