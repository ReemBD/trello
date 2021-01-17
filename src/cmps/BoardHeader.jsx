import React, { Component } from 'react'
import {BoardFilter} from './BoardFilter'
import NotificationsIcon from '@material-ui/icons/NotificationsNone';


export class BoardHeader extends Component {
    render() {
        return (
            <header className="board-header flex">
                <ul className="board-nav clear-list flex">
                    <li><BoardFilter/></li>
                    <li><NotificationsIcon/></li>
                </ul>
            </header>
        )
    }
}
