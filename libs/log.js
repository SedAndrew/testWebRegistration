const appRoot = require('app-root-path');
const winston = require('winston');
const ENV = process.env.NODE_ENV;

function getLogger(module) {

	const path = module.filename.split('\\').slice(-2).join('/');
	/*
		// const colorizer = winston.format.colorize();

		// const logger = winston.createLogger({
		// 	level: ENV === 'development' ? 'debug' : 'error',
		// 	format: combine(
		// 		winston.format.timestamp(),
		// 		winston.format.simple(),
		// 		winston.format.colorize(),
		// 		winston.format.printf(msg =>
		// 			colorizer.colorize(msg.level, `${msg.timestamp} - ${msg.level}: ${msg.message}`)
		// 		)),
		// 	transports: [
		// 		new transports.Console(),
		// 	]
		// });

		// const alignedWithColorsAndTime = winston.format.combine(
		// 	winston.format.colorize(),
		// 	winston.format.timestamp(),
		// 	winston.format.align(),
		// 	winston.format.printf((info) => {
		// 		const {
		// 			timestamp, level, message, ...args
		// 		} = info;
		//
		// 		const ts = timestamp.slice(0, 19).replace('T', ' ');
		// 		return `${ts} [${level}]: ${message} ${Object.keys(args).length ? JSON.stringify(args, null, 2) : ''}`;
		// 	}),
		// );
		//
		// const path = module.filename.split('/').slice(-2).join('/');
		// const transports = {
		// 	console: new winston.transports.Console({
		//
		// 		level: ENV === 'development' ? 'debug' : 'error',
		// 		colorize: true,
		// 		json: false,
		// 		handleExceptions: true,
		// 		label: path
		// 	}),
		// 	fileError: new winston.transports.File({
		// 		filename: `${appRoot}/libs/error.log`,
		// 		level: 'error',
		// 		json: true,
		// 		colorize: false,
		// 		handleExceptions: true,
		// 		maxsize: 5242880, // 5MB
		// 		maxFiles: 5 }),
		// 	fileCombined: new winston.transports.File({
		// 		filename: `${appRoot}/libs/combined.log`,
		// 		json: true,
		// 		colorize: false,
		// 		level: 'info',
		// 		handleExceptions: true,
		// 		maxsize: 5242880, // 5MB
		// 		maxFiles: 5
		// 	})
		// };
		// const logger = new winston.createLogger({
		// 	transports: [
		// 		transports.console,
		// 		transports.fileError,
		// 		transports.fileCombined
		// 	],
		// 	exitOnError: false
		// });
	*/

	const colorizer = winston.format.colorize();
	const transports = {
		console: new winston.transports.Console({
			level: ENV === 'development' ? 'debug' : 'error',
			label: path,
			format: winston.format.combine(
				winston.format.timestamp(),
				winston.format.label(),
				winston.format.simple(),
				winston.format.printf(msg =>
					colorizer.colorize(msg.level, `${msg.timestamp} - ${msg.level}: ${path} ${msg.message}`)
				),
				// winston.format.printf(info => `${info.level}: ${new Date().toISOString()}: ${info.message}`),
				// winston.format.colorize({ level: true }),
				),
			// format: winston.format.combine(
				// winston.format.timestamp({
				// 	format: 'YYYY-MM-DD HH:mm:ss'
				// }),
				// winston.format.colorize(),
				// winston.format.simple()

			// ),
			colorize: true,
		})
	};
	const logger = new winston.createLogger({
		transports: [
			transports.console
		],
		exitOnError: false
	});

	logger.stream = {
		write: function(message, encoding) {
			logger.info(message);
		}
	};

	return logger;
}
module.exports = getLogger;
