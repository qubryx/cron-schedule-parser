var parser = require('./lib/parser');

try {
  // var interval = parser.parseExpression('*/2 * * * *');
  // var interval = parser.parseExpression('0 0 1L * ?');
  // var interval = parser.parseExpression('0 0 ? * 3,4');
  var interval = parser.parseExpression('0 0 ? * 4,5', {frequency: 1, frequencyType: 'weekly'} );
  // var interval = parser.parseExpression('0 0 31 * ?', {frequency: 1, frequencyType: 'monthly', includeCurrentDate: false} );
  // var interval = parser.parseExpression('0 0 20 * ?', {frequency: 10, frequencyType: 'monthly'} );

  console.log('Date: ', interval.next().toString()); // Sat Dec 29 2012 00:42:00 GMT+0200 (EET)
  console.log('Date: ', interval.next().toString()); // Sat Dec 29 2012 00:42:00 GMT+0200 (EET)
  console.log('Date: ', interval.next().toString()); // Sat Dec 29 2012 00:42:00 GMT+0200 (EET)
 
  // console.log('Date: ', interval.next().toString()); // Sat Dec 29 2012 00:42:00 GMT+0200 (EET)

} catch (err) {
  console.log('Error: ' + err.message);
}
