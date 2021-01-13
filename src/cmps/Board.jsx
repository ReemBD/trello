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
            <ul className="lists-group flex">
                {lists.map(list => <li className="task-list flex column"><TaskList key={list.id} list={list} /></li>)}
            </ul>
        )
    }
}
