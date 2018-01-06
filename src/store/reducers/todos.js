import * as actionTypes from '../actions/ActionTypes';

let initialState = {
    todos: [],
    errors: [],
    loading: false
}

const todosReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_TODOS_START:
            return {
                ...state,
                loading: true
            }
        case actionTypes.FETCH_TODOS_SUCCESS:
            return {
                ...state,
                todos: state.todos.concat(action.todos)
            }
        case actionTypes.FETCH_TODOS_FAIL:
            return {
                ...state,
                errors: state.errors.concat(action.errors)
            }
        case actionTypes.CREATE_TODO_SUCCESS:
            return {
                ...state,
                todos: state.todos.concat({todo: action.todo})
            }
        case actionTypes.CREATE_TODO_FAIL:
            return {
                ...state,
                errors: state.errors.concat(action.errors)
            }
        default:
            return state;
    }
}

export default todosReducer;