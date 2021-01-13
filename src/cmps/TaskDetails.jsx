import React, { Component } from 'react'
import { boardService } from '../services/boardService'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

export class _TaskDetails extends Component {
    state = {
        isDetailsOpen: false,
        task: {}

    }

    componentDidMount() {
        const { taskId } = this.props.match.params // Whenever someone opens task through URL
        console.log('The task id is', taskId);
        this.getCurrTask(this.props.board._id, taskId)
    }

    componentDidUpdate(prevProps, prevState) {
        const { taskId } = this.props.match.params
        if (taskId && !this.state.isDetailsOpen) { // When task is clicked on board
            this.setState({ isDetailsOpen: true }, () => this.getCurrTask(this.props.board._id, taskId))
        }
    }

    getCurrTask = async (boardId, taskId) => {
        const task = await boardService.getTaskById(boardId, taskId)
        console.log(task);
        this.setState({ task })
    }


    render() {
        const { isDetailsOpen } = this.state
        return (
            <div className={`window-overlay ${!isDetailsOpen && "hidden"}`}>

            </div>
        )
    }
}

const mapDispatchToProps = {

}

const mapStateToProps = state => {
    return {
        isTaskOpen: state.boardReducer.isTaskOpen,
        board: state.boardReducer.currBoard
    }
}

export const TaskDetails = connect(mapStateToProps, mapDispatchToProps)(withRouter(_TaskDetails))