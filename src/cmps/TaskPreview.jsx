import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { toggleTask } from '../store/actions/boardActions'
import { TaskDetails } from '../cmps/TaskDetails'
import { connect } from 'react-redux'
export class _TaskPreview extends Component {

    state = {
        isDetailsOpen: false
    }

    onOpenDetails = async () => {
        const { task } = this.props
        const { board } = this.props
        await this.props.toggleTask()
        this.props.history.push(`/board/${board._id}/${task.id}`)
    }
    render() {
        const { task } = this.props
        const { isDetailsOpen } = this.state
        return (
            <div>
                <h3>{task.title}</h3>
                <p>{task.description}</p>
                <button onClick={this.onOpenDetails}>Show more</button>
            </div>
        )
    }
}


const mapDispatchToProps = {
    toggleTask,
}

const mapStateToProps = state => {
    return {
        isTaskOpen: state.boardReducer.isTaskOpen,
        board: state.boardReducer.currBoard
    }
}

export const TaskPreview = connect(mapStateToProps, mapDispatchToProps)(withRouter(_TaskPreview))