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
    onDragEnd = (res) => {
        const { destination, source, type } = res;

        if (!destination) return

        if (//if the item stayed in the same spot 
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) return;

        const copyBoard = { ...this.props.board }

        if (type === 'task') {

            const sourceListIdx = boardService.getListIdxById(copyBoard, source.droppableId)
            const destinationListIdx = boardService.getListIdxById(copyBoard, destination.droppableId)

            const task = copyBoard.lists[sourceListIdx].tasks.splice(source.index, 1);
            copyBoard.lists[destinationListIdx].tasks.splice(destination.index, 0, task[0]);

        } else {

            const list = copyBoard.lists.splice(source.index, 1);
            copyBoard.lists.splice(destination.index, 0, list[0]);

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
            <div className="board board-layout" style={{ height: "82vh" }}>

                <DragDropContext onDragEnd={this.onDragEnd} >
                    <Droppable
                        droppableId="all-columns"
                        direction="horizontal"
                        type="list"
                    >
                        {provided => (
                            <ul
                                className="lists-group clear-list flex  "
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                            >
                                {lists.map((list, idx) =>
                                    <TaskList
                                        key={list.id} list={list} listIdx={idx}
                                        title={list.title} {...this.props}
                                    />)}

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