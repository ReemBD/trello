import { httpService } from './httpService'
import { utilService } from './utilService'


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
        board = _fillDefaultContent(board)
        console.log('board', board);
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

// just temporerly just until we create the backend ...
function _fillDefaultContent(board) {

    return {
        ...board,
        createdAt: Date.now(),
        lists: [
            {
                id: utilService.makeId(),
                title: 'To Do',
                tasks: [
                    {
                        id: utilService.makeId(),
                        title: 'how easy to create tasks!'
                    },
                    {
                        id: utilService.makeId(),
                        title: 'invite your team!'
                    }
                ]
            },
            {
                id: utilService.makeId(),
                title: 'Doing',
                tasks: [
                    {
                        id: utilService.makeId(),
                        title: 'make dinner'
                    },
                    {
                        id: utilService.makeId(),
                        title: 'buy groceries',
                        todos: [
                            {
                                title: 'Milk',
                                isDone: false,
                                id: utilService.makeId()
                            },
                            {
                                title: 'Bread',
                                isDone: false,
                                id: utilService.makeId()
                            },
                            {
                                title: 'Chocolate',
                                isDone: false,
                                id: utilService.makeId()
                            }
                        ]
                    }
                ]
            }
        ]
    }
}
