import React, { Component } from 'react'
import CloseIcon from '@material-ui/icons/Close';
import { connect } from 'react-redux'
import { updateBoard } from '../store/actions/boardActions'
import { boardService } from '../services/boardService';
import DoneIcon from '@material-ui/icons/Done';

export class _ChangeMembersPopover extends Component {
    state = {
        currTask: {}
    }

    componentDidMount() {
    }

    loadTaskMembers() {
        const { task } = this.props
        return task.members
    }

    onUpdateTaskMember = async (ev) => {
        ev.stopPropagation()
        const { id } = ev.target.dataset
        const { board } = { ...this.props }
        const { listIdx, taskIdx } = this.listAndTaskIdx
        const currTask = board.lists[listIdx].tasks[taskIdx]
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
    }

    onRemoveTaskMember = async (member) => {
        const { board, updateBoard, task } = { ...this.props },
            { members } = task,
            memberIdx = members.findIndex(currMember => member._id === currMember._id)
        const { listIdx, taskIdx } = this.listAndTaskIdx
        const currTask = board.lists[listIdx].tasks[taskIdx]
        currTask.members.splice(memberIdx, 1)
        this.setState({ currTask })
        await updateBoard(board)
    }

    isTaskMember(id) {
        const currTask  = this.props.task
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
                <div className="popover-header flex align-center justify-center">
                    <span className="popover-header-title">Members</span>
                    <CloseIcon className="popover-header-close-btn" />
                </div>
                <section className="popover-section">
                    <ul className="popover-section-list clear-list">
                        <h3 className="popover-section-header">Board members</h3>
                        {boardMembers.map(member => {
                            return <li key={member._id} data-id={member._id} onClick={this.onUpdateTaskMember} className={`popover-section-list-item flex align-center ${this.isTaskMember(member._id) && 'picked'}`}>
                                <img src={member.imgUrl || ''} style={{ width: '40px', borderRadius: '999px', marginInlineEnd: '5px' }} />
                                <span data-id={member._id}>{member.fullname}  ({member.username})</span>
                                {this.isTaskMember(member._id) && <DoneIcon />}
                            </li>
                        })}
                    </ul>
                </section>
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

export const ChangeMembersPopover = connect(mapStateToProps, mapDispatchToProps)(_ChangeMembersPopover)