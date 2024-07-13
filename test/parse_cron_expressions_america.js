var test = require('tap').test;
var parser = require('../lib/parser');

test('every 2 week on Mon and Thu', function(t) {
    var intAmericaTz = parser.parseCronExpressions([ '0 0 ? * 1,4'], {
        frequency: 2,
        frequencyType: 'weekly',
        currentDate: new Date('2024-07-09T18:30:00.000Z'), // IST 2024-07-10 00:00:00 :: CST 2024-07-09 13:30:00
        tz: 'America/Chicago'
    });
    var intAsiaTz = parser.parseCronExpressions([ '0 0 ? * 1,4'], {
        frequency: 2,
        frequencyType: 'weekly',
        currentDate: new Date('2024-07-09T18:30:00.000Z'), // IST 2024-07-10 00:00:00 :: CST 2024-07-09 13:30:00
        tz: 'Asia/Kolkata'
    });

    t.equal(intAmericaTz.next().toString(), 'Thu Jul 11 2024 00:00:00 GMT-0500 (Central Daylight Time)', 'Machine:CST :: tz:CST'); 
    t.equal(intAmericaTz.next().toString(), 'Mon Jul 22 2024 00:00:00 GMT-0500 (Central Daylight Time)', 'Machine:CST :: tz:CST'); 
    t.equal(intAmericaTz.next().toString(), 'Thu Jul 25 2024 00:00:00 GMT-0500 (Central Daylight Time)', 'Machine:CST :: tz:CST'); 
    t.equal(intAmericaTz.next().toString(), 'Mon Aug 05 2024 00:00:00 GMT-0500 (Central Daylight Time)', 'Machine:CST :: tz:CST'); 
   
    t.equal(intAsiaTz.next().toString(), 'Wed Jul 10 2024 13:30:00 GMT-0500 (Central Daylight Time)', 'Machine:CST :: tz:IST'); // IST Thu Jul 11 2024 00:00:00 
    t.equal(intAsiaTz.next().toString(), 'Sun Jul 21 2024 13:30:00 GMT-0500 (Central Daylight Time)', 'Machine:CST :: tz:IST'); // IST Mon Jul 22 2024 00:00:00 
    t.equal(intAsiaTz.next().toString(), 'Wed Jul 24 2024 13:30:00 GMT-0500 (Central Daylight Time)', 'Machine:CST :: tz:IST'); // IST Thu Jul 25 2024 00:00:00 
    t.equal(intAsiaTz.next().toString(), 'Sun Aug 04 2024 13:30:00 GMT-0500 (Central Daylight Time)', 'Machine:CST :: tz:IST'); // IST Mon Aug 05 2024 00:00:00 


    t.end();
});

test('every 2 week on Sun and Sat', function(t) {
    var intAmericaTz = parser.parseCronExpressions([ '0 0 ? * 0,6'], {
        frequency: 2,
        frequencyType: 'weekly',
        currentDate: new Date('2024-07-09T18:30:00.000Z'), // IST 2024-07-10 00:00:00 :: CST 2024-07-09 13:30:00
        tz: 'America/Chicago'
    });
    var intAsiaTz = parser.parseCronExpressions([ '0 0 ? * 0,6'], {
        frequency: 2,
        frequencyType: 'weekly',
        currentDate: new Date('2024-07-09T18:30:00.000Z'), // IST 2024-07-10 00:00:00 :: CST 2024-07-09 13:30:00
        tz: 'Asia/Kolkata'
    });

    t.equal(intAmericaTz.next().toString(), 'Sat Jul 13 2024 00:00:00 GMT-0500 (Central Daylight Time)', 'Machine:CST :: tz:CST'); 
    t.equal(intAmericaTz.next().toString(), 'Sun Jul 21 2024 00:00:00 GMT-0500 (Central Daylight Time)', 'Machine:CST :: tz:CST'); 
    t.equal(intAmericaTz.next().toString(), 'Sat Jul 27 2024 00:00:00 GMT-0500 (Central Daylight Time)', 'Machine:CST :: tz:CST'); 
    t.equal(intAmericaTz.next().toString(), 'Sun Aug 04 2024 00:00:00 GMT-0500 (Central Daylight Time)', 'Machine:CST :: tz:CST'); 
    t.equal(intAmericaTz.next().toString(), 'Sat Aug 10 2024 00:00:00 GMT-0500 (Central Daylight Time)', 'Machine:CST :: tz:CST'); 
   
    t.equal(intAsiaTz.next().toString(), 'Sun Jul 14 2024 13:30:00 GMT-0500 (Central Daylight Time)', 'Machine:CST :: tz:IST'); // IST Sat Jul 13 2024 00:00:00 
    t.equal(intAsiaTz.next().toString(), 'Mon Jul 22 2024 13:30:00 GMT-0500 (Central Daylight Time)', 'Machine:CST :: tz:IST'); // IST Sun Jul 21 2024 00:00:00 
    t.equal(intAsiaTz.next().toString(), 'Sun Jul 28 2024 13:30:00 GMT-0500 (Central Daylight Time)', 'Machine:CST :: tz:IST'); // IST Sat Jul 27 2024 00:00:00 
    t.equal(intAsiaTz.next().toString(), 'Mon Aug 05 2024 13:30:00 GMT-0500 (Central Daylight Time)', 'Machine:CST :: tz:IST'); // IST Sun Aug 04 2024 00:00:00 
    t.equal(intAsiaTz.next().toString(), 'Sun Aug 11 2024 13:30:00 GMT-0500 (Central Daylight Time)', 'Machine:CST :: tz:IST'); // IST Sat Aug 10 2024 00:00:00 


    t.end();
});


test('every three month on 12th at 11PM', function(t) {
    var intAmericaTz = parser.parseCronExpressions([ '0 0 12 * ?'], {
        frequency: 3,
        frequencyType: 'monthly',
        currentDate: new Date('2024-07-09T18:30:00.000Z'), // IST 2024-07-10 00:00:00 :: CST 2024-07-09 13:30:00
        tz: 'America/Chicago'
    });
    var intAsiaTz = parser.parseCronExpressions([ '0 0 12 * ?'], {
        frequency: 3,
        frequencyType: 'monthly',
        currentDate: new Date('2024-07-09T18:30:00.000Z'), // IST 2024-07-10 00:00:00 :: CST 2024-07-09 13:30:00
        tz: 'Asia/Kolkata'
    });

    t.equal(intAmericaTz.next().toString(), 'Fri Jul 12 2024 00:00:00 GMT-0500 (Central Daylight Time)', 'Machine:CST :: tz:CST'); 
    t.equal(intAmericaTz.next().toString(), 'Sat Oct 12 2024 00:00:00 GMT-0500 (Central Daylight Time)', 'Machine:CST :: tz:CST'); 
    t.equal(intAmericaTz.next().toString(), 'Sun Jan 12 2025 00:00:00 GMT-0600 (Central Standard Time)', 'Machine:CST :: tz:CST'); 
    t.equal(intAmericaTz.next().toString(), 'Sat Apr 12 2025 00:00:00 GMT-0500 (Central Daylight Time)', 'Machine:CST :: tz:CST'); 
    
    t.equal(intAsiaTz.next().toString(), 'Thu Jul 11 2024 13:30:00 GMT-0500 (Central Daylight Time)', 'Machine:CST :: tz:IST'); // IST Fri Jul 12 2024 00:00:00 
    t.equal(intAsiaTz.next().toString(), 'Fri Oct 11 2024 13:30:00 GMT-0500 (Central Daylight Time)', 'Machine:CST :: tz:IST'); // IST Sat Oct 12 2024 00:00:00 
    t.equal(intAsiaTz.next().toString(), 'Sat Jan 11 2025 12:30:00 GMT-0600 (Central Standard Time)', 'Machine:CST :: tz:IST'); // IST Sun Jan 12 2025 00:00:00 
    t.equal(intAsiaTz.next().toString(), 'Fri Apr 11 2025 13:30:00 GMT-0500 (Central Daylight Time)', 'Machine:CST :: tz:IST'); // IST Sat Apr 12 2025 00:00:00 
    

    t.end();
});

test('every two month first two full working week', function(t) {
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
        currentDate: new Date('2024-07-23T18:30:00.000Z'), // IST 2024-07-24 00:00:00 :: CST 2024-07-23 13:30:00
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

    t.equal(intAsiaTz.next().toString(), 'Wed Jul 24 2024 13:30:00 GMT-0500 (Central Daylight Time)', 'Machine:CST :: tz:IST'); // IST Thu Jul 25 2024 00:00:00 
    t.equal(intAsiaTz.next().toString(), 'Thu Jul 25 2024 13:30:00 GMT-0500 (Central Daylight Time)', 'Machine:CST :: tz:IST'); // IST Fri Jul 26 2024 00:00:00 
    t.equal(intAsiaTz.next().toString(), 'Sun Oct 13 2024 13:30:00 GMT-0500 (Central Daylight Time)', 'Machine:CST :: tz:IST'); // IST Mon Oct 14 2024 00:00:00 
    t.equal(intAsiaTz.next().toString(), 'Mon Oct 14 2024 13:30:00 GMT-0500 (Central Daylight Time)', 'Machine:CST :: tz:IST'); // IST Tue Oct 15 2024 00:00:00 
    t.equal(intAsiaTz.next().toString(), 'Tue Oct 15 2024 13:30:00 GMT-0500 (Central Daylight Time)', 'Machine:CST :: tz:IST'); // IST Wed Oct 16 2024 00:00:00 
    t.equal(intAsiaTz.next().toString(), 'Wed Oct 16 2024 13:30:00 GMT-0500 (Central Daylight Time)', 'Machine:CST :: tz:IST'); // IST Thu Oct 17 2024 00:00:00 
    t.equal(intAsiaTz.next().toString(), 'Thu Oct 17 2024 13:30:00 GMT-0500 (Central Daylight Time)', 'Machine:CST :: tz:IST'); // IST Fri Oct 18 2024 00:00:00 
    t.equal(intAsiaTz.next().toString(), 'Sun Oct 20 2024 13:30:00 GMT-0500 (Central Daylight Time)', 'Machine:CST :: tz:IST'); // IST Mon Oct 21 2024 00:00:00 
    t.equal(intAsiaTz.next().toString(), 'Mon Oct 21 2024 13:30:00 GMT-0500 (Central Daylight Time)', 'Machine:CST :: tz:IST'); // IST Tue Oct 22 2024 00:00:00 
    t.equal(intAsiaTz.next().toString(), 'Tue Oct 22 2024 13:30:00 GMT-0500 (Central Daylight Time)', 'Machine:CST :: tz:IST'); // IST Wed Oct 23 2024 00:00:00 
    t.equal(intAsiaTz.next().toString(), 'Wed Oct 23 2024 13:30:00 GMT-0500 (Central Daylight Time)', 'Machine:CST :: tz:IST'); // IST Thu Oct 24 2024 00:00:00 
    t.equal(intAsiaTz.next().toString(), 'Thu Oct 24 2024 13:30:00 GMT-0500 (Central Daylight Time)', 'Machine:CST :: tz:IST'); // IST Fri Oct 25 2024 00:00:00 
    t.equal(intAsiaTz.next().toString(), 'Sun Jan 19 2025 12:30:00 GMT-0600 (Central Standard Time)', 'Machine:CST :: tz:IST'); // IST Mon Jan 20 2025 00:00:00 

    t.end();
});

test('every month on first Mon and Fri, and repeat for 2 weeks', function(t) {
    var intAmericaTz = parser.parseCronExpressions([ '0 0 ? * 1#1', '0 0 ? * 5#1'], {
        frequency: 1,
        repeatFor: 2,
        repeatType: 'weeks',
        frequencyType: 'monthly',
        currentDate: new Date('2024-07-03T18:30:00.000Z'), // IST 2024-07-04 00:00:00 :: CST 2024-07-03 13:30:00
        tz: 'America/Chicago'
    });

    var intAsiaTz = parser.parseCronExpressions([ '0 0 ? * 1#1', '0 0 ? * 5#1'], {
        frequency: 1,
        repeatFor: 2,
        repeatType: 'weeks',
        frequencyType: 'monthly',
        currentDate: new Date('2024-07-03T18:30:00.000Z'), // IST 2024-07-04 00:00:00 :: CST 2024-07-03 13:30:00
        tz: 'Asia/Kolkata'
    });

    t.equal(intAmericaTz.next().toString(), 'Fri Jul 05 2024 00:00:00 GMT-0500 (Central Daylight Time)', 'Machine:CST :: tz:CST'); 
    t.equal(intAmericaTz.next().toString(), 'Mon Jul 08 2024 00:00:00 GMT-0500 (Central Daylight Time)', 'Machine:CST :: tz:CST'); 
    t.equal(intAmericaTz.next().toString(), 'Fri Jul 12 2024 00:00:00 GMT-0500 (Central Daylight Time)', 'Machine:CST :: tz:CST'); 
    t.equal(intAmericaTz.next().toString(), 'Fri Aug 02 2024 00:00:00 GMT-0500 (Central Daylight Time)', 'Machine:CST :: tz:CST'); 
    t.equal(intAmericaTz.next().toString(), 'Mon Aug 05 2024 00:00:00 GMT-0500 (Central Daylight Time)', 'Machine:CST :: tz:CST'); 
    t.equal(intAmericaTz.next().toString(), 'Fri Aug 09 2024 00:00:00 GMT-0500 (Central Daylight Time)', 'Machine:CST :: tz:CST'); 
    t.equal(intAmericaTz.next().toString(), 'Mon Aug 12 2024 00:00:00 GMT-0500 (Central Daylight Time)', 'Machine:CST :: tz:CST'); 
    
    t.equal(intAsiaTz.next().toString(), 'Thu Jul 04 2024 13:30:00 GMT-0500 (Central Daylight Time)', 'Machine:CST :: tz:IST'); // IST Fri Jul 05 2024 00:00:00 
    t.equal(intAsiaTz.next().toString(), 'Sun Jul 07 2024 13:30:00 GMT-0500 (Central Daylight Time)', 'Machine:CST :: tz:IST'); // IST Mon Jul 08 2024 00:00:00 
    t.equal(intAsiaTz.next().toString(), 'Thu Jul 11 2024 13:30:00 GMT-0500 (Central Daylight Time)', 'Machine:CST :: tz:IST'); // IST Fri Jul 12 2024 00:00:00 
    t.equal(intAsiaTz.next().toString(), 'Thu Aug 01 2024 13:30:00 GMT-0500 (Central Daylight Time)', 'Machine:CST :: tz:IST'); // IST Fri Aug 02 2024 00:00:00 
    t.equal(intAsiaTz.next().toString(), 'Sun Aug 04 2024 13:30:00 GMT-0500 (Central Daylight Time)', 'Machine:CST :: tz:IST'); // IST Mon Aug 05 2024 00:00:00 
    t.equal(intAsiaTz.next().toString(), 'Thu Aug 08 2024 13:30:00 GMT-0500 (Central Daylight Time)', 'Machine:CST :: tz:IST'); // IST Fri Aug 09 2024 00:00:00 
    t.equal(intAsiaTz.next().toString(), 'Sun Aug 11 2024 13:30:00 GMT-0500 (Central Daylight Time)', 'Machine:CST :: tz:IST'); // IST Mon Aug 12 2024 00:00:00 

    t.end();
});

test('every month on second Mon, repeat for 10 workingDays', function(t) {
    var intAmericaTz = parser.parseCronExpressions([ '0 0 ? * 1#2'], {
        frequency: 1,
        repeatFor: 10,
        repeatType: 'workingDays',
        frequencyType: 'monthly',
        currentDate: new Date('2024-07-16T18:30:00.000Z'), // IST 2024-07-17 00:00:00 :: CST 2024-07-16 13:30:00
        tz: 'America/Chicago'
    });
    var intAsiaTz = parser.parseCronExpressions([ '0 0 ? * 1#2'], {
        frequency: 1,
        repeatFor: 10,
        repeatType: 'workingDays',
        frequencyType: 'monthly',
        currentDate: new Date('2024-07-16T18:30:00.000Z'), // IST 2024-07-17 00:00:00 :: CST 2024-07-16 13:30:00
        tz: 'Asia/Kolkata'
    });

    t.equal(intAmericaTz.next().toString(), 'Wed Jul 17 2024 00:00:00 GMT-0500 (Central Daylight Time)', 'Machine:CST :: tz:CST'); 
    t.equal(intAmericaTz.next().toString(), 'Thu Jul 18 2024 00:00:00 GMT-0500 (Central Daylight Time)', 'Machine:CST :: tz:CST'); 
    t.equal(intAmericaTz.next().toString(), 'Fri Jul 19 2024 00:00:00 GMT-0500 (Central Daylight Time)', 'Machine:CST :: tz:CST'); 
    t.equal(intAmericaTz.next().toString(), 'Mon Aug 12 2024 00:00:00 GMT-0500 (Central Daylight Time)', 'Machine:CST :: tz:CST'); 
    t.equal(intAmericaTz.next().toString(), 'Tue Aug 13 2024 00:00:00 GMT-0500 (Central Daylight Time)', 'Machine:CST :: tz:CST'); 
    t.equal(intAmericaTz.next().toString(), 'Wed Aug 14 2024 00:00:00 GMT-0500 (Central Daylight Time)', 'Machine:CST :: tz:CST'); 
    t.equal(intAmericaTz.next().toString(), 'Thu Aug 15 2024 00:00:00 GMT-0500 (Central Daylight Time)', 'Machine:CST :: tz:CST'); 
    t.equal(intAmericaTz.next().toString(), 'Fri Aug 16 2024 00:00:00 GMT-0500 (Central Daylight Time)', 'Machine:CST :: tz:CST'); 
    t.equal(intAmericaTz.next().toString(), 'Mon Aug 19 2024 00:00:00 GMT-0500 (Central Daylight Time)', 'Machine:CST :: tz:CST'); 
    t.equal(intAmericaTz.next().toString(), 'Tue Aug 20 2024 00:00:00 GMT-0500 (Central Daylight Time)', 'Machine:CST :: tz:CST'); 
    t.equal(intAmericaTz.next().toString(), 'Wed Aug 21 2024 00:00:00 GMT-0500 (Central Daylight Time)', 'Machine:CST :: tz:CST'); 
    t.equal(intAmericaTz.next().toString(), 'Thu Aug 22 2024 00:00:00 GMT-0500 (Central Daylight Time)', 'Machine:CST :: tz:CST'); 
    t.equal(intAmericaTz.next().toString(), 'Fri Aug 23 2024 00:00:00 GMT-0500 (Central Daylight Time)', 'Machine:CST :: tz:CST'); 
    t.equal(intAmericaTz.next().toString(), 'Mon Sep 09 2024 00:00:00 GMT-0500 (Central Daylight Time)', 'Machine:CST :: tz:CST'); 
    
    t.equal(intAsiaTz.next().toString(), 'Wed Jul 17 2024 13:30:00 GMT-0500 (Central Daylight Time)', 'Machine:CST :: tz:IST'); // IST Thu Jul 18 2024 00:00:00 
    t.equal(intAsiaTz.next().toString(), 'Thu Jul 18 2024 13:30:00 GMT-0500 (Central Daylight Time)', 'Machine:CST :: tz:IST'); // IST Fri Jul 19 2024 00:00:00 
    t.equal(intAsiaTz.next().toString(), 'Sun Aug 11 2024 13:30:00 GMT-0500 (Central Daylight Time)', 'Machine:CST :: tz:IST'); // IST Mon Aug 12 2024 00:00:00 
    t.equal(intAsiaTz.next().toString(), 'Mon Aug 12 2024 13:30:00 GMT-0500 (Central Daylight Time)', 'Machine:CST :: tz:IST'); // IST Tue Aug 13 2024 00:00:00 
    t.equal(intAsiaTz.next().toString(), 'Tue Aug 13 2024 13:30:00 GMT-0500 (Central Daylight Time)', 'Machine:CST :: tz:IST'); // IST Wed Aug 14 2024 00:00:00 
    t.equal(intAsiaTz.next().toString(), 'Wed Aug 14 2024 13:30:00 GMT-0500 (Central Daylight Time)', 'Machine:CST :: tz:IST'); // IST Thu Aug 15 2024 00:00:00 
    t.equal(intAsiaTz.next().toString(), 'Thu Aug 15 2024 13:30:00 GMT-0500 (Central Daylight Time)', 'Machine:CST :: tz:IST'); // IST Fri Aug 16 2024 00:00:00 
    t.equal(intAsiaTz.next().toString(), 'Sun Aug 18 2024 13:30:00 GMT-0500 (Central Daylight Time)', 'Machine:CST :: tz:IST'); // IST Mon Aug 19 2024 00:00:00 
    t.equal(intAsiaTz.next().toString(), 'Mon Aug 19 2024 13:30:00 GMT-0500 (Central Daylight Time)', 'Machine:CST :: tz:IST'); // IST Tue Aug 20 2024 00:00:00 
    t.equal(intAsiaTz.next().toString(), 'Tue Aug 20 2024 13:30:00 GMT-0500 (Central Daylight Time)', 'Machine:CST :: tz:IST'); // IST Wed Aug 21 2024 00:00:00 
    t.equal(intAsiaTz.next().toString(), 'Wed Aug 21 2024 13:30:00 GMT-0500 (Central Daylight Time)', 'Machine:CST :: tz:IST'); // IST Thu Aug 22 2024 00:00:00 
    t.equal(intAsiaTz.next().toString(), 'Thu Aug 22 2024 13:30:00 GMT-0500 (Central Daylight Time)', 'Machine:CST :: tz:IST'); // IST Fri Aug 23 2024 00:00:00 
    t.equal(intAsiaTz.next().toString(), 'Sun Sep 08 2024 13:30:00 GMT-0500 (Central Daylight Time)', 'Machine:CST :: tz:IST'); // IST Mon Sep 09 2024 00:00:00 

    t.end();
});

test('every Jan, Mar and May on 10th and repeat for 3 days', function(t) {
    var intAmericaTz = parser.parseCronExpressions([ '0 0 10 1,3,5 ?'], {
        frequency: 1,
        frequencyType: 'yearly',
        repeatFor: 3,
        repeatType: 'days',
        currentDate: new Date('2024-07-09T18:30:00.000Z'), // IST 2024-07-10 00:00:00 :: CST 2024-07-09 13:30:00
        tz: 'America/Chicago'
    });
    var intAsiaTz = parser.parseCronExpressions([ '0 0 10 1,3,5 ?'], {
        frequency: 1,
        frequencyType: 'yearly',
        repeatFor: 3,
        repeatType: 'days',
        currentDate: new Date('2024-07-09T18:30:00.000Z'), // IST 2024-07-10 00:00:00 :: CST 2024-07-09 13:30:00
        tz: 'Asia/Kolkata'
    });

    t.equal(intAmericaTz.next().toString(), 'Fri Jan 10 2025 00:00:00 GMT-0600 (Central Standard Time)', 'Machine:CST :: tz:CST'); 
    t.equal(intAmericaTz.next().toString(), 'Sat Jan 11 2025 00:00:00 GMT-0600 (Central Standard Time)', 'Machine:CST :: tz:CST'); 
    t.equal(intAmericaTz.next().toString(), 'Sun Jan 12 2025 00:00:00 GMT-0600 (Central Standard Time)', 'Machine:CST :: tz:CST'); 
    t.equal(intAmericaTz.next().toString(), 'Mon Mar 10 2025 00:00:00 GMT-0500 (Central Daylight Time)', 'Machine:CST :: tz:CST'); 
   
    t.equal(intAsiaTz.next().toString(), 'Thu Jan 09 2025 12:30:00 GMT-0600 (Central Standard Time)', 'Machine:CST :: tz:IST'); // IST Fri Jan 10 2025 00:00:00 
    t.equal(intAsiaTz.next().toString(), 'Fri Jan 10 2025 12:30:00 GMT-0600 (Central Standard Time)', 'Machine:CST :: tz:IST'); // IST Sat Jan 11 2025 00:00:00 
    t.equal(intAsiaTz.next().toString(), 'Sat Jan 11 2025 12:30:00 GMT-0600 (Central Standard Time)', 'Machine:CST :: tz:IST'); // IST Sun Jan 12 2025 00:00:00 
    t.equal(intAsiaTz.next().toString(), 'Sun Mar 09 2025 13:30:00 GMT-0500 (Central Daylight Time)', 'Machine:CST :: tz:IST'); // IST Mon Mar 10 2025 00:00:00 

    t.end();
});

test('every first weekday at 11PM of August, September and December repeat for 5 working days, skip if the first day is Monday', function(t) {
    var intAmericaTz = parser.parseCronExpressions([ '0 0 1W 8,9,12 ?'], {
        frequency: 1,
        frequencyType: 'yearly',
        repeatFor: 5,
        repeatType: 'workingDays',
        skipFrom: 1,
        skipTo: 3,
        currentDate: new Date('2025-08-03T18:30:00.000Z'), // IST 2025-08-04 00:00:00 :: CST 2025-08-03 13:30:00
        tz: 'America/Chicago'
    });
    var intAsiaTz = parser.parseCronExpressions([ '0 0 1W 8,9,12 ?'], {
        frequency: 1,
        frequencyType: 'yearly',
        repeatFor: 5,
        repeatType: 'workingDays',
        skipFrom: 1,
        skipTo: 3,
        currentDate: new Date('2025-08-03T18:30:00.000Z'), // IST 2025-08-04 00:00:00 :: CST 2025-08-03 13:30:00
        tz: 'Asia/Kolkata'
    });

    t.equal(intAmericaTz.next().toString(), 'Mon Aug 04 2025 00:00:00 GMT-0500 (Central Daylight Time)', 'Machine:CST :: tz:CST'); 
    t.equal(intAmericaTz.next().toString(), 'Tue Aug 05 2025 00:00:00 GMT-0500 (Central Daylight Time)', 'Machine:CST :: tz:CST'); 
    t.equal(intAmericaTz.next().toString(), 'Wed Aug 06 2025 00:00:00 GMT-0500 (Central Daylight Time)', 'Machine:CST :: tz:CST'); 
    t.equal(intAmericaTz.next().toString(), 'Thu Aug 07 2025 00:00:00 GMT-0500 (Central Daylight Time)', 'Machine:CST :: tz:CST'); 
    t.equal(intAmericaTz.next().toString(), 'Wed Sep 03 2025 00:00:00 GMT-0500 (Central Daylight Time)', 'Machine:CST :: tz:CST'); 
    t.equal(intAmericaTz.next().toString(), 'Thu Sep 04 2025 00:00:00 GMT-0500 (Central Daylight Time)', 'Machine:CST :: tz:CST'); 
    t.equal(intAmericaTz.next().toString(), 'Fri Sep 05 2025 00:00:00 GMT-0500 (Central Daylight Time)', 'Machine:CST :: tz:CST'); 
    t.equal(intAmericaTz.next().toString(), 'Mon Sep 08 2025 00:00:00 GMT-0500 (Central Daylight Time)', 'Machine:CST :: tz:CST'); 
    t.equal(intAmericaTz.next().toString(), 'Tue Sep 09 2025 00:00:00 GMT-0500 (Central Daylight Time)', 'Machine:CST :: tz:CST'); 
    t.equal(intAmericaTz.next().toString(), 'Wed Dec 03 2025 00:00:00 GMT-0600 (Central Standard Time)', 'Machine:CST :: tz:CST'); 
    
    t.equal(intAsiaTz.next().toString(), 'Mon Aug 04 2025 13:30:00 GMT-0500 (Central Daylight Time)', 'Machine:CST :: tz:IST'); // IST Tue Aug 05 2025 00:00:00 
    t.equal(intAsiaTz.next().toString(), 'Tue Aug 05 2025 13:30:00 GMT-0500 (Central Daylight Time)', 'Machine:CST :: tz:IST'); // IST Wed Aug 06 2025 00:00:00 
    t.equal(intAsiaTz.next().toString(), 'Wed Aug 06 2025 13:30:00 GMT-0500 (Central Daylight Time)', 'Machine:CST :: tz:IST'); // IST Thu Aug 07 2025 00:00:00 
    t.equal(intAsiaTz.next().toString(), 'Tue Sep 02 2025 13:30:00 GMT-0500 (Central Daylight Time)', 'Machine:CST :: tz:IST'); // IST Wed Sep 03 2025 00:00:00 
    t.equal(intAsiaTz.next().toString(), 'Wed Sep 03 2025 13:30:00 GMT-0500 (Central Daylight Time)', 'Machine:CST :: tz:IST'); // IST Thu Sep 04 2025 00:00:00 
    t.equal(intAsiaTz.next().toString(), 'Thu Sep 04 2025 13:30:00 GMT-0500 (Central Daylight Time)', 'Machine:CST :: tz:IST'); // IST Fri Sep 05 2025 00:00:00 
    t.equal(intAsiaTz.next().toString(), 'Sun Sep 07 2025 13:30:00 GMT-0500 (Central Daylight Time)', 'Machine:CST :: tz:IST'); // IST Mon Sep 08 2025 00:00:00 
    t.equal(intAsiaTz.next().toString(), 'Mon Sep 08 2025 13:30:00 GMT-0500 (Central Daylight Time)', 'Machine:CST :: tz:IST'); // IST Tue Sep 09 2025 00:00:00 
    t.equal(intAsiaTz.next().toString(), 'Tue Dec 02 2025 12:30:00 GMT-0600 (Central Standard Time)', 'Machine:CST :: tz:IST'); // IST Wed Dec 03 2025 00:00:00 

    t.end();
});

test('every last Mon, Wed and Fri of August, October and December', function(t) {
    var intAmericaTz = parser.parseCronExpressions([ '0 0 ? 8,10,12 1L', '0 0 ? 8,10,12 3L', '0 0 ? 8,10,12 5L'], {
        frequency: 1,
        frequencyType: 'yearly',
        currentDate: new Date('2024-07-03T18:30:00.000Z'), // IST 2024-07-04 00:00:00 :: CST 2024-07-03 13:30:00
        tz: 'America/Chicago'
    });
    var intAsiaTz = parser.parseCronExpressions([ '0 0 ? 8,10,12 1L', '0 0 ? 8,10,12 3L', '0 0 ? 8,10,12 5L'], {
        frequency: 1,
        frequencyType: 'yearly',
        currentDate: new Date('2024-07-03T18:30:00.000Z'), // IST 2024-07-04 00:00:00 :: CST 2024-07-03 13:30:00
        tz: 'Asia/Kolkata'
    });

    t.equal(intAmericaTz.next().toString(), 'Mon Aug 26 2024 00:00:00 GMT-0500 (Central Daylight Time)', 'Machine:CST :: tz:CST'); 
    t.equal(intAmericaTz.next().toString(), 'Wed Aug 28 2024 00:00:00 GMT-0500 (Central Daylight Time)', 'Machine:CST :: tz:CST'); 
    t.equal(intAmericaTz.next().toString(), 'Fri Aug 30 2024 00:00:00 GMT-0500 (Central Daylight Time)', 'Machine:CST :: tz:CST'); 
    t.equal(intAmericaTz.next().toString(), 'Fri Oct 25 2024 00:00:00 GMT-0500 (Central Daylight Time)', 'Machine:CST :: tz:CST'); 
    
    t.equal(intAsiaTz.next().toString(), 'Sun Aug 25 2024 13:30:00 GMT-0500 (Central Daylight Time)', 'Machine:CST :: tz:IST'); // IST Mon Aug 26 2024 00:00:00 
    t.equal(intAsiaTz.next().toString(), 'Tue Aug 27 2024 13:30:00 GMT-0500 (Central Daylight Time)', 'Machine:CST :: tz:IST'); // IST Wed Aug 28 2024 00:00:00 
    t.equal(intAsiaTz.next().toString(), 'Thu Aug 29 2024 13:30:00 GMT-0500 (Central Daylight Time)', 'Machine:CST :: tz:IST'); // IST Fri Aug 30 2024 00:00:00 
    t.equal(intAsiaTz.next().toString(), 'Thu Oct 24 2024 13:30:00 GMT-0500 (Central Daylight Time)', 'Machine:CST :: tz:IST'); // IST Fri Oct 25 2024 00:00:00 

    t.end();
});