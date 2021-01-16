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
                    {/* {this.props.isOverlayOpen && <div className="main-overlay"></div>} */}

                    <BoardHeader board={board} />
                   
                    <Board board={board} />
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
    setBoard
}

export const TrelloApp = connect(mapStateToProps, mapDispatchToProps)(_TrelloApp)