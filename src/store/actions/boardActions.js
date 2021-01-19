import { boardService } from '../../services/boardService'
import { socketService } from '../../services/socketService'

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


export function updateBoard(board, isEmitting = true, notification = null) {
    return async dispatch => {
        try {
            const updatedBoard = await boardService.save(board)
            const action = {
                type: 'UPDATE_BOARD',
                updatedBoard
            }
            dispatch(action)
            isEmitting && socketService.emit('board updated', updatedBoard)
            console.log('notificaiton: ', notification);
            if (notification) {
                socketService.emit('do notification', notification)
            }
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