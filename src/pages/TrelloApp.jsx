import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Board } from '../cmps/Board'
import { setBoard } from '../store/actions/boardActions'
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
        const { board } = this.props
        if (!board) return <h1>loading...</h1>
        return (
            <div>
                <div className="main-bg"></div>
                <div className="bg-overlay">
                    <BoardHeader board={board} />
                    <h1>{board.title}</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat adipisci cupiditate est provident voluptate aspernatur perferendis, natus illo nesciunt. Et?</p>
                    <Board board={board} />
                    <TaskDetails />
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
    setBoard
}

export const TrelloApp = connect(mapStateToProps, mapDispatchToProps)(_TrelloApp)