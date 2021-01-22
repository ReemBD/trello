import { Component } from 'react';
import { Line } from 'react-chartjs-2'
import { dashboardService } from '../../services/dashboardService'


export default class MyChart extends Component {
    state = {
        data: {}
    }

    componentDidMount() {
        const { board } = this.props,
            data = dashboardService.getTasksPerDayData(board)
        this.setState({ data })
    }

    render() {
        const { data } = this.state
        return (
            <div className="tasks-per-person">
                <h3>New Tasks per Day</h3>
                <Line data={data} height={400} />
            </div>
        );
    }
}
