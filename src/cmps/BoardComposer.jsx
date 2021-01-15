import { Component } from 'react'
import React, { Fragment } from 'react'
import { boardService } from '../services/boardService.js'
import { userService } from '../services/userService.js'
import { withRouter } from 'react-router-dom'
import { utilService } from '../services/utilService.js'
import { styleService } from '../services/styleService.js'
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

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
        this.setState({ filterMembersBy: value })
    }

    // getFilteredUsers = () => {
    //     var { users, filterMembersBy } = this.state
    //     return users.filter(user=>return user.fullname.includs )

    // }


    handleClick = (event) => {
        this.setState({ anchorEl: event.currentTarget })
    };

    handleClose = () => {
        this.setState({ anchorEl: null })
    }



    render() {
        const { users, bgs, newBoard } = this.state
        console.log('newBoard:', newBoard);
        return (
            <Fragment>
                <form className="board-composer" onClick={(ev) => ev.stopPropagation()} onSubmit={this.onAddBoard} >
                    <div className="flex justify-content">

                        <div className="demo-board board-card  flex justify-center align-center" style={{ background: newBoard.style.bg }}>
                            <textarea className="title" onChange={this.handleInput} placeholder="Enter Board title " name="title" autoComplete="off" value={newBoard.title} />
                        </div>


                    </div>
                    <textarea
                        placeholder="Description"
                        value={newBoard.description}
                        name="description"
                        onChange={this.handleInput}
                        spellCheck="false"
                    />
                    <div>
                        <Button style={{ borderRadius: '100px' }} aria-controls="simple-menu" aria-haspopup="true" onClick={this.handleClick}>
                            <GroupAddIcon />  </Button>
                        <Menu
                            id="simple-menu"
                            anchorEl={this.state.anchorEl}
                            keepMounted
                            open={Boolean(this.state.anchorEl)}
                            onClose={this.handleClose} >
                            {/* < MenuItem onClick={() => this.addMember(user)}> */}

                            <MenuItem> <input type="text" placeholder="Search Members" name="filterMembersBy" value={this.state.filterMembers} onChange={this.filterMembers} /> </MenuItem>
                            {users.map(user =>
                                < MenuItem onClick={() => this.addMember(user)}><img key={user._id} className="AvatarPic" title={user.fullname} src={user.imgUrl} /><h4>{user.fullname}</h4> </MenuItem>
                            )
                            }

                        </Menu>
                        {newBoard.members.map(member => <img className="AvatarPic preview" src={member.imgUrl} onClick={() => this.removeMember(member)} title={member.fullname} />)} </div>






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
