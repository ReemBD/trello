import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateBoard } from '../store/actions/boardActions'
import { boardService } from '../services/boardService'
import { LabelsPopover } from './LabelsPopover'
import { ChangeMembersPopover } from '../cmps/ChangeMembersPopover'
import { QuickEditButton } from './QuickEditButton'

export class _TaskEdit extends Component {

    state = {
        board: null,
        currOpenPopover: '',
        popovers: [
            { title: 'Edit Labels', Component: LabelsPopover },
            { title: 'Change Members', Component: ChangeMembersPopover },
            { title: 'Move' },
            { title: 'Copy' },
            { title: 'Change Due Date' },
        ]
    }


    onChooseEdit = (ev, name) => {
        ev.stopPropagation()

    }

    onRemoveTask = ev => {
        ev.stopPropagation()
        console.log('curOpenPopover: ', this.state.currOpenPopover);
        const { task, list, board } = this.props
        const taskIdx = boardService.getTaskIdxById(list, task.id)
        const listIdx = boardService.getListIdxById(board, list.id)
        const boardCopy = { ...this.props.board }
        boardCopy.lists[listIdx].tasks.splice(taskIdx, 1)
        this.props.updateBoard(boardCopy)
    }

    getQEBProps(task, list, title, Component, key = title, onSetCurrPopover = this.onSetCurrPopover, { currOpenPopover } = this.state) {
        return {
            task,
            list,
            title,
            Component,
            key,
            onSetCurrPopover,
            currOpenPopover,
        }
    }

    onSetCurrPopover = (ev, popover) => {
        ev.stopPropagation()
        const currOpenPopover = (popover === this.state.currOpenPopover) ? null : popover
        this.setState({ currOpenPopover })
    }

    render() {
        const { task, list } = this.props
        const { popovers } = this.state

        return (
            <div className="quick-task-editor-buttons">
                {popovers.map(popover => {
                    return <QuickEditButton {...this.getQEBProps(task, list, popover.title, popover.Component)} />
                })}
                <a className="quick-task-editor-buttons-item js-edit-labels" href="#" onClick={this.onRemoveTask}>
                    <span className="icon-sm icon-label light"></span>
                    <span className="quick-task-editor-buttons-item-text">Remove</span>
                </a>
            </div>

        )
    }
}


const mapStateToProps = state => {
    return {
        board: state.boardReducer.currBoard
    }
}

const mapDispatchToProps = {
    updateBoard
}

export const TaskEdit = connect(mapStateToProps, mapDispatchToProps)(_TaskEdit)