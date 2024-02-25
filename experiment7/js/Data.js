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
    'kresge': 15,
};

// schedules, written in a way that's easy to read and easy to edit
const p1Schedule = [
{ // moday
    '0700': 'home',
    '1200': 'E2',
    '1440': 'baskin',
    '1550': 'home',
    '1840': 'annex',
    '1950': 'home',
},
{ // tuesday
    '0700': 'home',
    '1140': 'annex',
    '1320': 'home',
    '1520': 'thim',
    '1900': 'home',
},
{ // wednesday
    '0700': 'home',
    '1040': 'E2',
    '1150': 'baskin',
    '1550': 'home',
},
{ // thursday
    '0700': 'home',
    '1140': 'annex',
    '1320': 'home',
    '1520': 'thim',
    '1900': 'home',
},
{ // friday
    '0700': 'home',
    '1320': 'cowell',
    '1440': 'baskin',
    '1600': 'E2',
    '1800': 'home',
},
];
const p2Schedule = [
{ // monday
    '0700': 'home',
    '0830': 'soc sci',
    '1200': 'EMS',
    '1330': 'SNE',
    '1430': 'home',
},
{ // tuesday
    '0700': 'home',
    '0800': 'thim',
    '0940': 'home',
    '1140': 'cunit',
    '1330': 'mchenry',
    '1520': 'thim',
    '1720': 'baskin',
    '1900': 'home',
},
{ // wednesday
    '0700': 'home',
    '0830': 'soc sci',
    '1200': 'home',
    '1520': 'mchenry',
    '1700': 'home',
},
{ // thursday
    '0700': 'home',
    '0800': 'thim',
    '0950': 'music',
    '1140': 'cunit',
    '1320': 'home',
    '1520': 'thim',
    '1720': 'baskin',
    '1900': 'home',
},
{ // friday
    '0700': 'home',
    '0800': 'EMS',
    '0930': 'SNE',
    '1200': 'E2',
    '1310': 'home',
    '1500': 'soc sci',
    '1800': 'home',
},
];
const p3Schedule = [
{ // monday
    '0700': 'home',
    '0800': 'annex',
    '0830': 'home',
    '1130': 'SNE',
    '1400': 'home',
    '1600': 'baskin',
    '1710': 'home',
},
{ // tuesday
    '0700': 'home',
    '0800': 'thim',
    '1030': 'music',
    '1130': 'home',
    '1520': 'kresge',
    '1700': 'home',
},
{ // wednesday
    '0700': 'home',
    '1600': 'baskin',
    '1710': 'home',
},
{ // thursday
    '0700': 'home',
    '0800': 'thim',
    '1000': 'SNE',
    '1230': 'home',
    '1520': 'kresge',
    '1700': 'home',
},
{ // friday
    '0700': 'home',
    '0930': 'SNE',
    '1130': 'home',
    '1600': 'baskin',
    '1710': 'home',
},
];

// generate machine readable version of schedules
let p1 = [];
let p2 = [];
let p3 = [];
for (let i = 0; i < 5; ++i ) {
    let temp1 = [];
    let temp2 = [];
    let temp3 = [];
    for (let time of timeList) {
        [[temp1, p1Schedule], [temp2, p2Schedule], [temp3, p3Schedule]].forEach(person => {
            console.log(person[1][i]);
            if (time in person[1][i]) {
                // console.log(time, person[1][time], walkTime[person[1][time]]);
                person[0].push(walkTime[person[1][i][time]]);
            } else {
                person[0].push(person[0][person[0].length-1]);
            }
        });
    }
    p1.push(temp1);
    p2.push(temp2);
    p3.push(temp3);
}
console.log(p1);

// prints the time data to the back of the screen
class TimeData {
    constructor() {
        this.index = timeList.length;
        this.counter = 0;
        this.framesPerPoint = framesPerPoint;
        this.DoTW = [null, 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY']; // 1-indexed
        this.date = ''; // string DoTW to print

        this.ready = true;
    }

    setDate(ind) {
        this.date = this.DoTW[ind];
    }

    draw() {
        textAlign(CENTER);
        noStroke();
        fill(235);
        textFont('Courier New');
        if (this.index < timeList.length) {
            this.ready = false;
            textSize(100);
            text(timeList[this.index].slice(0, 2) + ':' + timeList[this.index].slice(2), width/2, height/2-50);
            text(this.date, width/2, height/2+25);
            if (this.counter === this.framesPerPoint) {
                this.index++;
                this.counter = 0;
            } else {
                this.counter++;
            }
        } else {
            this.ready = true;
            textSize(50);
            text('use number keys 1-5\nto choose a day to display', width/2, height/2); 
        }
    }

    start() {
        this.index = 0;
    }

    isReady() {
        return this.ready;
    }
}
