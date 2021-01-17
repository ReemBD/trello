import React, { Component } from 'react'
import { formatRelative } from 'date-fns'
import { utilService } from '../services/utilService'
import TextsmsOutlinedIcon from '@material-ui/icons/TextsmsOutlined';
export class TaskDetailsActivity extends Component {
    state = {
        isActivityOpen: false,
        taskActivities: [],
        taskComments: [],
    }

    componentDidMount() {
        const { board, task } = this.props
        const taskActivities = board.activities.filter(activity => {
            return activity.task.id === task.id
        })
        const taskComments = task?.comments
        this.setState({ taskActivities, taskComments })
    }

    onToggleDetails = () => {
        this.setState({ isActivityOpen: !this.state.isActivityOpen })
    }


    render() {
        const { isActivityOpen, taskActivities, taskComments } = this.state
        if (!taskActivities) return <div>Loading...</div>
        return (
            <div className="task-activity">
                <div className="activity-header flex">
                    <TextsmsOutlinedIcon style={{ position: 'absolute', left: '-30px', top: '3px' }} />
                    <h3 className="task-section-heading" style={{ padding: '4px 8px' }}>Activity</h3>
                    <button onClick={this.onToggleDetails} className="secondary-btn">Show Details</button>
                </div>
                <div className="task-comments">

                    {taskComments ?
                        taskComments.map(comment => {
                            return <div className="task-user-comment flex">
                                <div className="task-member-img"><img src={comment.byMember.imgUrl} /></div>
                                <div className="activity-info flex column justify-center">
                                    <p className="activity-txt">
                                        <span className="activity-member-name">{comment.byMember.fullname} </span>
                                        <div className="activity-date" style={{ display: 'inline-block' }}><span>{formatRelative(comment.createdAt, Date.now())}</span></div>
                                    </p>
                                    <div className="comment-txt">
                                        <span>{comment.txt}</span>
                                    </div>
                                </div>
                            </div>
                        })
                        : ''}
                </div>
                <div className={`activity-container ${!isActivityOpen && "hidden"}`}>
                    {taskActivities &&
                        taskActivities.map(activity => {
                            return <div className="task-user-activity flex">
                                <div className="task-member-img"><img src={activity.byMember.imgUrl} /></div>
                                <div className="activity-info flex column justify-center">
                                    <p className="activity-txt">
                                        <span className="activity-member-name">{activity.byMember.fullname} </span>
                                        {activity.txt}
                                    </p>
                                    <div className="activity-date">
                                        <span>{formatRelative(activity.createdAt, Date.now())}</span>
                                    </div>
                                </div>
                            </div>
                        })
                    }
                </div>
            </div>
        )
    }
}
