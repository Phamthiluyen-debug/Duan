const Order = require('../models/OrderProduct')

const getRevenue = async (req, res) => {

    try {

        const orders = await Order.find()

        const totalRevenue = orders.reduce(
            (sum, item) => sum + item.totalPrice,
            0
        )

        return res.status(200).json({
            status: 'OK',
            data: totalRevenue
        })

    } catch (e) {

        return res.status(500).json({
            message: e
        })
    }
}

module.exports = {
    getRevenue
}