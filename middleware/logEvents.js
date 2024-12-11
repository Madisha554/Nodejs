const { format } = require('date-fns');
const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');
const logEvents = async (message, logName) => {
    const dateTime = `${format(new Date(), 'yyyy-MM-dd\tHH:mm:ss')}`;
    const logItem = `${dateTime}\t${crypto.randomUUID()}\t${message}\n`;

    try {
        if (!fs.existsSync(path.join(__dirname, '..', 'logs'))) {
            await fsPromises.mkdir(path.join(__dirname, 'logs'));
        }

        await fsPromises.appendFile(path.join(__dirname,'..', 'logs', logName), logItem);
    } catch (err) {
        console.log(err);
    }
}

const logger = (req, res, next) => {
    logEvents(`Request: ${req.method}\t ${req.headers.origin}\t ${req.url}`, 'reqLog.txt');
    next(); 
}
module.exports = {logger, logEvents};