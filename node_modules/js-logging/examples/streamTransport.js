'use strict';
var fs = require('fs');

var logger = require('../js-logging.umd.js').console({
	transport : function(data) {
			console.log(data.output);
			var logStream = fs.createWriteStream('./stream.log',  { flags: 'a', defaultEncoding: 'utf8', fd: null, mode: 0o666, autoClose: true });
			logStream.write(data.output+'\r\n');
			logStream.end();
		}
});

logger.debug('Hello World!');
logger.info('Hello World!');
logger.notice('Hello World!');
logger.warning('Hello World!');
logger.error('Hello World!');
logger.critical('Hello World!');
logger.alert('Hello World!');
logger.emergency('Hello World!');

