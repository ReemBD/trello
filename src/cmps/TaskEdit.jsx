import React, { Component } from 'react'

export class TaskEdit extends Component {

    state = {

    }

    componentDidMount() {
        console.log('hello');
    }

    render() {
        return (
            <div className="quick-task-editor-buttons">
                <a className="quick-task-editor-buttons-item js-edit-labels" href="#">
                    <span className="icon-sm icon-label light"></span>
                    <span className="quick-task-editor-buttons-item-text">Edit Labels</span>
                </a>
                <a className="quick-task-editor-buttons-item js-edit-labels" href="#">
                    <span className="icon-sm icon-label light"></span>
                    <span className="quick-task-editor-buttons-item-text">Change Members</span>
                </a>
                <a className="quick-task-editor-buttons-item js-edit-labels" href="#">
                    <span className="icon-sm icon-label light"></span>
                    <span className="quick-task-editor-buttons-item-text">Move</span>
                </a>
                <a className="quick-task-editor-buttons-item js-edit-labels" href="#">
                    <span className="icon-sm icon-label light"></span>
                    <span className="quick-task-editor-buttons-item-text">Copy</span>
                </a>
                <a className="quick-task-editor-buttons-item js-edit-labels" href="#">
                    <span className="icon-sm icon-label light"></span>
                    <span className="quick-task-editor-buttons-item-text">Change due date</span>
                </a>
                <a className="quick-task-editor-buttons-item js-edit-labels" href="#">
                    <span className="icon-sm icon-label light"></span>
                    <span className="quick-task-editor-buttons-item-text">Archive</span>
                </a>

            </div>
        )
    }
}
