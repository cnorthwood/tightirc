import type { $Request, $Response } from 'express';

import { checkOkay } from '../db';

export default function statusController(req: $Request, res: $Response) {
    checkOkay()
        .then(() => { res.end('OK'); })
        .catch(() => { res.status(500).end('Not OK'); });
}
