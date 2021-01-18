import React, { Component } from 'react'
import LabelOutlinedIcon from '@material-ui/icons/LabelOutlined';
import ChangeMembersIcon from '@material-ui/icons/PeopleOutline';
import QueryBuilderOutlinedIcon from '@material-ui/icons/QueryBuilderOutlined';
import FormatListBulletedRoundedIcon from '@material-ui/icons/FormatListBulletedRounded';
import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined';
import ArrowRightAltOutlinedIcon from '@material-ui/icons/ArrowRightAltOutlined';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
export class TaskSidebar extends Component {

    state = {

    }
    render() {
        return (
            <aside className="sidebar flex column">
                <h3 className="sidebar-heading">Actions</h3>
                <div className="sidebar-actions flex column">
                    <div className="action-container flex align-center">
                        <span className="action-icon"><LabelOutlinedIcon /></span>
                        <span className="action-txt">Labels</span>
                    </div>
                    <div className="action-container flex align-center">
                        <span className="action-icon"><ChangeMembersIcon /></span>
                        <span className="action-txt">Members</span>
                    </div>
                    <div className="action-container flex align-center">
                        <span className="action-icon"><QueryBuilderOutlinedIcon /></span>
                        <span className="action-txt">Due Date</span>
                    </div>
                    <div className="action-container flex align-center">
                        <span className="action-icon"><FormatListBulletedRoundedIcon /></span>
                        <span className="action-txt">Checklist</span>
                    </div>
                    <div className="action-container flex align-center">
                        <span className="action-icon"><ImageOutlinedIcon /></span>
                        <span className="action-txt">Image</span>
                    </div>
                    <div className="action-container flex align-center">
                        <span className="action-icon"><ArrowRightAltOutlinedIcon /></span>
                        <span className="action-txt">Move</span>
                    </div>
                    <div className="action-container flex align-center">
                        <span className="action-icon"><DeleteOutlineOutlinedIcon /></span>
                        <span className="action-txt">Delete</span>
                    </div>
                </div>
            </aside>
        )
    }
}
