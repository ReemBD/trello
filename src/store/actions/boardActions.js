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

export function setCurrList(listIdx) {
    return async dispatch => {
        try {
            const action = {
                type: 'SET_CURR_LIST',
                listIdx
            }
            dispatch(action)
        }
        catch (err) {
            console.log('Borad actions, failed to get curr list', err);
        }
    }
}