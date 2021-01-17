import React, { Component } from 'react'
import CloseIcon from '@material-ui/icons/Close';

export function ListActions({ onToggleComposer, onRemoveList, setCurrPopover }) {
    return (
        <div className="list-actions-popover" onClick={(ev) => ev.stopPropagation()}>
            <div className="popover-header flex align-center justify-center">
                <span className="popover-header-title">List Actions</span>
                <CloseIcon className="popover-header-close-btn" onClick={() => { setCurrPopover() }} />
            </div>
            <section className="popover-section">
                <ul className="popover-section-list clear-list">
                    <li className="add-task popover-section-list-item" onClick={(ev) => {
                        setCurrPopover()
                        onToggleComposer(ev)
                    }}>Add task...</li>
                    <li className="remove-list popover-section-list-item" onClick={(ev) => {
                        setCurrPopover()
                        onRemoveList(ev)
                    }}>Remove list...</li>
                </ul>
            </section>
        </div>
    )
}