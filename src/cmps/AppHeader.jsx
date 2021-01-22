import React, { Component } from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import PersonRoundedIcon from '@material-ui/icons/PersonRounded';
import AppsIcon from '@material-ui/icons/Apps';
import { connect } from 'react-redux'
import { clearUser } from '../store/actions/userAction'
import { eventBusService } from '../services/eventBusService'

export class _AppHeader extends Component {
    state = {
        navBgc: ''
    }

    componentDidMount() {
        document.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                this.setState({ navBgc: 'colored-nav' })
            } else {
                this.setState({ navBgc: 'homepage-nav' })
            }
        })
    }

    logout() {
        eventBusService.emit('logout')
    }

    render() {
        const currPath = this.props.history.location.pathname
        const { navBgc } = this.state
        const { user } = this.props
        console.log('user from header:', user);
        return (
            <header className={`main-nav-header flex  ${currPath === '/' ? navBgc : ''}`}>
                <div className="logo"></div>
                <ul className="main-nav flex clear-list flex ">
                    <li className="logo"><NavLink to="/"><span>Chello</span></NavLink></li>
                    <li><NavLink to="/board"><AppsIcon /><span>Boards</span></NavLink></li>
                    {!user && <li><NavLink to="/login"><PersonRoundedIcon /><span >Login</span></NavLink></li>}
                    {user && <li className="user-desc flex align-center"> <img className="avatar-header" src={user.imgUrl} /> Hello {user.fullname}  </li>}
                    {user && <li className="logout flex align-center" onClick={this.logout} > Logout </li>}
                </ul>
            </header>
        )
    }
}



const mapStateToProps = state => {
    return {
        isOverlayOpen: state.boardReducer.isOverlayOpen,
        user: state.userReducer.user

    }
}


const mapDispatchToProps = {
    clearUser
}




export const AppHeader = connect(mapStateToProps, mapDispatchToProps)(withRouter(_AppHeader))