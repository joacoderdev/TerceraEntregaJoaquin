import winston from "winston";
import colors from "colors";

const colorMap = {
  debug: colors.gray,
  http: colors.cyan,
  info: colors.green,
  warning: colors.yellow,
  error: colors.red,
  fatal: colors.bold.red,
};

const consoleFormat = winston.format.combine(
  winston.format.colorize(),
  winston.format.printf((info) => {
    const { timestamp, level, message } = info;
    const color = colorMap[level] || colors.white;
    const levelLabel = color(`[${level.toUpperCase()}]`);
    return `${timestamp} ${levelLabel} ${message}`;
  })
);

const transports = [
  new winston.transports.Console({
    level: "debug",
    handleExceptions: true,
    format: consoleFormat,
  }),
  new winston.transports.File({
    filename: './errors.log',
    level: "error",
    handleExceptions: true,
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.json()
    ),
  }),
];

const logger = winston.createLogger({
  levels: {
    debug: 0,
    http: 1,
    info: 2,
    warning: 3,
    error: 4,
    fatal: 5,
  },
  transports,
  exitOnError: false,
});

if (process.env.ENVIRONMENT !== "production") {
  logger.add(
    new winston.transports.Console({
      level: "debug",
      handleExceptions: true,
      format: consoleFormat,
    })
  );
}

if (process.env.ENVIRONMENT === "production") {
  logger.remove(transports[0]);
}

export { logger };
