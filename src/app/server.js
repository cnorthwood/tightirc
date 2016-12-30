import getLogger from './logger';
import app from './app';

const cluster = require('cluster');
const os = require('os');

const logger = getLogger('tightirc');

if (cluster.isMaster) {
    os.cpus().forEach(() => {
        cluster.fork();
    });
} else {
    app.listen(8080, () => {
        logger.info('Server started');
    });
}
