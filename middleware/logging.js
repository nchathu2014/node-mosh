const logger = (req, res, next) => {
    console.log('Logging Middlware...!');
    next();
}

module.exports = logger;