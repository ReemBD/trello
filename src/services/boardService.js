import { httpService } from './httpService'


export const boardService = {
    query,
    getById
}

const endpoint = 'board'

async function query() {
    const boards = await httpService.get(endpoint)
    return boards
}

async function save(board) {

}

async function getById(boardId) {
    const board = await httpService.get(`${endpoint}/${boardId}`)
    return board
}
