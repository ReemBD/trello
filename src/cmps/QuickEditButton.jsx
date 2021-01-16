import React, { Component } from 'react'

export class QuickEditButton extends Component {

    state = {
        isLabelsPopoverOpen: false
    }

    render() {
        const { task, list, title, Component, onSetCurrPopover, currOpenPopover, Icon } = this.props
        return (
            <a className="quick-task-editor-buttons-item js-edit-labels" href="#" onClick={ev => { onSetCurrPopover(ev, title) }} data-for={'editLabels'}>
                <span className="quick-task-editor-buttons-item-text flex align-center">{Icon && <Icon className="quick-task-editor-buttons-item-icon" />}{title}</span>
                { Component && (currOpenPopover === title) && <Component {...{ task, list, title, onSetCurrPopover }} />}
            </a >
        )
    }
}


