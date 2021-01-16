import React, { Component, Fragment } from 'react'
import { boardService } from '../services/boardService.js'
import { BoardList } from '../cmps/BoardList'
import { BoardComposer } from '../cmps/BoardComposer.jsx'

export class Boards extends Component {

    state = {
        boards: [],
        isComposerOpen: false,
        boardToEdit: null
    }

    componentDidMount() {
        this.loadBoards()
    }

    loadBoards = async () => {
        const boards = await boardService.query()
        this.setState({ boards })
    }


    onRemove = async (boardId) => {
        await boardService.remove(boardId)
        let boards = this.state.boards
        const newBoards = boards.filter(currBoard => currBoard._id !== boardId)
        console.log('boards:', boards);
        this.setState({ boards: newBoards })
    }

    onToggleCompose = () => {
        const lastState = this.state.isComposerOpen
        this.setState({ isComposerOpen: !lastState })//opens the add board form
    }

    editBoard = (board) => {
        this.setState({ isComposerOpen: true, boardToEdit: board })
    }

    render() {

        const { boards, isComposerOpen, boardToEdit } = this.state
        if (!boards) return <h1>loading...</h1>
        return (
            <Fragment>

                <div className="glass-screen "></div>
                <div className="boards-bg "></div>
                <div className="main-layout flex column align-center">

                    <div className="boards-hero flex justify-center align-center">


                        <button className="btn-board" onClick={this.onToggleCompose}>Create a new board</button>
                    </div>



                    <BoardList boards={boards} onRemove={this.onRemove} onEdit={this.editBoard} />



                </div>
                <div onClick={this.onToggleCompose} className={`composer-screen flex justify-center align-center ${!isComposerOpen && 'transparent'}`}>
                    <BoardComposer board={boardToEdit} />

                </div>

            </Fragment>
        )
    }
}
