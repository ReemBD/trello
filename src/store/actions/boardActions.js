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