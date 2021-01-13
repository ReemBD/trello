import { httpService } from './httpService'


export const boardService = {
    query,
    getById,
    save,
    remove
}

const endpoint = 'board'

async function query() {
    const boards = await httpService.get(endpoint)
    return boards
}

//UPDATES ENTIRE BOARD FOR ANY CHANGE INSIDE THE BOARD
async function save(board) {
    var savedBoard;

    if (!board._id) {
        savedBoard = await httpService.post(endpoint, board)
    } else {
        savedBoard = await httpService.put(`${endpoint}/${board._id}`, board)
    }

    return savedBoard
}

//ONLY FOR REMOVAL OF ENTIRE BOARD
async function remove(boardId) {
    await httpService.delete(`${endpoint}/${boardId}`)
}

async function getById(boardId) {
    const board = await httpService.get(`${endpoint}/${boardId}`)
    return board
}
