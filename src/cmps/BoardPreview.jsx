import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { BoardActions } from './BoardActions'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';


export class BoardPreview extends Component {

    state = {
        isBoardActionsOpen: false
    }
    toggleBoardActions = (toggle = !this.state.isBoardActionsOpen) => {
        this.setState({ isBoardActionsOpen: toggle })
    }

    render() {
        const { board, onRemove, onEdit } = this.props
        return (
            <div className={`board-card flex flex justify-center align-center ${this.state.isBoardActionsOpen && 'board-actions-open'}`} style={{ backgroundImage: board.style.bg }} >
                <Link to={`/board/${board._id}`}><h1>{board.title}</h1></Link>
                <div className="card-overlay"></div>
                <div className="board-actions-popover-wrapper">
                    {<MoreHorizIcon className={`toggle-actions-icon`} onClick={this.toggleBoardActions} />}
                    {this.state.isBoardActionsOpen &&
                        <BoardActions
                            board={board}
                            onRemoveBoard={onRemove}
                            onEditBoard={onEdit}
                            {...this.props}
                            toggleBoardActions={this.toggleBoardActions} />}
                </div>
                <button className="icon-btn" onClick={() => onRemove(board._id)}><DeleteIcon className="icon" /> </button>
                <button className="icon-btn edit" onClick={() => onEdit(board)}><EditIcon className="icon" /> </button>
            </div>
        )
    }
}
