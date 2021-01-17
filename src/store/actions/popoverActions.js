
export function setCurrPopover(popover=null) {
    return async dispatch => {
        try {
            console.log('ispopvoer: ', popover);
            dispatch({ type: 'SET_CURR_POPOVER', popover })
        } catch (err) {
            console.log('Could not set popover status, ', err);
        }
    }
}