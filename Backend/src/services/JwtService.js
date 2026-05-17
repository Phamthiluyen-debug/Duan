const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

/* =========================
   GENERATE ACCESS TOKEN
========================= */
const genneralAccessToken = async (payload) => {
    const access_token = jwt.sign(
        {
            id: payload.id,
            isAdmin: payload.isAdmin, // 🔥 BẮT BUỘC
        },
        process.env.ACCESS_TOKEN,
        {
            expiresIn: '1d', // ✅ SỬA: KHÔNG DÙNG 30s
        }
    )

    return access_token
}

/* =========================
   GENERATE REFRESH TOKEN
========================= */
const genneralRefreshToken = async (payload) => {
    const refresh_token = jwt.sign(
        {
            id: payload.id,
            isAdmin: payload.isAdmin, // 🔥 PHẢI CÓ
        },
        process.env.REFRESH_TOKEN,
        {
            expiresIn: '365d',
        }
    )

    return refresh_token
}

/* =========================
   REFRESH TOKEN SERVICE
========================= */
const refreshTokenJwtService = (token) => {
    return new Promise((resolve, reject) => {
        try {
            jwt.verify(token, process.env.REFRESH_TOKEN, async (err, user) => {
                if (err) {
                    return resolve({
                        status: 'ERR',
                        message: 'The authentication',
                    })
                }

                const access_token = await genneralAccessToken({
                    id: user.id,
                    isAdmin: user.isAdmin,
                })

                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    access_token,
                })
            })
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    genneralAccessToken,
    genneralRefreshToken,
    refreshTokenJwtService,
}
