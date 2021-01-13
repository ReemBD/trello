
const initialState = {
    currBoard: null,
    isTaskOpen: false,
}

export function boardReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_BOARD':
            return { ...state, currBoard: action.board }
        case 'TOGGLE_TASK':
            return { ...state, isTaskOpen: !state.isTaskOpen }
        default:
            return state
    }
}