import { boardService } from '../../services/boardService'
import { socketService } from '../../services/socketService'
import { utilService } from '../../services/utilService'

export function setBoard(boardId) {
    return async dispatch => {
        try {
            const board = await boardService.getById(boardId)
            // board = board[0]
            dispatch({ type: 'SET_BOARD', board })

        } catch (err) {
            console.log('Couldnt get Board', err)
        }
    }
}


export function updateBoard(board, activity = undefined, isEmitting = true) {
    //ACTIVITY PARAM MUST BE AN OBJECT!
    return async dispatch => {
        try {
            if (activity === undefined) console.warn('Warning: You have not entered an activity for this action.')
            if (activity) {
                const fullActivity = utilService.formActivity(activity)
                board.activities = [...board.activities, fullActivity] || [fullActivity]
                console.log('fullActivity: ', fullActivity);
            }
            const updatedBoard = await boardService.save(board)
            const action = {
                type: 'UPDATE_BOARD',
                updatedBoard
            }
            dispatch(action)
            isEmitting && socketService.emit('board updated', updatedBoard)
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