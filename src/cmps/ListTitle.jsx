import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateBoard } from '../store/actions/boardActions'
import { boardService } from '../services/boardService'

export class _ListTitle extends Component {
    state = {
        board: null
    }
    elListTitleRef = React.createRef()
    
    componentDidMount() {
        const { board } = this.props
        this.setState({ board: { ...board } })
    }


    updateBoard = async (board = this.state.board) => {
        await this.props.updateBoard(board)
    }

    listTitleHandlers = {
        onChange: (ev) => {
            const { name, value } = ev.target
            const { list } = this.props
            const board = { ...this.state.board }
            const listIdx = boardService.getListIdxById(board, list.id)
            board.lists[listIdx][name] = value
            this.setState({ board })
        },
        onBlur: ({ target }) => {
            const { board } = this.state
            const { list } = this.props
            target.style.backgroundColor = list.style.title.bgColor
            target.style.color = '#fff'
            this.props.updateBoard(board)
        },
        onFocus: ({ target }) => {
            target.style.backgroundColor = '#fff'
            target.style.color = '#212121'
            target.style.borderRadius = "2px"
            console.log('target style: ',);
        }
    }

    onPressEnter = (ev) => {
        ev.preventDefault()
        this.elListTitleRef.current.blur()
    }

    render() {
        const { list, isComposerOpen, onToggleComposer } = this.props
        const ToggleFormBtn = <i className={`fas fa-plus ${isComposerOpen && 'close'}`} onClick={onToggleComposer}></i>
        if (!list) return <h1>Loading...</h1>
        return (
            <form onSubmit={this.onPressEnter} className="list-title flex align-center" style={{ backgroundColor: `${list.style.title.bgColor}` }}><input
                {...this.listTitleHandlers} ref={this.elListTitleRef} value={list.title}
                name="title" />{ToggleFormBtn}</form>
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

export const ListTitle = connect(mapStateToProps, mapDispatchToProps)(_ListTitle)