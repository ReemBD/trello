import React, { Component } from 'react'
import { BoardFilter } from './BoardFilter'
import NotificationsIcon from '@material-ui/icons/NotificationsNone';


export class BoardHeader extends Component {
    render() {
        const { board } = this.props
        const { members } = board
        return (
            <header className="board-header board-layout flex">
                <div className="board-title">{board.title}</div>
                
                <div className="members-nav-display flex">
                    {members.map(member => { return <div className="board-member-img-wrapper"><img alt={member.fullname} title={member.fullname} className="board-member-img" src={member.imgUrl} /></div>  })}
                </div>
                <ul className="board-nav clear-list flex">
                    <li><BoardFilter /></li>
                    <li><NotificationsIcon /></li>
                </ul>
            </header>
        )
    }
}
