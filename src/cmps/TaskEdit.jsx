import React, { Component } from 'react'
import { boardService } from '../services/boardService'
import { LabelsPopover } from './LabelsPopover'
import { ChangeMembersPopover } from './ChangeMembersPopover'
import { CopyTaskPopover } from './CopyTaskPopover'
import { QuickEditButton } from './QuickEditButton'
import LabelIcon from '@material-ui/icons/LabelOutlined';
import ChangeMembersIcon from '@material-ui/icons/PeopleOutline';
import RemoveIcon from '@material-ui/icons/DeleteOutline';
import ChangeDueDateIcon from '@material-ui/icons/QueryBuilder';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined'
import { DateTimePopover } from './DateTimePopover'
import { MoveTaskPopover } from './MoveTaskPopover'
import { parseISO } from 'date-fns'
import { getTime } from 'date-fns'

/* FOR DEMO 3:
the TaskEdit component renders the quick edit buttons which on click, opens the respected popover.
as you can see, it is built in a way that assuming in the future a programmer would like to add a new component, 
all that is required is to add another object to the state.

*/

const popovers = [
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
    { title: 'Move', Icon: ArrowForwardIcon, Component: MoveTaskPopover },
    { title: 'Copy', Icon: FileCopyOutlinedIcon},
    {
        title: 'Change Due Date',
        Component: DateTimePopover,
        Icon: ChangeDueDateIcon,
        classNames: 'quick-edit-datepicker'
    },
]

export class TaskEdit extends Component {

    state = {
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
            if (!this.state.dueDate.timestamp) return
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

    render() {
        return (
            <div className="quick-task-editor-buttons">
                {popovers.map(popover => {
                    return <QuickEditButton
                        {...this.dueDateHandlers}
                        {...this.props}
                        {...popover} />
                })}
                <a className="quick-task-editor-buttons-item js-edit-labels" href="#" onClick={this.onRemoveTask}>
                    <span className="icon-sm icon-label light"></span>
                    <span className="quick-task-editor-buttons-item-text flex align-center">
                        <RemoveIcon className="quick-task-editor-buttons-item-icon" />Remove</span>
                </a>
            </div>

        )
    }
}
