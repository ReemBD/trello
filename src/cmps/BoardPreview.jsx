import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import DeleteIcon from '@material-ui/icons/Delete';

export class BoardPreview extends Component {
    render() {
        const { board, onRemove } = this.props
        return (
            <div className="board-card flex flex justify-center align-center">
                <Link to={`/board/${board._id}`}><h1>{board.title}</h1></Link>

                <button className="icon-btn" onClick={() => onRemove(board._id)}><DeleteIcon style={{ color: '#fff' }} /> </button>

            </div>
        )
    }
}
