const path = require('path');

const dotenv = require('dotenv');

dotenv.config()

const nextPath = path.join(__dirname, 'node_modules', '.bin', 'next');

process.argv.length = 1;
process.argv.push(nextPath, 'start');

require(nextPath);