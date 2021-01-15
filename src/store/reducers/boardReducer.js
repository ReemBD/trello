
const initialState = {
    currBoard: null,
    isTaskOpen: false,
    currListIdx: null,
    isOverlayOpen: false
}

export function boardReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_BOARD':
            return { ...state, currBoard: action.board }
        case 'TOGGLE_TASK':
            return { ...state, isTaskOpen: !state.isTaskOpen }
        case 'SET_CURR_LIST':
            return { ...state, currListIdx: action.listIdx }
        case "UPDATE_BOARD":
            return { ...state, currBoard: action.updatedBoard }
        case "TOGGLE_OVERLAY":
            return { ...state, isOverlayOpen: !state.isOverlayOpen }
        default:
            return state
    }
}