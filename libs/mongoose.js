const mongoose = require('mongoose');
const config = require('../config');
const logger = require('../libs/log')(module);

mongoose.connect(	config.get('mongoose:uri'), config.get('mongoose:options:server')).then(
		() => { logger.info("Successfully connect")},
		err => { console.error(`connect error:(${err})`); }
	); // { useNewUrlParser: true }//, //config.get('mongoose:useNewUrlParser') //
mongoose.set('useCreateIndex', true);

module.exports = mongoose;