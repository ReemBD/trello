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

    onOpenComposer = () => {
        this.setState({ isComposerOpen: true })
    }
    render() {
        const { list } = this.props
        const { tasks } = list
        const { isComposerOpen } = this.state

        return (
            <div className="task-list">
                <h1>This is list: {this.props.list.title}</h1>
                {tasks.map(task => <TaskPreview key={task.id} task={task} />)}
                <button className={`open-composer-btn ${isComposerOpen && 'hidden'}`} onClick={this.onOpenComposer}>Add Task</button>
                <form className={`task-composer ${!isComposerOpen && 'hidden'}`} action="">
                    <input type="text" name="title" placeholder="Enter a title for this card... " autoComplete="off" id="" />
                    <button className="save-task-btn">Add</button>
                </form>
            </div>
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