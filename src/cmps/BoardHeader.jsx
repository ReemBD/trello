import React, { Component, Fragment } from 'react'
import { BoardFilter } from './BoardFilter'
import NotificationsIcon from '@material-ui/icons/NotificationsNone';
import { socketService } from '../services/socketService'
import { NotificationPopover } from './NotificationPopover'
export class BoardHeader extends Component {

    state = {
        currBadgeCount: 0
    }

    componentDidMount() {
        const { boardId } = this.props.match.params
        socketService.on('do notification fs', this.incNotificationBadge)
    }

    componentWillUnmount() {
        socketService.off('do notification fs', this.incNotifcationBadge)
    }

    incNotificationBadge = (notification) => {
        this.setState({ currBadgeCount: this.state.currBadgeCount + 1 }, () => {
            console.log('notification:', notification);
        })
    }
    render() {
        const { board, setCurrPopover, currPopover } = this.props
        const { members } = board
        const { currBadgeCount } = this.state
        const isCurrPopover = currPopover === 'NOTIFICATION_POPOVER'
        return (
            <>
                <header className="board-header board-layout flex">
                    <div className="board-title">{board.title}</div>
                    <div className="members-nav-display flex">
                        {members.map(member => { return <div key={member._id} className="board-member-img-wrapper"><img alt={member.fullname} title={member.fullname} className="board-member-img" src={member.imgUrl} /></div> })}
                    </div>
                    <ul className="board-nav clear-list flex">
                        <li><BoardFilter /></li>
                        <li className={`notification-icon-container ${currBadgeCount && 'unread'}`}>
                            <NotificationsIcon onClick={ev => {
                                ev.stopPropagation()
                                setCurrPopover('NOTIFICATION_POPOVER')
                            }} />
                        </li>
                    </ul>
                </header>
                {isCurrPopover && <NotificationPopover {...this.props} />}
            </>
        )
    }
}
