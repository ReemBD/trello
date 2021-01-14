import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { toggleTask, setCurrList } from '../store/actions/boardActions'
import { TaskDetails } from '../cmps/TaskDetails'
import { connect } from 'react-redux'
import { boardService } from '../services/boardService'
import { utilService } from '../services/utilService'
import EditIcon from '@material-ui/icons/Edit';
import { TaskEdit } from './TaskEdit'

export class _TaskPreview extends Component {

    state = {
        isTaskHovered: false,
        isEditOpen: false
    }

    onOpenDetails = async () => {
        const { task } = this.props
        const { currList, board } = this.props
        const listIdx = boardService.getListIdxById(board, currList.id)
        await this.props.setCurrList(listIdx)
        await this.props.toggleTask()
        this.props.history.push(`/board/${board._id}/${currList.id}/${task.id}`)
    }

    taskPreviewHandlers = {
        onMouseEnter: () => {
            this.setState({ isTaskHovered: true })
        },
        onMouseLeave: () => {
            this.setState({ isTaskHovered: false })
        }
    }

    onToggleEdit = ev => {
        ev.stopPropagation()
        this.setState({ isEditOpen: !this.state.isEditOpen })
    }

    render() {
        const { task } = this.props
        const { isEditOpen, isTaskHovered } = this.state
        return (
            <div {...this.taskPreviewHandlers} className="task-preview" onClick={this.onOpenDetails}>
                <h3 className="task-title flex">{task.title}  <div className="quick-edit-wrapper">
                    {(isTaskHovered || isEditOpen) && <EditIcon className="edit-icon" onClick={this.onToggleEdit} />}
                    {isEditOpen && <TaskEdit />}
                </div>
                </h3>
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