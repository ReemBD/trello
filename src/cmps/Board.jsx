import React, { Component } from 'react'
import { TaskList } from './TaskList'
import {boardService} from '../services/boardService'

export function Board({ board }) {
    const { lists } = board
    if (!board) return <h1>loading...</h1>
    return (
        <div className="board main-layout">
            <h1 className="board-title">{board.title}</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat adipisci cupiditate est provident voluptate aspernatur perferendis, natus illo nesciunt. Et?</p>
            <ul className="lists-group clear-list flex">

                {lists.map(list => <li key={list.id} className="task-list-container flex column"><TaskList list={list} title={list.title} /></li>)}
                <li className="add-list task-list-container flex column">
                    <form  className="add-list-form list-title">
                        <input type="text" className="add-list-title" placeholder="Add New List"/>
                    </form>
                </li>
            </ul>
        </div>
    )

}
