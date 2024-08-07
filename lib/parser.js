'use strict';

var { DateTime } = require('luxon');
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

  let currentIndex = 0; 
  let repeatForCount = 1
  let repeatLastDate = []
  let prevDates = [];

  let prevDate = undefined
  let parsers = parsedExpressions.map( (expObj, index) => {
    let expression = expObj.expression
    if(prevDate && options.frequency > 1 && options.frequencyType === "monthly") {
      // When user select mulitple day in monthly with frequency and start date is inbtw, to fix incorrect frequency 
      let parser = CronExpression.parse(expression, options )
      const nDate = parser.next().toDate()
      const isSameMonth = areDatesInSameMonth(prevDate, nDate)
      if(!isSameMonth) {
        let startDate = DateTime.fromJSDate(prevDate, { zone: options.tz });
        startDate = startDate.plus({ months: options.frequency }).startOf('month').toJSDate();
        return CronExpression.parse(expression, {...options, currentDate: startDate} )
      }
    }
    const parser = CronExpression.parse(expression, options)
    prevDate = parser.next().toDate();
    parser.prev()
    return parser
  });

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
        if(parsers && parsers.length > 1){
          const parsersWithDates = []
          parsers.forEach(parser => {
            if(parser.hasNext()){
              const nDate = parser.next() 
              parser.prev()
              parsersWithDates.push({
                parser: parser,
                nextDate: nDate.toDate(),
                str: nDate.toString(),
              })
            }
          });
          if(parsersWithDates?.length === 0) {
            throw new Error("Out of the timespan range")
          }
          const isNotSorted = hasLowerDateBeforeIndex(parsersWithDates, currentIndex)
          if (currentIndex === 0 || isNotSorted) {
            parsersWithDates.sort((a, b) => a.nextDate - b.nextDate);
            parsers = parsersWithDates.map(item => item.parser)
            currentIndex = 0
          }         
        }

        const currentInterval = parsers[currentIndex];
        nextDate = currentInterval.next().toDate();
        if(options.skipFrom !== undefined && options.skipTo !== undefined){
          nextDate = skipWeekdays(nextDate, options.skipFrom, options.skipTo, options.tz)
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

function getNewEndDate(expression, options, oldEndDate) {
  const baseOptions = { ...options, endDate: undefined };
  let parser = CronExpression.parse(expression, { ...baseOptions, currentDate: oldEndDate });
  let newEndDate = parser.next().toDate();
  if (options.frequency && options.frequency > 1 && options.frequencyType === "monthly") {
    let monthDiff = getMonthDifference(oldEndDate, newEndDate);
    let stepCount = 0;

    while (Math.abs(monthDiff) !== options.frequency && monthDiff !== 0 && stepCount < 3) {
      parser = CronExpression.parse(expression, { ...baseOptions, currentDate: newEndDate });
      newEndDate = parser.next().toDate();
      monthDiff = getMonthDifference(oldEndDate, newEndDate);
      stepCount += 1;
    }
  }
  return newEndDate;
}

function padToTwoDigits(number) {
  return number.toString().padStart(2, '0');
}

function adjustStartDateIfDifferentMonth(startDate, endDate, timezone) {
  const tzEndDate = convertToTimeZone(endDate, timezone).startOf('month');
  const tzStartDate = convertToTimeZone(startDate, timezone);
  if (tzStartDate.month !== tzEndDate.month) {
    // If start date and end date are not in the same month, adjust the start date to the first day of the end date's month
    const dateStr = `${tzEndDate.year}-${padToTwoDigits(tzEndDate.month)}-01T00:00:00`;
    return DateTime.fromISO(dateStr, { zone: timezone }).toJSDate()
  }
  
  return startDate;
}

function parseExpressionWithLast(expression, options){
  const parentParser =  CronExpression.parse(expression, options);
  let endDate = options.endDate
  let cronExpEndDate = endDate
  if (parentParser.hasNext()) {
    endDate = parentParser.next().toDate()
    cronExpEndDate = endDate
  } else {
    // next date is greater than the end date 
    const parser =  CronExpression.parse(expression, {...options, endDate: undefined});
    cronExpEndDate = parser.next().toDate()
  }
  let childExpression = getLastNthCronExpressions(expression, options, cronExpEndDate)
  const startDate = adjustStartDateIfDifferentMonth(options.currentDate, endDate, options.tz); // For full week or last working days the cron expression include this month date that might not valid
  let childParser =  CronExpression.parse(childExpression, {...options, currentDate: startDate});
  return {
    next: () => {
      const lastDate = childParser._currentDate.toDate()
      if(lastDate >= endDate){
        if(parentParser.hasNext()){
          endDate = parentParser.next().toDate()
        } else {
          endDate = getNewEndDate(expression, options, endDate, options.endDate)
        } 
        childExpression = getLastNthCronExpressions(expression, options, endDate)
        // All repeatFor should be in the same month, so next date should be in next month
        const firstDayOfEndDate  = convertToTimeZone(endDate, options.tz).startOf('month');
        childParser =  CronExpression.parse(childExpression, {...options, currentDate: firstDayOfEndDate.toJSDate()});
      }
      const nextDate = childParser.next().toDate();
      return nextDate
    },
    hasNext: () => {
      if(!childParser.hasNext() && !parentParser.hasNext()){
        // When child parser is completed and end date is below the parent pareser next date.
        const lastDate = childParser._currentDate.toDate()
        const pParser =  CronExpression.parse(expression, {...options, currentDate: lastDate, endDate: undefined});
        if(!pParser.hasNext()) return false
        const newEndDate = pParser.next().toDate()
        const childExp = getLastNthCronExpressions(expression, options, newEndDate)
        const cParser =  CronExpression.parse(childExp, {...options, currentDate: lastDate});
        if(!cParser.hasNext()) return false
        const nextDate = cParser.next().toDate()
        const tzEnd = convertToTimeZone(options.endDate, options.tz).toJSDate() 
        const tzNext = convertToTimeZone(nextDate, options.tz).toJSDate()
        const tzLast = convertToTimeZone(lastDate, options.tz).toJSDate()
        return tzNext < tzEnd && tzNext > tzLast

      }
      return childParser.hasNext() || parentParser.hasNext();
    },
  }
}

function getNextDate(date, type, timezone) {
  let nextDate = DateTime.fromJSDate(date).setZone(timezone);

  if (type === REPEAT_TYPES.DAYS) {
    nextDate = nextDate.plus({ days: 1 });
  } else if (type === REPEAT_TYPES.WORKING_DAYS) {
    let dayOfWeek = nextDate.weekday;
    do {
      nextDate = nextDate.plus({ days: 1 });
      dayOfWeek = nextDate.weekday;
    } while (dayOfWeek === 6 || dayOfWeek === 7); // Skip Saturday (6) and Sunday (7)
  } else if (type === REPEAT_TYPES.WEEKS) {
    nextDate = nextDate.plus({ weeks: 1 });
  } else {
    throw new Error('Invalid type specified. Use "days", "workingDays", or "weeks".');
  }

  return nextDate.toJSDate();
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

function convertToTimeZone(date, tz) {
  if (!tz) {
    const { timeZone } = Intl.DateTimeFormat().resolvedOptions();
    tz = timeZone;
  }
  return DateTime.fromJSDate(new Date(date)).setZone(tz);
}

function subtractDate(currentDate, subtract, subtractType, timezone) {
  let date = convertToTimeZone(currentDate, timezone);

  if (!date.isValid) {
    throw new Error("Invalid date provided");
  }

  switch (subtractType) {
    case REPEAT_TYPES.WEEKS:
      date = date.minus({ weeks: subtract });
      break;
    case REPEAT_TYPES.WORKING_DAYS:
      while (subtract > 0) {
        date = date.minus({ days: 1 });
        if (date.weekday !== 6 && date.weekday !== 7) { // Exclude Saturdays (6) and Sundays (7)
          subtract--;
        }
      }
      break;
    case REPEAT_TYPES.DAYS:
      date = date.minus({ days: subtract });
      break;
    default:
      throw new Error("Invalid subtract type provided. Use 'weeks', 'workingDays', or 'days'.");
  }

  return date.toJSDate();
}

function areDatesInSameMonth(date1, date2, tz) {
  const d1 = convertToTimeZone(date1, tz);
  const d2 = convertToTimeZone(date2, tz);

  return d1.year === d2.year && d1.month === d2.month;
}

function getDatesBetween(startDate, endDate, repeatType, timezone, dayOfWeek) {
  const start = convertToTimeZone(startDate, timezone);
  const end = convertToTimeZone(endDate, timezone);

  if (!start.isValid || !end.isValid) {
    throw new Error("Invalid date provided");
  }

  if (start > end) {
    throw new Error("startDate should be before endDate");
  }

  const dates = [];

  const isWeekday = (date) => {
    const day = date.weekday;
    return day !== 6 && day !== 7; // Exclude Saturdays (6) and Sundays (7)
  };

  switch (repeatType) {
    case REPEAT_TYPES.DAYS:
      for (let d = start; d <= end; d = d.plus({ days: 1 })) {
        dates.push(d.day);
      }
      break;
    case REPEAT_TYPES.WORKING_DAYS:
      for (let d = start; d <= end; d = d.plus({ days: 1 })) {
        if (isWeekday(d)) {
          dates.push(d.day);
        }
      }
      break;
    case REPEAT_TYPES.WEEKS:
      for (let d = start; d <= end; d = d.plus({ days: 1 })) {
        if (d.weekday === Number(dayOfWeek)) {
          dates.push(d.day);
        }
      }
      break;
    default:
      throw new Error("Invalid repeat type provided. Use 'days', 'workingDays', or 'weeks'.");
  }

  return dates;
}

function skipWeekdays(date, skipFrom, skipTo, timezone) {
  let dt = convertToTimeZone(date, timezone);

  if (!(dt instanceof DateTime) || !dt.isValid) {
    return date;
  }
  
  if (typeof skipFrom !== 'number' || skipFrom < 0 || skipFrom > 6 ||
      typeof skipTo !== 'number' || skipTo < 0 || skipTo > 6) {
    return date;
  }

  let day = dt.weekday % 7; // Convert from Luxon weekday (1-7) to JS weekday (0-6)
  if (day === skipFrom) {
    let daysToSkip = skipTo >= skipFrom ? skipTo - skipFrom : 7 - skipFrom + skipTo;
    let newDate = dt.plus({ days: daysToSkip });

    if (areDatesInSameMonth(dt.toJSDate(), newDate.toJSDate(), timezone)) {
      dt = newDate;
    }
  }
  
  return dt.toJSDate();
}

function getMonthDifference(date1, date2) {
  const start = new Date(date1);
  const end = new Date(date2);

  const yearDiff = end.getFullYear() - start.getFullYear();
  const monthDiff = end.getMonth() - start.getMonth();

  return yearDiff * 12 + monthDiff;
}

function hasLowerDateBeforeIndex(arr, currIndex) {
  if (currIndex >= arr.length || currIndex < 0) {
    return false
  }
  const targetDate = new Date(arr[currIndex].nextDate);
  for (let i = 0; i < currIndex; i++) {
    if (new Date(arr[i].nextDate) < targetDate) {
      return true;
    }
  }
  return false;
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
