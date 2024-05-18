var parser = require('./lib/parser');

try {
  // var interval = parser.parseExpression('*/2 * * * *');
  // var interval = parser.parseExpression('0 0 1L * ?');
  // var interval = parser.parseExpression('0 0 ? * 3,4');
  // var interval = parser.parseExpression('20 7 10 * ?', {includeCurrentDate: true, currentDate: new Date('Mon, 10 Apr 2023 12:38:53 UTC'), frequency: 1, frequencyType: 'monthly'} );
  // var interval = parser.parseExpression('0 0 10 * ?', { frequency: 1, frequencyType: 'monthly'} );
  // var interval = parser.parseExpression('0 0 31 * ?', {frequency: 1, frequencyType: 'monthly', includeCurrentDate: false} );
  // var interval = parser.parseExpression('0 9 ? * 1,3,4', {frequency: 1, frequencyType: 'weekly', currentDate: new Date('2023-04-04T00:00:00.000Z')} );
  var interval = parser.parseExpression('0 0 ? * 1,3,4', {frequency: 1, frequencyType: 'weekly',tz: 'Asia/Calcutta', currentDate: new Date('2023-03-01T00:00:00.000Z')} );

  console.log('Date: ', interval.next().toString()); // Sat Dec 29 2012 00:42:00 GMT+0200 (EET)
  console.log('Date: ', interval.next().toString()); // Sat Dec 29 2012 00:42:00 GMT+0200 (EET)
  console.log('Date: ', interval.next().toString()); // Sat Dec 29 2012 00:42:00 GMT+0200 (EET)
 
  // console.log('Date: ', interval.next().toString()); // Sat Dec 29 2012 00:42:00 GMT+0200 (EET)

} catch (err) {
  console.log('Error: ' + err.message);
}
