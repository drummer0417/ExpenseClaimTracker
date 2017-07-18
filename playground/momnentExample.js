var moment = require('moment');

console.log('date/time: ' + moment().format() );

// moment represents time as seconds from 01-01-1970 0:00
//
// January 1st 1970 @ 12:00am => 0
//  so January 1st 1970 @ 12:01am => 60

var now = moment();
console.log(('current timestamp: ') + now.unix() );

var timestamp = 1498308210;

var currentMoment = moment.unix(timestamp);
console.log('currentMoment: ' + currentMoment.format('D-MM-YYYY @ H:mm a'));

timestamp = moment().unix();
console.log('currentMoment: ' + moment.unix(timestamp).format('MMMM Do, YYYY @ H:mm:ss'));
