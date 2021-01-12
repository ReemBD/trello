import React, { Component } from 'react'
import { Link, NavLink } from 'react-router-dom'

export class AppHeader extends Component {
    render() {
        return (
            <header className="nav-header flex">
                <div className="logo"></div>
                <ul className="main-nav flex clear-list">
                    <li><NavLink to="/">Home</NavLink></li>
                    <li><NavLink to="/board">Boards</NavLink></li>
                    <li><NavLink to="/login">login</NavLink></li>
                    <li><NavLink to="/signup">signup</NavLink></li>
                </ul>
            </header>
        )
    }
}
