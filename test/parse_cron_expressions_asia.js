const { DateTime } = require('luxon');
var test = require('tap').test;
var parser = require('../lib/parser');

function getNextDate(interval) {
    var nextOccurrence = interval.next();
    console.log(nextOccurrence.toString())
    var formattedNextOccurrence = DateTime.fromJSDate(nextOccurrence).toFormat('yyyy:MM:dd\'T\'HH:mm');
    return formattedNextOccurrence
}

test('monthly full working week with repeat option and frequency', function(t) {
    var intAmericaTz = parser.parseCronExpressions([ "0 23 ? * 1#1"], {
        repeatFor: 2,
        repeatType: 'weeks',
        frequency: 2,
        frequencyType: 'monthly',
        isFullWeek: true,
        currentDate: new Date('2024-07-09T18:30:00.000Z'), // IST 2024-07-10 00:00:00 :: CST 2024-07-09 13:30:00
        tz: "America/Chicago"
    });

    var intAsiaTz = parser.parseCronExpressions([ "30 10 ? * 1#1"], {
        repeatFor: 2,
        repeatType: 'weeks',
        frequency: 2,
        frequencyType: 'monthly',
        isFullWeek: true,
        currentDate: new Date('2024-07-09T18:30:00.000Z'), // IST 2024-07-10 00:00:00 :: CST 2024-07-09 13:30:00
        tz: "Asia/Kolkata"
    });

    t.equal(intAmericaTz.next().toString(), 'Wed Jul 10 2024 09:30:00 GMT+0530 (India Standard Time)'); // CST Tue Jul 09 2024 23:00:00 
    t.equal(intAmericaTz.next().toString(), 'Thu Jul 11 2024 09:30:00 GMT+0530 (India Standard Time)'); // CST Wed Jul 10 2024 23:00:00 
    t.equal(intAmericaTz.next().toString(), 'Fri Jul 12 2024 09:30:00 GMT+0530 (India Standard Time)'); // CST Thu Jul 11 2024 23:00:00 
    t.equal(intAmericaTz.next().toString(), 'Sat Jul 13 2024 09:30:00 GMT+0530 (India Standard Time)'); // CST Fri Jul 12 2024 23:00:00 
    

    // t.equal(getNextDate(intAsiaTz), '2024:07:10T10:30', 'Date matches');
    // t.equal(getNextDate(intAsiaTz), '2024:07:11T10:30', 'Date matches');
    // t.equal(getNextDate(intAsiaTz), '2024:07:12T10:30', 'Date matches');
    // t.equal(getNextDate(intAsiaTz), '2024:08:05T10:30', 'Date matches');
    // t.equal(getNextDate(intAsiaTz), '2024:08:06T10:30', 'Date matches');
    // t.equal(getNextDate(intAsiaTz), '2024:08:07T10:30', 'Date matches');
    // t.equal(getNextDate(intAsiaTz), '2024:08:08T10:30', 'Date matches');
    // t.equal(getNextDate(intAsiaTz), '2024:08:09T10:30', 'Date matches');
    // t.equal(getNextDate(intAsiaTz), '2024:08:12T10:30', 'Date matches');
    // t.equal(getNextDate(intAsiaTz), '2024:08:13T10:30', 'Date matches');
    // t.equal(getNextDate(intAsiaTz), '2024:08:14T10:30', 'Date matches');
    // t.equal(getNextDate(intAsiaTz), '2024:08:15T10:30', 'Date matches');
    // t.equal(getNextDate(intAsiaTz), '2024:08:16T10:30', 'Date matches');
    // t.equal(getNextDate(intAsiaTz), '2024:10:07T10:30', 'Date matches');

    t.end();
});