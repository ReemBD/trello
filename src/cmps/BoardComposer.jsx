import { Component } from 'react'
import React, { Fragment } from 'react'
import { boardService } from '../services/boardService.js'
import { userService } from '../services/userService.js'
import { withRouter } from 'react-router-dom'
import { utilService } from '../services/utilService.js'
import { styleService } from '../services/styleService.js'
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
        bgs: []
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


    //toggle the members list on the add board form
    toggleMembersPreview = () => {
        const lastState = this.state.isMembersPreviewOpen
        this.setState({ isMembersPreviewOpen: !lastState })
    }



    addMember = (user) => {
        console.log('user:', user);
        const users = this.state.users
        const members = this.state.newBoard.members
        members.unshift(user)

        users.map(currUser => { return currUser._id !== user._id })

        this.setState({ users, newBoard: { ...this.state.newBoard, members } })
        console.log(this.state.newBoard);
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





    render() {
        const { isMembersPreviewOpen, users, bgs, newBoard } = this.state
        console.log('newBoard:', newBoard);
        return (
            <Fragment>
                <form className="board-composer" onClick={(ev) => ev.stopPropagation()} onSubmit={this.onAddBoard} >
                    <div className="flex">

                        <div className="demo-board board-card  flex justify-center align-center" style={{ background: newBoard.style.bg }}>
                            <textarea className="title" onChange={this.handleInput} placeholder="Enter Board title " name="title" autoComplete="off" value={newBoard.title} />
                        </div>

                        <div onClick={(ev) => this.toggleMembersPreview(ev)} className="member-preview" ><GroupAddIcon /> Add Members
                    <ul className={`clear-list ${!isMembersPreviewOpen && 'hidden'}`} >
                                {users.map(user => <img key={user._id} className="AvatarPic" onClick={() => this.addMember(user)} title={user.fullname} src={user.imgUrl} />)}
                            </ul>
                        </div>

                    </div>
                    <textarea
                        placeholder="Description"
                        value={newBoard.description}
                        name="description"
                        onChange={this.handleInput}
                        spellCheck="false"
                    />
                    <span> members:{newBoard.members.map(member => <img className="AvatarPic" src={member.imgUrl} title={member.fullname} />)} </span>





                    {/* <button type="button" onClick={() => this.addMember(user)}>+</button> */}
                    <div className="bg-options">
                        {bgs.map(bg => {
                            return <div className="bg-preview" key={utilService.makeId()} onClick={() => this.setBg(bg)} style={{ background: bg }}> </div>
                        })}

                    </div>
                    <button>Create Board</button>
                </form>


            </Fragment>
        )
    }
}

export const BoardComposer = withRouter(_BoardComposer)
