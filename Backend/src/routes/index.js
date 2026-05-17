const UserRouter = require('./UserRouter')
const ProductRouter = require('./ProductRouter')
const TypeProductRouter = require('./TypeProductRouter')
const StatisticRouter = require('./StatisticRouter')

const routes = (app) => {
    app.use('/api/user', UserRouter)
    app.use('/api/product', ProductRouter)
    app.use('/api/type', TypeProductRouter)
    app.use('/api/statistic', StatisticRouter)
}

module.exports = routes
