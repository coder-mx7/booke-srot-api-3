const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
    const token = req.headers.token;
    console.log(req.headers.token)

    if (token) {
        try {
            const decode = jwt.verify(token, process.env.Jwt_Secret_Key);
            req.user = decode;
            next();
        } catch (error) {
            res.status(401).json({ message: "invalid token" });
        }
    } else {
        res.status(401).json({ message: "no token provided" });
    }
}

module.exports = {
    verifyToken,
};
