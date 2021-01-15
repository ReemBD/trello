import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { toggleTask, setCurrList, toggleOverlay } from '../store/actions/boardActions'
import { TaskDetails } from './TaskDetails'
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

    componentDidMount() {

    }

    onOpenDetails = async () => {
        const { task } = this.props
        const { list, board } = this.props
        const listIdx = boardService.getListIdxById(board, list.id)
        await this.props.setCurrList(listIdx)
        await this.props.toggleOverlay()
        await this.props.toggleTask()
        this.props.history.push(`/board/${board._id}/${list.id}/${task.id}`)
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
        // this.props.toggleOverlay()
        this.setState({ isEditOpen: !this.state.isEditOpen })
    }

    render() {
        const { task, list } = this.props
        const { isEditOpen, isTaskHovered } = this.state
        return (
            <div {...this.taskPreviewHandlers} className="task-preview" onClick={this.onOpenDetails}>
                {task.labels?.length && <div className="labels-container flex">
                    {task.labels.map(label => { return <div style={{ backgroundColor: label.color }} key={label.id} className="task-label" title={label.title}></div> })}
                </div>}
                <div className="task-title-wrapper flex"><h3 className="task-title" style={{ color: list.style.title.bgColor }}>{task.title}</h3>  <div className="quick-edit-wrapper">
                    {(isTaskHovered || isEditOpen) && <EditIcon className="edit-icon" onClick={this.onToggleEdit} />}
                    {isEditOpen && <TaskEdit task={task} list={list} />}
                </div>
                </div>
                <p className="task-description">{task.description || 'No description'}</p>
                <h3 className="task-created-at">{utilService.formatTime(task.createdAt)}</h3>
            </div >
        )
    }
}


const mapDispatchToProps = {
    toggleTask,
    setCurrList,
    toggleOverlay
}

const mapStateToProps = state => {
    return {
        isTaskOpen: state.boardReducer.isTaskOpen,
        board: state.boardReducer.currBoard,
        isOverlayOpen: state.boardReducer.isOverlayOpen
    }
}

export const TaskPreview = connect(mapStateToProps, mapDispatchToProps)(withRouter(_TaskPreview))