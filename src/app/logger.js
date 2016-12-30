const bunyan = require('bunyan');

const level = process.env.NODE_ENV === 'production' ? bunyan.WARN : bunyan.INFO;

function loggerFactory(name: string) {
    return bunyan.createLogger({
        name,
        level,
        serializers: bunyan.stdSerializers,
    });
}

export default loggerFactory;
