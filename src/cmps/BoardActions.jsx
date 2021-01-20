import { PopoverHeader } from './PopoverHeader'

export function BoardActions({board, onEditBoard, onRemoveBoard, toggleBoardActions }) {
    return (
        <div className="board-actions-popover" onClick={(ev) => ev.stopPropagation()}>
            <PopoverHeader title='Board Actions' setCurrPopover={(ev)=>{
                ev.stopPropagation()
                toggleBoardActions()}} />
            <section className="popover-section">
                <ul className="popover-section-list clear-list">
                    <li className="add-task popover-section-list-item" onClick={(ev) => {
                        toggleBoardActions()
                        onEditBoard(board)
                    }}>Edit board...</li>
                    <li className="remove-list popover-section-list-item" onClick={(ev) => {
                        toggleBoardActions()
                        onRemoveBoard(board._id)
                    }}>Remove board...</li>
                </ul>
            </section>
        </div>
    )
}