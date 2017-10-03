'use strict';

// the function is synchronous and must be like
function f1(str) {
	return str.toUpperCase();
}

let Logging = require('../js-logging.umd.js');
let logger1 = new Logging({
	filters : [
	           f1, 'blue', //default filter
	           // the last item can be a custom filter object 
			   // in this example the warning and error methods are set individually
	           {
	        	   warning : 'yellow',
	        	   error : [f1, 'red' ]
	           }
	]
});

logger1.debug('Hello World!');
logger1.info('Hello World!');
logger1.notice('Hello World!');
logger1.warning('Hello World!');
logger1.error('Hello World!');
logger1.critical('Hello World!');
logger1.alert('Hello World!');
logger1.emergency('Hello World!');

// all log messages to uppercase
let logger2 = new Logging({
	filters : f1
});

logger2.debug('Hello World!');
logger2.info('Hello World!');
logger2.notice('Hello World!');
logger2.warning('Hello World!');
logger2.error('Hello World!');
logger2.critical('Hello World!');
logger2.alert('Hello World!');
logger2.emergency('Hello World!');

// only the error level is set individually
let logger3 = new Logging({
	filters : {
	        	   error : [f1, 'red' ]
	           }
});

logger3.debug('Hello World!');
logger3.info('Hello World!');
logger3.notice('Hello World!');
logger3.warning('Hello World!');
logger3.error('Hello World!');
logger3.critical('Hello World!');
logger3.alert('Hello World!');
logger3.emergency('Hello World!');
