import React, { Component } from 'react'
import { cloneDeep } from 'lodash'
import { boardService } from '../services/boardService'
import { utilService } from '../services/utilService'
import { formatRelative } from 'date-fns'
import { connect } from 'react-redux'
import { updateBoard } from '../store/actions/boardActions'
import { ChangeMembersPopover } from './ChangeMembersPopover'
import AddIcon from '@material-ui/icons/Add';
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
        isMemberModalOpen: false,
    }

    componentDidMount() {
        this.markExistingLabels()
    }

    componentDidUpdate(prevProps) {
        if (prevProps.task.labels?.length !== this.props.task.labels?.length) {
            this.markExistingLabels()
        }
    }

    markExistingLabels() {
        const { task } = this.props
        if (!task.labels?.length) return;
        let { labels } = { ...this.state }
        task.labels.forEach(taskLabel => {
            const labelIdx = labels.findIndex(currLabel => currLabel.id === taskLabel.id)
            labels[labelIdx].isPicked = true
        })
        this.setState({ labels })
    }

    onToggleLabel = ev => {
        const { id } = ev.target.dataset
        const { labels } = this.state
        const updatedLabels = [...labels]
        const labelToUpdateIdx = updatedLabels.findIndex(label => label.id === id)

        updatedLabels[labelToUpdateIdx].isPicked = !updatedLabels[labelToUpdateIdx].isPicked
        this.setState({ labels: updatedLabels }, () => {
            let labelsToSend = updatedLabels.filter(label => label.isPicked)
            labelsToSend.forEach(label => delete label.isPicked)
            this.onAddLabel(labelsToSend)
        })


    }

    toggleLabelMenu = () => {
        this.setState({ isLabelMenuOpen: !this.state.isLabelMenuOpen })
    }


    onAddLabel = async (labels) => {
        const { currBoard, list, task, updateBoard } = this.props
        const updatedBoard = cloneDeep(currBoard)
        const { listIdx, taskIdx } = boardService.getListAndTaskIdxById(updatedBoard, list.id, task.id)
        updatedBoard.lists[listIdx].tasks[taskIdx].labels = labels

        await updateBoard(updatedBoard)
    }

    onToggleMembersModal = () => {
        this.setState({ isMemberModalOpen: !this.state.isMemberModalOpen })
    }

    render() {
        const { currBoard } = this.props
        const { listId, taskId } = this.props.match.params
        const { listIdx, taskIdx } = boardService.getListAndTaskIdxById(currBoard, listId, taskId)
        const list = currBoard.lists[listIdx]
        const task = currBoard.lists[listIdx].tasks[taskIdx]
        const { labels, isLabelMenuOpen, isMemberModalOpen } = this.state
        return (
            <div className="details-info">
                <div className="flex" style={{ flexWrap: 'wrap' }}>

                    {task?.members?.length && <div className="card-detail">
                        <h3>Members</h3>
                        <div className="member-imgs flex align-center">

                            {task.members.map(member => {
                                return <div className="task-member-img">
                                    <img src={member.imgUrl} />
                                </div>
                            })}
                            <div className="task-add-member small-btn-bgc" title="Add Member">
                                {<AddIcon onClick={this.onToggleMembersModal} style={{ height: '32px' }} />}
                                {isMemberModalOpen && <ChangeMembersPopover board={currBoard} list={list} task={task} setCurrPopover={this.onToggleMembersModal} currListIdx={this.props.currListIdx}
                                    currTaskIdx={this.props.currTaskIdx}
                                    updateBoard={this.props.updateBoard}
                                />}
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
                            <div className="task-add-label small-btn-bgc" title="Add Label">
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
                            <span style={{ marginLeft: '5px' }}>{formatRelative(task.dueDate, Date.now())}</span>
                        </div>
                    </div>}
                </div>
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        currBoard: state.boardReducer.currBoard,
        currListIdx: state.boardReducer.currListIdx,
        currTaskIdx: state.boardReducer.currTaskIdx,

    }
}

const mapDispatchToProps = {
    updateBoard
}

export const TaskDetailsInfo = connect(mapStateToProps, mapDispatchToProps)(_TaskDetailsInfo)
