import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateBoard } from '../store/actions/boardActions'
import { TaskPreview } from './TaskPreview'
import { boardService } from '../services/boardService'
import { ListTitle } from '../cmps/ListTitle'
import { TaskComposer } from './TaskComposer'
class _TaskList extends Component {
    state = {
        isComposerOpen: false
    }

    elTaskTitleRef = React.createRef()

    updateBoard = async (board = this.props.board) => {
        await this.props.updateBoard(board)
    }

    onEditTask = () => {
        const { list } = this.props
        const { task } = this.state
        const board = { ...this.props.board }
        const taskIdx = boardService.getTaskIdxById(list, task.id)
        board.lists.tasks[taskIdx] = task
        this.updateBoard()
    }

    onToggleComposer = ev => {
        ev.stopPropagation()
        this.setState({ isComposerOpen: !this.state.isComposerOpen }, () => {
            this.elTaskTitleRef.current.focus()
        })
    }

    render() {
        const { list } = this.props
        const { tasks } = list
        const { isComposerOpen } = this.state
        return (
            <article className="task-list">
                <ListTitle list={list} isComposerOpen={isComposerOpen} onToggleComposer={this.onToggleComposer} />
                <TaskComposer list={list} isComposerOpen={isComposerOpen} titleRef={this.elTaskTitleRef} onToggleComposer={this.onToggleComposer} />
                {tasks.map(task => <TaskPreview key={task.id} task={task} currList={list} />)}
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