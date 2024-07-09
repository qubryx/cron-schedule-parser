const { DateTime } = require('luxon');
var test = require('tap').test;
var parser = require('../lib/parser');

function getNextDate(interval) {
    var nextOccurrence = interval.next();
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
        currentDate: new Date('2024-08-01T18:30:00.000Z'),
        tz: "America/Chicago"
    });

    var intAsiaTz = parser.parseCronExpressions([ "30 10 ? * 1#1"], {
        repeatFor: 2,
        repeatType: 'weeks',
        frequency: 2,
        frequencyType: 'monthly',
        isFullWeek: true,
        currentDate: new Date('2024-08-01T18:30:00.000Z'),
        tz: "Asia/Kolkata"
    });

    t.equal(getNextDate(intAmericaTz), '2024:08:06T09:30', 'US Date matches');
    t.equal(getNextDate(intAmericaTz), '2024:08:07T09:30', 'US Date matches');
    t.equal(getNextDate(intAmericaTz), '2024:08:08T09:30', 'US Date matches');
    t.equal(getNextDate(intAmericaTz), '2024:08:09T09:30', 'US Date matches');
    t.equal(getNextDate(intAmericaTz), '2024:08:10T09:30', 'US Date matches');
    t.equal(getNextDate(intAmericaTz), '2024:08:13T09:30', 'US Date matches');
    t.equal(getNextDate(intAmericaTz), '2024:08:14T09:30', 'US Date matches');
    t.equal(getNextDate(intAmericaTz), '2024:08:15T09:30', 'US Date matches');
    t.equal(getNextDate(intAmericaTz), '2024:08:16T09:30', 'US Date matches');
    t.equal(getNextDate(intAmericaTz), '2024:08:17T09:30', 'US Date matches');
    t.equal(getNextDate(intAmericaTz), '2024:10:08T09:30', 'US Date matches');

    t.equal(getNextDate(intAsiaTz), '2024:08:05T10:30', 'Date matches');
    t.equal(getNextDate(intAsiaTz), '2024:08:06T10:30', 'Date matches');
    t.equal(getNextDate(intAsiaTz), '2024:08:07T10:30', 'Date matches');
    t.equal(getNextDate(intAsiaTz), '2024:08:08T10:30', 'Date matches');
    t.equal(getNextDate(intAsiaTz), '2024:08:09T10:30', 'Date matches');
    t.equal(getNextDate(intAsiaTz), '2024:08:12T10:30', 'Date matches');
    t.equal(getNextDate(intAsiaTz), '2024:08:13T10:30', 'Date matches');
    t.equal(getNextDate(intAsiaTz), '2024:08:14T10:30', 'Date matches');
    t.equal(getNextDate(intAsiaTz), '2024:08:15T10:30', 'Date matches');
    t.equal(getNextDate(intAsiaTz), '2024:08:16T10:30', 'Date matches');
    t.equal(getNextDate(intAsiaTz), '2024:10:07T10:30', 'Date matches');

    t.end();
});