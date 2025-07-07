
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET || 'avinash'

function isVerify(req, res, next) {

    // const token = req.headers.authorization?.split(' ')[1];
    const cookieToken = req.cookies.token;

    if(!cookieToken){
        return res.status(401).json({ message: 'Unauthorized access, token not found in cookies' });
    }

    // if (!token) {
    //     return res.status(401).json({ message: 'Unauthorized access' });
    // }

    try {
        // const decoded = jwt.verify(token, SECRET);
        const decoded = jwt.verify(cookieToken, SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({ message: 'Invalid token', error: error.message });
    }
}

module.exports = {
    isVerify
}