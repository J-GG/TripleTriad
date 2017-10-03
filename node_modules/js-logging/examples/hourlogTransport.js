'use strict';
let logger = require('./js-logging.umd.js').dailyFile({filenameDateFormat: 'yyyymmdd.HH'});
logger.debug('Hello World!');
logger.info('Hello World!');
logger.notice('Hello World!');
logger.warning('Hello World!');
logger.error('Hello World!');
logger.critical('Hello World!');
logger.alert('Hello World!');
logger.emergency('Hello World!');
// wait for the next hour and there will be a new log file
logger.debug('Hello World!');
logger.info('Hello World!');
logger.notice('Hello World!');
logger.warning('Hello World!');
logger.error('Hello World!');
logger.critical('Hello World!');
logger.alert('Hello World!');
logger.emergency('Hello World!');
