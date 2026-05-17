const TypeProduct = require('../models/TypeProductModel')

const createType = (newType) => {
    return new Promise(async (resolve, reject) => {
        const { name } = newType

        try {
            const checkType = await TypeProduct.findOne({
                name: name
            })

            if (checkType !== null) {
                resolve({
                    status: 'ERR',
                    message: 'Type already exists'
                })
            }

            const createdType = await TypeProduct.create({
                name
            })

            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: createdType
            })

        } catch (e) {
            reject(e)
        }
    })
}

const getAllType = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allType = await TypeProduct.find()

            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: allType
            })

        } catch (e) {
            reject(e)
        }
    })
}

const deleteType = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            await TypeProduct.findByIdAndDelete(id)

            resolve({
                status: 'OK',
                message: 'Delete success'
            })

        } catch (e) {
            reject(e)
        }
    })
}

const updateType = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const updatedType = await TypeProduct.findByIdAndUpdate(
                id,
                data,
                { new: true }
            )

            resolve({
                status: 'OK',
                message: 'Update success',
                data: updatedType
            })

        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    createType,
    getAllType,
    deleteType,
    updateType
}