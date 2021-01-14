import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateBoard } from '../store/actions/boardActions'
import { boardService } from '../services/boardService'
import ToggleFormIcon from '@material-ui/icons/AddCircleOutline';

export class _ListTitle extends Component {
    state = {
        title: ''
    }

    elListTitleRef = React.createRef()

    componentDidMount() {

    }

    updateBoard = async (board) => {
        await this.props.updateBoard(board)
    }

    listTitleHandlers = {
        onChange: (ev) => {
            const { name, value } = ev.target
            this.setState({ [name]: value })
        },
        onBlur: ({ target }) => {
            const board = { ...this.props.board }
            const { list } = this.props
            const listIdx = boardService.getListIdxById(board, list.id)
            board.lists[listIdx][target.name] = target.value
            target.style.backgroundColor = list.style.title.bgColor
            target.style.color = '#fff'
            this.props.updateBoard(board)
        },
        onFocus: ({ target }) => {
            target.style.backgroundColor = '#fff'
            target.style.color = '#212121'
            target.style.borderRadius = "2px"
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
                name="title" />{<ToggleFormIcon onClick={onToggleComposer} className={`toggle-form-icon ${isComposerOpen && 'close'}`} />}</form>
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