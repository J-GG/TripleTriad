#js-logging

[![NPM version](http://img.shields.io/npm/v/js-logging.svg)](https://www.npmjs.org/package/js-logging)
![](https://img.shields.io/badge/dependencies-none-brightgreen.svg)
[![Build Status](https://travis-ci.org/irhc/js-logging.svg?branch=master)](https://travis-ci.org/irhc/js-logging)

A powerful, feature rich and customizable logging library for node.js and any browser with a console. 

This library is based on baryon's node.js logging library [tracer](https://github.com/baryon/tracer). It has no dependencies, predefined settings and its default log levels are
compliant with RFC 5424.

###Example Logs

See [here](http://irhc.github.io/js-logging) for some js-logging output in the console of your browser. It should be similar to

![](https://raw.github.com/irhc/js-logging/master/browser.png)

On the server side (e.g. nodejs) an example looks like this

![](https://raw.github.com/irhc/js-logging/master/console.png)


###Node.js Example

```html
npm install js-logging
```
```javascript
// use predefined console logger (function console) with standard settings 
let logger1 = require('js-logging').console();
logger1.debug('Hello World!');

// define own logger with standard settings
let Logging = require('js-logging');
let logger2 = new Logging();
logger2.debug('Hello World!');
```
Current version should work with Node.js version 6.0 and above.

###Browser Example

```javascript
<script src='js-logging.browser.js'></script>
<script>
	// use predefined color console logger (function colorConsole) with standard settings 
	let logger1 = Logging.colorConsole();
	logger1.debug('Hello World!');

	// define own logger with standard settings
	let logger2 = new Logging();
	logger2.debug('Hello World!');
<script>
```
Color version works with chrome and firefox, at least.

###Features

- print log messages with timstamp, file name, method name, line number, path or call stack
- simple color support for node.js
- individual color support for chrome and firefox
- customized date/timestamp format and output format
- supports user-defined logging levels
- add easily any transport
- support filter functions
- no dependency
- predefined settings
- production ready with minimal performance overhead
- es6 module

###Usage node.js
One can define a new object of the Logging class
```javascript
let Logging = require('js-logging');
let logger = new Logging([options]);
logger.debug('Hello World!');
```
or can use a predefined function
- 1) console
```javascript
// the predefined function generates a new object of the Logging class with standard settings
let logger = require('js-logging').console([options]);
logger.debug('Hello World!');
```

- 2) colorConsole
```javascript
// the predefined function generates a new object of the Logging class with color settings 
// by the use of the option filters
let logger = require('js-logging').colorConsole([options]);
logger.debug('Hello World!');
// equivalent to
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
let logger = require('js-logging').console(conf);
logger.debug('Hello World!');
// or
let Logging = require('js-logging');
let logger = new Logging(conf);
logger.debug('Hello World!');
```

- 3) dailyFile
```javascript
// the predefined function generates a new object of the Logging class with file transport, rotating daily.
let logger = require('../js-logging.umd.js').dailyFile([options]);
logger.debug('Hello World!'); 
```

###Usage browser

See the browser example above. The default color setting is slightly different from the node.js setting.
```javascript
let conf = {
	filters: {
		debug: 'Gray',
		info: 'Black',
		notice: 'Green',
		warning: 'Blue',
		error: 'Red',
		critical: 'Orange',
		alert: 'Cyan',
		emergency: 'Magenta'
    }
};
```
Of course there is no predefined function dailyFile!

###Options
The following options can be set by the use of the Logging class or any predefined function (console, colorConsole, dailyFile)
```javascript
let defaultOptions = {
	// customize the output format with multiple tags: timestamp, title, level, message, file
	// pos, path, method, stack
	// see the data object description for there meanings
    format: "${timestamp} <${title}> ${file}:${line} ${method} ${message}",
	
	// every format according to Steven Levithan's excellent dateFormat() function is possible
    dateformat: "isoDateTime",
	
	// manipulate the data object before any transport
    preprocess: function (data) {
    },
	
	// define one or multiple transports by the use of the data object (see the example mulitpleTransport.js)
    transport: function (data) {
        console.log(data.output);
    },
	
	// can be an array of color strings or functions
	// node.js colors: black, red, green, yellow, blue, magenta, cyan and white
	// browser colors: any css color
	// the last item can be a custom filter object where each method can be overridden indiviually
	// see the filter example in the example directory for some usage
    filters: [],
	
	// set the initial level, no transports are set for levels below the initial settings for performance reasons 
	// the level can be changed later on, but there is no log output if there are no transports set initially
    level: 'debug',
	
	// the default levels according to RFC 5424, but you can set your own, e.g. ['log', 'info', 'error']
    methods: ['debug', 'info', 'notice', 'warning', 'error', 'critical', 'alert', 'emergency'],
	
	// get the specified index of stack as file information
    stackIndex: 0  
};
```

There are additional options, if one uses the predefined function dailyFile
```javascript
let defaultOptions = {
	// with the options path, filename, filenameDateFormat and pathFormat one can control the filename and
	// and its containing directory
	// with the use of filenameDateFormat one can control the rotation period of new log files
	// e.g. the format yyyymmdd will generate every day a new file, the format yyyymmdd_HH will generate
	// every hour a new file and so on.
    path: '.',
    filename: 'js-logging',
    filenameDateFormat: 'yyyymmdd',
    pathFormat: '${path}/${filename}${filenameDateFormat}.log',
	
	// set the line ending deliminater for all logging messages
    lineEnding: '\r\n'
}
```

###Data object

```javascript
var data = {
	timestamp: // current time
    title: // method name, default is 'debug', 'info', 'notice', 'warning', 'error', 'critical', 'alert'
	       // and 'emergency'
    level: // method level, default is 'debug':0, 'info':1, 'notice':2, 'warning':3, 'error':4, 'critical':5,
	       // 'alert':6 and 'emergency':7
    message: // logging input
	file: // file name
	line: // line number
	pos: // position
	path: // file's path
	method: // method name of caller
	stack: // call stack message
};
```

###Logging level

One can set the (initial) logging level either as method name or as number (index).
The initial logging level is responsible for the created transports. No transport is set for logging levels below the initial level.
```javascript
let logger = require('js-logging').console({level: 'warning'});
// or equivalent let logger = require('js-logging').console({level: 3});
logger.debug('Hello World!'); // no output
logger.warning('Hello World!');
```

It is possible to change the level at any time.
```javascript
// log only messages with level critical and above
logger.setLevel('critical'); // or equivalent logger.setLevel(5);
logger.debug('Hello World!'); // no output
logger.warning('Hello World!'); // no output
logger.critical('Hello World!');
```

A level above the maximum will result in no output messages and is equivalent to closing the logger.
```javascript
logger.close(); // or equivalent logger.setLevel(1000);
logger.debug('Hello World!'); // no output
logger.warning('Hello World!'); // no output
logger.emergency('Hello World!'); // no output
```

An invalid log level string will result in log level 0
```javascript
logger.setLevel('unknownLevel');
// is equivalent to logger.setLevel(0);
```

###Examples

Take a look at the examples directory for many different examples.

###Production and Development

Close the logger at anytime (or set the initial level very high) to get production ready with minimal performance overhead (see the example performance.js).

###Supported browsers

Any browser with a console and at least Chrome and Firefox for simple color support.

###References

This small javascript component uses or is based on other javascript projects and code snippets:

- [tracer](https://github.com/baryon/tracer)
- [dateformat](http://blog.stevenlevithan.com/archives/date-time-format) and the npm package [dateformat-light ](https://www.npmjs.com/package/dateformat-light)

### Licence

MIT