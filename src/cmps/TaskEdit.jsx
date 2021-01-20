import React, { Component } from 'react'
import { boardService } from '../services/boardService'
import { LabelsPopover } from './LabelsPopover'
import { ChangeMembersPopover } from '../cmps/ChangeMembersPopover'
import { QuickEditButton } from './QuickEditButton'
import LabelIcon from '@material-ui/icons/LabelOutlined';
import ChangeMembersIcon from '@material-ui/icons/PeopleOutline';
import RemoveIcon from '@material-ui/icons/DeleteOutline';
import ChangeDueDateIcon from '@material-ui/icons/QueryBuilder';
import { DateTimePopover } from './DateTimePopover'
import { parseISO } from 'date-fns'
import { getTime } from 'date-fns'


export class TaskEdit extends Component {

    state = {
        board: null,
        popovers: [
            {
                title: 'Edit Labels',
                Component: LabelsPopover,
                Icon: LabelIcon
            },
            {
                title: 'Change Members',
                Component: ChangeMembersPopover,
                Icon: ChangeMembersIcon
            },
            { title: 'Move' },
            { title: 'Copy' },
            {
                title: 'Change Due Date',
                Component: DateTimePopover,
                Icon: ChangeDueDateIcon,
                classNames: 'quick-edit-datepicker'
            },
        ],
        dueDate: {
            timestamp: '',
            isDone: false
        }
    }

    dueDateHandlers = {
        onDateChange: (ev) => {
            let parsedString = parseISO(ev.target.value)
            let timestamp = getTime(parsedString)
            const dueDate = {
                timestamp,
                isDone: false
            }
            this.setState({ dueDate })
        },
        onSaveDate: () => {
            const { board, list, task, updateBoard } = this.props
            const { listIdx, taskIdx } = boardService.getListAndTaskIdxById(board, list.id, task.id)
            const copyBoard = { ...board }
            copyBoard.lists[listIdx].tasks[taskIdx].dueDate = this.state.dueDate
            updateBoard(copyBoard)
            this.props.setCurrPopover()
        }
    }

    onRemoveTask = ev => {
        ev.stopPropagation()
        const { task, list, board } = this.props
        const { listIdx, taskIdx } = boardService.getListAndTaskIdxById(board, list.id, task.id)
        const boardCopy = { ...this.props.board }
        boardCopy.lists[listIdx].tasks.splice(taskIdx, 1)
        this.props.updateBoard(boardCopy)
    }

    getQEBProps(title, Component, Icon, classNames = '', key = title) {
        return {
            title,
            Component,
            Icon,
            classNames,
            key,
        }
    }
    render() {
        const { task, list } = this.props
        const { popovers } = this.state

        return (
            <div className="quick-task-editor-buttons">
                {popovers.map(popover => {
                    return <QuickEditButton {...this.dueDateHandlers} {...this.props} {...this.getQEBProps(popover.title, popover.Component, popover.Icon, popover.classNames)} />
                })}
                <a className="quick-task-editor-buttons-item js-edit-labels" href="#" onClick={this.onRemoveTask}>
                    <span className="icon-sm icon-label light"></span>
                    <span className="quick-task-editor-buttons-item-text flex align-center"><RemoveIcon className="quick-task-editor-buttons-item-icon" />Remove</span>
                </a>
            </div>

        )
    }
}


// const mapStateToProps = state => {
//     return {
//         board: state.boardReducer.currBoard
//     }
// }

// const mapDispatchToProps = {
//     updateBoard
// }

// export const TaskEdit = connect(mapStateToProps, mapDispatchToProps)(_TaskEdit)