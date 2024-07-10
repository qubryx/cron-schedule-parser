var test = require('tap').test;
var parser = require('../lib/parser');

test('monthly full working week with repeat option and frequency', function(t) {
    var intAmericaTz = parser.parseCronExpressions([ '0 23 ? * 1#1'], {
        repeatFor: 2,
        repeatType: 'weeks',
        frequency: 2,
        frequencyType: 'monthly',
        isFullWeek: true,
        currentDate: new Date('2024-07-09T18:30:00.000Z'), // IST 2024-07-10 00:00:00 :: CST 2024-07-09 13:30:00
        tz: 'America/Chicago'
    });

    var intAsiaTz = parser.parseCronExpressions([ '30 8 ? * 1#1'], {
        repeatFor: 2,
        repeatType: 'weeks',
        frequency: 2,
        frequencyType: 'monthly',
        isFullWeek: true,
        currentDate: new Date('2024-07-09T18:30:00.000Z'), // IST 2024-07-10 00:00:00 :: CST 2024-07-09 13:30:00
        tz: 'Asia/Kolkata'
    });

    t.equal(intAmericaTz.next().toString(), 'Tue Jul 09 2024 23:00:00 GMT-0500 (Central Daylight Time)', 'Machine:CST :: tz:CST');  
    t.equal(intAmericaTz.next().toString(), 'Wed Jul 10 2024 23:00:00 GMT-0500 (Central Daylight Time)', 'Machine:CST :: tz:CST'); 
    t.equal(intAmericaTz.next().toString(), 'Thu Jul 11 2024 23:00:00 GMT-0500 (Central Daylight Time)', 'Machine:CST :: tz:CST'); 
    t.equal(intAmericaTz.next().toString(), 'Fri Jul 12 2024 23:00:00 GMT-0500 (Central Daylight Time)', 'Machine:CST :: tz:CST'); 
    t.equal(intAmericaTz.next().toString(), 'Mon Sep 02 2024 23:00:00 GMT-0500 (Central Daylight Time)', 'Machine:CST :: tz:CST'); 
    t.equal(intAmericaTz.next().toString(), 'Tue Sep 03 2024 23:00:00 GMT-0500 (Central Daylight Time)', 'Machine:CST :: tz:CST'); 
    t.equal(intAmericaTz.next().toString(), 'Wed Sep 04 2024 23:00:00 GMT-0500 (Central Daylight Time)', 'Machine:CST :: tz:CST'); 
    t.equal(intAmericaTz.next().toString(), 'Thu Sep 05 2024 23:00:00 GMT-0500 (Central Daylight Time)', 'Machine:CST :: tz:CST'); 
    t.equal(intAmericaTz.next().toString(), 'Fri Sep 06 2024 23:00:00 GMT-0500 (Central Daylight Time)', 'Machine:CST :: tz:CST'); 
    t.equal(intAmericaTz.next().toString(), 'Mon Sep 09 2024 23:00:00 GMT-0500 (Central Daylight Time)', 'Machine:CST :: tz:CST'); 
    t.equal(intAmericaTz.next().toString(), 'Tue Sep 10 2024 23:00:00 GMT-0500 (Central Daylight Time)', 'Machine:CST :: tz:CST'); 
    t.equal(intAmericaTz.next().toString(), 'Wed Sep 11 2024 23:00:00 GMT-0500 (Central Daylight Time)', 'Machine:CST :: tz:CST'); 
    t.equal(intAmericaTz.next().toString(), 'Thu Sep 12 2024 23:00:00 GMT-0500 (Central Daylight Time)', 'Machine:CST :: tz:CST'); 
    t.equal(intAmericaTz.next().toString(), 'Fri Sep 13 2024 23:00:00 GMT-0500 (Central Daylight Time)', 'Machine:CST :: tz:CST'); 
    t.equal(intAmericaTz.next().toString(), 'Mon Nov 04 2024 23:00:00 GMT-0600 (Central Standard Time)', 'Machine:CST :: tz:CST'); 

    t.equal(intAsiaTz.next().toString(), 'Tue Jul 09 2024 22:00:00 GMT-0500 (Central Daylight Time)', 'Machine:CST :: tz:IST'); // IST Wed Jul 10 2024 08:30:00 
    t.equal(intAsiaTz.next().toString(), 'Wed Jul 10 2024 22:00:00 GMT-0500 (Central Daylight Time)', 'Machine:CST :: tz:IST'); // IST Thu Jul 11 2024 08:30:00 
    t.equal(intAsiaTz.next().toString(), 'Thu Jul 11 2024 22:00:00 GMT-0500 (Central Daylight Time)', 'Machine:CST :: tz:IST'); // IST Fri Jul 10 2024 08:30:00 
    t.equal(intAsiaTz.next().toString(), 'Sun Sep 01 2024 22:00:00 GMT-0500 (Central Daylight Time)', 'Machine:CST :: tz:IST'); // IST Mon Sep 02 2024 08:30:00 
    t.equal(intAsiaTz.next().toString(), 'Mon Sep 02 2024 22:00:00 GMT-0500 (Central Daylight Time)', 'Machine:CST :: tz:IST'); // IST Tue Sep 03 2024 08:30:00 
    t.equal(intAsiaTz.next().toString(), 'Tue Sep 03 2024 22:00:00 GMT-0500 (Central Daylight Time)', 'Machine:CST :: tz:IST'); // IST Wed Sep 04 2024 08:30:00 
    t.equal(intAsiaTz.next().toString(), 'Wed Sep 04 2024 22:00:00 GMT-0500 (Central Daylight Time)', 'Machine:CST :: tz:IST'); // IST Thu Sep 05 2024 08:30:00 
    t.equal(intAsiaTz.next().toString(), 'Thu Sep 05 2024 22:00:00 GMT-0500 (Central Daylight Time)', 'Machine:CST :: tz:IST'); // IST Fri Sep 06 2024 08:30:00 
    t.equal(intAsiaTz.next().toString(), 'Sun Sep 08 2024 22:00:00 GMT-0500 (Central Daylight Time)', 'Machine:CST :: tz:IST'); // IST Mon Sep 09 2024 08:30:00 
    t.equal(intAsiaTz.next().toString(), 'Mon Sep 09 2024 22:00:00 GMT-0500 (Central Daylight Time)', 'Machine:CST :: tz:IST'); // IST Tue Sep 10 2024 08:30:00 
    t.equal(intAsiaTz.next().toString(), 'Tue Sep 10 2024 22:00:00 GMT-0500 (Central Daylight Time)', 'Machine:CST :: tz:IST'); // IST Wed Sep 11 2024 08:30:00 
    t.equal(intAsiaTz.next().toString(), 'Wed Sep 11 2024 22:00:00 GMT-0500 (Central Daylight Time)', 'Machine:CST :: tz:IST'); // IST Thu Sep 12 2024 08:30:00 
    t.equal(intAsiaTz.next().toString(), 'Thu Sep 12 2024 22:00:00 GMT-0500 (Central Daylight Time)', 'Machine:CST :: tz:IST'); // IST Fri Sep 13 2024 08:30:00
    t.equal(intAsiaTz.next().toString(), 'Sun Nov 03 2024 21:00:00 GMT-0600 (Central Standard Time)', 'Machine:CST :: tz:IST'); // IST Mon Nov 04 2024 08:30:00 
    

    t.end();
});

test('every two month last two full working week', function(t) {
    var intAmericaTz = parser.parseCronExpressions([ '30 10 ? * 5L'], {
        repeatFor: 2,
        repeatType: 'weeks',
        frequency: 3,
        frequencyType: 'monthly',
        isFullWeek: true,
        currentDate: new Date('2024-07-23T18:30:00.000Z'), // IST 2024-07-24 00:00:00 :: CST 2024-07-23 13:30:00
        tz: 'America/Chicago'
    });
    var intAsiaTz = parser.parseCronExpressions([ '0 0 ? * 5L'], {
        repeatFor: 2,
        repeatType: 'weeks',
        frequency: 3,
        frequencyType: 'monthly',
        isFullWeek: true,
        currentDate: new Date('2024-07-09T18:30:00.000Z'), // IST 2024-07-10 00:00:00 :: CST 2024-07-09 13:30:00
        tz: 'Asia/Kolkata'
    });

    t.equal(intAmericaTz.next().toString(), 'Wed Jul 24 2024 10:30:00 GMT-0500 (Central Daylight Time)', 'Machine:CST :: tz:CST');
    t.equal(intAmericaTz.next().toString(), 'Thu Jul 25 2024 10:30:00 GMT-0500 (Central Daylight Time)', 'Machine:CST :: tz:CST');
    t.equal(intAmericaTz.next().toString(), 'Fri Jul 26 2024 10:30:00 GMT-0500 (Central Daylight Time)', 'Machine:CST :: tz:CST');
    t.equal(intAmericaTz.next().toString(), 'Mon Oct 14 2024 10:30:00 GMT-0500 (Central Daylight Time)', 'Machine:CST :: tz:CST');
    t.equal(intAmericaTz.next().toString(), 'Tue Oct 15 2024 10:30:00 GMT-0500 (Central Daylight Time)', 'Machine:CST :: tz:CST');
    t.equal(intAmericaTz.next().toString(), 'Wed Oct 16 2024 10:30:00 GMT-0500 (Central Daylight Time)', 'Machine:CST :: tz:CST');
    t.equal(intAmericaTz.next().toString(), 'Thu Oct 17 2024 10:30:00 GMT-0500 (Central Daylight Time)', 'Machine:CST :: tz:CST');
    t.equal(intAmericaTz.next().toString(), 'Fri Oct 18 2024 10:30:00 GMT-0500 (Central Daylight Time)', 'Machine:CST :: tz:CST');
    t.equal(intAmericaTz.next().toString(), 'Mon Oct 21 2024 10:30:00 GMT-0500 (Central Daylight Time)', 'Machine:CST :: tz:CST');
    t.equal(intAmericaTz.next().toString(), 'Tue Oct 22 2024 10:30:00 GMT-0500 (Central Daylight Time)', 'Machine:CST :: tz:CST');
    t.equal(intAmericaTz.next().toString(), 'Wed Oct 23 2024 10:30:00 GMT-0500 (Central Daylight Time)', 'Machine:CST :: tz:CST');
    t.equal(intAmericaTz.next().toString(), 'Thu Oct 24 2024 10:30:00 GMT-0500 (Central Daylight Time)', 'Machine:CST :: tz:CST');
    t.equal(intAmericaTz.next().toString(), 'Fri Oct 25 2024 10:30:00 GMT-0500 (Central Daylight Time)', 'Machine:CST :: tz:CST');
    t.equal(intAmericaTz.next().toString(), 'Mon Jan 20 2025 10:30:00 GMT-0600 (Central Standard Time)', 'Machine:CST :: tz:CST');

    t.equal(intAsiaTz.next().toString(), 'Thu Jul 11 2024 13:30:00 GMT-0500 (Central Daylight Time)', 'Machine:CST :: tz:IST'); // IST Mon Jul 15 2024 00:00:00 

    t.end();
});
