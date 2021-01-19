import React, { Component } from 'react'
import { BoardFilter } from './BoardFilter'
import NotificationsIcon from '@material-ui/icons/NotificationsNone';
import { socketService } from '../services/socketService'

export class BoardHeader extends Component {

    state = {
        currBadgeCount: 0
    }

    componentDidMount() {
        const { boardId } = this.props.match.params
        socketService.setup()
        socketService.emit('member connection', { boardId, username: 'ReemBD' })
        socketService.on('member connected', this.incNotificationBadge)
    }

    componentWillUnmount() {
        socketService.off('member connected', this.incNotifcationBadge)
        socketService.terminate()
    }

    incNotificationBadge = ({ boardId, username }) => {
        console.log('incremented ')
        console.log(username + ' connected to: ', boardId);
        console.log('this.state: ', this.state.currBadgeCount);
        this.setState({ currBadgeCount: this.state.currBadgeCount + 1 }, () => {
            console.log('afte inc:', this.state.currBadgeCount);
        })
    }
    render() {
        const { board } = this.props
        const { members } = board
        const { currBadgeCount } = this.state
        return (
            <header className="board-header board-layout flex">
                <div className="board-title">{board.title}</div>
                <div className="members-nav-display flex">
                    {members.map(member => { return <div className="board-member-img-wrapper"><img alt={member.fullname} title={member.fullname} className="board-member-img" src={member.imgUrl} /></div> })}
                </div>
                <ul className="board-nav clear-list flex">
                    <li><BoardFilter /></li>
                    <li className={`notification-icon-container ${this.state.currBadgeCount && 'unread'}`}>
                        <NotificationsIcon />
                    </li>
                </ul>
            </header>
        )
    }
}
