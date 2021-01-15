import React, { Component } from 'react'

export class QuickEditButton extends Component {
    state = {
        isLabelsPopoverOpen: false
    }

    render() {
        const { task, list, title, Component, onSetCurrPopover, currOpenPopover } = this.props
        return (
            <a className="quick-task-editor-buttons-item js-edit-labels" href="#" onClick={ev=>{onSetCurrPopover(ev,title)}} data-for={'editLabels'}>
                <span className="icon-sm icon-label light"></span>
                <span className="quick-task-editor-buttons-item-text">{title}</span>
                {Component && (currOpenPopover === title) && <Component {...{ task, list, title, onSetCurrPopover }} />}
            </a>
        )
    }
}
