import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateBoard } from '../store/actions/boardActions'
import { TaskPreview } from './TaskPreview'
import { boardService } from '../services/boardService'

class _TaskList extends Component {
    state = {
        board: null,
        task: {
            title: '',
            description: '',
        },
        isComposerOpen: false
    }

    elListTitleRef = React.createRef()

    componentDidMount() {
        const { board } = this.props
        this.setState({ board: { ...board } })
    }

    onAddTask = () => {

    }
    updateBoard() {
        const board = { ...this.state.board }
        this.setState({ board }, () => {
            this.props.updateBoard(board)
        })
    }
    onEditTask = () => {
        const { list } = this.props
        const { task } = this.state
        const { board } = this.state
        const taskIdx = boardService.getTaskIdxById(list, task.id)
        board.lists.tasks[taskIdx] = task
        this.updateBoard()
    }

    handleChange = ev => {
        const { name, value } = ev.target
        const board = { ...this.state.board }

    }

    onChangeListTitle = ev => {
        const { name, value } = ev.target
        const { board } = this.state
        const { list } = this.props
        const listIdx = boardService.getListIdxById(board, list.id)
        board.lists[listIdx][name] = value
        this.updateBoard()
    }


    onLeaveListTitleInput = ev => {
        ev.preventDefault()
        this.elListTitleRef.current.blur()
    }

    onToggleComposer = ev => {
        ev.stopPropagation()
        this.setState({ isComposerOpen: !this.state.isComposerOpen })
    }

    render() {
        const { list } = this.props
        const { tasks } = list
        const { isComposerOpen } = this.state
        const toggleFormBtn = isComposerOpen ? <i className="fas fa-times" onClick={this.onToggleComposer}></i> : <i className="fas fa-plus" onClick={this.onToggleComposer}></i>
        return (
            <article className="task-list">
                <form className="list-title flex align-center" onSubmit={this.onLeaveListTitleInput} style={{ backgroundColor: `${list.style.title.bgColor}` }}><input ref={this.elListTitleRef} value={list.title}
                    onChange={this.onChangeListTitle} name="title" /> {toggleFormBtn}</form>
                <form className={`task-composer ${!isComposerOpen && 'display-none'}`} action="">
                    <input type="text" name="title" onChange={this.handleChange} placeholder="Enter a title for this card... " autoFocus autoComplete="off" id="" />
                    <textarea type="text" name="description" onChange={this.handleChange} placeholder="Enter description for this card... " autoComplete="off" id="" />
                    <button className="save-task-btn">Add</button>
                </form>
                {tasks.map(task => <TaskPreview key={task.id} task={task} />)}
            </article>
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

export const TaskList = connect(mapStateToProps, mapDispatchToProps)(_TaskList)