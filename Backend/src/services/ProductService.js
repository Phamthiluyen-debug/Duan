const Product = require("../models/ProductModel")

/* =========================
   CREATE PRODUCT
========================= */
const createProduct = (newProduct) => {
    return new Promise(async (resolve, reject) => {
        const { name, image, type, price, discount } = newProduct
        try {
            const checkProduct = await Product.findOne({ name })
            if (checkProduct !== null) {
                return resolve({
                    status: 'ERR',
                    message: 'The name of product is already'
                })
            }

            const createdProduct = await Product.create({
                name,
                image,
                type,
                price,
                discount: Number(discount) || 0,
            })

            return resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: createdProduct
            })
        } catch (e) {
            reject(e)
        }
    })
}

/* =========================
   UPDATE PRODUCT
========================= */
const updateProduct = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkProduct = await Product.findById(id)
            if (!checkProduct) {
                return resolve({
                    status: 'ERR',
                    message: 'The product is not defined'
                })
            }

            const updatedProduct = await Product.findByIdAndUpdate(
                id,
                data,
                { new: true }
            )

            return resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: updatedProduct
            })
        } catch (e) {
            reject(e)
        }
    })
}

/* =========================
   DELETE PRODUCT
========================= */
const deleteProduct = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkProduct = await Product.findById(id)
            if (!checkProduct) {
                return resolve({
                    status: 'ERR',
                    message: 'The product is not defined'
                })
            }

            await Product.findByIdAndDelete(id)

            return resolve({
                status: 'OK',
                message: 'Delete product success'
            })
        } catch (e) {
            reject(e)
        }
    })
}

/* =========================
   DELETE MANY PRODUCT
========================= */
const deleteManyProduct = (ids) => {
    return new Promise(async (resolve, reject) => {
        try {
            await Product.deleteMany({ _id: { $in: ids } })

            return resolve({
                status: 'OK',
                message: 'Delete product success'
            })
        } catch (e) {
            reject(e)
        }
    })
}

/* =========================
   GET DETAILS PRODUCT
========================= */
const getDetailsProduct = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const product = await Product.findById(id)
            if (!product) {
                return resolve({
                    status: 'ERR',
                    message: 'The product is not defined'
                })
            }

            return resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: product
            })
        } catch (e) {
            reject(e)
        }
    })
}

/* =========================
   GET ALL PRODUCT
========================= */
const getAllProduct = async (limit, page, sort, filter) => {
    try {
        const query = {}

        if (filter) {
            query.type = filter
        }

        let productQuery = Product.find(query)

        if (sort) {
            const [field, order] = sort.split(',')
            productQuery = productQuery.sort({
                [field]: order === 'asc' ? 1 : -1
            })
        } else {
            productQuery = productQuery.sort({ createdAt: -1 })
        }

        if (limit) {
            productQuery = productQuery
                .limit(limit)
                .skip(page * limit)
        }

        const products = await productQuery
        const total = await Product.countDocuments(query)

        return {
            status: 'OK',
            message: 'Success',
            data: products,
            total,
            pageCurrent: page + 1,
            totalPage: limit ? Math.ceil(total / limit) : 1
        }
    } catch (e) {
        console.log('❌ getAllProduct error:', e)
        throw e
    }
}

/* =========================
   GET ALL TYPE
========================= */
const getAllType = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allType = await Product.distinct('type')
            return resolve({
                status: 'OK',
                message: 'Success',
                data: allType
            })
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    createProduct,
    updateProduct,
    getDetailsProduct,
    deleteProduct,
    getAllProduct,
    deleteManyProduct,
    getAllType
}
