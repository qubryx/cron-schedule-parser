'use strict';

var CronExpression = require('./expression');

function CronParser() {}

/**
 * Parse crontab entry
 *
 * @private
 * @param {String} entry Crontab file entry/line
 */
CronParser._parseEntry = function _parseEntry (entry) {
  var atoms = entry.split(' ');

  if (atoms.length === 6) {
    return {
      interval: CronExpression.parse(entry)
    };
  } else if (atoms.length > 6) {
    return {
      interval: CronExpression.parse(
        atoms.slice(0, 6).join(' ')
      ),
      command: atoms.slice(6, atoms.length)
    };
  } else {
    throw new Error('Invalid entry: ' + entry);
  }
};

/**
 * Wrapper for CronExpression.parser method
 *
 * @public
 * @param {String} expression Input expression
 * @param {Object} [options] Parsing options
 * @return {Object}
 */
CronParser.parseExpression = function parseExpression (expression, options) {
  return CronExpression.parse(expression, options);
};

// ================ TO SUPPORT ARRAY OF EXPRESSIONS AND ADDITIONAL OPTIONS ===================

CronParser.parseCronExpressions = function parseCronExpressions(cronExpressions, options = {}) {
  // Basic cron expressions
  if(
    (!options.repeatFor || options.repeatFor === 1) &&
    cronExpressions && cronExpressions.length === 1 &&
    !options.isFullWeek &&
    options.skipFrom === undefined &&
    options.skipTo === undefined 
  ) {
    const expression = cronExpressions[0]
    return CronExpression.parse(expression, options)
  }
  const currentDate = options.currentDate || new Date()
  if(options.endDate && options.endDate < currentDate ){
    throw new Error("Out of the timespan range")
  }

  // Not supporting Last with for in multiple weekday selection
  if(
    cronExpressions &&
    cronExpressions.length > 1 &&
    options.repeatFor &&
    options.repeatFor > 1 &&
    options.repeatType
  ){
    const isLast = cronExpressions.some(expression => {
			const parts = expression.split(' ');
			return parts[2].includes('L') || parts[4].includes('L')
		});
    if(isLast){
      throw new Error("Error: Not supporting cron expression")
    }
  }

  if(options.isFullWeek){
    const weekDay = cronExpressions[0].split(' ')[4]
    const weekDayNum = Number(weekDay.slice(0,1))
    const monthDayType = [1, 5].includes(weekDayNum) ? MONTH_DAY_TYPES.FULL_WORKING_WEEK : MONTH_DAY_TYPES.FULL_WEEK
    const multiplyNum = monthDayType === MONTH_DAY_TYPES.FULL_WEEK ? 7 : 5
    options.repeatFor = (options.repeatFor || 1) * multiplyNum   
    options.repeatType= monthDayType === MONTH_DAY_TYPES.FULL_WEEK ? REPEAT_TYPES.DAYS : REPEAT_TYPES.WORKING_DAYS
  }

  if(
    options.repeatFor && options.repeatFor > 1 &&
    options.repeatType &&
    cronExpressions.length === 1
  ){
    const expression = cronExpressions[0]
		const parts = expression.split(' ');
		if(parts[2].includes('L') || parts[4].includes('L')){
      return parseExpressionWithLast(cronExpressions[0], options)
    }
  }

  // Sort the cron expressions based on the next date
  // No need to handle the skip condition, right now skip case only have single expression
  const parsedExpressions = cronExpressions.map(expression => {
    const parser = CronExpression.parse(expression, {...options, endDate: undefined});
    const nextDate = parser.next().toDate();
    return { expression, nextDate };
  });
  parsedExpressions.sort((a, b) => a.nextDate - b.nextDate);
  const firstDate = parsedExpressions[0].nextDate
  const sortedCronExpressions = parsedExpressions.map(parsedExp => parsedExp.expression)

  let currentIndex = 0; 
  let repeatForCount = 1
  let repeatLastDate = []
  let parsers = sortedCronExpressions.map(expression => CronExpression.parse(expression, options));
  let prevDates = [];

  if(options.repeatFor && options.repeatType && options.repeatFor > 1) {
    const config = processRepeatConfig(cronExpressions, options, firstDate)
    currentIndex = config.currentIndex
    repeatForCount = config.repeatForCount
    repeatLastDate = config.repeatLastDate
    parsers = config.parsers || parsers
  }

  return {
    next: () => {
      let nextDate;
      if(parsers.length === repeatLastDate.length && // RepeatFor entering condition
        options.repeatFor &&
        options.repeatFor > 1 &&
        options.repeatType
      ){
        const lastDate = repeatLastDate[currentIndex]
        nextDate = getNextDate(lastDate, options.repeatType, options.tz)
        if(options.endDate && nextDate >= options.endDate){
          throw new Error("Out of the timespan range")
        }
        const isSameMonth = areDatesInSameMonth(lastDate, nextDate, options.tz)
        if(!isSameMonth) {
          nextDate = undefined
          currentIndex = 0
        }
        if((repeatForCount === ((options.repeatFor - 1 ) * parsers.length) || !nextDate)){
          // Exiting from repeat for
          repeatLastDate = []
          repeatForCount = 1
        } else{
          repeatForCount += 1
          repeatLastDate[currentIndex] = nextDate
        }
      }
      if(!nextDate){
        // sorting parsers based on next date for mulitple cron expression 
        if(parsers && parsers.length > 1 && currentIndex === 0){
          const parsersWithDates = parsers.map(parser => {
            const nDate = parser.next() 
            parser.prev()
            return {
              parser: parser,
              nextDate: nDate.toDate(),
              str: nDate.toString(),
            }
          });
          parsersWithDates.sort((a, b) => a.nextDate - b.nextDate);
          parsers = parsersWithDates.map(item => item.parser)
        }

        const currentInterval = parsers[currentIndex];
        nextDate = currentInterval.next().toDate();
        if(options.skipFrom !== undefined && options.skipTo !== undefined){
          nextDate = skipWeekdays(nextDate, options.skipFrom, options.skipTo)
          if(options.endDate && nextDate >= options.endDate){
            throw new Error("Out of the timespan range")
          }
        }
        repeatLastDate[currentIndex] = nextDate
      }
      prevDates.push(nextDate)
      currentIndex = (currentIndex + 1) % parsers.length; // Cycle through the intervals
      return nextDate;
    },
    hasNext: () => {
      let nextDate
      if (
        parsers.length === repeatLastDate.length && // RepeatFor entering condition
        options.repeatFor &&
        options.repeatFor > 1 &&
        options.repeatType
      ) {
        const lastDate = repeatLastDate[currentIndex]
        nextDate = getNextDate(lastDate, options.repeatType, options.tz)
        if (options.endDate && nextDate >= options.endDate) {
          return false
        }
        const isSameMonth = areDatesInSameMonth(lastDate, nextDate, options.tz)
        if (!isSameMonth)nextDate = undefined
        if (nextDate) {
          return true
        }
      }
      try {
        return parsers.some(parser => parser.hasNext());
      } catch {
        return false
      }
    },
  };
}

function processRepeatConfig(cronExpressions, options, endDate){
  let currentIndex = 0;
  let repeatForCount = 1;
  let repeatLastDate = []
  let parsers = undefined
  // repeat options are for month wise, so find the parser for the begining of the month
  const currentDate = options.currentDate instanceof Date || options.currentDate instanceof String ? new Date(options.currentDate): new Date()
  const lastDayOfPreviousMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);
  const parsedExpressionsPrev = cronExpressions.map(expression => {
    const parser = CronExpression.parse(expression, {...options, currentDate: lastDayOfPreviousMonth});
    let nextDate = parser.next().toDate();
    if(options.skipFrom !== undefined && options.skipTo !== undefined){
      nextDate = skipWeekdays(nextDate, options.skipFrom, options.skipTo)
      if(options.endDate && nextDate >= options.endDate){
        throw new Error("Out of the timespan range")
      }
    }
    return { expression, nextDate };
  });
  // Sort the cron expressions based on the next date
  parsedExpressionsPrev.sort((a, b) => a.nextDate - b.nextDate);
  let matchedIndex = 0
  let isCronMatched = false
  const sortedCronExpressionsPrev = parsedExpressionsPrev.map((parsedExp,index) => {
    if(currentDate < parsedExp.nextDate && !isCronMatched){
      matchedIndex = index
      isCronMatched = true
    }
    return parsedExp.expression
  })
  
  if(isCronMatched){
    parsers = sortedCronExpressionsPrev.map(expression => CronExpression.parse(expression, {...options, currentDate: lastDayOfPreviousMonth}));
    if(matchedIndex > 0){
      for(let i=0; i<matchedIndex; i++){
        const currentInterval = parsers[i];
        let nextDate = currentInterval.next().toDate();
        if(options.skipFrom !== undefined && options.skipTo !== undefined){
          nextDate = skipWeekdays(nextDate, options.skipFrom, options.skipTo)
        }
        repeatLastDate[i] = nextDate
      }
    }
    currentIndex = matchedIndex
    return {parsers, currentIndex, repeatLastDate, repeatForCount}
  } else {
    // Check repeat option matched or not
    let repeatParsers = sortedCronExpressionsPrev.map(expression => CronExpression.parse(expression, {...options, currentDate: lastDayOfPreviousMonth}));
    for(let i=0; i<repeatParsers.length; i++){
      const currentInterval = repeatParsers[i];
      let nextDate = currentInterval.next().toDate();
      if(options.skipFrom !== undefined && options.skipTo !== undefined){
        nextDate = skipWeekdays(nextDate, options.skipFrom, options.skipTo)
      }
      repeatLastDate[i] = nextDate
    }
    for(let i = 1; i <= ((options.repeatFor - 1 ) * repeatParsers.length); i++){
      const lastDate = repeatLastDate[currentIndex]
      const nextDate = getNextDate(lastDate, options.repeatType, options.tz) 
      if(endDate <= nextDate) {
        return {parsers: undefined, currentIndex: 0, repeatForCount: 1, repeatLastDate: []}
      }
      if (currentDate < nextDate ){
        parsers = repeatParsers 
        return { parsers, currentIndex, repeatLastDate, repeatForCount }
      } 
      repeatLastDate[currentIndex] = nextDate
      currentIndex = (currentIndex + 1) % repeatParsers.length
      repeatForCount += 1
    }
    return {parsers: undefined, currentIndex: 0, repeatForCount: 1, repeatLastDate: []}
  }
}

function parseExpressionWithLast(expression, options){
  const parentParser =  CronExpression.parse(expression, options);
  let endDate = options.endDate
  if (parentParser.hasNext()) {
    endDate = parentParser.next().toDate()
  }
  let childExpression = getLastNthCronExpressions(expression, options, endDate)
  let childParser =  CronExpression.parse(childExpression, options);
  return {
    next: () => {
      const lastDate = childParser._currentDate.toDate()
      if(lastDate >= endDate){
        if(parentParser.hasNext()){
          endDate = parentParser.next().toDate()
        } else {
          const newParentParser =  CronExpression.parse(expression, {...options, endDate: undefined, currentDate: endDate});
          endDate = newParentParser.next().toDate()
        } 
        childExpression = getLastNthCronExpressions(expression, options, endDate)
        // All repeatFor should be in the same month, so next date should be in next month
        const firstDayOfEndDate = new Date(endDate);
        firstDayOfEndDate.setDate(1)
        childParser =  CronExpression.parse(childExpression, {...options, currentDate: firstDayOfEndDate});
      }
      const nextDate = childParser.next().toDate();
      return nextDate
    },
    hasNext: () => {
      return childParser.hasNext()
    },
  }
}

function convertToTimeZone(date, tz) {
  if(!tz){
    const { timeZone } = Intl.DateTimeFormat().resolvedOptions();
    tz = timeZone
  }
  const dateObj = new Date(date)
  const nextDateLocaleString = dateObj.toLocaleString('en-US', { timeZone: tz });
  return new Date(nextDateLocaleString);
}

function getNextDate(date, type, timezone) {
  const nextDate = new Date(date);

  if (type === REPEAT_TYPES.DAYS) {
    nextDate.setDate(nextDate.getDate() + 1);
  } else if (type === REPEAT_TYPES.WORKING_DAYS) {
    let dayOfWeek = nextDate.getUTCDay();
    do {
      nextDate.setUTCDate(nextDate.getUTCDate() + 1);
      const nextDateInTimeZone = convertToTimeZone(nextDate, timezone)
      dayOfWeek = nextDateInTimeZone.getUTCDay();
    } while (dayOfWeek === 0 || dayOfWeek === 6); // Skip Sunday (0) and Saturday (6)
  } else if (type === REPEAT_TYPES.WEEKS) {
    nextDate.setDate(nextDate.getDate() + 7);
  } else {
    throw new Error('Invalid type specified. Use "days", "workingDays", or "weeks".');
  }

  return nextDate;
}

function areDatesInSameMonth(date1, date2, tz) {
  const d1 = convertToTimeZone(date1, tz);
  const d2 = convertToTimeZone(date2, tz);

  return d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth();
}

function subtractDate(currentDate, subtract, subtractType, timezone) {
  let date = new Date(currentDate);

  if (isNaN(date)) {
      throw new Error("Invalid date provided");
  }

  // Convert the date to the specified timezone
  date = convertToTimeZone(date, timezone)

  switch (subtractType) {
      case REPEAT_TYPES.WEEKS:
          date.setDate(date.getDate() - (subtract * 7));
          break;
      case REPEAT_TYPES.WORKING_DAYS:
          while (subtract > 0) {
            date.setDate(date.getDate() - 1);
            const dateInTimeZone = convertToTimeZone(date, timezone)
            const day = dateInTimeZone.getDay()
            if (day !== 0 && day !== 6) { // Exclude Sundays (0) and Saturdays (6)
              subtract--;
            }
          }
          break;
      case REPEAT_TYPES.DAYS:
          date.setDate(date.getDate() - subtract);
          break;
      default:
          throw new Error("Invalid subtract type provided. Use 'weeks', 'workingDays', or 'days'.");
  }

  return date;
}

function getLastNthCronExpressions(cronExpression, options={}, lastDate){
  const expressionArr = cronExpression.split(" ")
  let startDate = subtractDate(lastDate, options.repeatFor-1, options.repeatType, options.tz)
  if(expressionArr[2] === "L"){
    const dateArr = getDatesBetween(startDate, lastDate, options.repeatType, options.tz)
    expressionArr[2] = dateArr.join(",")
    return expressionArr.join(" ")
  }
  if(expressionArr[2] === "LW"){
    const dateArr = getDatesBetween(startDate, lastDate, options.repeatType, options.tz)
    expressionArr[2] = dateArr.join(",")
    return expressionArr.join(" ")
  }
  if(options.isFullWeek){
    const dateArr = getDatesBetween(startDate, lastDate, options.repeatType, options.tz)
    expressionArr[2] = dateArr.join(",")
    return expressionArr.join(" ")
  }
  if(expressionArr[4].includes("L")){
    const dateArr = getDatesBetween(startDate, lastDate, options.repeatType, options.tz, expressionArr[4].slice(0,1))
    expressionArr[2] = dateArr.join(",")
    expressionArr[4] = "?"
    return expressionArr.join(" ")
  }
  return cronExpression
}

function getDatesBetween(startDate, endDate, repeatType, timezone,  dayOfWeek) {
  const start = new Date(startDate);
  const end = convertToTimeZone(endDate, timezone);

  if (isNaN(start) || isNaN(end)) {
      throw new Error("Invalid date provided");
  }

  if (start > end) {
      throw new Error("startDate should be before endDate");
  }

  const dates = [];

  const isWeekday = (date) => {
      const day = date.getDay();
      return day !== 0 && day !== 6; // Exclude Sundays (0) and Saturdays (6)
  };

  switch (repeatType) {
      case REPEAT_TYPES.DAYS:
          for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
              dates.push(new Date(d).getDate());
          }
          break;
      case REPEAT_TYPES.WORKING_DAYS:
          for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
              const dateInTimeZone = convertToTimeZone(d, timezone);
              if (isWeekday(dateInTimeZone)) {
                  dates.push(dateInTimeZone.getDate());
              }
          }
          break;
      case REPEAT_TYPES.WEEKS:
          for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
              const dateInTimeZone = convertToTimeZone(d, timezone);
              if (dateInTimeZone.getDay() === Number(dayOfWeek)) {
                  dates.push(dateInTimeZone.getDate());
              }
          }
          break;
      default:
          throw new Error("Invalid repeat type provided. Use 'days', 'workingDays', or 'weeks'.");
  }

  return dates;
}

function skipWeekdays(date, skipFrom, skipTo) {
  if (typeof date === 'string') {
    date = new Date(date);
  }
  if (!(date instanceof Date) || isNaN(date)) {
    return date
  }
  if (typeof skipFrom !== 'number' || skipFrom < 0 || skipFrom > 6 ||
      typeof skipTo !== 'number' || skipTo < 0 || skipTo > 6) {
      return date
  }

  let day = date.getDay();
  if (day === skipFrom) {
    let daysToSkip = skipTo >= skipFrom ? skipTo - skipFrom : 7 - skipFrom + skipTo;
    let newDate = new Date(date);
    newDate.setDate(date.getDate() + daysToSkip);
    if (areDatesInSameMonth(date, newDate)) {
      date.setDate(newDate.getDate());
    }
  } 
  return date;
}

const REPEAT_TYPES = {
  WEEKS: 'weeks',
  DAYS: 'days',
  WORKING_DAYS: 'workingDays'
}

const MONTH_DAY_TYPES = {
  FULL_WEEK: 'fullWeek',
  FULL_WORKING_WEEK: 'fullWorkingWeek'
}

// ======================================= END ==============================================

/**
 * Wrapper for CronExpression.fieldsToExpression method
 *
 * @public
 * @param {Object} fields Input fields
 * @param {Object} [options] Parsing options
 * @return {Object}
 */
CronParser.fieldsToExpression = function fieldsToExpression (fields, options) {
  return CronExpression.fieldsToExpression(fields, options);
};

/**
 * Parse content string
 *
 * @public
 * @param {String} data Crontab content
 * @return {Object}
 */
CronParser.parseString = function parseString (data) {
  var blocks = data.split('\n');

  var response = {
    variables: {},
    expressions: [],
    errors: {}
  };

  for (var i = 0, c = blocks.length; i < c; i++) {
    var block = blocks[i];
    var matches = null;
    var entry = block.trim(); // Remove surrounding spaces

    if (entry.length > 0) {
      if (entry.match(/^#/)) { // Comment
        continue;
      } else if ((matches = entry.match(/^(.*)=(.*)$/))) { // Variable
        response.variables[matches[1]] = matches[2];
      } else { // Expression?
        var result = null;

        try {
          result = CronParser._parseEntry('0 ' + entry);
          response.expressions.push(result.interval);
        } catch (err) {
          response.errors[entry] = err;
        }
      }
    }
  }

  return response;
};

/**
 * Parse crontab file
 *
 * @public
 * @param {String} filePath Path to file
 * @param {Function} callback
 */
CronParser.parseFile = function parseFile (filePath, callback) {
  require('fs').readFile(filePath, function(err, data) {
    if (err) {
      callback(err);
      return;
    }

    return callback(null, CronParser.parseString(data.toString()));
  });
};

module.exports = CronParser;
