import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { toggleTask, setCurrListAndTaskIdx, toggleOverlay } from '../store/actions/boardActions'
import { TaskDetails } from './TaskDetails'
import { connect } from 'react-redux'
import { boardService } from '../services/boardService'
import { utilService } from '../services/utilService'
import EditIcon from '@material-ui/icons/Edit';
import NotesOutlinedIcon from '@material-ui/icons/NotesOutlined';
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
        const { taskIdx, listIdx } = boardService.getListAndTaskIdxById(board, list.id, task.id)
        await this.props.setCurrListAndTaskIdx(listIdx, taskIdx)
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
        this.setState({ isEditOpen: !this.state.isEditOpen })
    }

    render() {
        const { task, list } = this.props
        const { isEditOpen, isTaskHovered } = this.state
        return (
            <div {...this.taskPreviewHandlers} className="task-preview" onClick={this.onOpenDetails}>
                {task.labels?.length && <div className="top-line-preview-container flex">
                    <div className="labels-container flex">
                        {task.labels.map(label => { return <div style={{ backgroundColor: label.color }} key={label.id} className="task-label" title={label.title}></div> })}

                    </div>
                    <div className="quick-edit-wrapper">
                        {(isTaskHovered || isEditOpen) && <EditIcon className="edit-icon" onClick={this.onToggleEdit} />}
                        {isEditOpen && <TaskEdit task={task} list={list} />}
                    </div>
                </div>}
                <div className="task-title-wrapper flex space-between ">
                    <h3 className="task-title" style={{ color: list.style.title.bgColor }}>{task.title}</h3>
                    {!task.labels?.length && <div className="quick-edit-wrapper">
                        {(isTaskHovered || isEditOpen) && <EditIcon className="edit-icon" onClick={this.onToggleEdit} />}
                        {isEditOpen && <TaskEdit task={task} list={list} />}
                    </div>}
                </div>
                <div className="task-preview-icons-container flex ">
                    {task.description && <NotesOutlinedIcon className="description-indication-icon" />}
                    {task.members?.length ?
                        <div className="task-members-imgs flex">
                            {task.members.map(member => { return <div key={member._id} className="task-member-img-wrapper"><img className="task-member-preview-img" src={member.imgUrl} /></div> })}
                        </div>
                        : ''}
                </div>
            </div >
        )
    }
}


const mapDispatchToProps = {
    toggleTask,
    setCurrListAndTaskIdx,
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