LightIRC
========

Light IRC is a user-centric IRC server and web-based client.

It is in an early stage of development and is looking for contributors!

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
