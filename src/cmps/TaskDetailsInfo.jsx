import React, { Component } from 'react'
import { boardService } from '../services/boardService'
import { connect } from 'react-redux'
import { updateBoard } from '../store/actions/boardActions'
import AddIcon from '@material-ui/icons/Add';
import { utilService } from '../services/utilService'
import { TaskDetailsDesc } from './TaskDetailsDesc'
import CloseIcon from '@material-ui/icons/Close';


export class _TaskDetailsInfo extends Component {
    state = {
        labels: [
            { id: '101', color: "#61bd4f", title: '', isPicked: false },
            { id: '102', color: "#f2d602", title: '', isPicked: false },
            { id: '103', color: "#f99f1b", title: '', isPicked: false },
            { id: '104', color: "#eb5a46", title: '', isPicked: false },
            { id: '105', color: "#c377e0", title: '', isPicked: false },
            { id: '107', color: "#1f79bf", title: '', isPicked: false },
            { id: '108', color: "#3cc2e0", title: '', isPicked: false },
        ],
        isLabelMenuOpen: false,
    }

    componentDidMount() {
        this.markExistingLabels()
    }

    componentDidUpdate(prevProps) {
        console.log('prevprops', prevProps.task.labels)
        if (prevProps.task.labels?.length !== this.props.task.labels?.length) {
            this.markExistingLabels()
        }
    }

    // markExistingLabels() {
    //     const { task } = this.props
    //     if (!task.labels?.length) return;
    //     let { labels } = { ...this.state }
    //     const labelsIdsMap = labels.map(label => label.id)
    //     task.labels.forEach(taskLabel => {
    //         const labelIdx = labels.findIndex(currLabel => currLabel.id === taskLabel.id)
    //         console.log('the label idx is: ', labelIdx);
    //         labels[labelIdx].isPicked = true
    //         console.log('from loop', labels[labelIdx]);

    //     })
    //     this.setState({ labels })
    // }

    markExistingLabels() {
        const { task } = this.props
        const { labels } = { ...this.state }
        if (!task.labels?.length) return
        task.labels.forEach((label, idx) => {
            const labelIdx = labels.findIndex(currLabel => currLabel.id === label.id)
            labels[labelIdx].isPicked = true
        })
        this.setState({ labels })
    }

    onToggleLabel = ev => {
        const { id } = ev.target.dataset
        const { labels } = { ...this.state }
        const labelToUpdateIdx = labels.findIndex(label => label.id === id)
        console.log(labelToUpdateIdx)
        labels[labelToUpdateIdx].isPicked = !labels[labelToUpdateIdx].isPicked
        const labelsToSend = labels.map(label => label.isPicked)
        this.setState({ labels }, () => {
            this.onAddLabel(labels)
        })
    }

    toggleLabelMenu = () => {
        this.setState({ isLabelMenuOpen: !this.state.isLabelMenuOpen })
    }


    // getLabelIdxById(labelId) {
    //     const { labels } = this.state
    //     return labels.findIndex(label => label.id === labelId)
    // }

    // onToggleLabel = ev => {
    //     ev.stopPropagation()
    //     const { labels } = { ...this.state }
    //     const labelId = ev.target.dataset.id
    //     const labelIdx = this.getLabelIdxById(labelId)
    //     labels[labelIdx].isPicked = !labels[labelIdx].isPicked
    //     this.setState({ labels }, () => {
    //         this.onAddLabel()
    //     })
    // }

    onAddLabel = async (labels) => {
        const { board, list, task, updateBoard } = { ...this.props }
        const { listIdx, taskIdx } = boardService.getListAndTaskIdxById(board, list.id, task.id)
        board.lists[listIdx].tasks[taskIdx].labels = labels
        console.log('the board is', board)
        await updateBoard(board)

    }

    render() {
        const { board, list, task } = this.props
        const { labels, isLabelMenuOpen } = this.state
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
                                {<AddIcon onClick={this.toggleLabelMenu} style={{ height: '32px' }} />}

                                <div className={`labels-popover ${!isLabelMenuOpen && "hidden"}`} onClick={(ev) => { ev.stopPropagation() }} style={{ position: 'relative', zIndex: '3', backgroundColor: '#fff' }}>
                                    <div className="popover-header flex align-center justify-center">
                                        <span className="popover-header-title" style={{ fontWeight: '300' }}>Labels</span>
                                        <CloseIcon className="popover-header-close-btn" style={{ top: '-3px' }} onClick={this.toggleLabelMenu} />
                                    </div>
                                    <section className="popover-section">
                                        <ul className="popover-section-list clear-list flex column">
                                            <h3 className="popover-section-header">Labels</h3>
                                            {labels.map(label => <div data-id={label.id} onClick={this.onToggleLabel} key={label.id} className={`popover-section-list-item ${label.isPicked && 'picked'}`} style={{ backgroundColor: label.color }}></div>)}
                                        </ul>
                                    </section>
                                </div>
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


const mapStateToProps = state => {
    return {
        board: state.boardReducer.currBoard
    }
}

const mapDispatchToProps = {
    updateBoard
}

export const TaskDetailsInfo = connect(mapStateToProps, mapDispatchToProps)(_TaskDetailsInfo)
