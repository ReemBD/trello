import React, { Component } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { connect } from 'react-redux'

export class _AppHeader extends Component {
    render() {
        return (
            <header className="main-nav-header flex">
                {/* this.props.isOverlayOpen && */ <div className="main-overlay"></div>}
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


const mapStateToProps = state => {
    const { isOverlayOpen } = state.boardReducer
    return {
        isOverlayOpen
    }
}

export const AppHeader = connect(mapStateToProps)(_AppHeader)