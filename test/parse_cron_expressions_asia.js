var test = require('tap').test;
var parser = require('../lib/parser');

test('every 2 week on Mon and Thu', function(t) {
    var intAsiaTz = parser.parseCronExpressions([ '0 0 ? * 1,4'], {
        frequency: 2,
        frequencyType: 'weekly',
        currentDate: new Date('2024-07-09T18:30:00.000Z'), // IST 2024-07-10 00:00:00 :: CST 2024-07-09 13:30:00
        endDate: new Date('2024-08-09T18:30:00.000Z'), // IST 2024-08-10 00:00:00 :: CST 2024-08-09 13:30:00
        tz: 'Asia/Kolkata'
    });

    var intAmericaTz = parser.parseCronExpressions([ '0 23 ? * 1,4'], {
        frequency: 2,
        frequencyType: 'weekly',
        currentDate: new Date('2024-07-09T18:30:00.000Z'), // IST 2024-07-10 00:00:00 :: CST 2024-07-09 13:30:00
        endDate: new Date('2024-08-09T18:30:00.000Z'), // IST 2024-08-10 00:00:00 :: CST 2024-08-09 13:30:00
        tz: 'America/Chicago'
    });

    t.equal(intAsiaTz.next().toString(), 'Thu Jul 11 2024 00:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.next().toString(), 'Mon Jul 22 2024 00:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.next().toString(), 'Thu Jul 25 2024 00:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.next().toString(), 'Mon Aug 05 2024 00:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.next().toString(), 'Thu Aug 08 2024 00:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.hasNext(), false, 'Machine:IST :: tz:IST'); 
   
    t.equal(intAmericaTz.next().toString(), 'Fri Jul 12 2024 09:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Thu Jul 11 2024 23:00:00 
    t.equal(intAmericaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAmericaTz.next().toString(), 'Tue Jul 23 2024 09:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Mon Jul 22 2024 23:00:00 
    t.equal(intAmericaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAmericaTz.next().toString(), 'Fri Jul 26 2024 09:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Thu Jul 25 2024 23:00:00 
    t.equal(intAmericaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAmericaTz.next().toString(), 'Tue Aug 06 2024 09:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Mon Aug 05 2024 23:00:00 
    t.equal(intAmericaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAmericaTz.next().toString(), 'Fri Aug 09 2024 09:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Thu Aug 08 2024 23:00:00 
    t.equal(intAmericaTz.hasNext(), false, 'Machine:IST :: tz:IST'); 


    t.end();
});

test('every 2 week on Sun and Sat', function(t) {
    var intAsiaTz = parser.parseCronExpressions([ '0 0 ? * 0,6'], {
        frequency: 2,
        frequencyType: 'weekly',
        currentDate: new Date('2024-07-09T18:30:00.000Z'), // IST 2024-07-10 00:00:00 :: CST 2024-07-09 13:30:00
        endDate: new Date('2024-08-11T18:30:00.000Z'), // IST 2024-08-12 00:00:00 :: CST 2024-08-11 13:30:00
        tz: 'Asia/Kolkata'
    });

    var intAmericaTz = parser.parseCronExpressions([ '0 23 ? * 0,6'], {
        frequency: 2,
        frequencyType: 'weekly',
        currentDate: new Date('2024-07-09T18:30:00.000Z'), // IST 2024-07-10 00:00:00 :: CST 2024-07-09 13:30:00
        endDate: new Date('2024-08-11T18:30:00.000Z'), // IST 2024-08-12 00:00:00 :: CST 2024-08-11 13:30:00
        tz: 'America/Chicago'
    });

    t.equal(intAsiaTz.next().toString(), 'Sat Jul 13 2024 00:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.next().toString(), 'Sun Jul 21 2024 00:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.next().toString(), 'Sat Jul 27 2024 00:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.next().toString(), 'Sun Aug 04 2024 00:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.next().toString(), 'Sat Aug 10 2024 00:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.hasNext(), false, 'Machine:IST :: tz:IST'); 
   
    t.equal(intAmericaTz.next().toString(), 'Sun Jul 14 2024 09:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Sat Jul 13 2024 23:00:00 
    t.equal(intAmericaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAmericaTz.next().toString(), 'Mon Jul 22 2024 09:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Sun Jul 21 2024 23:00:00 
    t.equal(intAmericaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAmericaTz.next().toString(), 'Sun Jul 28 2024 09:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Sat Jul 27 2024 23:00:00 
    t.equal(intAmericaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAmericaTz.next().toString(), 'Mon Aug 05 2024 09:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Sun Aug 04 2024 23:00:00 
    t.equal(intAmericaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAmericaTz.next().toString(), 'Sun Aug 11 2024 09:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Sat Aug 10 2024 23:00:00 
    t.equal(intAmericaTz.hasNext(), false, 'Machine:IST :: tz:IST'); 


    t.end();
});

test('every week on Sun, Wed and Sat', function(t) {
    var intAsiaTz = parser.parseCronExpressions([ '0 0 ? * 0,3,6'], {
        frequency: 1,
        frequencyType: 'weekly',
        currentDate: new Date('2024-07-09T18:30:00.000Z'), // IST 2024-07-10 00:00:00 :: CST 2024-07-09 13:30:00
        endDate: new Date('2024-07-22T18:30:00.000Z'), // IST 2024-07-23 00:00:00 :: CST 2024-07-22 13:30:00
        tz: 'Asia/Kolkata'
    });

    var intAmericaTz = parser.parseCronExpressions([ '0 23 ? * 0,3,6'], {
        frequency: 1,
        frequencyType: 'weekly',
        currentDate: new Date('2024-07-09T18:30:00.000Z'), // IST 2024-07-10 00:00:00 :: CST 2024-07-09 13:30:00
        endDate: new Date('2024-07-21T18:30:00.000Z'), // IST 2024-07-22 00:00:00 :: CST 2024-07-21 13:30:00
        tz: 'America/Chicago'
    });

    t.equal(intAsiaTz.next().toString(), 'Sat Jul 13 2024 00:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.next().toString(), 'Sun Jul 14 2024 00:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.next().toString(), 'Wed Jul 17 2024 00:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.next().toString(), 'Sat Jul 20 2024 00:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.next().toString(), 'Sun Jul 21 2024 00:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.hasNext(), false, 'Machine:IST :: tz:IST'); 
   
    t.equal(intAmericaTz.next().toString(), 'Thu Jul 11 2024 09:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Wed Jul 10 2024 23:00:00 
    t.equal(intAmericaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAmericaTz.next().toString(), 'Sun Jul 14 2024 09:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Sat Jul 13 2024 23:00:00 
    t.equal(intAmericaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAmericaTz.next().toString(), 'Mon Jul 15 2024 09:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Sun Jul 14 2024 23:00:00 
    t.equal(intAmericaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAmericaTz.next().toString(), 'Thu Jul 18 2024 09:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Wed Jul 17 2024 23:00:00 
    t.equal(intAmericaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAmericaTz.next().toString(), 'Sun Jul 21 2024 09:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Sat Jul 20 2024 23:00:00 
    t.equal(intAmericaTz.hasNext(), false, 'Machine:IST :: tz:IST'); 

    t.end();
});

test('every three month on 12th at 11PM', function(t) {
    var intAsiaTz = parser.parseCronExpressions([ '0 23 12 * ?'], {
        frequency: 3,
        frequencyType: 'monthly',
        currentDate: new Date('2024-07-09T18:30:00.000Z'), // IST 2024-07-10 00:00:00 :: CST 2024-07-09 13:30:00
        endDate: new Date('2025-04-13T18:30:00.000Z'), // IST 2025-04-14 00:00:00 :: CST 2025-04-13 13:30:00
        tz: 'Asia/Kolkata'
    });

    var intAmericaTz = parser.parseCronExpressions([ '0 23 12 * ?'], {
        frequency: 3,
        frequencyType: 'monthly',
        currentDate: new Date('2024-07-09T18:30:00.000Z'), // IST 2024-07-10 00:00:00 :: CST 2024-07-09 13:30:00
        endDate: new Date('2025-04-13T18:30:00.000Z'), // IST 2025-04-14 00:00:00 :: CST 2025-04-13 13:30:00
        tz: 'America/Chicago'
    });

    t.equal(intAsiaTz.next().toString(), 'Fri Jul 12 2024 23:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.next().toString(), 'Sat Oct 12 2024 23:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.next().toString(), 'Sun Jan 12 2025 23:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.next().toString(), 'Sat Apr 12 2025 23:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.hasNext(), false, 'Machine:IST :: tz:IST'); 
    
    t.equal(intAmericaTz.next().toString(), 'Sat Jul 13 2024 09:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Fri Jul 12 2024 23:00:00 
    t.equal(intAmericaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAmericaTz.next().toString(), 'Sun Oct 13 2024 09:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Sat Oct 12 2024 23:00:00 
    t.equal(intAmericaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAmericaTz.next().toString(), 'Mon Jan 13 2025 10:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Sun Jan 12 2025 23:00:00 
    t.equal(intAmericaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAmericaTz.next().toString(), 'Sun Apr 13 2025 09:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Sat Apr 12 2025 23:00:00 
    t.equal(intAmericaTz.hasNext(), false, 'Machine:IST :: tz:IST'); 
    

    t.end();
});

test('every month on first day', function(t) {
    
    var intAsiaTz = parser.parseCronExpressions([ '0 0 1 * ?'], {
        frequency: 1,
        frequencyType: 'monthly',
        currentDate: new Date('2024-10-09T18:30:00.000Z'), // IST 2024-10-10 00:00:00 :: CST 2024-10-09 13:30:00
        endDate: new Date('2025-04-02T18:30:00.000Z'), // IST 2025-04-02 00:00:00 :: CST 2025-04-02 13:30:00
        tz: 'Asia/Kolkata'
    });

    var intAmericaTz = parser.parseCronExpressions([ '0 23 1 * ?'], {
        frequency: 1,
        frequencyType: 'monthly',
        currentDate: new Date('2024-10-09T18:30:00.000Z'), // IST 2024-10-10 00:00:00 :: CST 2024-10-09 13:30:00
        endDate: new Date('2025-04-02T18:30:00.000Z'), // IST 2025-04-02 00:00:00 :: CST 2025-04-02 13:30:00
        tz: 'America/Chicago'
    });

    t.equal(intAsiaTz.next().toString(), 'Fri Nov 01 2024 00:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.next().toString(), 'Sun Dec 01 2024 00:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.next().toString(), 'Wed Jan 01 2025 00:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.next().toString(), 'Sat Feb 01 2025 00:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.next().toString(), 'Sat Mar 01 2025 00:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.next().toString(), 'Tue Apr 01 2025 00:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.hasNext(), false, 'Machine:IST :: tz:IST'); 
    
    t.equal(intAmericaTz.next().toString(), 'Sat Nov 02 2024 09:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Fri Nov 01 2024 23:00:00 
    t.equal(intAmericaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAmericaTz.next().toString(), 'Mon Dec 02 2024 10:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Sun Dec 01 2024 23:00:00 
    t.equal(intAmericaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAmericaTz.next().toString(), 'Thu Jan 02 2025 10:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Wed Jan 01 2025 23:00:00 
    t.equal(intAmericaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAmericaTz.next().toString(), 'Sun Feb 02 2025 10:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Sat Feb 01 2025 23:00:00 
    t.equal(intAmericaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAmericaTz.next().toString(), 'Sun Mar 02 2025 10:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Sat Mar 01 2025 23:00:00 
    t.equal(intAmericaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAmericaTz.next().toString(), 'Wed Apr 02 2025 09:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Tue Apr 01 2025 23:00:00 
    t.equal(intAmericaTz.hasNext(), false, 'Machine:IST :: tz:IST'); 

    t.end();
});

test('every month on first weekday and repeat for 2 working days', function(t) {
    
    var intAsiaTz = parser.parseCronExpressions([ '0 0 W * ?'], {
        frequency: 1,
        frequencyType: 'monthly',
        repeatFor: 2, 
        repeatType: 'workingDays',
        currentDate: new Date('2024-10-09T18:30:00.000Z'), // IST 2024-10-10 00:00:00 :: CST 2024-10-09 13:30:00
        endDate: new Date('2025-03-05T18:30:00.000Z'), // IST 2024-03-06 00:00:00 :: CST 2025-03-05 13:30:00
        tz: 'Asia/Kolkata'
    });

    var intAmericaTz = parser.parseCronExpressions([ '0 23 W * ?'], {
        frequency: 1,
        frequencyType: 'monthly',
        repeatFor: 2, 
        repeatType: 'workingDays',
        currentDate: new Date('2024-10-09T18:30:00.000Z'), // IST 2024-10-10 00:00:00 :: CST 2024-10-09 13:30:00
        endDate: new Date('2025-03-05T18:30:00.000Z'), // IST 2024-03-06 00:00:00 :: CST 2025-03-05 13:30:00
        tz: 'America/Chicago'
    });

    t.equal(intAsiaTz.next().toString(), 'Fri Nov 01 2024 00:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.next().toString(), 'Mon Nov 04 2024 00:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.next().toString(), 'Mon Dec 02 2024 00:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.next().toString(), 'Tue Dec 03 2024 00:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.next().toString(), 'Wed Jan 01 2025 00:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.next().toString(), 'Thu Jan 02 2025 00:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.next().toString(), 'Mon Feb 03 2025 00:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.next().toString(), 'Tue Feb 04 2025 00:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.next().toString(), 'Mon Mar 03 2025 00:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.next().toString(), 'Tue Mar 04 2025 00:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.hasNext(), false, 'Machine:IST :: tz:IST'); 
    
    t.equal(intAmericaTz.next().toString(), 'Sat Nov 02 2024 09:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Fri Nov 01 2024 23:00:00 
    t.equal(intAmericaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAmericaTz.next().toString(), 'Tue Nov 05 2024 10:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Mon Nov 04 2024 23:00:00 
    t.equal(intAmericaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAmericaTz.next().toString(), 'Tue Dec 03 2024 10:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Mon Dec 02 2024 23:00:00 
    t.equal(intAmericaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAmericaTz.next().toString(), 'Wed Dec 04 2024 10:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Tue Dec 03 2024 23:00:00 
    t.equal(intAmericaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAmericaTz.next().toString(), 'Thu Jan 02 2025 10:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Wed Jan 01 2025 23:00:00 
    t.equal(intAmericaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAmericaTz.next().toString(), 'Fri Jan 03 2025 10:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Thu Jan 02 2025 23:00:00 
    t.equal(intAmericaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAmericaTz.next().toString(), 'Tue Feb 04 2025 10:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Mon Feb 03 2025 23:00:00 
    t.equal(intAmericaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAmericaTz.next().toString(), 'Wed Feb 05 2025 10:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Tue Feb 04 2025 23:00:00 
    t.equal(intAmericaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAmericaTz.next().toString(), 'Tue Mar 04 2025 10:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Mon Mar 03 2025 23:00:00 
    t.equal(intAmericaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAmericaTz.next().toString(), 'Wed Mar 05 2025 10:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Tue Mar 04 2025 23:00:00 
    t.equal(intAmericaTz.hasNext(), false, 'Machine:IST :: tz:IST'); 

    t.end();
});

test('every Feb on last working day', function(t) {
    var intAsiaTz = parser.parseCronExpressions([ '0 0 LW 2 ?'], {
        frequency: 1,
        frequencyType: 'yearly',
        currentDate: new Date('2024-11-09T18:30:00.000Z'), // IST 2024-11-10 00:00:00 :: CST 2024-11-09 13:30:00
        endDate: new Date('2029-03-01T18:30:00.000Z'), // IST 2029-03-01 00:00:00 :: CST 2029-03-01 13:30:00
        tz: 'Asia/Kolkata'
    });

    var intAmericaTz = parser.parseCronExpressions([ '0 23 LW 2 ?'], {
        frequency: 1,
        frequencyType: 'yearly',
        currentDate: new Date('2024-11-09T18:30:00.000Z'), // IST 2024-11-10 00:00:00 :: CST 2024-11-09 13:30:00
        endDate: new Date('2029-03-01T18:30:00.000Z'), // IST 2029-03-01 00:00:00 :: CST 2029-03-01 13:30:00
        tz: 'America/Chicago'
    });

    t.equal(intAsiaTz.next().toString(), 'Fri Feb 28 2025 00:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.next().toString(), 'Fri Feb 27 2026 00:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.next().toString(), 'Fri Feb 26 2027 00:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.next().toString(), 'Tue Feb 29 2028 00:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.next().toString(), 'Wed Feb 28 2029 00:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.hasNext(), false, 'Machine:IST :: tz:IST'); 
    
    t.equal(intAmericaTz.next().toString(), 'Sat Mar 01 2025 10:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Fri Feb 28 2025 23:00:00 
    t.equal(intAmericaTz.hasNext(), true, 'Machine:IST :: tz:IST');    
    t.equal(intAmericaTz.next().toString(), 'Sat Feb 28 2026 10:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Fri Feb 27 2026 23:00:00 
    t.equal(intAmericaTz.hasNext(), true, 'Machine:IST :: tz:IST');    
    t.equal(intAmericaTz.next().toString(), 'Sat Feb 27 2027 10:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Fri Feb 26 2027 23:00:00 
    t.equal(intAmericaTz.hasNext(), true, 'Machine:IST :: tz:IST');    
    t.equal(intAmericaTz.next().toString(), 'Wed Mar 01 2028 10:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Tue Feb 29 2028 23:00:00 
    t.equal(intAmericaTz.hasNext(), true, 'Machine:IST :: tz:IST');    
    t.equal(intAmericaTz.next().toString(), 'Thu Mar 01 2029 10:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Wed Feb 28 2029 23:00:00 
    t.equal(intAmericaTz.hasNext(), false, 'Machine:IST :: tz:IST'); 

    t.end();
});

test('every Feb on last last 2 days', function(t) {
    var intAsiaTz = parser.parseCronExpressions([ '0 0 L 2 ?'], {
        frequency: 1,
        frequencyType: 'yearly',
        repeatFor: 2,
        repeatType: 'days',
        currentDate: new Date('2024-11-09T18:30:00.000Z'), // IST 2024-11-10 00:00:00 :: CST 2024-11-09 13:30:00
        endDate: new Date('2029-03-01T18:30:00.000Z'), // IST 2029-03-02 00:00:00 :: CST 2029-03-01 13:30:00
        tz: 'Asia/Kolkata'
    });

    var intAmericaTz = parser.parseCronExpressions([ '0 23 L 2 ?'], {
        frequency: 1,
        frequencyType: 'yearly',
        repeatFor: 2,
        repeatType: 'days',
        currentDate: new Date('2024-11-09T18:30:00.000Z'), // CST 2024-11-09 13:30:00
        endDate: new Date('2029-02-28T18:30:00.000Z'), //  CST 2029-02-28 13:30:00
        tz: 'America/Chicago'
    });

    t.equal(intAsiaTz.next().toString(), 'Thu Feb 27 2025 00:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.next().toString(), 'Fri Feb 28 2025 00:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.next().toString(), 'Fri Feb 27 2026 00:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.next().toString(), 'Sat Feb 28 2026 00:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.next().toString(), 'Sat Feb 27 2027 00:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.next().toString(), 'Sun Feb 28 2027 00:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.next().toString(), 'Mon Feb 28 2028 00:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.next().toString(), 'Tue Feb 29 2028 00:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.next().toString(), 'Tue Feb 27 2029 00:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.next().toString(), 'Wed Feb 28 2029 00:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.hasNext(), false, 'Machine:IST :: tz:IST'); 
    
    t.equal(intAmericaTz.next().toString(), 'Fri Feb 28 2025 10:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Thu Feb 27 2025 23:00:00 
    t.equal(intAmericaTz.hasNext(), true, 'Machine:IST :: tz:IST :: hasNext'); 
    t.equal(intAmericaTz.next().toString(), 'Sat Mar 01 2025 10:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Fri Feb 28 2025 23:00:00 
    t.equal(intAmericaTz.hasNext(), true, 'Machine:IST :: tz:IST :: hasNext'); 
    t.equal(intAmericaTz.next().toString(), 'Sat Feb 28 2026 10:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Fri Feb 27 2026 23:00:00 
    t.equal(intAmericaTz.hasNext(), true, 'Machine:IST :: tz:IST :: hasNext'); 
    t.equal(intAmericaTz.next().toString(), 'Sun Mar 01 2026 10:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Sat Feb 28 2026 23:00:00 
    t.equal(intAmericaTz.hasNext(), true, 'Machine:IST :: tz:IST :: hasNext'); 
    t.equal(intAmericaTz.next().toString(), 'Sun Feb 28 2027 10:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Sat Feb 27 2027 23:00:00 
    t.equal(intAmericaTz.hasNext(), true, 'Machine:IST :: tz:IST :: hasNext'); 
    t.equal(intAmericaTz.next().toString(), 'Mon Mar 01 2027 10:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Sun Feb 28 2027 23:00:00 
    t.equal(intAmericaTz.hasNext(), true, 'Machine:IST :: tz:IST :: hasNext'); 
    t.equal(intAmericaTz.next().toString(), 'Tue Feb 29 2028 10:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Mon Feb 28 2028 23:00:00 
    t.equal(intAmericaTz.hasNext(), true, 'Machine:IST :: tz:IST :: hasNext'); 
    t.equal(intAmericaTz.next().toString(), 'Wed Mar 01 2028 10:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Tue Feb 29 2028 23:00:00 
    t.equal(intAmericaTz.hasNext(), true, 'Machine:IST :: tz:IST :: hasNext'); 
    t.equal(intAmericaTz.next().toString(), 'Wed Feb 28 2029 10:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Tue Feb 27 2029 23:00:00 
    t.equal(intAmericaTz.hasNext(), false, 'Machine:IST :: tz:IST'); 

    t.end();
});

test('every month on last working day', function(t) {
    var intAsiaTz = parser.parseCronExpressions([ '0 0 LW * ?'], {
        frequency: 1,
        frequencyType: 'monthly',
        currentDate: new Date('2024-11-09T18:30:00.000Z'), // IST 2024-11-10 00:00:00 :: CST 2024-11-09 13:30:00
        endDate: new Date('2025-04-01T18:30:00.000Z'), // IST 2025-04-01 00:00:00 :: CST 2025-04-01 13:30:00
        tz: 'Asia/Kolkata'
    });

    var intAmericaTz = parser.parseCronExpressions([ '0 23 LW * ?'], {
        frequency: 1,
        frequencyType: 'monthly',
        currentDate: new Date('2024-11-09T18:30:00.000Z'), // IST 2024-11-10 00:00:00 :: CST 2024-11-09 13:30:00
        endDate: new Date('2025-04-01T18:30:00.000Z'), // IST 2025-04-01 00:00:00 :: CST 2025-04-01 13:30:00
        tz: 'America/Chicago'
    });

    t.equal(intAsiaTz.next().toString(), 'Fri Nov 29 2024 00:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.next().toString(), 'Tue Dec 31 2024 00:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.next().toString(), 'Fri Jan 31 2025 00:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.next().toString(), 'Fri Feb 28 2025 00:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.next().toString(), 'Mon Mar 31 2025 00:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.hasNext(), false, 'Machine:IST :: tz:IST'); 
    
    t.equal(intAmericaTz.next().toString(), 'Sat Nov 30 2024 10:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Fri Nov 29 2024 23:00:00 
    t.equal(intAmericaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAmericaTz.next().toString(), 'Wed Jan 01 2025 10:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Tue Dec 31 2024 23:00:00 
    t.equal(intAmericaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAmericaTz.next().toString(), 'Sat Feb 01 2025 10:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Fri Jan 31 2025 23:00:00 
    t.equal(intAmericaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAmericaTz.next().toString(), 'Sat Mar 01 2025 10:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Fri Feb 28 2025 23:00:00 
    t.equal(intAmericaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAmericaTz.next().toString(), 'Tue Apr 01 2025 09:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Mon Mar 31 2025 23:00:00 
    t.equal(intAmericaTz.hasNext(), false, 'Machine:IST :: tz:IST'); 

    t.end();
});

test('every month on last working day repeat for 5 working days', function(t) {
    var intAsiaTz = parser.parseCronExpressions([ '0 0 LW * ?'], {
        frequency: 1,
        frequencyType: 'monthly',
        repeatFor: 5,
        repeatType: 'workingDays',
        currentDate: new Date('2024-06-28T18:30:00.000Z'), // IST 2024-06-29 00:00:00 
        endDate: new Date('2024-08-27T18:30:00.000Z'), // IST 2024-07-28 00:00:00 
        tz: 'Asia/Kolkata'
    });

    var intAmericaTz = parser.parseCronExpressions([ '0 23 LW * ?'], {
        frequency: 1,
        frequencyType: 'monthly',
        repeatFor: 5,
        repeatType: 'workingDays',
        currentDate: new Date('2024-06-29T18:30:00.000Z'), // IST 2024-06-28 13:30:00 
        endDate: new Date('2024-08-27T18:30:00.000Z'), // IST 2024-07-27 13:30:00 
        tz: 'America/Chicago'
    });

    t.equal(intAsiaTz.next().toString(), 'Thu Jul 25 2024 00:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.hasNext(), true, 'Machine:IST :: tz:IST :: hasNext'); 
    t.equal(intAsiaTz.next().toString(), 'Fri Jul 26 2024 00:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.hasNext(), true, 'Machine:IST :: tz:IST :: hasNext'); 
    t.equal(intAsiaTz.next().toString(), 'Mon Jul 29 2024 00:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.hasNext(), true, 'Machine:IST :: tz:IST :: hasNext'); 
    t.equal(intAsiaTz.next().toString(), 'Tue Jul 30 2024 00:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.hasNext(), true, 'Machine:IST :: tz:IST :: hasNext'); 
    t.equal(intAsiaTz.next().toString(), 'Wed Jul 31 2024 00:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.hasNext(), true, 'Machine:IST :: tz:IST :: hasNext'); 
    t.equal(intAsiaTz.next().toString(), 'Mon Aug 26 2024 00:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.hasNext(), true, 'Machine:IST :: tz:IST :: hasNext'); 
    t.equal(intAsiaTz.next().toString(), 'Tue Aug 27 2024 00:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.hasNext(), true, 'Machine:IST :: tz:IST :: hasNext'); 
    t.equal(intAsiaTz.next().toString(), 'Wed Aug 28 2024 00:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.hasNext(), false, 'Machine:IST :: tz:IST'); 
    
    t.equal(intAmericaTz.next().toString(), 'Fri Jul 26 2024 09:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Thu Jul 25 2024 23:00:00 
    t.equal(intAmericaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAmericaTz.next().toString(), 'Sat Jul 27 2024 09:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Fri Jul 26 2024 23:00:00 
    t.equal(intAmericaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAmericaTz.next().toString(), 'Tue Jul 30 2024 09:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Mon Jul 29 2024 23:00:00 
    t.equal(intAmericaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAmericaTz.next().toString(), 'Wed Jul 31 2024 09:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Tue Jul 30 2024 23:00:00 
    t.equal(intAmericaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAmericaTz.next().toString(), 'Thu Aug 01 2024 09:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Wed Jul 31 2024 23:00:00 
    t.equal(intAmericaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAmericaTz.next().toString(), 'Tue Aug 27 2024 09:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Mon Aug 26 2024 23:00:00 
    t.equal(intAmericaTz.hasNext(), false, 'Machine:IST :: tz:IST'); 
    t.end();
});

test('every month on last working day repeat for 5 working days start and end without cron end date (edge case)', function(t) {
    var intAsiaTz = parser.parseCronExpressions([ '0 0 LW * ?'], {
        frequency: 1,
        frequencyType: 'monthly',
        repeatFor: 5,
        repeatType: 'workingDays',
        currentDate: new Date('2024-06-28T18:30:00.000Z'), // IST 2024-06-29 00:00:00 
        endDate: new Date('2024-07-29T18:30:00.000Z'), // IST 2024-07-30 00:00:00 
        tz: 'Asia/Kolkata'
    });

    var intAmericaTz = parser.parseCronExpressions([ '0 23 LW * ?'], {
        frequency: 1,
        frequencyType: 'monthly',
        repeatFor: 5,
        repeatType: 'workingDays',
        currentDate: new Date('2024-06-29T18:30:00.000Z'), // IST 2024-06-28 13:30:00 
        endDate: new Date('2024-07-30T18:30:00.000Z'), // IST 2024-07-30 13:30:00 
        tz: 'America/Chicago'
    });

    t.equal(intAsiaTz.next().toString(), 'Thu Jul 25 2024 00:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.hasNext(), true, 'Machine:IST :: tz:IST :: hasNext'); 
    t.equal(intAsiaTz.next().toString(), 'Fri Jul 26 2024 00:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.hasNext(), true, 'Machine:IST :: tz:IST :: hasNext'); 
    t.equal(intAsiaTz.next().toString(), 'Mon Jul 29 2024 00:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.hasNext(), true, 'Machine:IST :: tz:IST :: hasNext'); 
    t.equal(intAsiaTz.next().toString(), 'Tue Jul 30 2024 00:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.hasNext(), false, 'Machine:IST :: tz:IST :: hasNext'); 
    
    t.equal(intAmericaTz.next().toString(), 'Fri Jul 26 2024 09:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Thu Jul 25 2024 23:00:00 
    t.equal(intAmericaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAmericaTz.next().toString(), 'Sat Jul 27 2024 09:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Fri Jul 26 2024 23:00:00 
    t.equal(intAmericaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAmericaTz.next().toString(), 'Tue Jul 30 2024 09:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Mon Jul 29 2024 23:00:00 
    t.equal(intAmericaTz.hasNext(), false, 'Machine:IST :: tz:IST'); 
    t.end();
});

test('every two month on last working day', function(t) {
    
    var intAsiaTz = parser.parseCronExpressions([ '0 12 LW * ?'], {
        frequency: 2,
        frequencyType: 'monthly',
        currentDate: new Date('2024-12-09T18:30:00.000Z'), // IST 2024-12-10 00:00:00 :: CST 2024-12-09 13:30:00
        endDate: new Date('2025-07-01T18:30:00.000Z'), // IST 2025-07-01 00:00:00 :: CST 2025-07-01 13:30:00
        tz: 'Asia/Kolkata'
    });

    var intAmericaTz = parser.parseCronExpressions([ '0 0 LW * ?'], {
        frequency: 2,
        frequencyType: 'monthly',
        currentDate: new Date('2024-12-09T18:30:00.000Z'), // IST 2024-12-10 00:00:00 :: CST 2024-12-09 13:30:00
        tz: 'America/Chicago'
    });

    t.equal(intAsiaTz.next().toString(), 'Tue Dec 31 2024 12:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.next().toString(), 'Fri Feb 28 2025 12:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.next().toString(), 'Wed Apr 30 2025 12:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.next().toString(), 'Mon Jun 30 2025 12:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.hasNext(), false, 'Machine:IST :: tz:IST'); 
    
    t.equal(intAmericaTz.next().toString(), 'Tue Dec 31 2024 11:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Tue Dec 31 2024 00:00:00 
    t.equal(intAmericaTz.next().toString(), 'Fri Feb 28 2025 11:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Fri Feb 28 2025 00:00:00 
    t.equal(intAmericaTz.next().toString(), 'Wed Apr 30 2025 10:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Wed Apr 30 2025 00:00:00 
    t.equal(intAmericaTz.next().toString(), 'Mon Jun 30 2025 10:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Mon Jun 30 2025 00:00:00 

    t.end();
});

test('every month on last day', function(t) {
    
    var intAsiaTz = parser.parseCronExpressions([ '0 0 L * ?'], {
        frequency: 1,
        frequencyType: 'monthly',
        currentDate: new Date('2024-11-09T18:30:00.000Z'), // IST 2024-11-10 00:00:00 :: CST 2024-11-09 13:30:00
        endDate: new Date('2025-04-01T18:30:00.000Z'), // IST 2025-04-01 00:00:00 :: CST 2025-04-01 13:30:00
        tz: 'Asia/Kolkata'
    });

    var intAmericaTz = parser.parseCronExpressions([ '0 23 L * ?'], {
        frequency: 1,
        frequencyType: 'monthly',
        currentDate: new Date('2024-11-09T18:30:00.000Z'), // IST 2024-11-10 00:00:00 :: CST 2024-11-09 13:30:00
        tz: 'America/Chicago'
    });

    t.equal(intAsiaTz.next().toString(), 'Sat Nov 30 2024 00:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.next().toString(), 'Tue Dec 31 2024 00:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.next().toString(), 'Fri Jan 31 2025 00:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.next().toString(), 'Fri Feb 28 2025 00:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.next().toString(), 'Mon Mar 31 2025 00:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.hasNext(), false, 'Machine:IST :: tz:IST'); 
    
    t.equal(intAmericaTz.next().toString(), 'Sun Dec 01 2024 10:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Sat Nov 30 2024 23:00:00 
    t.equal(intAmericaTz.next().toString(), 'Wed Jan 01 2025 10:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Tue Dec 31 2024 23:00:00 
    t.equal(intAmericaTz.next().toString(), 'Sat Feb 01 2025 10:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Fri Jan 31 2025 23:00:00 
    t.equal(intAmericaTz.next().toString(), 'Sat Mar 01 2025 10:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Fri Feb 28 2025 23:00:00 
    t.equal(intAmericaTz.next().toString(), 'Tue Apr 01 2025 09:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Mon Mar 31 2025 23:00:00 

    t.end();
});

test('every two month on last day', function(t) {

    var intAsiaTz = parser.parseCronExpressions([ '0 0 L * ?'], {
        frequency: 2,
        frequencyType: 'monthly',
        currentDate: new Date('2024-11-09T18:30:00.000Z'), // IST 2024-11-10 00:00:00 :: CST 2024-11-09 13:30:00
        endDate: new Date('2025-06-01T18:30:00.000Z'), // IST 2025-06-01 00:00:00 :: CST 2025-06-01 13:30:00
        tz: 'Asia/Kolkata'
    });

    var intAmericaTz = parser.parseCronExpressions([ '0 23 L * ?'], {
        frequency: 2,
        frequencyType: 'monthly',
        currentDate: new Date('2024-11-09T18:30:00.000Z'), // IST 2024-11-10 00:00:00 :: CST 2024-11-09 13:30:00
        tz: 'America/Chicago'
    });

    t.equal(intAsiaTz.next().toString(), 'Sat Nov 30 2024 00:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.next().toString(), 'Fri Jan 31 2025 00:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.next().toString(), 'Mon Mar 31 2025 00:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.next().toString(), 'Sat May 31 2025 00:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.hasNext(), false, 'Machine:IST :: tz:IST'); 
    
    t.equal(intAmericaTz.next().toString(), 'Sun Dec 01 2024 10:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Sat Nov 30 2024 23:00:00 
    t.equal(intAmericaTz.next().toString(), 'Sat Feb 01 2025 10:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Fri Jan 31 2025 23:00:00 
    t.equal(intAmericaTz.next().toString(), 'Tue Apr 01 2025 09:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Mon Mar 31 2025 23:00:00 
    t.equal(intAmericaTz.next().toString(), 'Sun Jun 01 2025 09:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Sat May 31 2025 23:00:00 

    t.end();
});

test('every month on last 2 days', function(t) {
    var intAsiaTz = parser.parseCronExpressions([ '0 0 L * ?'], {
        frequency: 1,
        frequencyType: 'monthly',
        repeatFor: 2,
        repeatType: 'days',
        currentDate: new Date('2024-11-09T18:30:00.000Z'), // IST 2024-11-10 00:00:00 :: CST 2024-11-09 13:30:00
        endDate: new Date('2025-04-01T18:30:00.000Z'), // IST 2025-04-01 00:00:00 :: CST 2025-04-01 13:30:00
        tz: 'Asia/Kolkata'
    });

    var intAmericaTz = parser.parseCronExpressions([ '0 23 L * ?'], {
        frequency: 1,
        frequencyType: 'monthly',
        repeatFor: 2,
        repeatType: 'days',
        currentDate: new Date('2024-11-09T18:30:00.000Z'), // IST 2024-11-10 00:00:00 :: CST 2024-11-09 13:30:00
        tz: 'America/Chicago'
    });

    t.equal(intAsiaTz.next().toString(), 'Fri Nov 29 2024 00:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.next().toString(), 'Sat Nov 30 2024 00:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.next().toString(), 'Mon Dec 30 2024 00:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.next().toString(), 'Tue Dec 31 2024 00:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.next().toString(), 'Thu Jan 30 2025 00:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.next().toString(), 'Fri Jan 31 2025 00:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.next().toString(), 'Thu Feb 27 2025 00:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.next().toString(), 'Fri Feb 28 2025 00:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.next().toString(), 'Sun Mar 30 2025 00:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.next().toString(), 'Mon Mar 31 2025 00:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.hasNext(), false, 'Machine:IST :: tz:IST'); 
    
    t.equal(intAmericaTz.next().toString(), 'Sat Nov 30 2024 10:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Fri Nov 29 2024 23:00:00 
    t.equal(intAmericaTz.next().toString(), 'Sun Dec 01 2024 10:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Sat Nov 30 2024 23:00:00 
    t.equal(intAmericaTz.next().toString(), 'Tue Dec 31 2024 10:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Mon Dec 30 2024 23:00:00 
    t.equal(intAmericaTz.next().toString(), 'Wed Jan 01 2025 10:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Tue Dec 31 2024 23:00:00 
    t.equal(intAmericaTz.next().toString(), 'Fri Jan 31 2025 10:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Thu Jan 30 2025 23:00:00 
    t.equal(intAmericaTz.next().toString(), 'Sat Feb 01 2025 10:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Fri Jan 31 2025 23:00:00 
    t.equal(intAmericaTz.next().toString(), 'Fri Feb 28 2025 10:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Thu Feb 27 2025 23:00:00 
    t.equal(intAmericaTz.next().toString(), 'Sat Mar 01 2025 10:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Fri Feb 28 2025 23:00:00 
    t.equal(intAmericaTz.next().toString(), 'Mon Mar 31 2025 09:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Sun Mar 30 2025 23:00:00 
    t.equal(intAmericaTz.next().toString(), 'Tue Apr 01 2025 09:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Mon Mar 31 2025 23:00:00 

    t.end();
});

test('every two month on last 2 days', function(t) {
    var intAsiaTz = parser.parseCronExpressions([ '0 0 L * ?'], {
        frequency: 2,
        frequencyType: 'monthly',
        repeatFor: 2,
        repeatType: 'days',
        currentDate: new Date('2024-12-09T18:30:00.000Z'), // IST 2024-12-10 00:00:00 :: CST 2024-12-09 13:30:00
        endDate: new Date('2025-05-01T18:30:00.000Z'), // IST 2025-05-02 00:00:00 :: CST 2025-02-01 13:30:00
        tz: 'Asia/Kolkata'
    });

    var intAmericaTz = parser.parseCronExpressions([ '0 23 L * ?'], {
        frequency: 2,
        frequencyType: 'monthly',
        repeatFor: 2,
        repeatType: 'days',
        currentDate: new Date('2024-12-09T18:30:00.000Z'), // IST 2024-12-10 00:00:00 :: CST 2024-12-09 13:30:00
        tz: 'America/Chicago'
    });

    t.equal(intAsiaTz.next().toString(), 'Mon Dec 30 2024 00:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.next().toString(), 'Tue Dec 31 2024 00:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.next().toString(), 'Thu Feb 27 2025 00:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.next().toString(), 'Fri Feb 28 2025 00:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.next().toString(), 'Tue Apr 29 2025 00:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.next().toString(), 'Wed Apr 30 2025 00:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.hasNext(), false, 'Machine:IST :: tz:IST'); 
    
    t.equal(intAmericaTz.next().toString(), 'Tue Dec 31 2024 10:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Mon Dec 30 2024 23:00:00 
    t.equal(intAmericaTz.next().toString(), 'Wed Jan 01 2025 10:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Tue Dec 31 2024 23:00:00 
    t.equal(intAmericaTz.next().toString(), 'Fri Feb 28 2025 10:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Thu Feb 27 2025 23:00:00 
    t.equal(intAmericaTz.next().toString(), 'Sat Mar 01 2025 10:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Fri Feb 28 2025 23:00:00 
    t.equal(intAmericaTz.next().toString(), 'Wed Apr 30 2025 09:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Tue Apr 29 2025 23:00:00 
    t.equal(intAmericaTz.next().toString(), 'Thu May 01 2025 09:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Wed Apr 30 2025 23:00:00 

    t.end();
});

test('every month on 31st', function(t) {
    var intAsiaTz = parser.parseCronExpressions([ '0 0 31 * ?'], {
        frequency: 1,
        frequencyType: 'monthly',
        currentDate: new Date('2024-11-09T18:30:00.000Z'), // IST 2024-11-10 00:00:00 :: CST 2024-11-09 13:30:00
        endDate: new Date('2025-04-01T18:30:00.000Z'), // IST 2025-04-02 00:00:00 :: CST 2025-04-01 13:30:00
        tz: 'Asia/Kolkata'
    });

    var intAmericaTz = parser.parseCronExpressions([ '0 23 31 * ?'], {
        frequency: 1,
        frequencyType: 'monthly',
        currentDate: new Date('2024-11-09T18:30:00.000Z'), // IST 2024-11-10 00:00:00 :: CST 2024-11-09 13:30:00
        tz: 'America/Chicago'
    });

    t.equal(intAsiaTz.next().toString(), 'Sat Nov 30 2024 00:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.next().toString(), 'Tue Dec 31 2024 00:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.next().toString(), 'Fri Jan 31 2025 00:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.next().toString(), 'Fri Feb 28 2025 00:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.next().toString(), 'Mon Mar 31 2025 00:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.hasNext(), false, 'Machine:IST :: tz:IST'); 
    
    t.equal(intAmericaTz.next().toString(), 'Sun Dec 01 2024 10:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Sat Nov 30 2024 23:00:00 
    t.equal(intAmericaTz.next().toString(), 'Wed Jan 01 2025 10:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Tue Dec 31 2025 23:00:00 
    t.equal(intAmericaTz.next().toString(), 'Sat Feb 01 2025 10:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Fri Jan 31 2025 23:00:00 
    t.equal(intAmericaTz.next().toString(), 'Sat Mar 01 2025 10:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Fri Feb 28 2025 23:00:00 
    t.equal(intAmericaTz.next().toString(), 'Tue Apr 01 2025 09:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Mon Mar 31 2025 23:00:00 
   
    t.end();
});

test('every two month on 31st', function(t) {
    var intAsiaTz = parser.parseCronExpressions([ '0 0 31 * ?'], {
        frequency: 2,
        frequencyType: 'monthly',
        currentDate: new Date('2024-12-09T18:30:00.000Z'), // IST 2024-12-10 00:00:00 :: CST 2024-12-09 13:30:00
        endDate: new Date('2025-09-01T18:30:00.000Z'), // IST 2025-09-02 00:00:00 :: CST 2025-09-01 13:30:00
        tz: 'Asia/Kolkata'
    });

    var intAmericaTz = parser.parseCronExpressions([ '0 23 31 * ?'], {
        frequency: 2,
        frequencyType: 'monthly',
        currentDate: new Date('2024-12-09T18:30:00.000Z'), // IST 2024-12-10 00:00:00 :: CST 2024-12-09 13:30:00
        tz: 'America/Chicago'
    });

    t.equal(intAsiaTz.next().toString(), 'Tue Dec 31 2024 00:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.next().toString(), 'Fri Feb 28 2025 00:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.next().toString(), 'Wed Apr 30 2025 00:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.next().toString(), 'Mon Jun 30 2025 00:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.next().toString(), 'Sun Aug 31 2025 00:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.hasNext(), false, 'Machine:IST :: tz:IST'); 
    
    t.equal(intAmericaTz.next().toString(), 'Wed Jan 01 2025 10:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Tue Dec 31 2025 23:00:00 
    t.equal(intAmericaTz.next().toString(), 'Sat Mar 01 2025 10:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Fri Feb 28 2025 23:00:00 
    t.equal(intAmericaTz.next().toString(), 'Thu May 01 2025 09:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Wed Apr 20 2025 23:00:00 
    t.equal(intAmericaTz.next().toString(), 'Tue Jul 01 2025 09:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Mon Jun 30 2025 23:00:00 
    t.equal(intAmericaTz.next().toString(), 'Mon Sep 01 2025 09:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Sun Aug 31 2025 23:00:00 

    t.end();
});

test('every twelve month on 31st', function(t) {
    var intAsiaTz = parser.parseCronExpressions([ '0 0 31 * ?'], {
        frequency: 12,
        frequencyType: 'monthly',
        currentDate: new Date('2025-02-09T18:30:00.000Z'), // IST 2025-02-10 00:00:00 :: CST 2025-02-09 13:30:00
        endDate: new Date('2029-03-01T18:30:00.000Z'), // IST 2029-03-02 00:00:00 :: CST 2029-03-01 13:30:00
        tz: 'Asia/Kolkata'
    });

    var intAmericaTz = parser.parseCronExpressions([ '0 23 31 * ?'], {
        frequency: 12,
        frequencyType: 'monthly',
        currentDate: new Date('2025-02-09T18:30:00.000Z'), // IST 2025-02-10 00:00:00 :: CST 2025-02-09 13:30:00
        tz: 'America/Chicago'
    });

    t.equal(intAsiaTz.next().toString(), 'Fri Feb 28 2025 00:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.next().toString(), 'Sat Feb 28 2026 00:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.next().toString(), 'Sun Feb 28 2027 00:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.next().toString(), 'Tue Feb 29 2028 00:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.next().toString(), 'Wed Feb 28 2029 00:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.hasNext(), false, 'Machine:IST :: tz:IST'); 
    
    t.equal(intAmericaTz.next().toString(), 'Sat Mar 01 2025 10:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Fri Feb 28 2025 23:00:00 
    t.equal(intAmericaTz.next().toString(), 'Sun Mar 01 2026 10:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Fri Feb 28 2026 23:00:00 
    t.equal(intAmericaTz.next().toString(), 'Mon Mar 01 2027 10:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Fri Feb 28 2027 23:00:00 
    t.equal(intAmericaTz.next().toString(), 'Wed Mar 01 2028 10:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Fri Feb 28 2028 23:00:00 
    t.equal(intAmericaTz.next().toString(), 'Thu Mar 01 2029 10:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Fri Feb 28 2029 23:00:00 

    t.end();
});

test('every Feb on 31st', function(t) {
    var intAsiaTz = parser.parseCronExpressions([ '0 10 29 2 ?'], {
        frequency: 1,
        frequencyType: 'yearly',
        currentDate: new Date('2025-02-09T18:30:00.000Z'), // IST 2025-02-10 00:00:00 :: CST 2025-02-09 13:30:00
        endDate: new Date('2029-03-01T18:30:00.000Z'), // IST 2025-03-02 00:00:00 :: CST 2025-03-01 13:30:00
        tz: 'Asia/Kolkata'
    });

    var intAmericaTz = parser.parseCronExpressions([ '0 0 29 2 ?'], {
        frequency: 1,
        frequencyType: 'yearly',
        currentDate: new Date('2025-02-09T18:30:00.000Z'), // IST 2025-02-10 00:00:00 :: CST 2025-02-09 13:30:00
        tz: 'America/Chicago'
    });

    t.equal(intAsiaTz.next().toString(), 'Fri Feb 28 2025 10:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.next().toString(), 'Sat Feb 28 2026 10:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.next().toString(), 'Sun Feb 28 2027 10:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.next().toString(), 'Tue Feb 29 2028 10:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.next().toString(), 'Wed Feb 28 2029 10:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.hasNext(), false, 'Machine:IST :: tz:IST'); 
    
    t.equal(intAmericaTz.next().toString(), 'Fri Feb 28 2025 11:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Fri Feb 28 2025 00:00:00 
    t.equal(intAmericaTz.next().toString(), 'Sat Feb 28 2026 11:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Fri Feb 28 2025 00:00:00 
    t.equal(intAmericaTz.next().toString(), 'Sun Feb 28 2027 11:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Fri Feb 28 2025 00:00:00 
    t.equal(intAmericaTz.next().toString(), 'Tue Feb 29 2028 11:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Fri Feb 28 2025 00:00:00 
    t.equal(intAmericaTz.next().toString(), 'Wed Feb 28 2029 11:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Fri Feb 28 2025 00:00:00 

    t.end();
});

test('every two month first two full working week', function(t) {
    var intAsiaTz = parser.parseCronExpressions([ '0 23 ? * 1#1'], {
        repeatFor: 2,
        repeatType: 'weeks',
        frequency: 2,
        frequencyType: 'monthly',
        isFullWeek: true,
        currentDate: new Date('2024-07-09T18:30:00.000Z'), // IST 2024-07-10 00:00:00 :: CST 2024-07-09 13:30:00
        endDate: new Date('2024-11-04T18:30:00.000Z'), // IST 2024-11-05 00:00:00 :: CST 2024-11-04 13:30:00
        tz: 'Asia/Kolkata'
    });

    var intAmericaTz = parser.parseCronExpressions([ '0 23 ? * 1#1'], {
        repeatFor: 2,
        repeatType: 'weeks',
        frequency: 2,
        frequencyType: 'monthly',
        isFullWeek: true,
        currentDate: new Date('2024-07-09T18:30:00.000Z'), // IST 2024-07-10 00:00:00 :: CST 2024-07-09 13:30:00
        endDate: new Date('2024-11-05T18:30:00.000Z'), // IST 2024-11-06 00:00:00 :: CST 2024-11-05 13:30:00
        tz: 'America/Chicago'
    });

    t.equal(intAsiaTz.next().toString(), 'Wed Jul 10 2024 23:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.next().toString(), 'Thu Jul 11 2024 23:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.next().toString(), 'Fri Jul 12 2024 23:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.next().toString(), 'Mon Sep 02 2024 23:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.next().toString(), 'Tue Sep 03 2024 23:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.next().toString(), 'Wed Sep 04 2024 23:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.next().toString(), 'Thu Sep 05 2024 23:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.next().toString(), 'Fri Sep 06 2024 23:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.next().toString(), 'Mon Sep 09 2024 23:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.next().toString(), 'Tue Sep 10 2024 23:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.next().toString(), 'Wed Sep 11 2024 23:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.next().toString(), 'Thu Sep 12 2024 23:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.next().toString(), 'Fri Sep 13 2024 23:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.next().toString(), 'Mon Nov 04 2024 23:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.hasNext(), false, 'Machine:IST :: tz:IST'); 

    t.equal(intAmericaTz.next().toString(), 'Wed Jul 10 2024 09:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Tue Jul 09 2024 23:00:00 
    t.equal(intAmericaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAmericaTz.next().toString(), 'Thu Jul 11 2024 09:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Wed Jul 10 2024 23:00:00 
    t.equal(intAmericaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAmericaTz.next().toString(), 'Fri Jul 12 2024 09:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Thu Jul 11 2024 23:00:00 
    t.equal(intAmericaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAmericaTz.next().toString(), 'Sat Jul 13 2024 09:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Fri Jul 12 2024 23:00:00 
    t.equal(intAmericaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAmericaTz.next().toString(), 'Tue Sep 03 2024 09:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Mon Sep 02 2024 23:00:00 
    t.equal(intAmericaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAmericaTz.next().toString(), 'Wed Sep 04 2024 09:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Tue Sep 03 2024 23:00:00 
    t.equal(intAmericaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAmericaTz.next().toString(), 'Thu Sep 05 2024 09:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Wed Sep 04 2024 23:00:00 
    t.equal(intAmericaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAmericaTz.next().toString(), 'Fri Sep 06 2024 09:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Thu Sep 05 2024 23:00:00 
    t.equal(intAmericaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAmericaTz.next().toString(), 'Sat Sep 07 2024 09:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Fri Sep 06 2024 23:00:00 
    t.equal(intAmericaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAmericaTz.next().toString(), 'Tue Sep 10 2024 09:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Mon Sep 09 2024 23:00:00 
    t.equal(intAmericaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAmericaTz.next().toString(), 'Wed Sep 11 2024 09:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Tue Sep 10 2024 23:00:00 
    t.equal(intAmericaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAmericaTz.next().toString(), 'Thu Sep 12 2024 09:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Wed Sep 11 2024 23:00:00 
    t.equal(intAmericaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAmericaTz.next().toString(), 'Fri Sep 13 2024 09:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Thu Sep 12 2024 23:00:00 
    t.equal(intAmericaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAmericaTz.next().toString(), 'Sat Sep 14 2024 09:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Fri Sep 13 2024 23:00:00 
    t.equal(intAmericaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAmericaTz.next().toString(), 'Tue Nov 05 2024 10:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Mon Nov 04 2024 23:00:00 
    t.equal(intAmericaTz.hasNext(), false, 'Machine:IST :: tz:IST'); 

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
        endDate: new Date('2024-11-17T18:30:00.000Z'), // IST 2024-11-18 00:00:00 :: CST 2024-11-17 13:30:00
        tz: 'Asia/Kolkata'
    });
    var intAmericaTz = parser.parseCronExpressions([ '0 0 ? * 5L'], {
        repeatFor: 2,
        repeatType: 'weeks',
        frequency: 2,
        frequencyType: 'monthly',
        isFullWeek: true,
        currentDate: new Date('2024-07-09T18:30:00.000Z'), // IST 2024-07-10 00:00:00 :: CST 2024-07-09 13:30:00
        endDate: new Date('2024-09-16T18:30:00.000Z'), // IST 2024-09-17 00:00:00 :: CST 2024-09-16 13:30:00
        tz: 'America/Chicago'
    });

    var intAmericaTz2 = parser.parseCronExpressions([ '0 23 ? * 5L'], {
        repeatFor: 2,
        repeatType: 'weeks',
        frequency: 2,
        frequencyType: 'monthly',
        isFullWeek: true,
        currentDate: new Date('2024-07-09T18:30:00.000Z'), // IST 2024-07-10 00:00:00 :: CST 2024-07-09 13:30:00
        endDate: new Date('2024-09-17T18:30:00.000Z'), // IST 2024-09-18 00:00:00 :: CST 2024-09-17 13:30:00
        tz: 'America/Chicago'
    });

    t.equal(intAsiaTz.next().toString(), 'Thu Jul 25 2024 00:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.hasNext(), true, 'Machine:IST :: tz:IST');
    t.equal(intAsiaTz.next().toString(), 'Fri Jul 26 2024 00:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.hasNext(), true, 'Machine:IST :: tz:IST');
    t.equal(intAsiaTz.next().toString(), 'Mon Sep 16 2024 00:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.hasNext(), true, 'Machine:IST :: tz:IST');
    t.equal(intAsiaTz.next().toString(), 'Tue Sep 17 2024 00:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.hasNext(), true, 'Machine:IST :: tz:IST');
    t.equal(intAsiaTz.next().toString(), 'Wed Sep 18 2024 00:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.hasNext(), true, 'Machine:IST :: tz:IST');
    t.equal(intAsiaTz.next().toString(), 'Thu Sep 19 2024 00:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.hasNext(), true, 'Machine:IST :: tz:IST');
    t.equal(intAsiaTz.next().toString(), 'Fri Sep 20 2024 00:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.hasNext(), true, 'Machine:IST :: tz:IST');
    t.equal(intAsiaTz.next().toString(), 'Mon Sep 23 2024 00:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.hasNext(), true, 'Machine:IST :: tz:IST');
    t.equal(intAsiaTz.next().toString(), 'Tue Sep 24 2024 00:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.hasNext(), true, 'Machine:IST :: tz:IST');
    t.equal(intAsiaTz.next().toString(), 'Wed Sep 25 2024 00:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.hasNext(), true, 'Machine:IST :: tz:IST');
    t.equal(intAsiaTz.next().toString(), 'Thu Sep 26 2024 00:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.hasNext(), true, 'Machine:IST :: tz:IST');
    t.equal(intAsiaTz.next().toString(), 'Fri Sep 27 2024 00:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.hasNext(), true, 'Machine:IST :: tz:IST');
    t.equal(intAsiaTz.next().toString(), 'Mon Nov 18 2024 00:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.hasNext(), false, 'Machine:IST :: tz:IST');

    t.equal(intAmericaTz.next().toString(), 'Mon Jul 15 2024 10:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Mon Jul 15 2024 00:00:00 
    t.equal(intAmericaTz.hasNext(), true, 'Machine:IST :: tz:IST');
    t.equal(intAmericaTz.next().toString(), 'Tue Jul 16 2024 10:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Tue Jul 16 2024 00:00:00 
    t.equal(intAmericaTz.hasNext(), true, 'Machine:IST :: tz:IST');
    t.equal(intAmericaTz.next().toString(), 'Wed Jul 17 2024 10:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Wed Jul 17 2024 00:00:00 
    t.equal(intAmericaTz.hasNext(), true, 'Machine:IST :: tz:IST');
    t.equal(intAmericaTz.next().toString(), 'Thu Jul 18 2024 10:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Thu Jul 18 2024 00:00:00 
    t.equal(intAmericaTz.hasNext(), true, 'Machine:IST :: tz:IST');
    t.equal(intAmericaTz.next().toString(), 'Fri Jul 19 2024 10:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Fri Jul 19 2024 00:00:00 
    t.equal(intAmericaTz.hasNext(), true, 'Machine:IST :: tz:IST');
    t.equal(intAmericaTz.next().toString(), 'Mon Jul 22 2024 10:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Mon Jul 22 2024 00:00:00 
    t.equal(intAmericaTz.hasNext(), true, 'Machine:IST :: tz:IST');
    t.equal(intAmericaTz.next().toString(), 'Tue Jul 23 2024 10:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Tue Jul 23 2024 00:00:00 
    t.equal(intAmericaTz.hasNext(), true, 'Machine:IST :: tz:IST');
    t.equal(intAmericaTz.next().toString(), 'Wed Jul 24 2024 10:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Wed Jul 24 2024 00:00:00 
    t.equal(intAmericaTz.hasNext(), true, 'Machine:IST :: tz:IST');
    t.equal(intAmericaTz.next().toString(), 'Thu Jul 25 2024 10:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Thu Jul 25 2024 00:00:00 
    t.equal(intAmericaTz.hasNext(), true, 'Machine:IST :: tz:IST');
    t.equal(intAmericaTz.next().toString(), 'Fri Jul 26 2024 10:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Fri Jul 26 2024 00:00:00 
    t.equal(intAmericaTz.hasNext(), true, 'Machine:IST :: tz:IST');
    t.equal(intAmericaTz.next().toString(), 'Mon Sep 16 2024 10:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Mon Sep 16 2024 00:00:00 
    t.equal(intAmericaTz.hasNext(), false, 'Machine:IST :: tz:IST');

    t.equal(intAmericaTz2.next().toString(), 'Tue Jul 16 2024 09:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Mon Jul 15 2024 23:00:00 
    t.equal(intAmericaTz2.hasNext(), true, 'Machine:IST :: tz:IST');
    t.equal(intAmericaTz2.next().toString(), 'Wed Jul 17 2024 09:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Tue Jul 16 2024 23:00:00 
    t.equal(intAmericaTz2.hasNext(), true, 'Machine:IST :: tz:IST');
    t.equal(intAmericaTz2.next().toString(), 'Thu Jul 18 2024 09:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Wed Jul 17 2024 23:00:00 
    t.equal(intAmericaTz2.hasNext(), true, 'Machine:IST :: tz:IST');
    t.equal(intAmericaTz2.next().toString(), 'Fri Jul 19 2024 09:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Thu Jul 18 2024 23:00:00 
    t.equal(intAmericaTz2.hasNext(), true, 'Machine:IST :: tz:IST');
    t.equal(intAmericaTz2.next().toString(), 'Sat Jul 20 2024 09:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Fri Jul 19 2024 23:00:00 
    t.equal(intAmericaTz2.hasNext(), true, 'Machine:IST :: tz:IST');
    t.equal(intAmericaTz2.next().toString(), 'Tue Jul 23 2024 09:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Mon Jul 22 2024 23:00:00 
    t.equal(intAmericaTz2.hasNext(), true, 'Machine:IST :: tz:IST');
    t.equal(intAmericaTz2.next().toString(), 'Wed Jul 24 2024 09:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Tue Jul 23 2024 23:00:00 
    t.equal(intAmericaTz2.hasNext(), true, 'Machine:IST :: tz:IST');
    t.equal(intAmericaTz2.next().toString(), 'Thu Jul 25 2024 09:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Wed Jul 24 2024 23:00:00 
    t.equal(intAmericaTz2.hasNext(), true, 'Machine:IST :: tz:IST');
    t.equal(intAmericaTz2.next().toString(), 'Fri Jul 26 2024 09:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Thu Jul 25 2024 23:00:00 
    t.equal(intAmericaTz2.hasNext(), true, 'Machine:IST :: tz:IST');
    t.equal(intAmericaTz2.next().toString(), 'Sat Jul 27 2024 09:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Fri Jul 26 2024 23:00:00 
    t.equal(intAmericaTz2.hasNext(), true, 'Machine:IST :: tz:IST');
    t.equal(intAmericaTz2.next().toString(), 'Tue Sep 17 2024 09:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Mon Sep 16 2024 23:00:00 
    t.equal(intAmericaTz2.hasNext(), false, 'Machine:IST :: tz:IST');

    t.end();
});

test('every July, Sept and Nov last two full working week', function(t) {
    var intAsiaTz = parser.parseCronExpressions([ '0 0 ? 7,9,11 5L'], {
        repeatFor: 2,
        repeatType: 'weeks',
        frequency: 2,
        frequencyType: 'yearly',
        isFullWeek: true,
        currentDate: new Date('2024-07-23T18:30:00.000Z'), // IST 2024-07-24 00:00:00 :: CST 2024-07-23 13:30:00
        endDate: new Date('2024-11-17T18:30:00.000Z'), // IST 2024-11-18 00:00:00 :: CST 2024-11-17 13:30:00
        tz: 'Asia/Kolkata'
    });
    var intAmericaTz = parser.parseCronExpressions([ '0 0 ? 7,9,11 5L'], {
        repeatFor: 2,
        repeatType: 'weeks',
        frequency: 2,
        frequencyType: 'yearly',
        isFullWeek: true,
        currentDate: new Date('2024-07-09T18:30:00.000Z'), // IST 2024-07-10 00:00:00 :: CST 2024-07-09 13:30:00
        endDate: new Date('2024-09-16T18:30:00.000Z'), // IST 2024-09-17 00:00:00 :: CST 2024-09-16 13:30:00
        tz: 'America/Chicago'
    });

    var intAmericaTz2 = parser.parseCronExpressions([ '0 23 ? 7,9,11 5L'], {
        repeatFor: 2,
        repeatType: 'weeks',
        frequency: 2,
        frequencyType: 'yearly',
        isFullWeek: true,
        currentDate: new Date('2024-07-09T18:30:00.000Z'), // IST 2024-07-10 00:00:00 :: CST 2024-07-09 13:30:00
        endDate: new Date('2024-09-17T18:30:00.000Z'), // IST 2024-09-18 00:00:00 :: CST 2024-09-17 13:30:00
        tz: 'America/Chicago'
    });

    t.equal(intAsiaTz.next().toString(), 'Thu Jul 25 2024 00:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.hasNext(), true, 'Machine:IST :: tz:IST');
    t.equal(intAsiaTz.next().toString(), 'Fri Jul 26 2024 00:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.hasNext(), true, 'Machine:IST :: tz:IST');
    t.equal(intAsiaTz.next().toString(), 'Mon Sep 16 2024 00:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.hasNext(), true, 'Machine:IST :: tz:IST');
    t.equal(intAsiaTz.next().toString(), 'Tue Sep 17 2024 00:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.hasNext(), true, 'Machine:IST :: tz:IST');
    t.equal(intAsiaTz.next().toString(), 'Wed Sep 18 2024 00:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.hasNext(), true, 'Machine:IST :: tz:IST');
    t.equal(intAsiaTz.next().toString(), 'Thu Sep 19 2024 00:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.hasNext(), true, 'Machine:IST :: tz:IST');
    t.equal(intAsiaTz.next().toString(), 'Fri Sep 20 2024 00:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.hasNext(), true, 'Machine:IST :: tz:IST');
    t.equal(intAsiaTz.next().toString(), 'Mon Sep 23 2024 00:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.hasNext(), true, 'Machine:IST :: tz:IST');
    t.equal(intAsiaTz.next().toString(), 'Tue Sep 24 2024 00:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.hasNext(), true, 'Machine:IST :: tz:IST');
    t.equal(intAsiaTz.next().toString(), 'Wed Sep 25 2024 00:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.hasNext(), true, 'Machine:IST :: tz:IST');
    t.equal(intAsiaTz.next().toString(), 'Thu Sep 26 2024 00:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.hasNext(), true, 'Machine:IST :: tz:IST');
    t.equal(intAsiaTz.next().toString(), 'Fri Sep 27 2024 00:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.hasNext(), true, 'Machine:IST :: tz:IST');
    t.equal(intAsiaTz.next().toString(), 'Mon Nov 18 2024 00:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.hasNext(), false, 'Machine:IST :: tz:IST');

    t.equal(intAmericaTz.next().toString(), 'Mon Jul 15 2024 10:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Mon Jul 15 2024 00:00:00 
    t.equal(intAmericaTz.hasNext(), true, 'Machine:IST :: tz:IST');
    t.equal(intAmericaTz.next().toString(), 'Tue Jul 16 2024 10:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Tue Jul 16 2024 00:00:00 
    t.equal(intAmericaTz.hasNext(), true, 'Machine:IST :: tz:IST');
    t.equal(intAmericaTz.next().toString(), 'Wed Jul 17 2024 10:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Wed Jul 17 2024 00:00:00 
    t.equal(intAmericaTz.hasNext(), true, 'Machine:IST :: tz:IST');
    t.equal(intAmericaTz.next().toString(), 'Thu Jul 18 2024 10:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Thu Jul 18 2024 00:00:00 
    t.equal(intAmericaTz.hasNext(), true, 'Machine:IST :: tz:IST');
    t.equal(intAmericaTz.next().toString(), 'Fri Jul 19 2024 10:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Fri Jul 19 2024 00:00:00 
    t.equal(intAmericaTz.hasNext(), true, 'Machine:IST :: tz:IST');
    t.equal(intAmericaTz.next().toString(), 'Mon Jul 22 2024 10:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Mon Jul 22 2024 00:00:00 
    t.equal(intAmericaTz.hasNext(), true, 'Machine:IST :: tz:IST');
    t.equal(intAmericaTz.next().toString(), 'Tue Jul 23 2024 10:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Tue Jul 23 2024 00:00:00 
    t.equal(intAmericaTz.hasNext(), true, 'Machine:IST :: tz:IST');
    t.equal(intAmericaTz.next().toString(), 'Wed Jul 24 2024 10:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Wed Jul 24 2024 00:00:00 
    t.equal(intAmericaTz.hasNext(), true, 'Machine:IST :: tz:IST');
    t.equal(intAmericaTz.next().toString(), 'Thu Jul 25 2024 10:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Thu Jul 25 2024 00:00:00 
    t.equal(intAmericaTz.hasNext(), true, 'Machine:IST :: tz:IST');
    t.equal(intAmericaTz.next().toString(), 'Fri Jul 26 2024 10:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Fri Jul 26 2024 00:00:00 
    t.equal(intAmericaTz.hasNext(), true, 'Machine:IST :: tz:IST');
    t.equal(intAmericaTz.next().toString(), 'Mon Sep 16 2024 10:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Mon Sep 16 2024 00:00:00 
    t.equal(intAmericaTz.hasNext(), false, 'Machine:IST :: tz:IST');

    t.equal(intAmericaTz2.next().toString(), 'Tue Jul 16 2024 09:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Mon Jul 15 2024 23:00:00 
    t.equal(intAmericaTz2.hasNext(), true, 'Machine:IST :: tz:IST');
    t.equal(intAmericaTz2.next().toString(), 'Wed Jul 17 2024 09:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Tue Jul 16 2024 23:00:00 
    t.equal(intAmericaTz2.hasNext(), true, 'Machine:IST :: tz:IST');
    t.equal(intAmericaTz2.next().toString(), 'Thu Jul 18 2024 09:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Wed Jul 17 2024 23:00:00 
    t.equal(intAmericaTz2.hasNext(), true, 'Machine:IST :: tz:IST');
    t.equal(intAmericaTz2.next().toString(), 'Fri Jul 19 2024 09:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Thu Jul 18 2024 23:00:00 
    t.equal(intAmericaTz2.hasNext(), true, 'Machine:IST :: tz:IST');
    t.equal(intAmericaTz2.next().toString(), 'Sat Jul 20 2024 09:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Fri Jul 19 2024 23:00:00 
    t.equal(intAmericaTz2.hasNext(), true, 'Machine:IST :: tz:IST');
    t.equal(intAmericaTz2.next().toString(), 'Tue Jul 23 2024 09:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Mon Jul 22 2024 23:00:00 
    t.equal(intAmericaTz2.hasNext(), true, 'Machine:IST :: tz:IST');
    t.equal(intAmericaTz2.next().toString(), 'Wed Jul 24 2024 09:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Tue Jul 23 2024 23:00:00 
    t.equal(intAmericaTz2.hasNext(), true, 'Machine:IST :: tz:IST');
    t.equal(intAmericaTz2.next().toString(), 'Thu Jul 25 2024 09:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Wed Jul 24 2024 23:00:00 
    t.equal(intAmericaTz2.hasNext(), true, 'Machine:IST :: tz:IST');
    t.equal(intAmericaTz2.next().toString(), 'Fri Jul 26 2024 09:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Thu Jul 25 2024 23:00:00 
    t.equal(intAmericaTz2.hasNext(), true, 'Machine:IST :: tz:IST');
    t.equal(intAmericaTz2.next().toString(), 'Sat Jul 27 2024 09:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Fri Jul 26 2024 23:00:00 
    t.equal(intAmericaTz2.hasNext(), true, 'Machine:IST :: tz:IST');
    t.equal(intAmericaTz2.next().toString(), 'Tue Sep 17 2024 09:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Mon Sep 16 2024 23:00:00 
    t.equal(intAmericaTz2.hasNext(), false, 'Machine:IST :: tz:IST');

    t.end();
});

test('every month on first Mon and Fri, and repeat for 2 weeks', function(t) {
    var intAsiaTz = parser.parseCronExpressions([ '0 0 ? * 1#1', '0 0 ? * 5#1'], {
        frequency: 1,
        repeatFor: 2,
        repeatType: 'weeks',
        frequencyType: 'monthly',
        currentDate: new Date('2024-07-03T18:30:00.000Z'), // IST 2024-07-04 00:00:00 :: CST 2024-07-03 13:30:00
        endDate: new Date('2024-08-12T18:30:00.000Z'), // IST 2024-08-13 00:00:00 :: CST 2024-08-12 13:30:00
        tz: 'Asia/Kolkata'
    });

    var intAmericaTz = parser.parseCronExpressions([ '0 23 ? * 1#1', '0 23 ? * 5#1'], {
        frequency: 1,
        repeatFor: 2,
        repeatType: 'weeks',
        frequencyType: 'monthly',
        currentDate: new Date('2024-07-03T18:30:00.000Z'), // IST 2024-07-04 00:00:00 :: CST 2024-07-03 13:30:00
        tz: 'America/Chicago'
    });

    t.equal(intAsiaTz.next().toString(), 'Fri Jul 05 2024 00:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.next().toString(), 'Mon Jul 08 2024 00:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.next().toString(), 'Fri Jul 12 2024 00:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.next().toString(), 'Fri Aug 02 2024 00:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.next().toString(), 'Mon Aug 05 2024 00:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.next().toString(), 'Fri Aug 09 2024 00:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.next().toString(), 'Mon Aug 12 2024 00:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.hasNext(), false, 'Machine:IST :: tz:IST'); 
   
    
    t.equal(intAmericaTz.next().toString(), 'Sat Jul 06 2024 09:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Fri Jul 05 2024 23:00:00 
    t.equal(intAmericaTz.next().toString(), 'Tue Jul 09 2024 09:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Mon Jul 08 2024 23:00:00 
    t.equal(intAmericaTz.next().toString(), 'Sat Jul 13 2024 09:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Fri Jul 12 2024 23:00:00 
    t.equal(intAmericaTz.next().toString(), 'Sat Aug 03 2024 09:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Fri Aug 02 2024 23:00:00 
    t.equal(intAmericaTz.next().toString(), 'Tue Aug 06 2024 09:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Mon Aug 05 2024 23:00:00 
    t.equal(intAmericaTz.next().toString(), 'Sat Aug 10 2024 09:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Fri Aug 09 2024 23:00:00 
    t.equal(intAmericaTz.next().toString(), 'Tue Aug 13 2024 09:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Mon Aug 12 2024 23:00:00 

    t.end();
});

test('every month on second Mon, repeat for 10 workingDays', function(t) {
    var intAsiaTz = parser.parseCronExpressions([ '0 0 ? * 1#2'], {
        frequency: 1,
        repeatFor: 10,
        repeatType: 'workingDays',
        frequencyType: 'monthly',
        currentDate: new Date('2024-07-16T18:30:00.000Z'), // IST 2024-07-17 00:00:00 :: CST 2024-07-16 13:30:00
        endDate: new Date('2024-09-09T18:30:00.000Z'), // IST 2024-09-10 00:00:00 :: CST 2024-09-09 13:30:00
        tz: 'Asia/Kolkata'
    });

    var intAmericaTz = parser.parseCronExpressions([ '0 23 ? * 1#2'], {
        frequency: 1,
        repeatFor: 10,
        repeatType: 'workingDays',
        frequencyType: 'monthly',
        currentDate: new Date('2024-07-16T18:30:00.000Z'), // IST 2024-07-17 00:00:00 :: CST 2024-07-16 13:30:00
        endDate: new Date('2024-09-10T18:30:00.000Z'), // IST 2024-09-11 00:00:00 :: CST 2024-09-10 13:30:00
        tz: 'America/Chicago'
    });

    t.equal(intAsiaTz.next().toString(), 'Thu Jul 18 2024 00:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.next().toString(), 'Fri Jul 19 2024 00:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.next().toString(), 'Mon Aug 12 2024 00:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.next().toString(), 'Tue Aug 13 2024 00:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.next().toString(), 'Wed Aug 14 2024 00:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.next().toString(), 'Thu Aug 15 2024 00:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.next().toString(), 'Fri Aug 16 2024 00:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.next().toString(), 'Mon Aug 19 2024 00:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.next().toString(), 'Tue Aug 20 2024 00:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.next().toString(), 'Wed Aug 21 2024 00:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.next().toString(), 'Thu Aug 22 2024 00:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.next().toString(), 'Fri Aug 23 2024 00:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.next().toString(), 'Mon Sep 09 2024 00:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.hasNext(), false, 'Machine:IST :: tz:IST'); 
   
   
    
    t.equal(intAmericaTz.next().toString(), 'Wed Jul 17 2024 09:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Tue Jul 16 2024 23:00:00 
    t.equal(intAmericaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAmericaTz.next().toString(), 'Thu Jul 18 2024 09:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Wed Jul 17 2024 23:00:00 
    t.equal(intAmericaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAmericaTz.next().toString(), 'Fri Jul 19 2024 09:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Thu Jul 18 2024 23:00:00 
    t.equal(intAmericaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAmericaTz.next().toString(), 'Sat Jul 20 2024 09:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Fri Jul 19 2024 23:00:00 
    t.equal(intAmericaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAmericaTz.next().toString(), 'Tue Aug 13 2024 09:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Mon Aug 12 2024 23:00:00 
    t.equal(intAmericaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAmericaTz.next().toString(), 'Wed Aug 14 2024 09:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Tue Aug 13 2024 23:00:00 
    t.equal(intAmericaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAmericaTz.next().toString(), 'Thu Aug 15 2024 09:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Wed Aug 14 2024 23:00:00 
    t.equal(intAmericaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAmericaTz.next().toString(), 'Fri Aug 16 2024 09:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Thu Aug 15 2024 23:00:00 
    t.equal(intAmericaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAmericaTz.next().toString(), 'Sat Aug 17 2024 09:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Fri Aug 16 2024 23:00:00 
    t.equal(intAmericaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAmericaTz.next().toString(), 'Tue Aug 20 2024 09:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Mon Aug 19 2024 23:00:00 
    t.equal(intAmericaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAmericaTz.next().toString(), 'Wed Aug 21 2024 09:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Tue Aug 20 2024 23:00:00 
    t.equal(intAmericaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAmericaTz.next().toString(), 'Thu Aug 22 2024 09:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Wed Aug 21 2024 23:00:00 
    t.equal(intAmericaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAmericaTz.next().toString(), 'Fri Aug 23 2024 09:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Thu Aug 22 2024 23:00:00 
    t.equal(intAmericaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAmericaTz.next().toString(), 'Sat Aug 24 2024 09:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Fri Aug 23 2024 23:00:00 
    t.equal(intAmericaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAmericaTz.next().toString(), 'Tue Sep 10 2024 09:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Mon Sep 09 2024 23:00:00 
    t.equal(intAmericaTz.hasNext(), false, 'Machine:IST :: tz:IST'); 

    t.end();
});

test('every Jan, Mar and May on 10th and repeat for 3 days', function(t) {
    var intAsiaTz = parser.parseCronExpressions([ '0 0 10 1,3,5 ?'], {
        frequency: 1,
        frequencyType: 'yearly',
        repeatFor: 3,
        repeatType: 'days',
        currentDate: new Date('2024-07-09T18:30:00.000Z'), // IST 2024-07-10 00:00:00 :: CST 2024-07-09 13:30:00
        endDate: new Date('2025-03-10T18:30:00.000Z'), // IST 2024-03-11 00:00:00 :: CST 2024-03-10 13:30:00
        tz: 'Asia/Kolkata'
    });

    var intAmericaTz = parser.parseCronExpressions([ '0 23 10 1,3,5 ?'], {
        frequency: 1,
        frequencyType: 'yearly',
        repeatFor: 3,
        repeatType: 'days',
        currentDate: new Date('2024-07-09T18:30:00.000Z'), // IST 2024-07-10 00:00:00 :: CST 2024-07-09 13:30:00
        endDate: new Date('2025-03-11T18:30:00.000Z'), // IST 2024-03-12 00:00:00 :: CST 2024-03-11 13:30:00
        tz: 'America/Chicago'
    });

    t.equal(intAsiaTz.next().toString(), 'Fri Jan 10 2025 00:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.next().toString(), 'Sat Jan 11 2025 00:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.next().toString(), 'Sun Jan 12 2025 00:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.next().toString(), 'Mon Mar 10 2025 00:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.hasNext(), false, 'Machine:IST :: tz:IST'); 
   
    t.equal(intAmericaTz.next().toString(), 'Sat Jan 11 2025 10:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Fri Jan 10 2025 23:00:00 
    t.equal(intAmericaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAmericaTz.next().toString(), 'Sun Jan 12 2025 10:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Sat Jan 11 2025 23:00:00 
    t.equal(intAmericaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAmericaTz.next().toString(), 'Mon Jan 13 2025 10:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Sun Jan 12 2025 23:00:00 
    t.equal(intAmericaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAmericaTz.next().toString(), 'Tue Mar 11 2025 09:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Mon Mar 10 2025 23:00:00 
    t.equal(intAmericaTz.hasNext(), false, 'Machine:IST :: tz:IST'); 

    t.end();
});

test('every first weekday at 11PM of August, September and December repeat for 5 working days, skip if the first day is Monday', function(t) {
    var intAsiaTz = parser.parseCronExpressions([ '0 23 1W 8,9,12 ?'], {
        frequency: 1,
        frequencyType: 'yearly',
        repeatFor: 5,
        repeatType: 'workingDays',
        skipFrom: 1,
        skipTo: 3,
        currentDate: new Date('2025-08-03T18:30:00.000Z'), // IST 2025-08-04 00:00:00 :: CST 2025-08-03 13:30:00
        endDate: new Date('2025-12-03T18:30:00.000Z'), // IST 2025-12-04 00:00:00 :: CST 2025-12-03 13:30:00
        tz: 'Asia/Kolkata'
    });

    var intAmericaTz = parser.parseCronExpressions([ '0 23 1W 8,9,12 ?'], {
        frequency: 1,
        frequencyType: 'yearly',
        repeatFor: 5,
        repeatType: 'workingDays',
        skipFrom: 1,
        skipTo: 3,
        currentDate: new Date('2025-08-03T18:30:00.000Z'), // IST 2025-08-04 00:00:00 :: CST 2025-08-03 13:30:00
        endDate: new Date('2025-12-04T18:30:00.000Z'), // IST 2025-12-05 00:00:00 :: CST 2025-12-04 13:30:00
        tz: 'America/Chicago'
    });

    t.equal(intAsiaTz.next().toString(), 'Mon Aug 04 2025 23:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.next().toString(), 'Tue Aug 05 2025 23:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.next().toString(), 'Wed Aug 06 2025 23:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.next().toString(), 'Thu Aug 07 2025 23:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.next().toString(), 'Wed Sep 03 2025 23:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.next().toString(), 'Thu Sep 04 2025 23:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.next().toString(), 'Fri Sep 05 2025 23:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.next().toString(), 'Mon Sep 08 2025 23:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.next().toString(), 'Tue Sep 09 2025 23:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.next().toString(), 'Wed Dec 03 2025 23:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.hasNext(), false, 'Machine:IST :: tz:IST'); 
    
    t.equal(intAmericaTz.next().toString(), 'Tue Aug 05 2025 09:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Mon Aug 04 2025 23:00:00 
    t.equal(intAmericaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAmericaTz.next().toString(), 'Wed Aug 06 2025 09:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Tue Aug 05 2025 23:00:00 
    t.equal(intAmericaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAmericaTz.next().toString(), 'Thu Aug 07 2025 09:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Wed Aug 06 2025 23:00:00 
    t.equal(intAmericaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAmericaTz.next().toString(), 'Fri Aug 08 2025 09:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Thu Aug 07 2025 23:00:00 
    t.equal(intAmericaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAmericaTz.next().toString(), 'Thu Sep 04 2025 09:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Wed Sep 03 2025 23:00:00 
    t.equal(intAmericaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAmericaTz.next().toString(), 'Fri Sep 05 2025 09:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Thu Sep 04 2025 23:00:00 
    t.equal(intAmericaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAmericaTz.next().toString(), 'Sat Sep 06 2025 09:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Fri Sep 05 2025 23:00:00 
    t.equal(intAmericaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAmericaTz.next().toString(), 'Tue Sep 09 2025 09:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Mon Sep 08 2025 23:00:00 
    t.equal(intAmericaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAmericaTz.next().toString(), 'Wed Sep 10 2025 09:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Tue Sep 09 2025 23:00:00 
    t.equal(intAmericaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAmericaTz.next().toString(), 'Thu Dec 04 2025 10:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Wed Dec 03 2025 23:00:00 
    t.equal(intAmericaTz.hasNext(), false, 'Machine:IST :: tz:IST'); 

    t.end();
});

test('every last Mon, Wed and Fri of August, October and December', function(t) {
    var intAsiaTz = parser.parseCronExpressions([ '0 0 ? 8,10,12 1L', '0 0 ? 8,10,12 3L', '0 0 ? 8,10,12 5L'], {
        frequency: 1,
        frequencyType: 'yearly',
        currentDate: new Date('2024-07-03T18:30:00.000Z'), // IST 2024-07-04 00:00:00 :: CST 2024-07-03 13:30:00
        endDate: new Date('2024-10-26T18:30:00.000Z'), // IST 2024-10-27 00:00:00 :: CST 2024-10-26 13:30:00
        tz: 'Asia/Kolkata'
    });

    var intAmericaTz = parser.parseCronExpressions([ '0 23 ? 8,10,12 1L', '0 23 ? 8,10,12 3L', '0 23 ? 8,10,12 5L'], {
        frequency: 1,
        frequencyType: 'yearly',
        currentDate: new Date('2024-07-03T18:30:00.000Z'), // IST 2024-07-04 00:00:00 :: CST 2024-07-03 13:30:00
        endDate: new Date('2024-10-26T18:30:00.000Z'), // IST 2024-10-27 00:00:00 :: CST 2024-10-26 13:30:00
        tz: 'America/Chicago'
    });

    t.equal(intAsiaTz.next().toString(), 'Mon Aug 26 2024 00:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.next().toString(), 'Wed Aug 28 2024 00:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.next().toString(), 'Fri Aug 30 2024 00:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.next().toString(), 'Fri Oct 25 2024 00:00:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:IST'); 
    t.equal(intAsiaTz.hasNext(), false, 'Machine:IST :: tz:IST'); 
    
    
    t.equal(intAmericaTz.next().toString(), 'Tue Aug 27 2024 09:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Mon Aug 26 2024 23:00:00 
    t.equal(intAmericaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAmericaTz.next().toString(), 'Thu Aug 29 2024 09:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Wed Aug 28 2024 23:00:00 
    t.equal(intAmericaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAmericaTz.next().toString(), 'Sat Aug 31 2024 09:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Fri Aug 30 2024 23:00:00 
    t.equal(intAmericaTz.hasNext(), true, 'Machine:IST :: tz:IST'); 
    t.equal(intAmericaTz.next().toString(), 'Sat Oct 26 2024 09:30:00 GMT+0530 (India Standard Time)', 'Machine:IST :: tz:CST'); // CST Fri Oct 25 2024 23:00:00 
    t.equal(intAmericaTz.hasNext(), false, 'Machine:IST :: tz:IST'); 
   

    t.end();
});
