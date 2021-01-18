
export function setCurrPopover(popover=null) {
    console.log('popover: ', popover);
    return async dispatch => {
        try {
            dispatch({ type: 'SET_CURR_POPOVER', popover })
        } catch (err) {
            console.log('Could not set popover status, ', err);
        }
    }
}