import { Component } from 'react'
import { connect } from 'react-redux'
import { updateBoard } from '../store/actions/boardActions'
import { TaskPreview } from './TaskPreview'

class _TaskList extends Component {
    state = {

    }

    componentDidMount() {

    }

    render() {
        const { board } = this.props
        const { tasks } = this.props.list
        return (
            <div className="task-list">
                <h1>This is list: {this.props.list.title}</h1>
                {tasks.map(task => <TaskPreview key={task.id} task={task} />)}
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

export const TaskList = connect(mapStateToProps)(_TaskList)