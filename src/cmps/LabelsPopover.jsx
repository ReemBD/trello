import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateBoard } from '../store/actions/boardActions'
import CloseIcon from '@material-ui/icons/Close';
import { boardService } from '../services/boardService'

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

    onChooseLabel = ev => {
        ev.stopPropagation()
        console.log('Color: ', ev.target.dataset.id);
    }

    onAddLabels = () => {

    }
    render() {
        const { labels } = this.state
        return (
            <div className="labels-popover">
                <div className="popover-header">
                    <span className="popover-header-title">Labels</span>
                    <CloseIcon className="popover-header-close-btn" />
                    <section className="popover-section">
                        <ul className="popover-section-list clear-list flex column">
                            <h3 className="popover-section-header">Labels</h3>
                            {labels.map(label => <div data-id={label.id} onClick={this.onChooseLabel} key={label.id} className="popover-section-list-item" style={{ backgroundColor: label.color }}></div>)}
                            <button className="save-labels-btn">Save</button>
                        </ul>
                    </section>
                </div>
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

export const LabelsPopover = connect(mapStateToProps, mapDispatchToProps)(_LabelsPopover)
