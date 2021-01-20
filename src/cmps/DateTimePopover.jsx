import React, { Component } from 'react'
import DateTime from './MUIDateTime'
import CloseIcon from '@material-ui/icons/Close';


export class DateTimePopover extends Component {


    render() {
        const {classNames} = this.props
        return (
            <div className={`due-date-popover quick-edit-popover ${classNames && classNames}`} onClick={(ev) => ev.stopPropagation()}>
                <div className="popover-header flex align-center justify-center">
                    <div className="popover-header-title flex justify-center">Due Date</div>
                    <CloseIcon onClick={() => this.props.setCurrPopover()} />
                </div>
                <div className="due-date-body flex   justify-center align-center">
                    <DateTime onChange={this.props.onDateChange} />
                    <button onClick={() => this.props.onSaveDate()} className="date-close-btn primary-btn">Save</button>
                </div>
            </div>
        )
    }
}

