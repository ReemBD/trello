import React, { Component } from 'react'
import { boardService } from '../services/boardService.js'
import { BoardList } from '../cmps/BoardList'
import { ComposeBoard } from '../cmps/ComposeBoard.jsx'
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




    onToggleCompose = () => {
        const lastState = this.state.isComposerOpen
        this.setState({ isComposerOpen: !lastState })//opens the add board form
    }


    render() {

        const { boards, isComposerOpen } = this.state
        if (!boards) return <h1>loading...</h1>
        return (
            <main className="main-boards">
                <div className="boards-hero flex row">

                    <div className="main">
                        <h1>Start With Us And Move Faster.</h1>

                        <button className="CTA-btn" >login for the full effect</button>
                    </div>
                    <div>

                    </div>
                </div>

                <BoardList boards={boards} />


                <div className="add-board" onClick={this.onToggleCompose}>
                    add a new board
                </div>

                <div onClick={this.onToggleCompose} className={`composer-screen flex justify-center align-center ${!isComposerOpen && 'transparent'}`}>
                    <ComposeBoard />

                </div>

            </main>
        )
    }
}
