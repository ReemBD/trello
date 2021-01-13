import React, { Component } from 'react'
import { TaskDetails } from '../cmps/TaskDetails'

export class TaskPreview extends Component {

    state = {
        isDetailsOpen: false
    }

    onOpenDetails = () => {
        this.setState({ isDetailsOpen: true })
    }
    render() {
        const { task } = this.props
        const { isDetailsOpen } = this.state
        return (
            <div>
                <h3>{task.title}</h3>
                <p>{task.description}</p>
                <button onClick={this.onOpenDetails}>Show more</button>
                <TaskDetails isDetailsOpen={isDetailsOpen} task={task} />
            </div>
        )
    }
}
