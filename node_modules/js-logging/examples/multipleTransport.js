'use strict';
let fs = require('fs');
let logger = require('js-logging').console({
    transport: [
        function (data) {
            fs.open('./file.log', 'a', parseInt('0644', 8), function (e, id) {
                fs.write(id, data.output + "\n", null, 'utf8', function () {
                    fs.close(id, function () {
                    });
                });
            });
        },
        function (data) {
            console.log(data.output);
        }
    ]
});
logger.debug('Hello World!');
logger.info('Hello World!');
logger.notice('Hello World!');
logger.warning('Hello World!');
logger.error('Hello World!');
logger.critical('Hello World!');
logger.alert('Hello World!');
logger.emergency('Hello World!');
  
    
    
    


