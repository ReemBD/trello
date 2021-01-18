import React, { Component, Fragment } from 'react'
import { boardService } from '../services/boardService'
import { toggleTask, setCurrListAndTaskIdx } from '../store/actions/boardActions'
import {connect} from 'react-redux'
import {withRouter} from'react-router-dom'
import EditIcon from '@material-ui/icons/Edit';
import CheckIcon from '@material-ui/icons/CheckBoxOutlined';
import DueDateIcon from '@material-ui/icons/QueryBuilderOutlined';
import NotesOutlinedIcon from '@material-ui/icons/NotesOutlined';
import { TaskEdit } from './TaskEdit'
import CommentIcon from '@material-ui/icons/TextsmsOutlined';
import {format} from 'date-fns'

export class _TaskPreview extends Component {

    state = {
        isTaskHovered: false,
        isEditOpen: false
    }

    onOpenDetails = async (ev) => {
        ev.stopPropagation()
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

    get taskTodosLength() {
        const { task } = this.props
        const totalLen = task.checklists.reduce((acc, checklist) => { return acc + checklist.todos.length }, 0)
        return totalLen
    }

    get taskDoneTodosLength() {
        const { task } = this.props
        var doneTodos = []
        task.checklists.forEach(checklist => {
            const checklistDoneTodos = checklist.todos.filter(todo => todo.isDone)
            doneTodos = [...doneTodos, ...checklistDoneTodos]
        })
        return doneTodos.length
    }

    render() {
        const { task, list } = this.props
        const { isEditOpen, isTaskHovered } = this.state
        return (
            <Fragment>
                <div className={`${isEditOpen && 'main-overlay'}`} onClick={this.onToggleEdit}></div>
                <div {...this.taskPreviewHandlers} className="task-preview" onClick={this.onOpenDetails}>
                    {task.labels?.length && <div className="top-line-preview-container flex">
                        <div className="labels-container flex">
                            {task.labels.map(label => { return <div style={{ backgroundColor: label.color }} key={label.id} className="task-label" title={label.title}></div> })}

                        </div>
                        <div className="quick-edit-wrapper">
                            {isTaskHovered && <EditIcon className="edit-icon" onClick={this.onToggleEdit} />}
                            {isEditOpen && <TaskEdit {...this.props} task={task} list={list} onToggleEdit={this.onToggleEdit} />}
                        </div>
                    </div>}
                    <div className="task-title-wrapper flex space-between ">
                        <h3 className="task-title" style={{ color: list.style.title.bgColor }}>{task.title}</h3>
                        {!task.labels?.length && <div className="quick-edit-wrapper">
                            {(isTaskHovered || isEditOpen) && <EditIcon className="edit-icon" onClick={this.onToggleEdit} />}
                            {isEditOpen && <TaskEdit {...this.props} task={task} list={list} onToggleEdit={this.onToggleEdit} />}
                        </div>}
                    </div>
                    <div className="task-preview-icons-container indication-icon flex ">
                        <div className="task-preview-indication-icons flex start">
                        {task.description && <NotesOutlinedIcon className="description-indication-icon indication-icon" />}
                        {task.checklists?.length ? <div className="flex align-center"><CheckIcon className="indication-icon" />{this.taskDoneTodosLength}/{this.taskTodosLength}</div> : ''}
                        {task.dueDate ? <div className="flex align-center"><DueDateIcon className="indication-icon" /><div>{format(new Date(task.dueDate), 'LLL')} {format(new Date(task.dueDate), 'd')}</div></div> : ''}
                        {task.comments && <CommentIcon className="comment-indication-icon indication-icon"/>}
                        </div>
                        {task.members?.length ?
                            <div className="task-members-imgs flex">
                                {task.members.map(member => { return <div key={member._id} className="task-member-img-wrapper"><img className="task-member-preview-img" src={member.imgUrl} /></div> })}
                            </div>
                            : ''}

                    </div>
                </div >
            </Fragment>
        )
    }
}


const mapDispatchToProps = {
    toggleTask,
    setCurrListAndTaskIdx,
}

const mapStateToProps = state => {
    return {
        isTaskOpen: state.boardReducer.isTaskOpen,
        isOverlayOpen: state.boardReducer.isOverlayOpen
    }
}

export const TaskPreview = connect(mapStateToProps, mapDispatchToProps)(withRouter(_TaskPreview))