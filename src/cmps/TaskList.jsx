import React, { Component } from 'react'
import { TaskPreview } from './TaskPreview'
import { boardService } from '../services/boardService'
import { ListTitle } from './ListTitle'
import { TaskComposer } from './TaskComposer'
import { Droppable, Draggable } from 'react-beautiful-dnd';


export class TaskList extends Component {
    state = {
        isComposerOpen: false,
        isListActionsOpen: false,
    }

    elTaskTitleRef = React.createRef()

    updateBoard = async (board = this.props.board) => {
        await this.props.updateBoard(board)
    }

    onEditTask = () => {
        const { list } = this.props
        const { task } = this.state
        const board = { ...this.props.board }
        const taskIdx = boardService.getTaskIdxById(list, task.id)
        board.lists.tasks[taskIdx] = task
        this.updateBoard()
    }

    listTitleHandlersProps = {
        onRemoveList: () => {
            const listIdx = this.listIdx
            const { board, updateBoard } = { ...this.props }
            board.lists.splice(listIdx, 1)
            updateBoard(board)

        },
        onToggleComposer: ev => {
            ev.stopPropagation()
            this.props.setCurrPopover(`TASK_COMPOSER${this.props.list.id}`)
            this.setState({ isComposerOpen: !this.state.isComposerOpen }, () => {
                this.elTaskTitleRef.current.focus()
            })
        },
        onToggleListActions: ev => {
            //'More...' Popover toggler (from List title)
            ev.stopPropagation()
            this.setState({ isListActionsOpen: !this.state.isListActionsOpen })
        }
    }

    get listIdx() {
        const { list, board } = this.props
        const listIdx = boardService.getListIdxById(board, list.id)
        return listIdx
    }


    render() {
        const { list, currPopover, listIdx } = this.props
        const { tasks } = list
        const { isListActionsOpen } = this.state

        return (
            <Draggable draggableId={list.id} index={listIdx} >

                {provided => (
                    <li
                        style={{ backgroundColor: list.style.bgColor }}
                        className="task-list task-list-container "
                        {...provided.dragHandleProps}
                        {...provided.draggableProps}
                        ref={provided.innerRef}>

                        <ListTitle
                            {...provided.dragHandleProps}
                            {...this.props}
                            isListActionsOpen={isListActionsOpen} />

                        <div className="task-previews-container">
                            <Droppable droppableId={list.id} type="task">
                                {provided => (
                                    <div ref={provided.innerRef} {...provided.droppableProps}>

                                        {tasks ? tasks.map((task, idx) => <TaskPreview key={task.id} taskIdx={idx} {...this.props} task={task} />) : ''}

                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                            <TaskComposer {...this.props} titleRef={this.elTaskTitleRef} isComposerOpen={currPopover === `TASK_COMPOSER${list.id}`} onToggleComposer={this.onToggleComposer} />
                        </div>
                    </li>
                )}
            </Draggable>

        )
    }
}

