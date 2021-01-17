import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Board } from '../cmps/Board'
import { setBoard } from '../store/actions/boardActions'
import { setCurrPopover } from '../store/actions/popoverActions'
import { BoardHeader } from '../cmps/BoardHeader'
import { TaskDetails } from '../cmps/TaskDetails'


class _TrelloApp extends Component {

    state = {

    }


    componentDidMount() {
        const { boardId } = this.props.match.params
        this.props.setBoard(boardId)
    }

    componentDidUpdate(prevProps) {
        const { boardId } = this.props.match.params
        if (prevProps.match.params.boardId !== boardId) {
            this.props.setBoard(boardId)
        }
    }

    render() {
        const { board, setCurrPopover } = this.props
        if (!board) return <h1>loading...</h1>
        return (
            <div onClick={() => { setCurrPopover() }}>
                <div className="main-bg"></div>
                <div className="bg-overlay">
                    <BoardHeader board={board} />

                    <Board />
                    {this.props.match.params.listId && <TaskDetails />}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        board: state.boardReducer.currBoard,
        isOverlayOpen: state.boardReducer.isOverlayOpen
    }
}

const mapDispatchToProps = {
    setBoard,
    setCurrPopover
}

export const TrelloApp = connect(mapStateToProps, mapDispatchToProps)(_TrelloApp)