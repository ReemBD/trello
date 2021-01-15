import React, { Component } from 'react'
import { boardService } from '../services/boardService.js'
import { BoardList } from '../cmps/BoardList'
import { BoardComposer } from '../cmps/BoardComposer.jsx'
export class Boards extends Component {

    state = {
        boards: [],
        isComposerOpen: false,

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


    render() {

        const { boards, isComposerOpen } = this.state
        if (!boards) return <h1>loading...</h1>
        return (
            <main className="boards-bg">
                <div className="glass-screen main-layout">

                    <div className="boards-hero flex justify-center align-center">

                        <h1>With Us You`ll Get Further And Faster. </h1>

                        <button className="btn-board" onClick={this.onToggleCompose}>Create a new board</button>
                    </div>



                    <BoardList boards={boards} onRemove={this.onRemove} />



                    <div onClick={this.onToggleCompose} className={`composer-screen flex justify-center align-center ${!isComposerOpen && 'transparent'}`}>
                        <BoardComposer />

                    </div>
                </div>
            </main>
        )
    }
}
