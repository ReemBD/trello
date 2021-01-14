import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateBoard } from '../store/actions/boardActions'
import { TaskPreview } from './TaskPreview'
import { boardService } from '../services/boardService'
import { ListTitle } from '../cmps/ListTitle'
import { TaskComposer } from './TaskComposer'
class _TaskList extends Component {
    state = {
        board: null,
        isComposerOpen: false
    }
    elTaskTitleRef = React.createRef()

    componentDidMount() {
        const { board } = this.props
        this.setState({ board: { ...board } })
    }


    updateBoard = async (board = this.state.board) => {
        await this.props.updateBoard(board)
    }

    onEditTask = () => {
        const { list } = this.props
        const { task } = this.state
        const { board } = this.state
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
        if (!this.state.board) return <h1>Loading...</h1>
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