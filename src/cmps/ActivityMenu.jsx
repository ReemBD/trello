import React, { Component } from 'react'
import BoardMemberImg from './BoardMemberImg';
import { PopoverHeader } from './PopoverHeader'
export class ActivityMenu extends Component {
    state = {
        activites: []
    }

    componentDidMount() {
    }

    render() {
        const { setCurrPopover } = this.props;
        const { board } = { ...this.props },
            { activities } = board
        const isCurrPopover = this.props.currPopover === 'ACTIVITY_MENU'
        return (
            <div className={`activity-menu ${isCurrPopover && 'open'}`}>
                <PopoverHeader title='Activities' setCurrPopover={setCurrPopover} />
                <section className="popover-section flex column">
                    <ul className="popover-section-list clear-list">
                        {activities.map(activity => {
                            return <li key={activity.id} className="popover-section-list-item">
                                <BoardMemberImg member={activity.byMember} />
                                <span className="activity-txt">{activity.txt}</span>
                            </li>
                        })}
                    </ul>
                </section>
            </div>
        )
    }
}
