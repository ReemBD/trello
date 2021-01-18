import React, { Component } from 'react'
import { boardService } from '../services/boardService'
import { utilService } from '../services/utilService'
import { connect } from 'react-redux'
import { updateBoard } from '../store/actions/boardActions'
import { cloneDeep } from 'lodash'
import FormatListBulletedRoundedIcon from '@material-ui/icons/FormatListBulletedRounded';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';

export class _TaskDetailsChecklist extends Component {

    state = {
        checklists: [],
        newTodo: {
            txt: ''
        }

    }

    elTodoRef = React.createRef()


    componentDidMount() {
        const { checklists } = this.props.task
        const copyChecklists = cloneDeep(this.state.checklists)
        checklists?.map(checklist => copyChecklists.push(checklist))
        this.setState({ checklists: copyChecklists })
    }


    handleInput = (idx, { target }) => {
        const field = target.name
        const value = target.value
        const checkListToUpdate = cloneDeep(this.state.checklists[idx])
        const checklistsCopy = cloneDeep(this.state.checklists)
        checkListToUpdate[field] = value
        checklistsCopy[idx] = checkListToUpdate
        this.setState({ checklists: checklistsCopy })
    }


    handleCheckbox = (todoIdx, listIdx, ev) => {
        console.log('the list idx and todo idx', listIdx, todoIdx)
        const copyChecklists = cloneDeep(this.state.checklists)
        copyChecklists[listIdx].todos[todoIdx].isDone = ev.target.checked
        this.setState({ checklists: copyChecklists }, () => {
            this.onUpdateBoard()
        })
    }

    handleTodoChange = (todoIdx, listIdx, ev) => {
        console.log('the list idx and todo idx is', listIdx, todoIdx);
        const copyChecklists = cloneDeep(this.state.checklists)
        copyChecklists[listIdx].todos[todoIdx].title = ev.target.value
        this.setState({ checklists: copyChecklists })
    }

    percentDone = (checklist) => {
        console.log('from function', checklist)
        const doneTodos = checklist.todos.filter(todo => todo.isDone)
        const percent = parseInt((doneTodos.length / checklist.todos.length) * 100)
        console.log('THE PERCENT IS: ', percent)
        return percent
    }

    handleNewTodo = (ev) => {
        const field = ev.target.name
        const value = ev.target.value
        this.setState(prevState => {
            return {
                newTodo: {
                    ...prevState.newTodo,
                    [field]: value
                }
            }
        })
    }

    onEnterPress = ev => {
        if (!ev.target.value) return
        if (ev.keyCode === 13 && ev.shiftKey === false) {
            ev.preventDefault()
            this.onUpdateBoard()
        }
    }

    onUpdateBoard = async () => {
        const { board, list, task } = this.props
        const { checklists } = this.state
        const boardCopy = cloneDeep(board)
        const listIdx = boardService.getListIdxById(board, list.id)
        const taskIdx = boardService.getTaskIdxById(list, task.id)
        boardCopy.lists[listIdx].tasks[taskIdx].checklists = checklists
        await this.props.updateBoard(boardCopy)
        this.elTodoRef.current?.blur()
    }

    onRemoveTodo = (todoIdx, listIdx, ev) => {
        let copyChecklists = cloneDeep(this.state.checklists)
        copyChecklists[listIdx].todos.splice(todoIdx, 1)
        this.setState({ checklists: copyChecklists }, () => this.onUpdateBoard())

    }

    onAddItem = (listIdx, ev) => {
        if (!ev.target.value) return
        if (ev.keyCode === 13 && ev.shiftKey === false) {
            const todoToAdd = {
                id: utilService.makeId(),
                title: this.state.newTodo.txt,
                isDone: false
            }
            const copyChecklists = cloneDeep(this.state.checklists)
            copyChecklists[listIdx].todos.push(todoToAdd)
            this.setState({ checklists: copyChecklists }, () => {
                this.onUpdateBoard()
                const newTodo = { txt: '' }
                this.setState({ newTodo })
            })
        }
    }

    render() {
        const { board, list, task } = this.props
        const { checklists, newTodo } = this.state
        const { percentDone } = this
        if (!checklists) return <div>Loading...</div>
        return (
            <div className="task-checklist">
                { checklists?.map((checklist, listIdx) => {
                    return <div className="checklist-header">
                        <FormatListBulletedRoundedIcon style={{ position: 'absolute', left: '-30px', top: '3px' }} />
                        <textarea
                            className="task-textarea"
                            value={checklist.title}
                            style={{ width: 'auto' }}
                            name="title"
                            onChange={(ev) => this.handleInput(listIdx, ev)}
                            spellCheck="false"
                            onKeyDown={this.onEnterPress}
                            ref={this.elTodoRef}
                        />
                        <LinearProgressWithLabel value={percentDone(checklist)} />
                        {checklist?.todos &&
                            checklist.todos.map((todo, todoIdx) => {
                                return <div className="task-todo-container flex align-center justify-center">
                                    <input
                                        type="checkbox"
                                        name="checkbox"
                                        onChange={(ev) => this.handleCheckbox(todoIdx, listIdx, ev)}
                                        checked={todo.isDone}
                                    />
                                    <input
                                        type="text"
                                        className={`${todo.isDone && "checked"} todo-title task-todo-input`}
                                        value={todo.title}
                                        onChange={(ev) => this.handleTodoChange(todoIdx, listIdx, ev)}
                                        onKeyDown={this.onEnterPress}
                                        ref={this.elTodoRef}
                                        onBlur={this.onUpdateBoard}
                                    />
                                    <DeleteOutlinedIcon className="todo-delete-btn" onClick={(ev) => this.onRemoveTodo(todoIdx, listIdx, ev)} />
                                </div>

                            })

                        }
                        <input
                            type="text"
                            name="txt"
                            placeholder="Add an item"
                            className="task-todo-input"
                            value={newTodo.txt}
                            onChange={this.handleNewTodo}
                            onKeyDown={(ev) => this.onAddItem(listIdx, ev)}
                            onBlur={() => {
                                const newTodo = { txt: '' }
                                this.setState({ newTodo })
                            }}
                        />
                    </div>
                })
                }
            </div >
        )
    }
}



const mapDispatchToProps = {
    updateBoard,
}

const mapStateToProps = state => {
    return {
        currListIdx: state.boardReducer.currListIdx,
    }
}

export const TaskDetailsChecklist = connect(mapStateToProps, mapDispatchToProps)(_TaskDetailsChecklist)


function LinearProgressWithLabel(props) {
    return (
        <Box display="flex" alignItems="center">
            <Box width="100%" mr={1}>
                <LinearProgress variant="determinate" {...props} />
            </Box>
            <Box minWidth={35}>
                <Typography variant="body2" color="textSecondary">{`${Math.round(
                    props.value,
                )}%`}</Typography>
            </Box>
        </Box>
    );
}

LinearProgressWithLabel.propTypes = {

    value: PropTypes.number.isRequired,
};

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
});

export default function LinearWithValueLabel() {
    const classes = useStyles();
    const [progress, setProgress] = React.useState(10);

    React.useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prevProgress) => (prevProgress >= 100 ? 10 : prevProgress + 10));
        }, 800);
        return () => {
            clearInterval(timer);
        };
    }, []);

    return (
        <div className={classes.root}>
            <LinearProgressWithLabel value={progress} />
        </div>
    );
}

