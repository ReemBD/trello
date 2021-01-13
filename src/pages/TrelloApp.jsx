import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Board } from '../cmps/Board'
import { setBoard } from '../store/actions/boardActions'
import { BoardHeader } from '../cmps/BoardHeader'
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
        const { board } = this.props

        return (
            <div>
                <BoardHeader board={board} />
                <h1>{board.title}</h1>
                <Board board={board} />
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
    setBoard
}

export const TrelloApp = connect(mapStateToProps, mapDispatchToProps)(_TrelloApp)