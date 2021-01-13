import React, { Component } from 'react'
import { Board } from './Board'
import { BoardPreview } from './BoardPreview'

export class BoardList extends Component {
    render() {
        const { boards } = this.props
        return (
            <div>
                {boards.map(board => <BoardPreview key={board._id} board={board} />)}
                
            </div>
        )
    }
}
