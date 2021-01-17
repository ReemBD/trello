import React, { Component, Fragment } from 'react'
import { boardService } from '../services/boardService'
import { TaskDetailsInfo } from './TaskDetailsInfo'
import { TaskDetailsChecklist } from './TaskDetailsChecklist'
import { cloneDeep } from 'lodash'
import { connect } from 'react-redux'
import { updateBoard, toggleTask, toggleOverlay } from '../store/actions/boardActions'
import { withRouter, Link } from 'react-router-dom'
import DvrOutlinedIcon from '@material-ui/icons/DvrOutlined';
import CloseIcon from '@material-ui/icons/Close';
export class _TaskDetails extends Component {
    state = {
        isDetailsOpen: false,
        board: {},
        list: {},
        task: {}

    }

    elTitleRef = React.createRef()

    componentDidMount() {
        const { listId, taskId } = this.props.match.params // Whenever someone opens task through URL
        const details = this.getDetails()
        if (details) {

            const { board, list, task } = details
            this.getCurrTask(board._id, taskId)
            this.setState({ board, list, task })
        }

    }

    componentDidUpdate() {
        const { listId, taskId } = this.props.match.params
        const details = this.getDetails()
        if (details) {

            const { board, list, task } = details
            if (taskId && listId && !this.state.isDetailsOpen) { // When task is clicked on board
                this.setState({ isDetailsOpen: true, board, list, task }, () => this.getCurrTask(board._id, taskId))
            }
            if (this.state.task.labels?.length !== details.task.labels?.length) {
                this.setState({ task: details.task })
            }
        }
    }

    // TRY TO REFACTOR
    getDetails = () => {
        const { listId, taskId } = this.props.match.params
        if (listId && taskId) {
            const { board, currListIdx, currTaskIdx } = { ...this.props }
            const list = board.lists[currListIdx]
            const task = list.tasks[currTaskIdx]
            return { board, list, task }
        }
    }

    handleTitle = ({ target }) => {
        const field = target.name
        const value = target.value
        console.log('value', value)
        const copyTask = cloneDeep(this.state.task)
        copyTask.title = value
        this.setState({ task: copyTask })
    }

    onEnterPress = ev => {
        if (ev.keyCode === 13 && ev.shiftKey === false) {
            ev.preventDefault()
            this.onSubmitForm(ev)
        }
    }

    onSubmitForm = async (ev) => {
        ev.preventDefault()
        const { board, list, task } = this.state
        if (!task.title) return
        const boardCopy = { ...this.state.board }
        const currListIdx = boardService.getListIdxById(board, list.id)
        const taskIdx = boardCopy.lists[currListIdx].tasks.findIndex(currTask => currTask.id === task.id)
        boardCopy.lists[currListIdx].tasks[taskIdx] = task
        await this.props.updateBoard(boardCopy)
        this.elTitleRef.current.blur()
    }

    getCurrTask = async (boardId, taskId) => {
        const task = await boardService.getTaskById(boardId, taskId)
        this.setState({ task })
    }

    onCloseModal = (ev) => {
        ev.preventDefault()
        ev.stopPropagation()
        const { board } = this.state
        this.setState({ isDetailsOpen: false }, async () => {
            await this.props.toggleOverlay()
            await this.props.toggleTask()
            this.props.history.push(`/board/${board._id}`)
        })
    }


    render() {
        const { isDetailsOpen } = this.state
        const { board, list, task } = this.state

        if (!task) return <div>Loading details...</div>
        return (
            <section className="task-details">
                {this.state.isDetailsOpen &&
                    <div className={`${this.props.isOverlayOpen && "main-overlay"} ${!isDetailsOpen && "hidden"}`}>
                        <div className="details-modal flex">
                            <div className="main-details flex column">

                                <div className="details-header flex column">
                                    <form>
                                        <DvrOutlinedIcon style={{ position: 'absolute', left: '-30px', top: '3px' }} />
                                        <textarea onKeyDown={this.onEnterPress} ref={this.elTitleRef} className="task-textarea" style={{ fontSize: '24px' }}
                                            name="title"
                                            onChange={this.handleTitle}
                                            value={task.title}
                                            spellCheck="false"
                                        />
                                    </form>
                                    <p>in list <span className="details-list-name">{list?.title}</span></p>
                                </div>
                                <div className="details-info">
                                    <TaskDetailsInfo board={board} list={list} task={task} />
                                </div>
                                <div className="details-checklist">
                                    <TaskDetailsChecklist board={board} list={list} task={task} />
                                </div>
                            </div>
                            <div className="details-buttons">
                                <div className="task-details-close-btn small-btn-bgc flex align-center justify-center">
                                    <CloseIcon onClick={this.onCloseModal} />
                                </div>

                            </div>
                        </div>
                    </div>
                }
            </section>
        )
    }
}

const mapDispatchToProps = {
    updateBoard,
    toggleTask,
    toggleOverlay
}

const mapStateToProps = state => {
    return {
        isTaskOpen: state.boardReducer.isTaskOpen,
        board: state.boardReducer.currBoard,
        currListIdx: state.boardReducer.currListIdx,
        currTaskIdx: state.boardReducer.currTaskIdx,
        isOverlayOpen: state.boardReducer.isOverlayOpen
    }
}

export const TaskDetails = connect(mapStateToProps, mapDispatchToProps)(withRouter(_TaskDetails))