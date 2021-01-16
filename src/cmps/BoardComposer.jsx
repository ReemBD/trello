import { Component } from 'react'
import React, { Fragment } from 'react'
import { boardService } from '../services/boardService.js'
import { userService } from '../services/userService.js'
import { withRouter } from 'react-router-dom'
import { utilService } from '../services/utilService.js'
import { styleService } from '../services/styleService.js'
import ClearIcon from '@material-ui/icons/Clear';
import AddIcon from '@material-ui/icons/Add';
import GroupAddIcon from '@material-ui/icons/GroupAdd';

export class _BoardComposer extends Component {

    state = {
        isMembersPreviewOpen: false,
        newBoard: {
            title: '',
            members: [],
            style: {
                bg: '#fff'
            },
            description: ''
        },
        users: [],
        bgs: [],
        anchorEl: null,
        filterMembersBy: ''
    }

    componentDidMount() {
        this.loadUsers()
        this.loadBgs()
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

    //gets all the bg style options from the data
    loadBgs = async () => {
        const bgs = await styleService.getBgOptions()
        this.setState({ bgs })
    }



    addMember = (user) => {
        var users = this.state.users
        const members = this.state.newBoard.members
        members.unshift(user)
        users = users.filter(currUser => { return currUser._id !== user._id })

        this.setState({ users, newBoard: { ...this.state.newBoard, members } })
    }

    removeMember = (user) => {
        var users = this.state.users
        var members = this.state.newBoard.members
        members = members.filter(currMember => { return currMember._id !== user._id })
        users.unshift(user)
        this.setState({ users, newBoard: { ...this.state.newBoard, members } })
    }



    handleInput = ({ target }) => {
        const value = target.value
        const field = target.name
        this.setState(prevState => {
            return {
                newBoard: {
                    ...prevState.newBoard,
                    [field]: value
                }
            }
        })

    }



    setBg = (bg) => {
        this.setState({
            newBoard: {
                ...this.state.newBoard,
                style: { ...this.state.newBoard.style, bg }
            }
        })
    }


    filterMembers = ({ target }) => {
        const value = target.value
        this.setState({ filterMembersBy: value }, () => this.getUsers())
        this.setState({ isMembersPreviewOpen: true })


    }


    getUsers = async () => {
        const { filterMembersBy } = this.state
        const usersToShow = await userService.filterUsersBy(filterMembersBy)
        this.setState({ users: usersToShow })
    }


    toggleMemberPreview = () => {
        const memberPreview = this.state.isMembersPreviewOpen
        this.setState({ isMembersPreviewOpen: !memberPreview })
    }
    closeMembersPreview = () => {
        console.log('blabla');
        this.setState({ isMembersPreviewOpen: false })
        console.log('isMembersPreviewOpen', this.state.isMembersPreviewOpen);
    }


    render() {
        const { users, bgs, newBoard, isMembersPreviewOpen } = this.state
        console.log('usersss', users);
        console.log('newBoard:', newBoard);

        return (
            <Fragment>
                <form className="board-composer" onClick={(ev) => ev.stopPropagation()} onSubmit={this.onAddBoard} >
                    <div className="flex justify-center">

                        <div className="demo-board board-card  flex justify-center align-center" style={{ background: newBoard.style.bg }}>
                            <textarea className="title" onChange={this.handleInput} placeholder="Enter Board title " name="title" autoComplete="off" value={newBoard.title} />
                        </div>


                    </div>

                    <div className="flex row dec">
                        <textarea
                            placeholder="Description"
                            value={newBoard.description}
                            name="description"
                            onChange={this.handleInput}
                            spellCheck="false"
                        />
                        <span>
                            <GroupAddIcon className="addIcon" onClick={this.toggleMemberPreview} />
                            <div className={`members-popup ${!isMembersPreviewOpen && 'transparent'} `}>
                                <input type="text" placeholder="Add Members" name="filterMembersBy" value={this.state.filterMembers} onChange={this.filterMembers} /><ClearIcon onClick={this.closeMembersPreview} />
                                <ul className={`clear-list ${!isMembersPreviewOpen && 'transparent'}`}>

                                    {users.map(user => <li className="flex row align-center">
                                        <img key={user._id} className="AvatarPic" title={user.fullname} src={user.imgUrl} /><h4>{user.fullname}</h4><AddIcon className="icon" />
                                    </li>)}
                                </ul>
                            </div>

                        </span>
                    </div>


                    <div className="bg-options">
                        {bgs.map(bg => {
                            return <div className="bg-preview" key={utilService.makeId()} onClick={() => this.setBg(bg)} style={{ background: bg }}> </div>
                        })}

                    </div>
                    <button>Create Board</button>
                </form>


            </Fragment >
        )
    }
}

export const BoardComposer = withRouter(_BoardComposer)
