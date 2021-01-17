import React, { Component } from 'react'
import { TaskList } from './TaskList'
import { boardService } from '../services/boardService'
import { setCurrPopover } from '../store/actions/popoverActions'
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import { connect } from 'react-redux'
import { updateBoard } from '../store/actions/boardActions'
import { utilService } from '../services/utilService'

export class _Board extends Component {
    state = {
        listColors: ['#9895e0', '#4a94f8', '#56c991', '#3cc2e0', '#eb5a46'],
        listToAdd: {
            title: '',
            tasks: [],
            style: {
                title: { bgColor: '' }
            }
        }
    }

    elListTitleRef = React.createRef()

    addListHandlers = {
        onClick: (ev) => {
            ev.stopPropagation()
            this.elListTitleRef.current.focus()
            const { setCurrPopover } = this.props
            setCurrPopover('LIST_ADD')
        },
        onSubmit: ev => {
            ev.preventDefault()
            const { board, updateBoard } = { ...this.props }
            const { listToAdd } = { ...this.state }
            const listToAddIdx = board.lists.length
            let listColor = this.state.listColors[listToAddIdx]
            if (!listColor) listColor = utilService.getRandomColor()
            listToAdd.id = utilService.makeId()
            listToAdd.style.title.bgColor = listColor
            board.lists.push(listToAdd)
            this.setState({
                listToAdd: {
                    title: '',
                    tasks: [],
                    style: {
                        title: { bgColor: '' }
                    }
                }
            })
            updateBoard(board)
        }
    }

    handleChange = ({ target }) => {
        const { name, value } = target
        this.setState(prevState => ({ listToAdd: { ...prevState.listToAdd, [name]: value } }))
    }


    render() {
        const { board, currPopover, setCurrPopover } = this.props
        const { lists } = board
        const isCurrPopover = (currPopover === 'LIST_ADD')
        const { isAdding, listToAdd } = this.state
        if (!board) return <h1>loading...</h1>
        return (
            <div className="board main-layout">
                <h1 className="board-title">{board.title}</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat adipisci cupiditate est provident voluptate aspernatur perferendis, natus illo nesciunt. Et?</p>
                <ul className="lists-group clear-list flex">
                    {lists.map(list => <li key={list.id} className="task-list-container flex column"><TaskList list={list} title={list.title} setCurrPopover={setCurrPopover} /></li>)}
                    <li className="add-list task-list-container flex column">
                        <form {...this.addListHandlers} className={`add-list-form  flex column ${isCurrPopover && 'open'}`}>
                            <div className="input-wrapper align-center flex">
                                {!isCurrPopover && <AddIcon />}
                                <input type="text" value={listToAdd.title} className="add-list-title" placeholder="Add New List" name="title" autoComplete="off" ref={this.elListTitleRef} onChange={this.handleChange} />
                            </div>
                            <button type="submit" className={`add-list-btn primary-btn ${isCurrPopover && 'open'}`}>Add list</button>
                        </form>
                    </li>
                </ul>
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
    updateBoard,
    setCurrPopover
}

export const Board = connect(mapStateToProps, mapDispatchToProps)(_Board)