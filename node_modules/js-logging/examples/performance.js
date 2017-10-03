'use strict';

function stress_log(log) {
    var i;
    for (i = 0; i < 100000; ++i) {
        log.info("Counter Value = " + i);
    }
}

function test_tracer() {
    var log = require('../js-logging.umd.js').console({
    	transport : function(data) {}
    });
    
    console.time('test js-logging');
    stress_log(log);
    console.timeEnd('test js-logging');
}


function test_tracer_skip() {
    var log = require('../js-logging.umd.js').console({
    	level:'warning',
    	transport : function(data) {}
    });
    
    console.time('test js-logging skip');
    stress_log(log);
    console.timeEnd('test js-logging skip');
}


function test_tracer_nostack() {
	//if the format don't include "method|path|line|pos|file", the speed will be up
    var log = require('../js-logging.umd.js').console({
    	format: "{{timestamp}} <{{title}}> {{message}}",
    	transport : function(data) {}
    });
    
    console.time('test js-logging nostack');
    stress_log(log);
    console.timeEnd('test js-logging nostack');
}

test_tracer();
test_tracer_skip();
test_tracer_nostack();