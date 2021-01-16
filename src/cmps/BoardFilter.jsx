import React, { Component } from 'react'
import SearchIcon from '@material-ui/icons/Search';

export class BoardFilter extends Component {
    render() {
        return (
            <div className="board-filter">
                <SearchIcon/>
            </div>
        )
    }
}
