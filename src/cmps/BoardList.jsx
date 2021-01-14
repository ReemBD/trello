import React, { Component } from 'react'
import { Board } from './Board'
import { BoardPreview } from './BoardPreview'

export class BoardList extends Component {
    render() {
        const { boards, onRemove } = this.props
        return (
            <div className="board-box">
                {boards.map(board => <BoardPreview key={board._id} onRemove={onRemove} board={board} />)}

            </div>
        )
    }
}
