// i didn't feel like fetching a JSON, also I like comments

const timeList = []; // from 7am to 8pm military time, in increments of 10 min
for (let i = 700; i <= 2000; i += 10) {
    timeList.push(String(i).padStart(4, '0'));
    if (i % 100 === 50) {
        i += 40;
    }
}

// in minutes
const walkTime = {
    'home': 0,
    'E2': 14,
    'thim': 8,
    'baskin': 13,
    'annex': 9,
    'SNE': 8,
    'cowell': 16,
    'soc sci': 5,
    'EMS': 10,
    'cunit': 13,
    'music': 20,
    'mchenry': 17,
};

// schedules, written in a way that's easy to read and easy to edit
const p1Schedule = {
    '1200': 'E2',
    '1440': 'baskin',
    '1550': 'home',
    '1840': 'annex',
    '1950': 'home',
};
const p2Schedule = {
    '0830': 'soc sci',
    '1200': 'EMS',
    '1330': 'SNE',
    '1430': 'home',
}
const p3Schedule = {
    '0800': 'annex',
    '0830': 'home',
    '1130': 'SNE',
    '1400': 'home',
    '1600': 'SNE',
    '1710': 'home',
}

// generate machine readable version of schedules
let p1 = [0];
let p2 = [0];
let p3 = [0];
for (let time of timeList) {
    [[p1, p1Schedule], [p2, p2Schedule], [p3, p3Schedule]].forEach(person => {
        if (time in person[1]) {
            // console.log(time, person[1][time], walkTime[person[1][time]]);
            person[0].push(walkTime[person[1][time]]);
        } else {
            person[0].push(person[0][person[0].length-1]);
        }
    });
}
