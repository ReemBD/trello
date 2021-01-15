import React, { Component } from 'react'
import AddIcon from '@material-ui/icons/Add';
import { utilService } from '../services/utilService'

export class TaskDetailsInfo extends Component {
    render() {
        const { board, list, task } = this.props
        return (
            <div className="members-date flex">
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
                            {<AddIcon style={{ height: '32px' }} />}
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
        )
    }
}
