import { boardService } from '../../services/boardService'


export function setBoard(boardId) {
    return async dispatch => {
        try {
            const board = await boardService.getById(boardId)
            dispatch({ type: 'SET_BOARD', board })

        } catch (err) {
            console.log('Couldnt get Board', err)
        }
    }
}

export function setPopoverStatus(isPopover) {
    return async dispatch => {
        try {
            console.log('ispopvoer: ', isPopover);
            dispatch({ type: 'SET_POPOVER_STATUS', isPopover })
        } catch (err) {
            console.log('Could not set popover status, ', err);
        }
    }
}

export function updateBoard(board) {
    return async dispatch => {
        try {
            const updatedBoard = await boardService.save(board)
            const action = {
                type: 'UPDATE_BOARD',
                updatedBoard
            }

            dispatch(action)

        } catch (err) {
            console.log('couldnt update board', err);
        }
    }
}

export function toggleTask() {
    return async dispatch => {
        try {
            dispatch({ type: 'TOGGLE_TASK' })
        } catch (err) {
            console.log('Board actions, failed to toggle task', err)
        }
    }
}

export function toggleOverlay() {
    return async dispatch => {
        try {
            dispatch({ type: 'TOGGLE_OVERLAY' })
        }
        catch (err) {
            console.log('Couldnt put overlay', err);
        }
    }
}

export function setCurrListAndTaskIdx(listIdx, taskIdx) {
    return async dispatch => {
        try {
            const action = {
                type: 'SET_CURR_LIST_AND_TASK',
                listIdx, taskIdx
            }
            dispatch(action)
        }
        catch (err) {
            console.log('Borad actions, failed to get curr list', err);
        }
    }
}