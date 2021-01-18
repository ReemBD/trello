import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateBoard, toggleOverlay } from '../store/actions/boardActions'
import { boardService } from '../services/boardService'
import { setCurrPopover } from '../store/actions/popoverActions'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { ListActions } from './ListActions'

export class _ListTitle extends Component {
    state = {
        title: ''
    }

    elListTitleRef = React.createRef()

    componentDidMount() {
        const { title } = this.props
        this.setState({ title })
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

    onToggleListActions = (ev) => {
        ev.stopPropagation()
        console.log('hellp from on toggle list acctions');
            // const { setCurrPopover, currPopover } = this.props
            (this.props.currPopover === `LIST_ACTIONS${this.props.list.id}`) ? this.props.setCurrPopover() : this.props.setCurrPopover(`LIST_ACTIONS${this.props.list.id}`)

    }

    render() {
        const { list, isComposerOpen } = this.props
        const isCurrPopover = (this.props.currPopover === `LIST_ACTIONS${this.props.list.id}`)
        if (!list) return <h1>Loading...</h1>
        return (
            <form onSubmit={this.onPressEnter}
                autoComplete="off"
                className="list-title flex align-center"
                style={{ backgroundColor: `${list.style.title.bgColor}` }}>
                <input {...this.listTitleHandlers}
                    placeholder="Enter list title"
                    ref={this.elListTitleRef}
                    value={this.state.title}
                    name="title" />
                <div className="list-actions-popover-wrapper">
                    {<MoreHorizIcon onClick={this.onToggleListActions} className={`toggle-actions-icon ${isComposerOpen && 'close'}`} />}
                    {isCurrPopover && <ListActions {...this.props} />}
                </div>
            </form>
        )
    }
}



const mapStateToProps = state => {
    return {
        board: state.boardReducer.currBoard,
    }
}

const mapDispatchToProps = {
    updateBoard,
    toggleOverlay
}

export const ListTitle = connect(mapStateToProps, mapDispatchToProps)(_ListTitle)