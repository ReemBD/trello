import React, { Component } from 'react'
import { Link, NavLink } from 'react-router-dom'
import PersonRoundedIcon from '@material-ui/icons/PersonRounded';
import AppsIcon from '@material-ui/icons/Apps';
import { connect } from 'react-redux'

export class _AppHeader extends Component {
    render() {
        return (
            <header className="main-nav-header flex">
                <div className="logo"></div>
                <ul className="main-nav flex clear-list flex ">
                    <li className="logo"><NavLink to="/"><span>Chello</span></NavLink></li>
                    <li><NavLink to="/board"><AppsIcon /><span>Boards</span></NavLink></li>
                    <li><NavLink to="/login"><PersonRoundedIcon /><span>Login</span></NavLink></li>
                </ul>
            </header>
        )
    }
}


const mapStateToProps = state => {
    const { isOverlayOpen } = state.boardReducer
    return {
        isOverlayOpen
    }
}

export const AppHeader = connect(mapStateToProps)(_AppHeader)