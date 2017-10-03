'use strict';

let mongo = require('mongoskin');
let db = mongo.db('127.0.0.1:27017/test?auto_reconnect');

let log_conf = {
		transport : function(data) {
			console.log(data.output);
			var loginfo = db.collection('loginfo');
			loginfo.insert( data, function(err, log) {
				if (err) {
					console.error(err);
				}
			});
		}
}

let logger = require('tracer').console(log_conf);

logger.debug('Hello World!');
logger.info('Hello World!');
logger.notice('Hello World!');
logger.warning('Hello World!');
logger.error('Hello World!');
logger.critical('Hello World!');
logger.alert('Hello World!');
logger.emergency('Hello World!');

console.log('\n\n\npress ctrl-c to exit');
