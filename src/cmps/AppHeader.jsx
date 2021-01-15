import React, { Component } from 'react'
import { Link, NavLink } from 'react-router-dom'
import HomeIcon from '@material-ui/icons/Home';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AppsIcon from '@material-ui/icons/Apps';
import { connect } from 'react-redux'

export class _AppHeader extends Component {
    render() {
        return (
            <header className="main-nav-header flex">
                <div className="logo"></div>
                <ul className="main-nav flex clear-list ">
                    <li><NavLink to="/"><HomeIcon fontSize="large" /><span> Home</span></NavLink></li>
                    <li><NavLink to="/board"><AppsIcon fontSize="large" /><span>Boards</span></NavLink></li>
                    <li><NavLink to="/login"><AccountCircleIcon fontSize="large" /><span>login</span></NavLink></li>
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