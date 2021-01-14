import React, { Component } from 'react'
import { boardService } from '../services/boardService'
import { connect } from 'react-redux'
import { updateBoard } from '../store/actions/boardActions'
import { withRouter } from 'react-router-dom'

export class _TaskDetails extends Component {
    state = {
        isDetailsOpen: false,
        board: {},
        list: {},
        task: {}

    }

    componentDidMount() {
        const { taskId } = this.props.match.params // Whenever someone opens task through URL
        console.log('The task id is', taskId);
        this.getCurrTask(this.props.board._id, taskId)
        const { board } = this.props

        this.setState({ board })
    }

    componentDidUpdate() {
        const { taskId } = this.props.match.params
        const { board } = this.props
        const { currListIdx } = this.props
        const list = board.lists[currListIdx]
        console.log('the list is', list);
        if (taskId && !this.state.isDetailsOpen) { // When task is clicked on board
            this.setState({ isDetailsOpen: true, board, list }, () => this.getCurrTask(this.props.board._id, taskId))
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
        const { task } = this.state
        if (!task.title) return
        const boardCopy = { ...this.state.board }
        const { currListIdx } = this.props
        console.log(currListIdx); // If opened from a link, this is null
        console.log(boardCopy);
        const taskIdx = boardCopy.lists[currListIdx].tasks.findIndex(currTask => currTask.id === task.id)
        console.log('task idx is', taskIdx);
        boardCopy.lists[currListIdx].tasks[taskIdx] = task
        console.log(boardCopy);
        await this.props.updateBoard(boardCopy)
    }

    getCurrTask = async (boardId, taskId) => {
        const task = await boardService.getTaskById(boardId, taskId)
        console.log(task);
        this.setState({ task })
    }


    render() {
        const { isDetailsOpen, task, list } = this.state
        if (!task) return <div>Loading details...</div>
        return (
            <section className="task-details">
                <div className={`window-overlay ${!isDetailsOpen && "hidden"}`}>
                    <div className="details-modal">
                        <div className="details-header flex column justify-center">
                            <form>
                                <textarea onKeyDown={this.onEnterPress}
                                    value={task.title}
                                    name="title"
                                    onChange={this.handleInput}
                                    spellCheck="false"
                                />
                            </form>
                            <p>in list <span className="details-list-name">{list.title}</span></p>
                            <p>{task.description}</p>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

const mapDispatchToProps = {
    updateBoard,
}

const mapStateToProps = state => {
    return {
        isTaskOpen: state.boardReducer.isTaskOpen,
        board: state.boardReducer.currBoard,
        currListIdx: state.boardReducer.currListIdx
    }
}

export const TaskDetails = connect(mapStateToProps, mapDispatchToProps)(withRouter(_TaskDetails))