const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config()

const authMiddleWare = (req, res, next) => {
    const authHeader = req.headers.authorization

    if (!authHeader) {
        return res.status(401).json({
            message: 'Authorization header missing',
            status: 'ERROR'
        })
    }

    const token = authHeader.split(' ')[1]

    if (!token) {
        return res.status(401).json({
            message: 'Token missing',
            status: 'ERROR'
        })
    }

    jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
        if (err) {
            return res.status(403).json({
                message: 'Token invalid',
                status: 'ERROR'
            })
        }

        if (user?.isAdmin) {
            req.user = user
            next()
        } else {
            return res.status(403).json({
                message: 'Permission denied',
                status: 'ERROR'
            })
        }
    })
}

const authUserMiddleWare = (req, res, next) => {
    const authHeader = req.headers.authorization
    const userId = req.params.id

    if (!authHeader) {
        return res.status(401).json({
            message: 'Authorization header missing',
            status: 'ERROR'
        })
    }

    const token = authHeader.split(' ')[1]

    if (!token) {
        return res.status(401).json({
            message: 'Token missing',
            status: 'ERROR'
        })
    }

    jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
        if (err) {
            return res.status(403).json({
                message: 'Token invalid',
                status: 'ERROR'
            })
        }

        if (user?.isAdmin || user?.id === userId) {
            req.user = user
            next()
        } else {
            return res.status(403).json({
                message: 'Permission denied',
                status: 'ERROR'
            })
        }
    })
}

module.exports = {
    authMiddleWare,
    authUserMiddleWare
}
