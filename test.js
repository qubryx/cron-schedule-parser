var parser = require('./lib/parser');
var luxon = require('luxon');

try {
  // var interval = parser.parseExpression('*/2 * * * *');
  // var interval = parser.parseExpression('0 0 1L * ?');
  // var interval = parser.parseExpression('0 0 ? * 3,4');
  // var interval = parser.parseExpression('20 7 10 * ?', {includeCurrentDate: true, currentDate: new Date('Mon, 10 Apr 2023 12:38:53 UTC'), frequency: 1, frequencyType: 'monthly'} );
  // var interval = parser.parseExpression('0 0 10 * ?', { frequency: 1, frequencyType: 'monthly'} );
  // var interval = parser.parseExpression('0 0 31 * ?', {frequency: 1, frequencyType: 'monthly', includeCurrentDate: false} );
  // var interval = parser.parseExpression('0 9 ? * 1,3,4', {frequency: 1, frequencyType: 'weekly', currentDate: new Date('2023-04-04T00:00:00.000Z')} );
  // var interval = parser.parseExpression('0 0 ? * 5,3,4', {repeatFor: 3});
  // var interval1 = parser.parseExpressions(['0 0 ? * 5', '0 0 ? * 3','0 0 ? * 4']);
  // var interval2 = parser.parseCronExpressions(['0 0 ? * 5', '0 0 ? * 3','0 0 ? * 4']);
  //var interval3 = parser.parseExpression('0 0 20 * ?');

  // TEST CASES ::
  // Case 1: Month Option: Standard and Date and Repeat for. Or Day in Custom option and Order not equal to Last
  // var interval2 = parser.parseCronExpressions(['0 0 20 * ?'], {frequency: 3, frequencyType:"monthly"});
  // var interval2 = parser.parseCronExpressions(['0 0 20 * ?'], {frequency: 3, frequencyType:"monthly", currentDate: new Date('2024-06-22T18:30:00.000Z')});
  // var interval2 = parser.parseCronExpressions(['0 0 20 * ?'], {repeatFor:5, repeatType: 'days', frequency: 3, frequencyType:"monthly", currentDate: new Date('2024-06-22T18:30:00.000Z')});
  // var interval2 = parser.parseCronExpressions(['0 0 1W * ?'], {repeatFor:5, repeatType: 'days',skipFrom: 1, skipTo: 5, frequency: 1, frequencyType:'monthly', currentDate: new Date('2024-07-06T00:00:00.000Z'), endDate: new Date('2024-07-07T00:00:00.000Z')});
  // CASE 2:
  // var interval2 = parser.parseCronExpressions(['0 0 1W * ?'], {repeatFor:5, repeatType: 'days', frequency: 2, frequencyType:"monthly", currentDate: new Date('2024-06-22T18:30:00.000Z')});
  // CASE 3:
  // var interval2 = parser.parseCronExpressions(['0 0 ? * 0#2'], {isFullWeek: true, repeatFor:2, repeatType: 'weeks', frequency: 2, frequencyType:"monthly", currentDate: new Date('2024-06-22T18:30:00.000Z')});
  // var interval2 = parser.parseCronExpressions(['0 0 ? * 5L'], {isFullWeek: true, repeatFor:2, repeatType: 'weeks', frequency: 2, frequencyType:"monthly", currentDate: new Date('2024-06-22T18:30:00.000Z')});
  // CASE 4:
  // var interval2 = parser.parseCronExpressions(["5 10 ? * 1L"], {repeatFor:2, repeatType: 'weeks', frequency: 1, frequencyType:"monthly", currentDate: new Date('2024-06-22T18:30:00.000Z')});


  // var interval2 = parser.parseExpression("5 10 25 * ?", {frequency: 1, frequencyType:"monthly", endDate: new Date('2024-07-27T18:30:00.000Z')});
  // var interval2 = parser.parseCronExpressions(["5 10 25 * ?"], {repeatFor:3, repeatType: 'days', frequency: 1, frequencyType:"monthly",currentDate: new Date('2024-06-20T18:30:00.000Z'), endDate: new Date('2024-07-26T18:30:00.000Z')});
  // var interval2 = parser.parseCronExpressions([ '0 0 ? * 1#1', '0 0 ? * 3#1', '0 0 ? * 5#1' ], {repeatFor:2, repeatType: 'days', frequency: 1, frequencyType:"monthly",currentDate: new Date('2024-06-05T18:30:00.000Z'), endDate: new Date('2024-06-29T18:30:00.000Z')});
  // var interval2 = parser.parseExpression("5 10 L * ?", {frequency: 1, frequencyType:"monthly", endDate: new Date('2024-07-28T18:30:00.000Z')});
  // var interval2 = parser.parseCronExpressions(["5 10 L * ?"], {repeatFor:5, repeatType: 'days', frequency: 1, frequencyType:"monthly", sDate: new Date('2024-05-20T18:30:00.000Z'), endDate: new Date('2024-06-10T18:30:00.000Z')});
  // var interval2 = parser.parseCronExpressions(["5 10 L * ?"], {repeatFor:5, repeatType: 'days', frequency: 1, frequencyType:"monthly", currentDate: new Date('2024-05-20T18:30:00.000Z'), endDate: new Date('2024-06-28T18:30:00.000Z')});
  // var interval2 = parser.parseExpression("5 10 L * ?", {repeatFor:5, repeatType: 'days', frequency: 1, frequencyType:"monthly", currentDate: new Date('2024-05-20T18:30:00.000Z'), endDate: new Date('2024-05-10T18:30:00.000Z')});
  // var interval2 = parser.parseCronExpressions(["5 10 L * ?"], {repeatFor:5, repeatType: 'days', frequency: 1, frequencyType:"monthly"});
  // var interval2 = parser.parseCronExpressions(['0 0 ? * 1#2'], {repeatFor:10, repeatType: 'workingDays', frequency: 1, frequencyType:'monthly', currentDate: new Date('2024-06-10T18:30:00.000Z'), tz: 'Asia/Calcutta'});
  // var interval2 = parser.parseCronExpressions(['0 0 ? * 1#1'], {repeatFor:10, repeatType: 'workingDays', frequency: 1, frequencyType:'monthly', currentDate: new Date('2024-06-10T18:30:00.000Z'), tz: 'Asia/Calcutta'});
  // var interval2 = parser.parseCronExpressions(['0 0 ? * 1#1', '0 0 ? * 3#1'], {repeatFor:2, repeatType: 'weeks', frequency: 1, frequencyType:'monthly', currentDate: new Date('2024-06-10T18:30:00.000Z'), tz: 'Asia/Calcutta'});
  // var interval2 = parser.parseCronExpressions(['0 0 L * ?'], {repeatFor:10, repeatType: 'days', frequency: 1, frequencyType:'monthly', currentDate: new Date('2024-06-10T18:30:00.000Z'), tz: 'Asia/Calcutta'});

  var interval2 = parser.parseCronExpressions([ '0 0 ? 8,10,12 1L', '0 0 ? 8,10,12 3L', '0 0 ? 8,10,12 5L'], {
    frequency: 1,
    frequencyType: 'yearly',
    currentDate: new Date('2024-07-03T18:30:00.000Z'), // IST 2024-07-04 00:00:00 :: CST 2024-07-03 13:30:00
    endDate: new Date('2024-10-28T18:30:00.000Z'), // IST 2024-10-26 00:00:00 :: CST 2024-10-15 13:30:00
    tz: 'Asia/Kolkata'
});

  console.log('Date2: ', interval2.next().toString()); // Sat Dec 29 2012 00:42:00 GMT+0200 (EET)
  // console.log('Date2: ', interval2.hasNext()); // Sat Dec 29 2012 00:42:00 GMT+0200 (EET)
  console.log('Date2: ', interval2.next().toString()); // Sat Dec 29 2012 00:42:00 GMT+0200 (EET)
  console.log('Date2: ', interval2.next().toString()); // Sat Dec 29 2012 00:42:00 GMT+0200 (EET)
  console.log('Date2: ', interval2.hasNext()); // Sat Dec 29 2012 00:42:00 GMT+0200 (EET)
  console.log('Date2: ', interval2.next().toString()); // Sat Dec 29 2012 00:42:00 GMT+0200 (EET)
  console.log('Date2: ', interval2.hasNext()); // Sat Dec 29 2012 00:42:00 GMT+0200 (EET)
  console.log('Date2: ', interval2.next().toString()); // Sat Dec 29 2012 00:42:00 GMT+0200 (EET)
  console.log('Date2: ', interval2.hasNext()); // Sat Dec 29 2012 00:42:00 GMT+0200 (EET)
  console.log('Date2: ', interval2.next().toString()); // Sat Dec 29 2012 00:42:00 GMT+0200 (EET)
  console.log('Date2: ', interval2.next().toString()); // Sat Dec 29 2012 00:42:00 GMT+0200 (EET)
  console.log('Date2: ', interval2.next().toString()); // Sat Dec 29 2012 00:42:00 GMT+0200 (EET)
  // console.log('Date2: ', interval2.next().toString()); // Sat Dec 29 2012 00:42:00 GMT+0200 (EET)
  // console.log('Date2: ', interval2.next().toString()); // Sat Dec 29 2012 00:42:00 GMT+0200 (EET)
  // console.log('Date2: ', interval2.next().toString()); // Sat Dec 29 2012 00:42:00 GMT+0200 (EET)
  // console.log('Date2: ', interval2.next().toString()); // Sat Dec 29 2012 00:42:00 GMT+0200 (EET)
  // console.log('Date2: ', interval2.next().toString()); // Sat Dec 29 2012 00:42:00 GMT+0200 (EET)
  // console.log('Date2: ', interval2.next().toString()); // Sat Dec 29 2012 00:42:00 GMT+0200 (EET)
  // console.log('Date2: ', interval2.next().toString()); // Sat Dec 29 2012 00:42:00 GMT+0200 (EET)
  // console.log('Date2: ', interval2.next().toString()); // Sat Dec 29 2012 00:42:00 GMT+0200 (EET)
  // console.log('Date2: ', interval2.next().toString()); // Sat Dec 29 2012 00:42:00 GMT+0200 (EET)
  // console.log('Date2: ', interval2.next().toString()); // Sat Dec 29 2012 00:42:00 GMT+0200 (EET)
  // console.log('Date2: ', interval2.next().toString()); // Sat Dec 29 2012 00:42:00 GMT+0200 (EET)
  // console.log('Date2: ', interval2.next().toString()); // Sat Dec 29 2012 00:42:00 GMT+0200 (EET)
  // console.log('Date2: ', interval2.next().toString()); // Sat Dec 29 2012 00:42:00 GMT+0200 (EET)
  // console.log('Date2: ', interval2.next().toString()); // Sat Dec 29 2012 00:42:00 GMT+0200 (EET)
  // console.log('Date2: ', interval2.next().toString()); // Sat Dec 29 2012 00:42:00 GMT+0200 (EET)
  // console.log('Date2: ', interval2.next().toString()); // Sat Dec 29 2012 00:42:00 GMT+0200 (EET)
  // console.log('Date2: ', interval2.hasNext()); // Sat Dec 29 2012 00:42:00 GMT+0200 (EET)
  // print(interval2.next());
  // print(interval2.next());
  // print(interval2.next());
  // print(interval2.next());

function print(date) {
  var formattedDate = luxon.DateTime.fromJSDate(date, { zone: 'UTC' }).setZone('Asia/Calcutta').toLocaleString(luxon.DateTime.DATETIME_MED_WITH_WEEKDAY);
  console.log(date, date.toString(), ' :: ', formattedDate.toString());
}

} catch (err) {
  console.log('Error: ' + err.message);
}

/*
  options = {
    repeatFor: number
    repeatType: weeks, days, workingDays
    isFullWeek: true/false
  }
*/
