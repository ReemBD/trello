import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { updateBoard } from '../store/actions/boardActions'
import { boardService } from '../services/boardService'
import { LabelsPopover } from '../cmps/LabelsPopover'

export class _TaskEdit extends Component {

    state = {
        board: null
    }


    onChooseEdit = (ev, name) => {
        ev.stopPropagation()
    }

    onRemoveTask = ev => {
        ev.stopPropagation()
        const { task, list, board } = this.props
        const taskIdx = boardService.getTaskIdxById(list, task.id)
        const listIdx = boardService.getListIdxById(board, list.id)
        const boardCopy = { ...this.state.board }
        boardCopy.lists[listIdx].tasks.splice(taskIdx, 1)
        this.props.updateBoard(boardCopy)
    }

    render() {
        const { task,list } = this.props
        return (
            //    <div className="quick-task-editor-buttons">
            //        <a className="quick-task-editor-buttons-item js-edit-labels" href="#" onClick={this.onChooseEdit}>
            //            <span className="icon-sm icon-label light"></span>
            //            <span className="quick-task-editor-buttons-item-text">Edit Labels</span>
            //        </a>
            //        <a className="quick-task-editor-buttons-item js-edit-labels" href="#" onClick={this.onChooseEdit}>
            //            <span className="icon-sm icon-label light"></span>
            //            <span className="quick-task-editor-buttons-item-text">Change Members</span>
            //        </a>
            //        <a className="quick-task-editor-buttons-item js-edit-labels" href="#" onClick={this.onChooseEdit}>
            //            <span className="icon-sm icon-label light"></span>
            //            <span className="quick-task-editor-buttons-item-text">Move</span>
            //        </a>
            //        <a className="quick-task-editor-buttons-item js-edit-labels" href="#" onClick={this.onChooseEdit}>
            //            <span className="icon-sm icon-label light"></span>
            //            <span className="quick-task-editor-buttons-item-text">Copy</span>
            //        </a>
            //        <a className="quick-task-editor-buttons-item js-edit-labels" href="#" onClick={this.onChooseEdit}>
            //            <span className="icon-sm icon-label light"></span>
            //            <span className="quick-task-editor-buttons-item-text" onClick={this.onChooseEdit}>Change due date</span>
            //        </a>
            //        <a className="quick-task-editor-buttons-item js-edit-labels" href="#" onClick={this.onRemoveTask}>
            //            <span className="icon-sm icon-label light"></span>
            //            <span className="quick-task-editor-buttons-item-text">Remove</span>
            //        </a>
            <LabelsPopover task={task} list={list} />
            // </div>
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