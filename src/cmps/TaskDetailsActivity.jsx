import React, { Component } from 'react'
import { formatDistance } from 'date-fns'
import { cloneDeep } from 'lodash'
import { boardService } from '../services/boardService'
import { utilService } from '../services/utilService'
import { connect } from 'react-redux'
import { updateBoard } from '../store/actions/boardActions'
import TextsmsOutlinedIcon from '@material-ui/icons/TextsmsOutlined';
import PermIdentityOutlinedIcon from '@material-ui/icons/PermIdentityOutlined';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';


export class _TaskDetailsActivity extends Component {
    state = {
        isActivityOpen: false,
        taskActivities: [],
        comment: {
            txt: ''
        },
    }

    componentDidMount() {
        const { currBoard } = this.props
        const { listId, taskId } = this.props.match.params
        const { listIdx, taskIdx } = boardService.getListAndTaskIdxById(currBoard, listId, taskId)
        const task = currBoard.lists[listIdx].tasks[taskIdx]
        const taskActivities = currBoard.activities?.filter(activity => {
            return activity.task.id === task.id
        })
        this.setState({ taskActivities })
    }



    onToggleDetails = () => {
        this.setState({ isActivityOpen: !this.state.isActivityOpen })
    }

    handleComment = ({ target }) => {
        const field = target.name
        const value = target.value
        this.setState(prevState => {
            return {
                comment: {
                    ...prevState.comment,
                    [field]: value
                }
            }
        })
    }

    onEnterPress = ev => {
        if (ev.keyCode === 13 && ev.shiftKey === false) {
            ev.preventDefault()
            this.saveComment(ev)
        }
    }

    saveComment = async (ev) => {
        ev.preventDefault()
        const { txt } = this.state.comment
        const commentToAdd = {
            byMember: { _id: 'u101', fullname: 'Abi Abambi', imgUrl: 'https://www.maccosmetics.ca/media/export/cms/products/640x600/mac_sku_MW3A53_640x600_1.jpg' },
            id: utilService.makeId(),
            createdAt: Date.now(),
            txt
        }
        const { currBoard, list, task } = this.props
        const copyTask = cloneDeep(task)
        const copyBoard = cloneDeep(currBoard)
        if (copyTask.comments) {
            copyTask.comments.unshift(commentToAdd)
        } else {
            copyTask.comments = []
            copyTask.comments.unshift(commentToAdd)
        }

        const { taskIdx, listIdx } = boardService.getListAndTaskIdxById(currBoard, list.id, task.id)
        copyBoard.lists[listIdx].tasks[taskIdx] = copyTask
        await this.props.updateBoard(copyBoard)

    }

    onRemoveComment = async (listIdx, taskIdx, commentIdx) => {
        const copyBoard = cloneDeep(this.props.currBoard)
        copyBoard.lists[listIdx].tasks[taskIdx].comments.splice(commentIdx, 1)
        await this.props.updateBoard(copyBoard)
    }

    render() {
        const { currBoard } = this.props
        const { listId, taskId } = this.props.match.params
        const { listIdx, taskIdx } = boardService.getListAndTaskIdxById(currBoard, listId, taskId)
        const task = currBoard.lists[listIdx].tasks[taskIdx]
        const taskComments = task?.comments
        const { isActivityOpen, taskActivities, comment } = this.state
        if (!taskActivities) return <div>Loading...</div>
        return (
            <div className="task-activity">
                <div className="activity-header flex">
                    <TextsmsOutlinedIcon style={{ position: 'absolute', left: '-30px', top: '3px' }} />
                    <h3 className="task-section-heading" style={{ padding: '4px 8px' }}>Activity</h3>
                    <button onClick={this.onToggleDetails} className="secondary-btn">Show Details</button>
                </div>
                <div className="task-comments">
                    <div className="new-comment flex">
                        <div className="task-member-img"><PermIdentityOutlinedIcon /></div>
                        <form>
                            <div className="comment-box">
                                <textarea
                                    className="comment-textarea"
                                    placeholder="Write a comment..."
                                    value={comment.txt}
                                    name="txt"
                                    onChange={this.handleComment}
                                    onKeyDown={this.onEnterPress}
                                >
                                </textarea>
                            </div>
                        </form>
                    </div>
                    {taskComments ?
                        taskComments.map((comment, commentIdx) => {
                            return <div className="task-user-comment flex">
                                <div className="task-member-img"><img src={comment.byMember.imgUrl} /></div>
                                <div className="activity-info flex column justify-center">
                                    <p className="activity-txt">
                                        <span className="activity-member-name">{comment.byMember.fullname} </span>
                                        <div className="activity-date" style={{ display: 'inline-block' }}><span>{formatDistance(comment.createdAt, Date.now())}</span></div>
                                    </p>
                                    <div className="comment-txt">
                                        <span>{comment.txt}</span>
                                    </div>
                                </div>
                                <span onClick={() => this.onRemoveComment(listIdx, taskIdx, commentIdx)} className="comment-dlt-container" ><DeleteOutlinedIcon className="comment-dlt-btn" /></span>
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
                                        <span>{formatDistance(activity.createdAt, Date.now())}</span>
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


const mapStateToProps = state => {
    return {
        currBoard: state.boardReducer.currBoard,
    }
}

const mapDispatchToProps = {
    updateBoard
}

export const TaskDetailsActivity = connect(mapStateToProps, mapDispatchToProps)(_TaskDetailsActivity)
