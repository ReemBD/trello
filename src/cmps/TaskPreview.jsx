import React, { Component } from 'react'

export class TaskPreview extends Component {


    render() {
        const { task } = this.props
        return (
            <div>
                <h3>this is task:{task.title} </h3>

            </div>
        )
    }
}
