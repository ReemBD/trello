import React, { Component } from 'react'
import { boardService } from '../services/boardService.js'
import { BoardList } from '../cmps/BoardList'
export class Boards extends Component {

    state = {
        boards: [],
        isComposerOpen: false,
        newBoard: {
            title: '',
            members: [],
            bg: ''
        }
    }

    componentDidMount() {
        this.loadBoards()
    }

    loadBoards = async () => {
        const boards = await boardService.query()
        this.setState({ boards })
    }

    onAddBoard = async () => {
        const { newBoard } = this.state
        const boardId = await boardService.save(newBoard)
        this.props.history.push(`/board/${boardId}`)
    }


    onOpenCompose = () => {
        this.setState({ isComposerOpen: true })
    }

    render() {
        const { boards, isComposerOpen } = this.state
        if (!boards) return <h1>loading...</h1>
        return (
            <main>

                <div className="Board-box">
                    <BoardList boards={boards} />
                </div>

                <div className="add-board" onClick={this.onOpenCompose}>
                    add a new board
                </div>

                <div className={`composer-screen ${!isComposerOpen && 'hidden'}`}>
                    <form className="board-composer" onClick={(ev) => ev.stopPropagation} onSubmit={this.onAddBoard} >
                        <input type="text" placeholder="Enter Board title here" />
                        <button>Create Board</button>
                    </form>

                </div>

            </main>
        )
    }
}
