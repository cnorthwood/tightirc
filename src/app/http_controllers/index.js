import type { $Request, $Response } from 'express';

const fs = require('fs');
const path = require('path');

function loadSri(): Object {
    if (process.env.NODE_ENV === 'production') {
        // eslint-disable-next-line global-require
        return require('../../../build/sri.json');
    }

    return JSON.parse(fs.readFileSync(path.join(__dirname, '..', '..', '..', 'build', 'sri.json'), 'utf8'));
}

function indexController(req: $Request, res: $Response) {
    const sriHashes = loadSri();

    res.render('index', {
        page_title: 'Hello',
        static_base_url: process.env.TIGHTIRC_STATIC_ASSETS_CDN || '/static',
        sri_hashes: {
            js: sriHashes['static/js/bootstrap.js'],
            css: sriHashes['static/styles/main.css'],
        },
    });
}

export default indexController;
