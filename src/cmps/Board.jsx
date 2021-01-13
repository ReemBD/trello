import React, { Component } from 'react'
import { TaskList } from './TaskList'

export class Board extends Component {


    render() {
        const { board } = this.props
        const { lists } = board

        return (
            <div className="">
                <h1>this is board {board._id}</h1>
                {lists.map(list => <TaskList key={list.id} list={list}/>)}
            </div>
        )
    }
}
