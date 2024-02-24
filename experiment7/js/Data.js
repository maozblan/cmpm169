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
    'E2': 11,
    'thim': 12,
    'baskin': 13,
    'annex': 11,
    'SNE': 9,
    'cowell': 16,
};

// schedules, written in a way that's easy to read and easy to edit
const p1Schedule = {
    '1200': 'E2',
    '1440': 'baskin',
    '1550': 'home',
    '1840': 'annex',
    '1950': 'home',
};

// generate machine readable version of schedules
let p1 = [0];
for (let time of timeList) {
    if (time in p1Schedule) {
        p1.push(walkTime[p1Schedule[time]]);
    } else {
        p1.push(p1[p1.length-1]);
    }
}
