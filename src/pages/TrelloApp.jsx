import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Board } from '../cmps/Board'
import { setBoard, toggleOverlay, updateBoard } from '../store/actions/boardActions'
import { setCurrPopover } from '../store/actions/popoverActions'
import { BoardHeader } from '../cmps/BoardHeader'
import { TaskDetails } from '../cmps/TaskDetails'
import { socketService } from '../services/socketService'


class _TrelloApp extends Component {

    state = {

    }


    componentDidMount = async () => {
        const { boardId } = this.props.match.params
        socketService.setup()
        socketService.emit('member connected', boardId)
        socketService.on('board updated fs', this.onBoardUpdated)
        await this.props.setBoard(boardId)
    }

    componentWillUnmount() {
        socketService.off('board updated fs', this.onBoardUpdated)
        socketService.terminate()
    }

    componentDidUpdate(prevProps) {
        const { boardId } = this.props.match.params
        if (prevProps.match.params.boardId !== boardId) {
            this.props.setBoard(boardId)
        }
    }

    onBoardUpdated = async (updatedBoard) => {
        console.log('updated!');
        const board = {...updatedBoard}
        await this.props.updateBoard(board, false)
    }

    render() {
        const { board, setCurrPopover } = this.props
        if (!board) return <h1>loading...</h1>
        return (
            <div onClick={() => {
                setCurrPopover()
                // if (isOverlayOpen) toggleOverlay()
            }} style={{ paddingTop: '60px' }}>
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
        isOverlayOpen: state.boardReducer.isOverlayOpen,
        currPopover: state.popoverReducer.currPopover
    }
}

const mapDispatchToProps = {
    setBoard,
    updateBoard,
    setCurrPopover,
    toggleOverlay
}

export const TrelloApp = connect(mapStateToProps, mapDispatchToProps)(_TrelloApp)