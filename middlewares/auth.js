const auth = (req, res, next) => {
    console.log('Authentication Middlware...!');
    next();
}

module.exports = auth;