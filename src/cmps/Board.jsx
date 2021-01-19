import React, { Component } from 'react'
import { TaskList } from './TaskList'
import { boardService } from '../services/boardService'
import AddIcon from '@material-ui/icons/Add';
import { connect } from 'react-redux'
import { updateBoard } from '../store/actions/boardActions'
import { utilService } from '../services/utilService'
import { DragDropContext, Droppable } from 'react-beautiful-dnd';


export class _Board extends Component {
    state = {
        listColors: ['#9895E0', '#4A94F8', '#56c991', '#3cc2e0', '#eb5a46'],
        listToAdd: {
            title: '',
            tasks: [],
            style: {
                bgColor: '',
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
            listToAdd.style.bgColor = listToAdd.style.title.bgColor + '82'
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

    // activate when a dragged item is released
    onDragEnd = async (res) => {
        const { destination, source, draggableId, type } = res;
        // LOOK LIKE THIS:
        // destination: {droppableId: "g103", index: 0}
        // draggableId: "e101"
        // source: {index: 0, droppableId: "opd23"}

        if (!destination) return

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) return;

        const copyBoard = { ...this.props.board }

        if (type === 'task') {

            const sourceListIdx = await boardService.getListIdxById(copyBoard, source.droppableId)
            const destinationListIdx = await boardService.getListIdxById(copyBoard, destination.droppableId)
            const task = await boardService.getTaskById(copyBoard._id, draggableId)

            copyBoard.lists[sourceListIdx].tasks.splice(source.index, 1);
            copyBoard.lists[destinationListIdx].tasks.splice(destination.index, 0, task);

        } else {

            const list = copyBoard.lists.splice(source.index, 1);
            copyBoard.lists.splice(destination.index, 0, list);
        }

        this.props.updateBoard(copyBoard)
    }



    render() {
        const { board, currPopover, } = this.props
        const { lists } = board
        const isCurrPopover = (currPopover === 'LIST_ADD')
        const { listToAdd } = this.state
        if (!board) return <h1>loading...</h1>
        return (
            <div className="board board-layout">

                <DragDropContext onDragEnd={this.onDragEnd}>
                    <Droppable
                        droppableId="all-columns"
                        direction="horizontal"
                        type="list"
                    >
                        {provided => (
                            <ul
                                className="lists-group clear-list flex"
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                            >
                                {lists.map((list, idx) => <li key={list.id} style={{ backgroundColor: list.style?.bgColor }} className="task-list-container flex column"><TaskList list={list} listIdx={idx} title={list.title} {...this.props} /></li>)}
                                {provided.placeholder}


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
                        )}
                    </Droppable>
                </DragDropContext>
               
            </div >
        )
    }
}




const mapStateToProps = state => {
    return {
        currPopover: state.popoverReducer.currPopover
    }
}

const mapDispatchToProps = {
    updateBoard,
}

export const Board = connect(mapStateToProps, mapDispatchToProps)(_Board)