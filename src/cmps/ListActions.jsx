import React from 'react'
import CloseIcon from '@material-ui/icons/Close';
import {PopoverHeader} from './PopoverHeader'
export function ListActions({ onToggleComposer, onRemoveList, setCurrPopover }) {
    return (
        <div className="list-actions-popover" onClick={(ev) => ev.stopPropagation()}>
            <PopoverHeader title='List Actions' setCurrPopover={setCurrPopover}/>
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