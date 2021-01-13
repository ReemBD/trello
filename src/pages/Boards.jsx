import React, { Component } from 'react'
import { boardService } from '../services/boardService.js'
import { BoardList } from '../cmps/BoardList'
export class Boards extends Component {

    state = {
        boards: []
    }

    componentDidMount() {
        this.loadBoards()
    }

    loadBoards = async () => {
        const boards = await boardService.query()
        this.setState({ boards })
    }

    render() {
        const { boards } = this.state
        if (!boards) return <h1>loading...</h1>
        return (
            <div>
                <BoardList boards={boards} />
            </div>
        )
    }
}
