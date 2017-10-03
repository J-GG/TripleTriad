'use strict';
// use predefined console logger (function console) with standard settings 
let logger = require('../js-logging.umd.js').console();
logger.debug('Hello World!');
logger.info('Hello World!');
logger.notice('Hello World!');
logger.warning('Hello World!');
logger.error('Hello World!');
logger.critical('Hello World!');
logger.alert('Hello World!');
logger.emergency('Hello World!');

// use predefined console logger (function console) with own settings 
logger = require('../js-logging').console({filters: ['yellow']});
logger.debug('Hello World!');
logger.info('Hello World!');
logger.notice('Hello World!');

// define own logger with standard settings
let Logging = require('../js-logging.umd.js');
let logger2 = new Logging();
logger2.debug('Hello World!');
logger2.info('Hello World!');
logger2.notice('Hello World!');

// define own logger with own settings
logger2 = new Logging({filters: ['red']});
logger2.warning('Hello World!');
logger2.error('Hello World!');
logger2.critical('Hello World!');
logger2.alert('Hello World!');
logger2.emergency('Hello World!');



