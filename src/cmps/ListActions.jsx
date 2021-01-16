import React, { Component } from 'react'
import CloseIcon from '@material-ui/icons/Close';

export class ListActions extends Component {
    render() {
        const { onToggleComposer, onRemoveList } = this.props

        return (
            <div className="list-actions-popover">
                <div className="popover-header flex align-center justify-center">
                    <span className="popover-header-title">List Actions</span>
                    <CloseIcon className="popover-header-close-btn" />
                </div>
                <section className="popover-section">
                <ul className="popover-section-list clear-list">
                    <li className="add-task popover-section-list-item" onClick={onToggleComposer}>Add task...</li>
                    <li className="remove-list popover-section-list-item" onClick={onRemoveList}>Remove list...</li>
                </ul>
                </section>
            </div>
        )
    }
}
