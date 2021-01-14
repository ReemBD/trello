import { httpService } from './httpService'
import { utilService } from './utilService'


export const boardService = {
    query,
    getById,
    save,
    remove,
    getTaskById,
    getListIdxById,
    getTaskIdxById,
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
                style: {
                    title: {
                        bgColor: 'rgb(152 149 224)'
                    }
                },
                tasks: [
                    {
                        id: utilService.makeId(),
                        createdAt: Date.now(),
                        title: 'how easy to create tasks!'
                    },
                    {
                        id: utilService.makeId(),
                        createdAt: Date.now(),
                        title: 'invite your team!'
                    }
                ]
            },
            {
                id: utilService.makeId(),
                title: 'Doing',
                style: {
                    title: {
                        bgColor: 'rgb(152 149 224)'
                    }
                },
                tasks: [
                    {
                        id: utilService.makeId(),
                        createdAt: Date.now(),
                        title: 'make dinner'
                    },
                    {
                        id: utilService.makeId(),
                        createdAt: Date.now(),
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

async function removeTask() {

}

async function getTaskById(boardId, taskId) {
    const board = await getById(boardId)
    let tasks = board.lists.map(list => list.tasks)
    const taskIds = []
    tasks.forEach(task => {
        taskIds.push(...task)
    })
    const task = taskIds.find(task => task.id === taskId)
    return task
}

function getTaskIdxById(list, taskId) {
    const taskIdx = list.tasks.findIndex(task => task.id === taskId)
    return taskIdx
}

function getListIdxById(board, listId) {
    const listIdx = board.lists.findIndex(list => list.id === listId)
    return listIdx
}

function getLabelById(task, id) {
    const label = task.labels.map(label => label.id === id)
}