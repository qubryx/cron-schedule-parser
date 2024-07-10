var test = require('tap').test;
var parser = require('../lib/parser');

test('every two month first two full working week', function(t) {
    var intAsiaTz = parser.parseCronExpressions([ '0 23 ? * 1#1'], {
        repeatFor: 2,
        repeatType: 'weeks',
        frequency: 2,
        frequencyType: 'monthly',
        isFullWeek: true,
        currentDate: new Date('2024-07-09T18:30:00.000Z'), // IST 2024-07-10 00:00:00 :: CST 2024-07-09 13:30:00
        tz: 'Asia/Kolkata'
    });

    var intAmericaTz = parser.parseCronExpressions([ '0 23 ? * 1#1'], {
        repeatFor: 2,
        repeatType: 'weeks',
        frequency: 2,
        frequencyType: 'monthly',
        isFullWeek: true,
        currentDate: new Date('2024-07-09T18:30:00.000Z'), // IST 2024-07-10 00:00:00 :: CST 2024-07-09 13:30:00
        tz: 'America/Chicago'
    });

    t.equal(intAsiaTz.next().toString(), 'Wed Jul 10 2024 23:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.next().toString(), 'Thu Jul 11 2024 23:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.next().toString(), 'Fri Jul 12 2024 23:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.next().toString(), 'Mon Sep 02 2024 23:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.next().toString(), 'Tue Sep 03 2024 23:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.next().toString(), 'Wed Sep 04 2024 23:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.next().toString(), 'Thu Sep 05 2024 23:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.next().toString(), 'Fri Sep 06 2024 23:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.next().toString(), 'Mon Sep 09 2024 23:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.next().toString(), 'Tue Sep 10 2024 23:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.next().toString(), 'Wed Sep 11 2024 23:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.next().toString(), 'Thu Sep 12 2024 23:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.next().toString(), 'Fri Sep 13 2024 23:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.next().toString(), 'Mon Nov 04 2024 23:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 

    t.equal(intAmericaTz.next().toString(), 'Wed Jul 10 2024 09:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Tue Jul 09 2024 23:00:00 
    t.equal(intAmericaTz.next().toString(), 'Thu Jul 11 2024 09:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Wed Jul 10 2024 23:00:00 
    t.equal(intAmericaTz.next().toString(), 'Fri Jul 12 2024 09:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Thu Jul 11 2024 23:00:00 
    t.equal(intAmericaTz.next().toString(), 'Sat Jul 13 2024 09:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Fri Jul 12 2024 23:00:00 
    t.equal(intAmericaTz.next().toString(), 'Tue Sep 03 2024 09:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Mon Sep 02 2024 23:00:00 
    t.equal(intAmericaTz.next().toString(), 'Wed Sep 04 2024 09:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Tue Sep 03 2024 23:00:00 
    t.equal(intAmericaTz.next().toString(), 'Thu Sep 05 2024 09:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Wed Sep 04 2024 23:00:00 
    t.equal(intAmericaTz.next().toString(), 'Fri Sep 06 2024 09:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Thu Sep 05 2024 23:00:00 
    t.equal(intAmericaTz.next().toString(), 'Sat Sep 07 2024 09:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Fri Sep 06 2024 23:00:00 
    t.equal(intAmericaTz.next().toString(), 'Tue Sep 10 2024 09:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Mon Sep 09 2024 23:00:00 
    t.equal(intAmericaTz.next().toString(), 'Wed Sep 11 2024 09:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Tue Sep 10 2024 23:00:00 
    t.equal(intAmericaTz.next().toString(), 'Thu Sep 12 2024 09:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Wed Sep 11 2024 23:00:00 
    t.equal(intAmericaTz.next().toString(), 'Fri Sep 13 2024 09:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Thu Sep 12 2024 23:00:00 
    t.equal(intAmericaTz.next().toString(), 'Sat Sep 14 2024 09:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Fri Sep 13 2024 23:00:00 
    t.equal(intAmericaTz.next().toString(), 'Tue Nov 05 2024 10:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Mon Nov 04 2024 23:00:00 

    t.end();
});

test('every two month last two full working week', function(t) {
    var intAsiaTz = parser.parseCronExpressions([ '0 0 ? * 5L'], {
        repeatFor: 2,
        repeatType: 'weeks',
        frequency: 2,
        frequencyType: 'monthly',
        isFullWeek: true,
        currentDate: new Date('2024-07-23T18:30:00.000Z'), // IST 2024-07-24 00:00:00 :: CST 2024-07-23 13:30:00
        tz: 'Asia/Kolkata'
    });
    var intAmericaTz = parser.parseCronExpressions([ '0 0 ? * 5L'], {
        repeatFor: 2,
        repeatType: 'weeks',
        frequency: 2,
        frequencyType: 'monthly',
        isFullWeek: true,
        currentDate: new Date('2024-07-09T18:30:00.000Z'), // IST 2024-07-10 00:00:00 :: CST 2024-07-09 13:30:00
        tz: 'America/Chicago'
    });

    t.equal(intAsiaTz.next().toString(), 'Thu Jul 25 2024 00:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.next().toString(), 'Fri Jul 26 2024 00:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.next().toString(), 'Mon Sep 16 2024 00:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.next().toString(), 'Tue Sep 17 2024 00:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.next().toString(), 'Wed Sep 18 2024 00:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.next().toString(), 'Thu Sep 19 2024 00:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.next().toString(), 'Fri Sep 20 2024 00:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.next().toString(), 'Mon Sep 23 2024 00:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.next().toString(), 'Tue Sep 24 2024 00:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.next().toString(), 'Wed Sep 25 2024 00:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.next().toString(), 'Thu Sep 26 2024 00:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.next().toString(), 'Fri Sep 27 2024 00:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.next().toString(), 'Mon Nov 18 2024 00:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 

    t.equal(intAmericaTz.next().toString(), 'Mon Jul 15 2024 10:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Mon Jul 15 2024 00:00:00 
    t.equal(intAmericaTz.next().toString(), 'Tue Jul 16 2024 10:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Tue Jul 16 2024 00:00:00 
    t.equal(intAmericaTz.next().toString(), 'Wed Jul 17 2024 10:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Wed Jul 17 2024 00:00:00 
    t.equal(intAmericaTz.next().toString(), 'Thu Jul 18 2024 10:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Thu Jul 18 2024 00:00:00 
    t.equal(intAmericaTz.next().toString(), 'Fri Jul 19 2024 10:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Fri Jul 19 2024 00:00:00 
    t.equal(intAmericaTz.next().toString(), 'Mon Jul 22 2024 10:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Mon Jul 22 2024 00:00:00 
    t.equal(intAmericaTz.next().toString(), 'Tue Jul 23 2024 10:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Tue Jul 23 2024 00:00:00 
    t.equal(intAmericaTz.next().toString(), 'Wed Jul 24 2024 10:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Wed Jul 24 2024 00:00:00 
    t.equal(intAmericaTz.next().toString(), 'Thu Jul 25 2024 10:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Thu Jul 25 2024 00:00:00 
    t.equal(intAmericaTz.next().toString(), 'Fri Jul 26 2024 10:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Fri Jul 26 2024 00:00:00 
    t.equal(intAmericaTz.next().toString(), 'Mon Sep 16 2024 10:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Mon Sep 16 2024 00:00:00 

    t.end();
});
