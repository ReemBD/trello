import { Bar } from 'react-chartjs-2'
import { dashboardService } from '../../services/dashboardService'

import React, { Component } from 'react'

export default class ActivityPerDay extends Component {
    state = {
      data: {}
    }

    componentDidMount() {
        const { board } = this.props,
             data  =  dashboardService.getActivityPerDayData(board)
        this.setState({data},()=>{
            console.log('Data: ', this.state.data);
        })
    }

    render() {
        const { data } = this.state
        if (!data) return  <h1>Loading</h1>
        return (
            <div>
                <Bar data={data} width={400} height={400} />
            </div>
        )
    }
}
