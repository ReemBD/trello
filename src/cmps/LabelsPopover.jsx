import React, { Component } from 'react'
import { updateBoard } from '../store/actions/boardActions'
import CloseIcon from '@material-ui/icons/Close'
import { boardService } from '../services/boardService'
import { connect } from 'react-redux'
import { PopoverHeader } from './PopoverHeader';
import { cloneDeep } from 'lodash'
export class _LabelsPopover extends Component {
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

    onToggleLabel = ev => {
        ev.stopPropagation()
        const { labels } = { ...this.state }
        const { board, list, task, updateBoard } = { ...this.props }
        const labelId = ev.target.dataset.id
        const labelIdx = this.getLabelIdxById(labelId)
        labels[labelIdx].isPicked = !labels[labelIdx].isPicked
        this.setState({ labels }, async () => {
            delete labels[labelIdx].isPicked
            const { listIdx, taskIdx } = boardService.getListAndTaskIdxById(board, list.id, task.id)
            if (task.labels?.some(label => label.id === labelId)) {
                const taskLabelIdx = task.labels.findIndex(label => label.id === labelId)
                task.labels.splice(taskLabelIdx, 1)
                board.lists[listIdx].tasks[taskIdx] = task
            }
            else {
                task.labels = task.labels ? [...task.labels, labels[labelIdx]] : [labels[labelIdx]]
                board.lists[listIdx].tasks[taskIdx] = task
            }
            await updateBoard(board)
            this.markExistingLabels()
        })
    }

    getLabelIdxById(labelId) {
        const { labels } = this.state
        return labels.findIndex(label => label.id === labelId)
    }

    handleChange = (labelIdx, ev) => {
        const { labels } = this.state
        const labelsCopy = cloneDeep(labels)
        labelsCopy[labelIdx].title = ev.target.value
        this.setState({ labels: labelsCopy })
    }


    render() {
        const { labels } = this.state
        return (
            <div className="labels-popover quick-edit-popover" >
                <PopoverHeader title='Labels' setCurrPopover={this.props.setCurrPopover} />
                <section className="popover-section">
                    <ul className="popover-section-list clear-list flex column">
                        <h3 className="popover-section-header">Labels</h3>
                        {labels.map((label, labelIdx) => {
                            return (
                                <div className="flex">
                                    <input
                                        data-id={label.id}
                                        onClick={this.onToggleLabel}
                                        key={label.id}
                                        onChange={(ev) => this.handleChange(labelIdx, ev)}
                                        value={labels[labelIdx].title}
                                        className={`popover-section-list-item ${label.isPicked && 'picked'}`} style={{ backgroundColor: label.color }}></input>
                                    <span>Yo</span>
                                </div>

                            )
                        })}
                    </ul>
                </section>
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
    updateBoard,
}

export const LabelsPopover = connect(mapStateToProps, mapDispatchToProps)(_LabelsPopover)
