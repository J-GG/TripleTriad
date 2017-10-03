'use strict';
// use predefined logger (function colorConsole) with predefined color settings
let logger = require('../js-logging.umd.js').colorConsole();
logger.debug('Hello World!');
logger.info('Hello World!');
logger.notice('Hello World!');
logger.warning('Hello World!');
logger.error('Hello World!');
logger.critical('Hello World!');
logger.alert('Hello World!');
logger.emergency('Hello World!');

// use predefined logger (function colorConsole) with own color settings 
let conf = {
        filters: {
            debug: 'white',
            info: 'yellow',
            notice: 'green',
            warning: 'blue',
            error: 'red',
            critical: 'red',
            alert: 'cyan',
            emergency: 'magenta'
        }
	};
logger = require('../js-logging.umd.js').colorConsole(conf);
logger.debug('Hello World!');
logger.info('Hello World!');
logger.notice('Hello World!');
logger.warning('Hello World!');
logger.error('Hello World!');
logger.critical('Hello World!');
logger.alert('Hello World!');
logger.emergency('Hello World!');

// define own logger with own collor settings
let Logging = require('../js-logging.umd.js');
let logger2 = new Logging(conf);
logger2.debug('Hello World!');
logger2.info('Hello World!');
logger2.notice('Hello World!');
logger2.warning('Hello World!');
logger2.error('Hello World!');
logger2.critical('Hello World!');
logger2.alert('Hello World!');
logger2.emergency('Hello World!');