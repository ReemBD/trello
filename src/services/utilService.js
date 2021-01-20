
export const utilService = {
    delay,
    getRandomInt,
    makeId,
    formatTime,
    getRandomColor,
    formActivity
}

function delay(ms = 1500) {
    return new Promise(resolve => {
        setTimeout(resolve, ms)
    })
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

function makeId(length = 5) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}

function formActivity({ user, txt }) {
    return {
        id: makeId(),
        createdAt: Date.now(),
        txt,
        byMember: { imgUrl: user.imgUrl, fullname: user.fullname || 'Guest' },
    }
}
function formatTime(timestamp) {
    const date = new Date(timestamp).toLocaleDateString();
    return date;
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
