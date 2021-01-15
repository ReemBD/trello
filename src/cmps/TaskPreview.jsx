import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { toggleTask, setCurrList, toggleOverlay } from '../store/actions/boardActions'
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

    componentDidMount() {

    }

    onOpenDetails = async () => {
        const { task } = this.props
        const { currList, board } = this.props
        const listIdx = boardService.getListIdxById(board, currList.id)
        await this.props.setCurrList(listIdx)
        await this.props.toggleOverlay()
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
        // this.props.toggleOverlay()
        this.setState({ isEditOpen: !this.state.isEditOpen })
    }

    render() {
        const { task, currList } = this.props
        const { isEditOpen, isTaskHovered } = this.state
        return (
            <div {...this.taskPreviewHandlers} className="task-preview" onClick={this.onOpenDetails}>
                {task.labels?.length && <div className="labels-container flex">
                    {task.labels.map(label => {return <div style={{ backgroundColor: label.color }} key={label.id} className="task-label" title={label.title}></div> })}
                </div>}
                <h3 className="task-title flex">{task.title}  <div className="quick-edit-wrapper">
                    {(isTaskHovered || isEditOpen) && <EditIcon className="edit-icon" onClick={this.onToggleEdit} />}
                    {isEditOpen && <TaskEdit task={task} list={currList} />}
                </div>
                </h3>
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