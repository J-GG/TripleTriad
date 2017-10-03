'use strict';
// use predefined logger (function console) with own methods and color  settings 
var conf = {
		methods : [ 'log0', 'log1', 'log2', 'log3', 'log4' ],
        filters: {
            log0: 'white',
            log1: 'yellow',
            log2: 'green',
            log3: 'blue',
            log4: 'red'
        }
	};
let logger = require('../js-logging.umd.js').console(conf);
logger.log0('Hello World!');
logger.log1('Hello World!');
logger.log2('Hello World!');
logger.log3('Hello World!');
logger.log4('Hello World!');
