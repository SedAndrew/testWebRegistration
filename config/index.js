const nconf = require('nconf');
const path = require('path');

nconf.argv()
	.env()
	.file({ file: path.join(__dirname, 'config.json') });//11

module.exports = nconf;