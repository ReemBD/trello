import { Component } from 'react'
import { boardService } from '../services/boardService.js'
import { userService } from '../services/userService.js'
import { withRouter } from 'react-router-dom'
import { utilService } from '../services/utilService.js'

export class _ComposeBoard extends Component {

    state = {
        isMembersPreviewOpen: false,
        newBoard: {
            title: '',
            members: [],
            bg: '',
        },
        users: []
    }

    componentDidMount() {
        this.loadUsers()
    }

    onAddBoard = async (ev) => {
        ev.preventDefault()
        const { newBoard } = this.state
        const savedBoard = await boardService.save(newBoard)//add a new board to data
        console.log(savedBoard);
        this.props.history.push(`/board/${savedBoard._id}`)//then gos to the board page
    }


    //gets all the users from the data
    loadUsers = async () => {
        const users = await userService.getUsers()
        this.setState({ users })
    }


    //toggle the members list on the add board form
    toggleMembersPreview = () => {
        const lastState = this.state.isMembersPreviewOpen
        this.setState({ isMembersPreviewOpen: !lastState })
    }

    addMember = (user) => {
        console.log('user:', user);
        const users = this.state.users
        const teamMembers = this.state.newBoard.members
        teamMembers.unshift(user)

        users.map(currUser => { return currUser._id !== user._id })

        this.setState({ users, newBoard: { ...this.state.newBoard, members: teamMembers } })
        console.log(this.state.newBoard);
    }

    handleInput = ({ target }) => {
        const value = target.value
        this.setState({ newBoard: { ...this.state.newBoard, title: value } })
    }


    render() {
        const { isMembersPreviewOpen, users, newBoard } = this.state
        return (
            <form className="board-composer" onClick={(ev) => ev.stopPropagation()} onSubmit={this.onAddBoard} >

                <input type="text" onChange={this.handleInput} placeholder="Enter Board title here" name="title" value={newBoard.title} />
                <button type="button" onClick={(ev) => this.toggleMembersPreview(ev)} > Add Members</button>
                <ul className={`clear-list ${!isMembersPreviewOpen && 'hidden'}`} >
                    {users.map(user => <li key={user._id} > <img className="AvatarPic" src={user.imgUrl} />{user.fullname} <button type="button" onClick={() => this.addMember(user)}>+</button> </li>)}
                </ul>
                <button>Create Board</button>


            </form>
        )
    }
}

export const ComposeBoard = withRouter(_ComposeBoard)
