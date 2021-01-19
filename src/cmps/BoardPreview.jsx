import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';


export class BoardPreview extends Component {


    render() {
        const { board, onRemove, onEdit } = this.props
        return (
            <div className="board-card flex flex justify-center align-center" style={{ backgroundImage:board.style.bg }} >
                <Link to={`/board/${board._id}`}><h1>{board.title}</h1></Link>
                <div className="card-overlay"></div>
                <button className="icon-btn" onClick={() => onRemove(board._id)}><DeleteIcon  className="icon"/> </button>
                <button className="icon-btn edit" onClick={() => onEdit(board)}><EditIcon className="icon" /> </button>
            </div>
        )
    }
}
