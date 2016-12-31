LightIRC
========

[![Known Vulnerabilities](https://snyk.io/test/github/cnorthwood/tightirc/badge.svg)](https://snyk.io/test/github/cnorthwood/tightirc)
[![Build Status](https://travis-ci.org/cnorthwood/tightirc.svg?branch=master)](https://travis-ci.org/cnorthwood/tightirc)

Light IRC is a user-centric IRC server and web-based client.

It is in an early stage of development and is looking for contributors!

Running a copy
--------------

_NOTE: This is not yet an "MVP" state_

* Install [Yarn](https://yarnpkg.com/en/docs/install)
* Install a copy of Redis and configure it to allow keyspace notifications (_TODO: expand this_)
* Clone a copy of this repo
* Run `yarn` to install the dependencies
* Set environment variables as below to configure the application 
* Run `npm start` to start a copy

Configuration
-------------

* `NODE_ENV` - the application respects the NODE_ENV variable. When
  `NODE_ENV` is set to `production` then logging becomes terser.
* `TIGHTIRC_REDIS_HOST` - this should be set to a URL pointing at a Redis
  instance. If not set, it defaults to `localhost`.
* `TIGHTIRC_REDIS_PORT` - this should be set to the port number of a Redis
  instance. If not set, it defaults to `6379`.
* `TIGHTIRC_STATIC_ASSETS_CDN` - this should be set to the location the static
  assets are being served from. It defaults to `/static`.

Getting Started for Developers
------------------------------

This application is written in JavaScript. The back-end is Node, and the
front-end uses React. We want to target best practices like test-driven
development, type checking and continuous integration.

We want frequent, small commits to master. Pull requests are useful for code
review in lieu of pair programming, so please raise pull requests, but keep
them small!

To set up a dev environment, there are two distinct build chains, one for
server-side code, and another for client-side code. Follow these steps:

* Install [Yarn](https://yarnpkg.com/en/docs/install)
* On a check out of this repo, run `yarn` to install all needed dependencies
* You can now build the front-end assets running `node_modules/.bin/gulp build`
  and start the server with `npm start`.

To run tests:

* For back end: `npm test`
* For front-end end: `node_modules/.bin/gulp test`

For automatically watching, restarting and running tests:

* For the back end serve: `npm run dev`
* For back end tests: `npm run test-watch`
* For front end: `node_modules/.bin/gulp watch`

License
-------

Copyright (C) 2016 Chris Northwood

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
