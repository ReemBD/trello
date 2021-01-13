import { Component } from 'react'
import { connect } from 'react-redux'
import { updateBoard } from '../store/actions/boardActions'
import { TaskPreview } from './TaskPreview'

class _TaskList extends Component {
    state = {
        board: null,
        task: {
            title: '',
            description: '',
        },
        isComposerOpen: false
    }

    componentDidMount() {
        const { board } = this.props
        this.setState({ board: { ...board } })
    }

    onAddTask = () => {
        const { task } = this.state
    }
    handleChange = ev => {
        const { name, value } = ev.target
        const boardCopy = { ...this.state.board }
        this.setState(prevState => ({ board: { ...prevState.board, [name]: value } }))
    }
    onToggleComposer = ev => {
        ev.stopPropogation()
        this.setState({ isComposerOpen: !this.state.isComposerOpen })
    }
    render() {
        const { list } = this.props
        const { tasks } = list
        const { isComposerOpen } = this.state
        const toggleFormBtn = isComposerOpen ? <i class="fas fa-times" onClick={this.onToggleComposer}></i> : <i className="fas fa-plus" onClick={this.onToggleComposer}></i>
        return (
            <article className="task-list">
                <div className="list-title flex align-center" style={{ backgroundColor: `${list.style.title.bgColor}` }}><input value={this.props.list.title} /> {toggleFormBtn}</div>
                <form className={`task-composer ${!isComposerOpen && 'display-none'}`} action="">
                    <input type="text" name="title" onChange={this.handleChange} placeholder="Enter a title for this card... " autofocus autoComplete="off" id="" />
                    <textarea type="text" name="title" onChange={this.handleChange} placeholder="Enter description for this card... " autoComplete="off" id="" />
                    <button className="save-task-btn">Add</button>
                </form>
                {tasks.map(task => <TaskPreview key={task.id} task={task} />)}
            </article>
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

export const TaskList = connect(mapStateToProps, mapDispatchToProps)(_TaskList)