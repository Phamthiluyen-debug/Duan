const TypeProductService = require('../services/TypeProductService')

const createType = async (req, res) => {
    try {
        const response = await TypeProductService.createType(req.body)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(500).json({
            message: e
        })
    }
}

const getAllType = async (req, res) => {
    try {
        const response = await TypeProductService.getAllType()
        return res.status(200).json(response)
    } catch (e) {
        return res.status(500).json({
            message: e
        })
    }
}

const deleteType = async (req, res) => {
    try {
        const response = await TypeProductService.deleteType(req.params.id)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(500).json({
            message: e
        })
    }
}

const updateType = async (req, res) => {
    try {
        const response = await TypeProductService.updateType(
            req.params.id,
            req.body
        )

        return res.status(200).json(response)
    } catch (e) {
        return res.status(500).json({
            message: e
        })
    }
}

module.exports = {
    createType,
    getAllType,
    deleteType,
    updateType
}