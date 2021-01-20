import React, { Component } from 'react'
import {PopoverHeader} from './PopoverHeader'
export class ActivityMenu extends Component {
    render() {
        const {setCurrPopover} = this.props;
        return (
            <div className="activity-menu">
              <PopoverHeader title='Activities' setCurrPopover={setCurrPopover}/>
              
            </div>
        )
    }
}
