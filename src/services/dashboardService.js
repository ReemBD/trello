import { zonedTimeToUtc, utcToZonedTime, format } from 'date-fns-tz'

export const dashboardService = {
    getTasksPerPeopleData,
    getActivityPerDayData,
    getTasksPerDayData
}

function getTasksPerPeopleData(board) {
    const labels = board.members.map(member => member.fullname)
    var boardTasks = []
    board.lists.forEach(list => {
        boardTasks = [...boardTasks, ...list.tasks]
    })
    const tasksPerPerson = boardTasks.reduce((acc, task) => {
        task.members?.length && task.members.forEach(member => {
            const currIdx = labels.indexOf(member.fullname)
            acc[currIdx] = acc[currIdx] ? acc[currIdx] + 1 : 1
        })

        return acc
    }, [])
    return {
        labels, tasksPerPerson, data: {
            labels,
            datasets: [{
                data: tasksPerPerson,
                backgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56'
                ],
                hoverBackgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56'
                ]
            }]
        }
    }
}

function getActivityPerDayData(board) {
    var labels = []

    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const date = new Date()
    const zonedDate = utcToZonedTime(date, timeZone)

    for (var i = 0; i < 6; i++) {
        labels[i] = format(zonedDate, 'LLL') + ' ' + (zonedDate.getDate() - i)
    }

    const activityPerDay = board.activities.reduce((acc, activity) => {
        const zonedCreatedAt = utcToZonedTime(new Date(activity.createdAt), timeZone)
        const formattedTime = format(zonedCreatedAt, 'LLL') + ' ' + (zonedCreatedAt.getDate())
        const currIdx = labels.indexOf(formattedTime)
        if (currIdx !== -1) acc[currIdx] = acc[currIdx] ? acc[currIdx] + 1 : 1
        return acc
    }, [])

    return {
        labels,
        datasets: [
            {
                label: 'Activity',
                data: activityPerDay,
                barPercentage: 0.8,
                borderColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#FFCE56',
                    '#FFCE56',
                    '#FFCE56',
                    '#FFCE56',
                ],
                borderWidth: 2,
                backgroundColor: [
                    '#FF638450',
                    '#36A2EB50',
                    '#FFCE56',
                    '#FFCE56',
                    '#FFCE56',
                    '#FFCE56',
                    '#FFCE56',
                ],
                hoverBackgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#FFCE56',
                    '#FFCE56',
                    '#FFCE56',
                    '#FFCE56',
                ]
            }
        ]
    }
}

function getTasksPerDayData(board) {
    var labels = []

    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const date = new Date()
    const zonedDate = utcToZonedTime(date, timeZone)

    for (var i = 0; i < 6; i++) {
        labels[i] = format(zonedDate, 'LLL') + ' ' + (zonedDate.getDate() - i)
    }

    var boardTasks = []
    board.lists.forEach(list => {
        boardTasks = [...boardTasks, ...list.tasks]
    })

    const tasksPerDay = boardTasks.reduce((acc, task) => {
        const zonedCreatedAt = utcToZonedTime(new Date(task.createdAt), timeZone)
        const formattedTime = format(zonedCreatedAt, 'LLL') + ' ' + (zonedCreatedAt.getDate())
        const currIdx = labels.indexOf(formattedTime)
        if (currIdx !== -1) acc[currIdx] = acc[currIdx] ? acc[currIdx] + 1 : 1
        return acc
    }, [])

    return {
        labels,
        datasets: [
            {
                label: 'Activity',
                data: tasksPerDay,
                barPercentage: 0.8,
                borderColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#FFCE56',
                    '#FFCE56',
                    '#FFCE56',
                    '#FFCE56',
                ],
                borderWidth: 2,
                backgroundColor: [
                    '#FF638450',
                    '#36A2EB50',
                    '#FFCE56',
                    '#FFCE56',
                    '#FFCE56',
                    '#FFCE56',
                    '#FFCE56',
                ],
                hoverBackgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#FFCE56',
                    '#FFCE56',
                    '#FFCE56',
                    '#FFCE56',
                ]
            }
        ]
    }
}

