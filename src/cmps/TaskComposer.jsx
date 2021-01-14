import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateBoard } from '../store/actions/boardActions'
import { boardService } from '../services/boardService'
import { utilService } from '../services/utilService'

export class _TaskComposer extends Component {

    state = {
        board: null,
        task: {
            title: '',
            description: '',
        }
    }


    componentDidMount() {
        const { board } = this.props
        this.setState({ board: { ...board } })
    }

    handleChange = ev => {
        const { name, value } = ev.target
        this.setState(prevState => ({ task: { ...prevState.task, [name]: value } }))
    }

    onAddTask = ev => {
        ev.preventDefault()
        const {task} = {...this.state}
        const { board } = { ...this.state }
        const { list } = this.props
        const listIdx = boardService.getListIdxById(board, list.id)
        task.createdAt = Date.now()
        task.id = utilService.makeId()
        board.lists[listIdx].tasks.push(task)
        this.setState({
            task: {
                title: '',
                description: '',
            }
        }, () => {
            this.updateBoard(board)
        })
    }

    updateBoard(board = this.state.board) {
        this.props.updateBoard(board)
    }

    render() {
        const { isComposerOpen, titleRef } = this.props
        const { task } = this.state
        return (
            <form className={`task-composer ${!isComposerOpen && 'display-none'}`} onSubmit={this.onAddTask}>
                <input value={task.title} type="text" ref={titleRef} name="title" onChange={this.handleChange} placeholder="Enter a title for this card... " autoComplete="off" id="" />
                <textarea value={task.description} type="text" name="description" onChange={this.handleChange} placeholder="Enter description for this card... " autoComplete="off" id="" />
                <button className="save-task-btn">Add</button>
            </form>
        )
    }
}


const mapStateToProps = state => {
    return {
        board: state.boardReducer.currBoard
    }
}

const mapDispatchToProps = {
    updateBoard
}

export const TaskComposer = connect(mapStateToProps, mapDispatchToProps)(_TaskComposer)
