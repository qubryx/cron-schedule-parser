# Cron Schedule Parser - Developer Guide

## Overview
The `cron-schedule-parser` package is a Node.js library built on top of the `cron-parser` npm package. It extends the functionality of cron expression parsing with additional features for handling complex scheduling scenarios. The package is designed to handle multiple cron expressions, frequency-based scheduling, and timezone-aware operations.

## Core Components

### 1. Main Parser Class
The main functionality is encapsulated in the `CronParser` class, which provides several key methods:

#### Core Methods
- `parseExpression(expression, options)`: Parses a single cron expression with optional configuration
- `parseCronExpressions(cronExpressions, options)`: Handles multiple cron expressions with advanced scheduling options

### 2. Key Features

#### Multiple Cron Expression Support
- Handles arrays of cron expressions
- Sorts expressions based on next execution date
- Supports complex scheduling scenarios with multiple expressions

#### Frequency and Repeat Options
- Supports repeat scheduling with different types:
  - `WEEKS`: Repeat weekly
  - `DAYS`: Repeat daily
  - `WORKING_DAYS`: Repeat on working days only
- Handles repeat intervals with `repeatFor` option

#### Timezone Awareness
- Uses `luxon` for timezone handling
- All date operations are timezone-aware
- Supports different timezone configurations

#### Special Cases Handling
- Full week scheduling support
- Last day/weekday handling
- Skip weekdays functionality
- Frequency handling for monthly schedules

## Usage Examples

### Basic Usage
```javascript
const CronParser = require('cron-schedule-parser');

// Parse single expression
const parser = CronParser.parseExpression('0 0 * * *'); // Runs every day at midnight

// Parse multiple expressions
const parsers = CronParser.parseCronExpressions([
  '0 0 * * *',    // Every day at midnight
  '0 12 * * *'    // Every day at noon
]);
```

### Timezone-Aware Scheduling
```javascript
// Example with different timezones
const asiaParser = parser.parseCronExpressions([
  '0 0 ? * 1,4'  // Every Monday and Thursday at midnight
], {
  frequency: 2,
  frequencyType: 'weekly',
  currentDate: new Date('2024-07-09T18:30:00.000Z'), // IST 2024-07-10 00:00:00
  endDate: new Date('2024-08-09T18:30:00.000Z'),    // IST 2024-08-10 00:00:00
  tz: 'Asia/Kolkata'
});

const americaParser = parser.parseCronExpressions([
  '0 23 ? * 1,4' // Every Monday and Thursday at 11 PM
], {
  frequency: 2,
  frequencyType: 'weekly',
  currentDate: new Date('2024-07-09T18:30:00.000Z'), // IST 2024-07-10 00:00:00
  endDate: new Date('2024-08-09T18:30:00.000Z'),    // IST 2024-08-10 00:00:00
  tz: 'America/Chicago'
});

// Get next execution times
console.log(asiaParser.next().toString()); // IST timezone
console.log(americaParser.next().toString()); // CST timezone
```

### Weekly Frequency Scheduling
```javascript
// Example of scheduling every 2 weeks on specific days
const weeklyParser = parser.parseCronExpressions([
  '0 0 ? * 1,4'  // Every Monday and Thursday at midnight
], {
  frequency: 2,
  frequencyType: 'weekly',
  currentDate: new Date('2024-07-09T18:30:00.000Z'),
  endDate: new Date('2024-08-09T18:30:00.000Z'),
  tz: 'Asia/Kolkata'
});

// Get multiple next execution times
let nextTime = weeklyParser.next();
while (weeklyParser.hasNext()) {
  console.log(nextTime.toString());
  nextTime = weeklyParser.next();
}
```

### Weekend Scheduling
```javascript
// Example of scheduling on weekends
const weekendParser = parser.parseCronExpressions([
  '0 0 ? * 0,6'  // Every Sunday and Saturday at midnight
], {
  frequency: 2,
  frequencyType: 'weekly',
  currentDate: new Date('2024-07-09T18:30:00.000Z'),
  tz: 'Asia/Kolkata'
});
```

### Date Range Handling
```javascript
// Example with date range constraints
const rangeParser = parser.parseCronExpressions([
  '0 0 ? * 1,4'  // Every Monday and Thursday at midnight
], {
  currentDate: new Date('2024-07-09T18:30:00.000Z'),
  endDate: new Date('2024-08-09T18:30:00.000Z'),
  tz: 'Asia/Kolkata'
});

// Check if there are more executions within range
while (rangeParser.hasNext()) {
  const nextDate = rangeParser.next();
  console.log(nextDate.toString());
}
``

### Advanced Scheduling
```javascript
const options = {
  repeatFor: 3,         // Repeat 3 times
  repeatType: 'DAYS',   // Repeat daily
  tz: 'Asia/Kolkata',   // Timezone
  startDate: new Date(),// Start date
  endDate: new Date('2025-12-31') // End date
};

const parser = CronParser.parseCronExpressions(['0 0 * * *'], options);
```

## Configuration Options

The parser accepts several configuration options:

- `frequency`: Number of intervals between executions
  - Example: `frequency: 2` for every 2 weeks/months
- `frequencyType`: Type of frequency interval
  - `weekly`: For weekly intervals
  - `monthly`: For monthly intervals
- `tz`: Timezone string (e.g., 'Asia/Kolkata', 'America/Chicago')
- `currentDate`: Starting date for scheduling
- `endDate`: End date for scheduling (optional)
- `skipFrom`: Start of skip range for weekdays
- `skipTo`: End of skip range for weekdays
- `isFullWeek`: Boolean flag for full week scheduling
- `repeatFor`: Number of times to repeat
- `repeatType`: Type of repetition
  - `WEEKS`: Repeat weekly
  - `DAYS`: Repeat daily
  - `WORKING_DAYS`: Repeat on working days only

### Timezone Handling
The parser supports multiple timezone configurations:
1. Machine timezone (default)
2. Specified timezone via `tz` option
3. Mixed timezone scenarios (different timezones for different expressions)

### Date Range Constraints
- Supports both start and end dates
- Handles date range validation
- Automatically stops scheduling when end date is reached
- Can handle different timezones with date ranges

## Error Handling
The parser throws specific errors for:
- Invalid cron expressions
- Out of timespan range
- Unsupported cron expression patterns
- Invalid configuration options

## Performance Considerations
- The parser sorts cron expressions based on next execution date
- Uses efficient date comparison algorithms
- Handles timezone conversions efficiently using luxon

## Best Practices

1. Timezone Handling
   - Always specify timezone using `tz` option
   - Be aware of timezone differences when scheduling across regions
   - Consider daylight saving time changes

2. Date Range Management
   - Always specify both start and end dates when applicable
   - Validate date ranges before scheduling
   - Handle end of range gracefully

3. Frequency and Repeat Patterns
   - Choose appropriate frequency values
   - Combine frequency with repeat patterns carefully
   - Test complex schedules thoroughly

4. Error Handling
   - Validate cron expressions before parsing
   - Handle timezone conversion errors
   - Check for date range validity
   - Verify frequency configuration

5. Performance Considerations
   - Limit date ranges when possible
   - Use efficient timezone conversions
   - Handle large datasets carefully
   - Consider memory usage with long schedules

## Version Compatibility
- Node.js >= 12.0.0
- Uses luxon ^3.1.0 for timezone handling

## Testing
The package includes comprehensive test coverage:
- Unit tests using tap
- TypeScript definition tests
- Coverage reporting

## Common Use Cases
1. Scheduling multiple tasks with different frequencies
2. Handling timezone-specific scheduling
3. Working with full week or working day schedules
4. Implementing skip conditions for specific weekdays
5. Managing complex monthly schedules with frequency

## Migration Guide
When upgrading from previous versions:
1. Review timezone configuration changes
2. Update repeat type constants if needed
3. Check for deprecated methods
4. Verify timezone handling in your application

## Troubleshooting
If you encounter issues:
1. Check for timezone configuration
2. Validate cron expressions
3. Review date range constraints
4. Check for unsupported repeat patterns
5. Verify correct usage of configuration options

## Package Structure
```
lib/
  ├── parser.js         # Main parser implementation
  └── expression.js     # Cron expression handling
```

## Development Setup
1. Install dependencies:
```bash
npm install
```

2. Run tests:
```bash
npm test
```