import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { BoardComposer } from './BoardComposer';


export class BoardPreview extends Component {


    render() {
        const { board, onRemove, onEdit } = this.props
        return (
            <div className="board-card flex flex justify-center align-center" style={{ background:board.style.bg }}>
                <Link to={`/board/${board._id}`}><h1>{board.title}</h1></Link>

                <button className="icon-btn" onClick={() => onRemove(board._id)}><DeleteIcon fontSize="medium" style={{ color: '#092f32' }} /> </button>
                <button className="icon-btn edit" onClick={() => onEdit(board)}><EditIcon fontSize="medium" style={{ color: '#092f32' }} /> </button>



            </div>
        )
    }
}
