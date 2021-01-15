import React, { Component } from 'react'
import NotesOutlinedIcon from '@material-ui/icons/NotesOutlined';
export class TaskDetailsDesc extends Component {
    state = {
        currTask: '',
        isTxtAreaOpen: false,
    }

    componentDidMount() {
        const { task } = this.props
        this.setState({ currTask: task })
    }


    handleInput = ({ target }) => {
        const field = target.name
        const value = target.value
        this.setState(prevState => {
            return {
                currTask: {
                    ...prevState.currTask,
                    [field]: value
                }
            }
        })
    }
    render() {
        const { board, list, task } = this.props
        const { currTask } = this.state
        return (
            <div className="task-middle-details">
                <div className="details-description">
                    <NotesOutlinedIcon style={{ position: 'absolute', left: '-30px', top: '3px' }} />
                    <h3>Description</h3>
                    {(task.description)
                        ? <textarea className="task-textarea" style={{ fontSize: '16px', fontWeight: '400px', height: 'auto' }}
                            value={currTask.description}
                            name="description"
                            spellCheck="false"
                            onChange={this.handleInput}
                            rows="5"
                        />
                        : <textarea className="task-textarea" style={{ fontSize: '16px', fontWeight: '400px', height: 'auto', backgroundColor: 'rgba(9,30,66,.04)' }}
                            value={currTask.description}
                            placeholder="Add a more detailed description..."
                            name="description"
                            spellCheck="false"
                            onChange={this.handleInput}
                            rows="3"
                        />
                    }
                </div>
            </div>
        )
    }
}
