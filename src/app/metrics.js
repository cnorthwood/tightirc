import { getLogger } from './logger';

const StatsD = require('node-statsd');

const statsd = new StatsD();
const logger = getLogger('statsd');

statsd.socket.on('error', (err) => {
    logger.error(err);
});

export default statsd;
