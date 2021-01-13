import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { toggleTask, setCurrList } from '../store/actions/boardActions'
import { TaskDetails } from '../cmps/TaskDetails'
import { connect } from 'react-redux'
import { boardService } from '../services/boardService'
import { utilService } from '../services/utilService'
export class _TaskPreview extends Component {

    state = {
    }

    onOpenDetails = async () => {
        const { task } = this.props
        const { currList, board } = this.props
        const listIdx = boardService.getListIdxById(board, currList.id)
        await this.props.setCurrList(listIdx)
        await this.props.toggleTask()
        this.props.history.push(`/board/${board._id}/${task.id}`)
    }
    render() {
        const { task } = this.props
        return (
            <div className="task-preview" onClick={this.onOpenDetails}>
                <h3 className="task-title">{task.title}</h3>
                <p className="task-description">{/* {task.description?.substring(0, 50) + '...'} */} Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deleniti, autem.</p>
                <h3 className="task-created-at">{utilService.formatTime(task.createdAt)}</h3>
            </div>
        )
    }
}


const mapDispatchToProps = {
    toggleTask,
    setCurrList
}

const mapStateToProps = state => {
    return {
        isTaskOpen: state.boardReducer.isTaskOpen,
        board: state.boardReducer.currBoard
    }
}

export const TaskPreview = connect(mapStateToProps, mapDispatchToProps)(withRouter(_TaskPreview))