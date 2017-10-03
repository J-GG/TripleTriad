"use strict";
const assert = require("assert");

describe('simple', function() {
	var logger = require('../js-logging.umd.js').console({
		transport : function(data) {
			console.log(data.output);
			return data;
		}
	});
	var o = logger.info('hello');
	it('message', function() { assert.deepEqual(o['message'], 'hello'); });
	it('file', function() { assert.deepEqual(o['file'], 'test.js'); });
	it('line', function() { assert.deepEqual(o['line'], 11); });
	it('level', function() { assert.deepEqual(o['level'], 1); });
});

describe('stack index', function() {
	var logger = require('../js-logging.umd.js').console({
		stackIndex: 1,
		transport : function(data) {
			console.log(data.output);
			return data;
		}
	});
	var logMgr = function(type, msg) {
		return logger[type](msg);
	};
	var o = logMgr('info', 'hello');
	it('message', function() { assert.deepEqual(o['message'], 'hello'); });
	it('file', function() { assert.deepEqual(o['file'], 'test.js'); });
	it('line', function() { assert.deepEqual(o['line'], 29); });
});

describe('simple message', function() {
	var logger = require('../js-logging.umd.js').console({
		format : "${message}",
		transport : function(data) {
			console.log(data.output);
			return data;
		}
	});
	var o = logger.debug('hello');
	it('output', function() { assert.deepEqual(o['output'], 'hello'); });
});

describe('simple color message', function() {
	var logger = require('../js-logging.umd.js').colorConsole({
		format : "${message}",
		transport : function(data) {
			console.log(data.output);
			return data;
		}
	});
	var o = logger.error('hello');
	it('output', function() { assert.deepEqual(o.output, '\x1B[31mhello\x1B[39m'); });
});

describe('custom format', function() {
  var logger = require('../js-logging.umd.js').console({
		format : [
		          "${message}", // default format
		          {
		        	  warning : "warning:${message}",
		        	  error : "error:${message}",
		          }	
		],
		transport : function(data) {
			console.log(data.output);
			return data;
    }
  });

	it('hello world 123', function() {
		let o = logger.debug('hello world 123');
		assert.equal(o['output'], 'hello world 123');
	});
	it('warning:hello world 123', function() { 
		let o = logger.warning('hello world 123');
		assert.equal(o['output'], 'warning:hello world 123');
	});
	it('error:hello world 123', function() { 
		let o = logger.error('hello world 123');
		assert.equal(o['output'], 'error:hello world 123');
	});
});

describe('custom filter', function() {
	var logger = require('../js-logging.umd.js').console({
		format : [
		          "${message}", // default format
		          {
		        	  warning : "warning:${message}",
		        	  error : "error:${message}",
		          }	
		],
		filters:[
		  'black',
        {
         warning : 'blue',
     	   error : 'red'
        }],
        transport : function(data) {
			console.log(data.output);
			return data;
		}
	});
  {
    let o = logger.debug('hello world 123');
    it('output debug', function() { assert.equal(o['output'], '\x1B[30mhello world 123\x1B[39m'); });
    it('level debug', function() { assert.equal(o['level'], 0); });
  }
  {
    let o = logger.warning('hello world 123');
    it('output warning', function() { assert.equal(o['output'], '\x1B[34mwarning:hello world 123\x1B[39m'); });
    it('level warning', function() { assert.equal(o['level'], 3); });
  }
  {
    let o = logger.error('hello world 123');
    it('output error', function() { assert.equal(o['output'], '\x1B[31merror:hello world 123\x1B[39m'); });
    it('level error', function() { assert.equal(o['level'], 4); });
  }


});

describe('set level to debug', function() {
	let logger = require('../js-logging.umd.js').console({level:'debug',
		transport : function(data) {
			return data;
		}
	});
	it('hello world debug', function() { assert.ok(logger.debug('hello world')); });
	it('hello world info', function() { assert.ok(logger.info('hello world')); });
	it('hello world notice', function() { assert.ok(logger.notice('hello world')); });
	it('hello world warning', function() { assert.ok(logger.warning('hello world')); });
  it('hello world error', function() { assert.ok(logger.error('hello world')); });
  it('hello world critical', function() { assert.ok(logger.critical('hello world')); });
	it('hello world alert', function() { assert.ok(logger.alert('hello world')); });
  it('hello world emergency', function() { assert.ok(logger.emergency('hello world')); });
});

describe('set level to 0', function() {
	var logger = require('../js-logging.umd.js').console({level:0,
		transport : function(data) {
			return data;
		}
	});
	it('hello world debug', function() { assert.ok(logger.debug('hello world')); });
	it('hello world info', function() { assert.ok(logger.info('hello world')); });
	it('hello world notice', function() { assert.ok(logger.notice('hello world')); });
	it('hello world warning', function() { assert.ok(logger.warning('hello world')); });
  it('hello world error', function() { assert.ok(logger.error('hello world')); });
  it('hello world critical', function() { assert.ok(logger.critical('hello world')); });
	it('hello world alert', function() { assert.ok(logger.alert('hello world')); });
  it('hello world emergency', function() { assert.ok(logger.emergency('hello world')); });
});

describe('set level to 2', function() {
	var logger = require('../js-logging.umd.js').console({level:2,
		transport : function(data) {
			return data;
		}
	});
	it('hello world debug', function() { assert.ok(logger.debug('hello world')==undefined); });
	it('hello world info', function() { assert.ok(logger.info('hello world')==undefined); });
	it('hello world notice', function() { assert.ok(logger.notice('hello world')); });
	it('hello world warning', function() { assert.ok(logger.warning('hello world')); });
  it('hello world error', function() { assert.ok(logger.error('hello world')); });
  it('hello world critical', function() { assert.ok(logger.critical('hello world')); });
	it('hello world alert', function() { assert.ok(logger.alert('hello world')); });
  it('hello world emergency', function() { assert.ok(logger.emergency('hello world')); });
});

describe('set level to warning', function() {
	var logger = require('../js-logging.umd.js').console({level:'warning',
		transport : function(data) {
			return data;
		}
	});
	it('hello world debug', function() { assert.ok(logger.debug('hello world')==undefined); });
	it('hello world info', function() { assert.ok(logger.info('hello world')==undefined); });
	it('hello world notice', function() { assert.ok(logger.notice('hello world')==undefined); });
	it('hello world warning', function() { assert.ok(logger.warning('hello world')); });
  it('hello world error', function() { assert.ok(logger.error('hello world')); });
  it('hello world critical', function() { assert.ok(logger.critical('hello world')); });
	it('hello world alert', function() { assert.ok(logger.alert('hello world')); });
  it('hello world emergency', function() { assert.ok(logger.emergency('hello world')); });
});

describe('set level to error', function() {
	var logger = require('../js-logging.umd.js').console({level:'error',
		transport : function(data) {
			return data;
		}
	});
	it('hello world debug', function() { assert.ok(logger.debug('hello world')==undefined); });
	it('hello world info', function() { assert.ok(logger.info('hello world')==undefined); });
	it('hello world notice', function() { assert.ok(logger.notice('hello world')==undefined); });
	it('hello world warning', function() { assert.ok(logger.warning('hello world')==undefined); });
  it('hello world error', function() { assert.ok(logger.error('hello world')); });
  it('hello world critical', function() { assert.ok(logger.critical('hello world')); });
	it('hello world alert', function() { assert.ok(logger.alert('hello world')); });
  it('hello world emergency', function() { assert.ok(logger.emergency('hello world')); });
});

describe('set level to max value', function() {
	var logger = require('../js-logging.umd.js').console({level:Number.MAX_VALUE,
		transport : function(data) {
			return data;
		}
	});
	it('hello world debug', function() { assert.ok(logger.debug('hello world')==undefined); });
	it('hello world info', function() { assert.ok(logger.info('hello world')==undefined); });
	it('hello world notice', function() { assert.ok(logger.notice('hello world')==undefined); });
	it('hello world warning', function() { assert.ok(logger.warning('hello world')==undefined); });
  it('hello world error', function() { assert.ok(logger.error('hello world')==undefined); });
  it('hello world critical', function() { assert.ok(logger.critical('hello world')==undefined); });
	it('hello world alert', function() { assert.ok(logger.alert('hello world')==undefined); });
  it('hello world emergency', function() { assert.ok(logger.emergency('hello world')==undefined); });
});

describe('loop', function() {
	let logger = require('../js-logging.umd.js').console({
		transport : function(data) {
			console.log(data.output);
			return data;
		}
	});
	for(let i=0; i<10; i++) {
		let o = logger.error('hello');
		it('message', function() { assert.equal(o['message'], 'hello'); });
		it('file', function() { assert.equal(o['file'], 'test.js'); });
		it('line', function() { assert.equal(o['line'], 231); });
		it('level', function() { assert.equal(o['level'], 4); });
	}
});

describe('setLevel 1', function() {
	let Logging = require('../js-logging.umd.js');
  let logger = new Logging({
		transport : function(data) {
			console.log(data.output);
			return data;
		}
	});
	logger.setLevel(1);
	it('hello world debug', function() { assert.ok(logger.debug('hello world')==undefined); });
	it('hello world info', function() { assert.ok(logger.info('hello world')); });
	it('hello world notice', function() { assert.ok(logger.notice('hello world')); });
	it('hello world warning', function() { assert.ok(logger.warning('hello world')); });
  it('hello world error', function() { assert.ok(logger.error('hello world')); });
  it('hello world critical', function() { assert.ok(logger.critical('hello world')); });
	it('hello world alert', function() { assert.ok(logger.alert('hello world')); });
  it('hello world emergency', function() { assert.ok(logger.emergency('hello world')); });
});

describe('setLevel "error"', function() {
	let Logging = require('../js-logging.umd.js');
  let logger = new Logging({
		transport : function(data) {
			console.log(data.output);
			return data;
		}
	});
	logger.setLevel('error');
	it('hello world debug', function() { assert.ok(logger.debug('hello world')==undefined); });
	it('hello world info', function() { assert.ok(logger.info('hello world')==undefined); });
	it('hello world notice', function() { assert.ok(logger.notice('hello world')==undefined); });
	it('hello world warning', function() { assert.ok(logger.warning('hello world')==undefined); });
  it('hello world error', function() { assert.ok(logger.error('hello world')); });
  it('hello world critical', function() { assert.ok(logger.critical('hello world')); });
	it('hello world alert', function() { assert.ok(logger.alert('hello world')); });
  it('hello world emergency', function() { assert.ok(logger.emergency('hello world')); });
});

describe('close', function() {
	let Logging = require('../js-logging.umd.js');
  let logger = new Logging({
		transport : function(data) {
			console.log(data.output);
			return data;
		}
	});
	logger.close();
	it('hello world debug', function() { assert.ok(logger.debug('hello world')==undefined); });
	it('hello world info', function() { assert.ok(logger.info('hello world')==undefined); });
	it('hello world notice', function() { assert.ok(logger.notice('hello world')==undefined); });
	it('hello world warning', function() { assert.ok(logger.warning('hello world')==undefined); });
  it('hello world error', function() { assert.ok(logger.error('hello world')==undefined); });
  it('hello world critical', function() { assert.ok(logger.critical('hello world')==undefined); });
	it('hello world alert', function() { assert.ok(logger.alert('hello world')==undefined); });
  it('hello world emergency', function() { assert.ok(logger.emergency('hello world')==undefined); });
});
