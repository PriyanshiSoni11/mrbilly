// config/logger.js
const winston = require('winston');

// Configure log format and transports
const logFormat = winston.format.combine(
  winston.format.colorize(),
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.printf(
    info => `${info.timestamp} ${info.level}: ${info.message}`
  )
);

const logger = winston.createLogger({
  level: 'info',  // Log level can be 'info', 'warn', 'error', etc.
  format: logFormat,
  transports: [
    // Console output (for development)
    new winston.transports.Console(),
    
    // File output (for production or persistent logs)
    new winston.transports.File({
      filename: 'logs/app.log',  // Log file location
      level: 'info',
    })
  ]
});

// Export the logger instance for use in other parts of the application
module.exports = logger;
