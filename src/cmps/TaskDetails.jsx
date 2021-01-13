import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

export class _TaskDetails extends Component {
    state = {
        isDetailsOpen: false,
    }

    componentDidMount() {

    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.match.params.taskId && !this.state.isDetailsOpen) {
            this.setState({ isDetailsOpen: true })
        }
    }


    render() {
        const { isDetailsOpen } = this.state
        return (
            <div className={`window-overlay ${!isDetailsOpen && "hidden"}`}>

            </div>
        )
    }
}

const mapDispatchToProps = {

}

const mapStateToProps = state => {
    return {
        isTaskOpen: state.boardReducer.isTaskOpen,
        board: state.boardReducer.currBoard
    }
}

export const TaskDetails = connect(mapStateToProps, mapDispatchToProps)(withRouter(_TaskDetails))