import React, { Component } from 'react'
import { setCurrPopover } from '../store/actions/popoverActions'
import { connect } from 'react-redux'

export class _QuickEditButton extends Component {

    state = {
        isLabelsPopoverOpen: false
    }

    render() {
        const { task, list, title, Component, setCurrPopover, currPopover, Icon } = this.props
        return (
            <a className="quick-task-editor-buttons-item js-edit-labels" onClick={ev => {
                ev.stopPropagation()
                currPopover === title ? setCurrPopover() : setCurrPopover(title)
            }} data-for={'editLabels'}>
                <span className="quick-task-editor-buttons-item-text flex align-center">{Icon && <Icon className="quick-task-editor-buttons-item-icon" />}{title}</span>
                { Component && (currPopover === title) && <Component {...this.props} />}
            </a >
        )
    }
}



const mapStateToProps = state => {
    return {
        board: state.boardReducer.currBoard,
        currPopover: state.popoverReducer.currPopover
    }
}

const mapDispatchToProps = {
    setCurrPopover
}

export const QuickEditButton = connect(mapStateToProps, mapDispatchToProps)(_QuickEditButton)


