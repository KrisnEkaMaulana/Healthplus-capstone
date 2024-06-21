const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const secretKey = process.env.JWT_SECRET;

function verifyAccessToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({
            status: 'error',
            message: 'Unauthorized'
        });
    }

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(403).json({
                status: 'error',
                message: 'Access denied'
            });
        }

        if (decoded.role !== 'admin') {
            return res.status(403).json({
                status: 'error',
                message: 'Access denied: Admin role required'
            });
        }

        req.user = decoded;
        next();
    });
}

module.exports = verifyAccessToken;
