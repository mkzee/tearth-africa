import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {

    const token = JSON.parse(req.cookies.token)

    if (!token) return (res.status(401).json({message: "You are not authorized"}))

    jwt.verify(token.token, process.env.SECRET_STR, async (err, payload) => {
        if (err) return res.status(403).json({message: "Token is not valid"}) 
        
        req.userId = payload?.id
    })
    next()
}

export default verifyToken