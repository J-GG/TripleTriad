'use strict';
let Logging = require('../js-logging.umd.js');
let options = {
	format: "${timestamp} <${title}> ${message} (in ${file}:${line})",
	dateformat: "HH:MM:ss.L"
};
let logger = new Logging(options);
logger.debug('Hello World!');
logger.info('Hello World!');
logger.notice('Hello World!');
logger.warning('Hello World!');
logger.error('Hello World!');
logger.critical('Hello World!');
logger.alert('Hello World!');
logger.emergency('Hello World!');

options = {
	format: [
		"${timestamp} <${title}> ${message} (in ${file}:${line})", //default format
		{
			error: "${timestamp} <${title}> ${message} (in ${file}:${line})\nCall Stack:\n${stack}" // error format
		}
	],
	dateformat: "isoUtcDateTime",
	preprocess: function (data) {
		data.title = data.title.toUpperCase();
	}
};
logger = new Logging(options);
logger.debug('Hello World!');
logger.info('Hello World!');
logger.notice('Hello World!');
logger.warning('Hello World!');
logger.error('Hello World!');
logger.critical('Hello World!');
logger.alert('Hello World!');
logger.emergency('Hello World!');

// JSON output
options = {
	format : "{timestamp: '${timestamp}', title: '${title}', file: '${file}', line:'${line}', method: '${method}', message: '${message}' }"
};
logger = new Logging(options);
logger.debug('Hello World!');
logger.info('Hello World!');
logger.notice('Hello World!');
logger.warning('Hello World!');
logger.error('Hello World!');
logger.critical('Hello World!');
logger.alert('Hello World!');
logger.emergency('Hello World!');