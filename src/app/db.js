import { createClient } from 'then-redis';
import getLogger from './logger';

const logger = getLogger('db');
const db = createClient({
    host: process.env.TIGHTIRC_REDIS_ENDPOINT || 'localhost',
    port: parseInt(process.env.TIGHTIRC_REDIS_PORT, 10) || 6379,
    enable_offline_queue: false,
});

db.on('error', (err) => {
    logger.error(err);
});

/**
 * Returns a promise which resolves if the database is accessible, but rejects
 * if there are issues communicating with it.
 */
function checkOkay(): Promise<void> {
    return db.ping();
}

export { checkOkay };
