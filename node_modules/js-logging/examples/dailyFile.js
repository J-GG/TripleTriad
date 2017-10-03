'use strict';
// use predefined console logger (function dailyFile) with standard settings 
let logger = require('../js-logging.umd.js').dailyFile();
logger.debug('Hello World!');
logger.info('Hello World!');
logger.notice('Hello World!');
logger.warning('Hello World!');
logger.error('Hello World!');
logger.critical('Hello World!');
logger.alert('Hello World!');
logger.emergency('Hello World!');

// use predefined console logger (function dailyFile) with own settings (can be file and logging settings)
// the function dailyFile with the file options will result in an additional transport which will be appended to any given transport
// the following settings will create two transports: file and console
let options = {
    // file options
    path: '.',
    filename: 'js-logging',
    filenameDateFormat: 'yyyymmdd',
    pathFormat: '${path}/${filename}${filenameDateFormat}.log',
    lineEnding: '\r\n',
    // logging options
    format: "${timestamp} <${title}> ${file}:${line} ${method} ${message}",
    dateformat: "isoDateTime",
    preprocess: function (data) {
    },
    transport: function (data) {
        console.log(data.output);
    },
    filters: [],
    level: 'debug',
    methods: ['debug', 'info', 'notice', 'warning', 'error', 'critical', 'alert', 'emergency'],
    stackIndex: 0  // get the specified index of stack as file information. It is userful for development package.
};
logger = require('../js-logging.umd.js').dailyFile(options);
logger.debug('Hello World!');
logger.info('Hello World!');
logger.notice('Hello World!');
logger.warning('Hello World!');
logger.error('Hello World!');
logger.critical('Hello World!');
logger.alert('Hello World!');
logger.emergency('Hello World!');

// define own logger with own file transport and console transport
let fs = require('fs');
let Logging = require('../js-logging.umd.js');
let logger2 = new Logging({
	transport : [
        function (data) {
            console.log(data.output);
        },
        function(data) {
            fs.appendFile('./js-logging.log', data.output+'\r\n', (err) => {});
        }
    ]
});
logger2.debug('Hello World!');
logger2.info('Hello World!');
logger2.notice('Hello World!');
logger2.warning('Hello World!');
logger2.error('Hello World!');
logger2.critical('Hello World!');
logger2.alert('Hello World!');
logger2.emergency('Hello World!');
