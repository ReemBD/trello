import React, { Component } from 'react'
import { Board } from './Board'
import { BoardPreview } from './BoardPreview'

export class BoardList extends Component {
    render() {
        const { boards, onRemove, onEdit, onToggleCompose } = this.props
        return (
            <div className="board-box">
                {boards.map(board => <BoardPreview key={board._id} onRemove={onRemove} board={board} onEdit={onEdit} />)}
                <div className="board-card flex flex justify-center align-center add-board" onClick={onToggleCompose}>Create a new board</div>
            </div>
        )
    }
}
