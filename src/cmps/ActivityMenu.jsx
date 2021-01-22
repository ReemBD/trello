import React, { Component } from 'react'
import BoardMemberImg from './BoardMemberImg';
import { PopoverHeader } from './PopoverHeader'
import { utilService } from '../services/utilService'
import { boardService } from '../services/boardService';
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

export class ActivityMenu extends Component {
    state = {
        activites: []
    }

    componentDidMount() {
    }

    onOpenTask = (taskId) => {
        const list = boardService.getListByTaskId(this.props.board, taskId)
        this.props.history.push(`/board/${this.props.board._id}/${list.id}/${taskId}`)
    }
    render() {
        const { setCurrPopover } = this.props;
        const { board } = { ...this.props },
            { activities } = board
        const isCurrPopover = this.props.currPopover === 'ACTIVITY_MENU'
        return (
            <div className={`activity-menu ${isCurrPopover && 'open'}`} onClick={ev => { ev.stopPropagation() }}>
                <PopoverHeader title='Activities' setCurrPopover={setCurrPopover} />
                <section className="popover-section flex column">
                    <ul className="popover-section-list clear-list">
                        {activities.map(activity => {
                            return <li key={activity.id} className="popover-section-list-item">
                                <BoardMemberImg member={activity.byMember} />
                                <div className="activity-txt">
                                    <span className="activity-by">{activity.byMember.fullname} </span>
                                    <span className="txt">
                                        {activity.txt} {activity.task && <span className="task-title" onClick={() => { this.onOpenTask(activity.task.id) }}>{activity.task.title}</span>}</span>
                                    <div className="activity-at">
                                        {formatDistanceToNow(new Date(activity.createdAt), { addSuffix: true })}
                                    </div>
                                </div>
                            </li>
                        })}
                    </ul>
                </section>
            </div>
        )
    }
}
