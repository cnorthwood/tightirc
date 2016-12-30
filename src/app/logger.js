const bunyan = require('bunyan');
const process = require('process');

const level = process.env.NODE_ENV === 'production' ? 'warn' : 'info';

function loggerFactory(name) {
    bunyan.createLogger({
        name,
        level,
        serializers: bunyan.stdSerializers,
    });
}

export default loggerFactory;
