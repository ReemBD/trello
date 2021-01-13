import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export class BoardPreview extends Component {
    render() {
        const { board } = this.props
        return (
            <div>
                <Link to={`/board/${board._id}`}><h1>{board.title}</h1></Link>
            </div>
        )
    }
}
