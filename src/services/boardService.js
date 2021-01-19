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
    getLabelIdxById,
    getListAndTaskIdxById,
    getEmptyList
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




// REFACTOR TO SYNCHRONOUS
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

function getListAndTaskIdxById(board, listId, taskId) {
    const list = board.lists.find(list => list.id === listId)
    const listIdx = getListIdxById(board, listId)
    const taskIdx = getTaskIdxById(list, taskId)
    return { listIdx, taskIdx }
}

function getLabelById(task, id) {
    const label = task.labels.map(label => label.id === id)
}

function getLabelIdxById(task, labelId) {
    const labelIdx = task.labels.findIndex(label => label.id === labelId)
    return labelIdx
}

function getEmptyList() {
    return {
        id: 'k23eps34fc',
        title: '',
        tasks: [],
        style: {
            title: { bgColor: '#3cc2e0' }
        }
    }
}