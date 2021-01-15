import React, { Component, Fragment } from 'react'
import { boardService } from '../services/boardService'
import { TaskDetailsInfo } from './TaskDetailsInfo'
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
            console.log('cdm the list is', list);
            this.getCurrTask(board._id, taskId)
            this.setState({ board, list, task })
        }

    }

    componentDidUpdate() {
        const { listId, taskId } = this.props.match.params
        const details = this.getDetails()
        if (details) {

            const { board, list, task } = details
            console.log('cdu the list is', list);
            if (taskId && listId && !this.state.isDetailsOpen) { // When task is clicked on board
                this.setState({ isDetailsOpen: true, board, list, task }, () => this.getCurrTask(board._id, taskId))
            }
        }
    }

    // TRY TO REFACTOR
    getDetails() {
        const { listId, taskId } = this.props.match.params
        if (listId && taskId) {
            const { board } = this.props
            const listIdx = boardService.getListIdxById(board, listId)
            const list = board.lists[listIdx]
            const taskIdx = boardService.getTaskIdxById(list, taskId)
            const task = list.tasks[taskIdx]
            return { board, list, task }
        }
    }

    handleInput = ({ target }) => {
        const field = target.name
        const value = target.value
        this.setState(prevState => {
            return {
                task: {
                    ...prevState.task,
                    [field]: value
                }
            }
        })
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
        console.log(currListIdx); // If opened from a link, this is null
        const taskIdx = boardCopy.lists[currListIdx].tasks.findIndex(currTask => currTask.id === task.id)
        boardCopy.lists[currListIdx].tasks[taskIdx] = task
        await this.props.updateBoard(boardCopy)
        this.elTitleRef.current.blur()
    }

    getCurrTask = async (boardId, taskId) => {
        const task = await boardService.getTaskById(boardId, taskId)
        console.log(task);
        this.setState({ task })
    }

    onCloseModal = (ev) => {
        ev.preventDefault()
        const { board } = this.state
        this.props.history.push(`/board/${board._id}`)
        this.setState({ isDetailsOpen: false }, () => {
            this.props.toggleOverlay()
            this.props.toggleTask()
        })
    }


    render() {
        const { isDetailsOpen, board, list, task } = this.state
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
                                            value={task.title}
                                            name="title"
                                            onChange={this.handleInput}
                                            spellCheck="false"
                                        />
                                    </form>
                                    <p>in list <span className="details-list-name">{list?.title}</span></p>
                                </div>
                                <div className="details-info">
                                    <TaskDetailsInfo board={board} list={list} task={task} />
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
        isOverlayOpen: state.boardReducer.isOverlayOpen
    }
}

export const TaskDetails = connect(mapStateToProps, mapDispatchToProps)(withRouter(_TaskDetails))