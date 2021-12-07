const jwt = require('jsonwebtoken');
require('dotenv').config();
const verifyToken = (token)=>{
    return jwt.verify(token,process.env.JWT_ACCESS_KEY);
}
module.exports = (req,res,next)=>{
    const bearerToken = req?.headers?.authorization
    if(!bearerToken || !bearerToken.startsWith('Bearer ')) return res.status(500).send({Status:"Failed",message:"Token invalid"});

    const token = bearerToken.split(" ")[1];

    const user = verifyToken(token);

    if(!user) return res.status(500).send({Status:"Failed",message:"Token invalid"});

    req.user = user;

    return next();
}