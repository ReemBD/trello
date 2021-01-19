import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Board } from '../cmps/Board'
import { setBoard, toggleOverlay } from '../store/actions/boardActions'
import { setCurrPopover } from '../store/actions/popoverActions'
import { BoardHeader } from '../cmps/BoardHeader'
import { TaskDetails } from '../cmps/TaskDetails'
import { socketService } from '../services/socketService'


class _TrelloApp extends Component {

    state = {

    }


    componentDidMount = async () => {
        const { boardId } = this.props.match.params
        await this.props.setBoard(boardId)
    }

    componentWillUnmount() {
    }
    onMemberConnected({ boardId, username }) {
        console.log(username + ' connected to ', boardId);
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
            <div onClick={() => {
                setCurrPopover()
                // if (isOverlayOpen) toggleOverlay()
            }}>
                <div className="main-bg" style={{ backgroundImage: board.style.bg }} onClick={ev => { ev.stopPropagation() }}></div>
                <div className="bg-overlay">
                    <BoardHeader {...this.props} />
                    <Board {...this.props} />
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
    setCurrPopover,
    toggleOverlay
}

export const TrelloApp = connect(mapStateToProps, mapDispatchToProps)(_TrelloApp)