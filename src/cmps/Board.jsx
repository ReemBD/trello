import React, { Component } from 'react'
import { TaskList } from './TaskList'

export class Board extends Component {

    state = {
        board: null
    }

    componentDidMount() {
        const { board } = this.props
        this.setState({ board: { ...board } })
    }

    render() {
        const { board } = this.props
        console.log('board: ', board);
        const { lists } = board
        if (!board) return <h1>loading...</h1>
        return (
            <div className="board">
                <h1>this is board {board._id}</h1>
                {lists.map(list => <TaskList key={list.id} list={list} />)}
            </div>
        )
    }
}
