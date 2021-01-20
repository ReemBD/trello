import React, { Component } from 'react'
import CloseIcon from '@material-ui/icons/Close'
import { boardService } from '../services/boardService'
import DoneIcon from '@material-ui/icons/Done'
import { socketService } from '../services/socketService'

export class ChangeMembersPopover extends Component {
    state = {
        currTask: {},
    }
    componentDidMount() {
    }

    componentWillUnmount() {
    }



    loadTaskMembers() {
        const { task } = this.props
        return task.members
    }

    onUpdateTaskMember = async (ev) => {
        ev.stopPropagation()
        const { id } = ev.target.dataset
        const { board } = { ...this.props }
        const { members } = board
        const member = members.find(member => member._id === id)
        this.isTaskMember(member._id) ? this.onRemoveTaskMember(member)
            : this.onAddTaskMember(member)

    }

    onAddTaskMember = async (member) => {
        const { board, updateBoard } = { ...this.props }
        const { listIdx, taskIdx } = this.listAndTaskIdx
        const currTask = board.lists[listIdx].tasks[taskIdx]
        const { _id, username, fullname, imgUrl } = member
        const miniMember = { _id, username, fullname, imgUrl }
        currTask.members ? currTask.members.push(miniMember) : currTask.members = [miniMember]
        this.setState({ currTask })
        await updateBoard(board)
        // socketService.emit('task updated', { taskId: currTask.id, activityTxt: `${miniMember.fullname} has joined this task.` })
        // socketService.emit('member joined task', currTask.id)
    }

    onRemoveTaskMember = async (member) => {
        const { board, updateBoard, task } = { ...this.props },
            { members } = task,
            memberIdx = members.findIndex(currMember => member._id === currMember._id)
        const { listIdx, taskIdx } = this.listAndTaskIdx
        const { fullname } = { ...members[memberIdx] }
        const currTask = board.lists[listIdx].tasks[taskIdx]
        currTask.members.splice(memberIdx, 1)
        this.setState({ currTask })
        await updateBoard(board)
        // socketService.emit('task updated', { taskId: currTask.id, activityTxt: `${fullname} has left this task.` })
        // socketService.emit('member left task', currTask.id)

    }

    isTaskMember(id) {
        const currTask = this.props.task
        const isTaskMember = currTask.members?.some(currMember => id === currMember._id)
        return isTaskMember
    }

    get listAndTaskIdx() {
        const { board, list, task } = this.props
        const { listIdx, taskIdx } = boardService.getListAndTaskIdxById(board, list.id, task.id)
        return { listIdx, taskIdx }
    }

    render() {
        const boardMembers = this.props.board.members
        return (
            <div className="change-members-popover " onClick={(ev) => { ev.stopPropagation() }}>
                <div className="popover-header flex align-center justify-center quick-edit-popover">
                    <span className="popover-header-title">Members</span>
                    <CloseIcon onClick={() => { this.props.setCurrPopover() }} className="popover-header-close-btn" />
                </div>
                <section className="popover-section">
                    <ul className="popover-section-list clear-list">
                        <h3 className="popover-section-header">Board members</h3>
                        {boardMembers.map(member => {
                            return <li key={member._id} data-id={member._id} onClick={this.onUpdateTaskMember} className={`popover-section-list-item flex align-center ${this.isTaskMember(member._id) && 'picked'}`}>
                                <div className="members-popover-img-wrapper">
                                    <img className="members-popover-member-img" src={member.imgUrl || ''} />
                                </div>
                                <span data-id={member._id}>{member.fullname}  ({member.username})</span>
                                {this.isTaskMember(member._id) && <DoneIcon className="picked-icon" />}
                            </li>
                        })}
                    </ul>
                </section>
            </div>
        )
    }
}

