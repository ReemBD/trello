import React, { Component } from 'react'
import AddIcon from '@material-ui/icons/Add';
import { utilService } from '../services/utilService'
import { TaskDetailsDesc } from './TaskDetailsDesc'

export class TaskDetailsInfo extends Component {
    state = {
        labels: [
            { id: '101', color: "#61bd4f", title: '', isPicked: false },
            { id: '102', color: "#f2d602", title: '', isPicked: false },
            { id: '103', color: "#f99f1b", title: '', isPicked: false },
            { id: '104', color: "#eb5a46", title: '', isPicked: false },
            { id: '105', color: "#c377e0", title: '', isPicked: false },
            { id: '107', color: "#1f79bf", title: '', isPicked: false },
            { id: '108', color: "#3cc2e0", title: '', isPicked: false },
        ]
    }

    componentDidMount() {
        this.markExistingLabels()
    }

    markExistingLabels() {
        const { task } = this.props
        if (!task.labels?.length) return;
        let { labels } = { ...this.state }
        const labelsIdsMap = labels.map(label => label.id)
        task.labels.forEach(taskLabel => {
            if (labelsIdsMap.includes(taskLabel.id)) {
                const labelIdx = labels.findIndex(currLabel => currLabel.id === taskLabel.id)
                labels[labelIdx].isPicked = true
            }
        })
        this.setState({ labels })
    }

    openLabelMenu = () => {

    }

    render() {
        const { board, list, task } = this.props
        return (
            <div className="details-info">
                <div className="flex">

                    {task.members?.length && <div className="card-detail">
                        <h3>Members</h3>
                        <div className="member-imgs flex align-center">

                            {task.members.map(member => {
                                return <div className="task-member-img">
                                    <img src={member.imgUrl} alt="member" />
                                </div>
                            })}
                            <div className="task-add-member small-btn-bgc" title="Add member">
                                {<AddIcon style={{ height: '32px' }} />}
                            </div>
                        </div>
                    </div>}
                    {task.labels?.length && <div className="card-detail detail-labels">
                        <h3>Labels</h3>
                        <div className="task-labels flex">
                            {task.labels.map(label => {
                                return <span className="task-label-preview flex align-center justify-center" style={{ backgroundColor: label.color }}>
                                    <span className="label-title">{label?.title}</span>
                                </span>
                            })}
                            <div className="task-add-label small-btn-bgc">
                                {<AddIcon onClick={this.openLabelMenu} style={{ height: '32px' }} />}

                            </div>
                        </div>
                    </div>}
                    {task?.dueDate && <div className="card-detail">
                        <h3>Due Date</h3>
                        <div className="task-due-time flex align-center justify-center">
                            <span style={{ marginLeft: '5px' }}>{utilService.formatTime(task.dueDate)}</span>
                        </div>
                    </div>}
                </div>
                <TaskDetailsDesc board={board} list={list} task={task} />
            </div>
        )
    }
}
