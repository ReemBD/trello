import React, { Component } from 'react'
import LabelOutlinedIcon from '@material-ui/icons/LabelOutlined'
import ChangeMembersIcon from '@material-ui/icons/PeopleOutline'
import QueryBuilderOutlinedIcon from '@material-ui/icons/QueryBuilderOutlined'
import CheckBoxOutlinedIcon from '@material-ui/icons/CheckBoxOutlined';
import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined'
import ArrowRightAltOutlinedIcon from '@material-ui/icons/ArrowRightAltOutlined'
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined'
import { ChangeMembersPopover } from './ChangeMembersPopover'
import { LabelsPopover } from './LabelsPopover'
import { cloneDeep } from 'lodash'
import { utilService } from '../services/utilService'

export class TaskSidebar extends Component {


    onAddNewList = async () => {
        const { board, currListIdx, currTaskIdx, updateBoard } = this.props
        const copyBoard = cloneDeep(board)
        const newChecklist = {
            "id": utilService.makeId(),
            "title": "Checklist",
            "todos": []
        }
        if (!copyBoard.lists[currListIdx].tasks[currTaskIdx].checklists) {
            copyBoard.lists[currListIdx].tasks[currTaskIdx].checklists = []
        }
        copyBoard.lists[currListIdx].tasks[currTaskIdx].checklists.push(newChecklist)
        await updateBoard(copyBoard)
    }

    onRemoveTask = async () => {
        const { board, currListIdx, currTaskIdx, updateBoard } = this.props
        const copyBoard = cloneDeep(board)
        copyBoard.lists[currListIdx].tasks.splice(currTaskIdx, 1)
        updateBoard(copyBoard)
        this.props.history.push(`/board/${board._id}`)
    }

    render() {
        const { currPopover, togglePopover } = this.props
        return (
            <aside className="sidebar flex column">
                <h3 className="sidebar-heading">Actions</h3>
                <div className="sidebar-actions flex column">
                    <div className="action-container flex align-center" onClick={() => togglePopover('labels')} >
                        <span className="action-icon"><LabelOutlinedIcon /></span>
                        <span className="action-txt">Labels</span>
                        {currPopover === 'labels' && <LabelsPopover setCurrPopover={() => togglePopover('')} {...this.props} />}

                    </div>
                    <div className="action-container flex align-center" onClick={() => togglePopover('members')}>
                        <span className="action-icon"><ChangeMembersIcon /></span>
                        <span className="action-txt">Members</span>
                        {currPopover === 'members' && <ChangeMembersPopover setCurrPopover={() => togglePopover('')} {...this.props} />}
                    </div>
                    <div className="action-container flex align-center">
                        <span className="action-icon"><QueryBuilderOutlinedIcon /></span>
                        <span className="action-txt">Due Date</span>
                    </div>
                    <div className="action-container flex align-center" onClick={this.onAddNewList}>
                        <span className="action-icon"><CheckBoxOutlinedIcon /></span>
                        <span className="action-txt">Checklist</span>
                    </div>
                    <div className="action-container flex align-center">
                        <span className="action-icon"><ImageOutlinedIcon /></span>
                        <span className="action-txt">Image</span>
                    </div>
                    <div className="action-container flex align-center">
                        <span className="action-icon"><ArrowRightAltOutlinedIcon /></span>
                        <span className="action-txt">Move</span>
                    </div>
                    <div className="action-container flex align-center" onClick={this.onRemoveTask}>
                        <span className="action-icon"><DeleteOutlineOutlinedIcon /></span>
                        <span className="action-txt">Delete</span>
                    </div>
                </div>
            </aside>
        )
    }
}
