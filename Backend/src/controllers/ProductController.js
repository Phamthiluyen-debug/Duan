const ProductService = require('../services/ProductService')
const Product = require('../models/ProductModel')

/* =========================
   CREATE PRODUCT
========================= */
const createProduct = async (req, res) => {
  try {
    const { name, image, type, price, discount } = req.body

    if (!name || !image || !type || price === undefined) {
      return res.status(400).json({
        status: 'ERR',
        message: 'Missing required fields',
      })
    }

    const newProduct = await Product.create({
      name,
      image,
      type,
      price,
      discount: discount || 0,
    })

    return res.status(201).json({
      status: 'OK',
      data: newProduct,
    })
  } catch (error) {
    return res.status(500).json({
      status: 'ERR',
      message: error.message,
    })
  }
}

/* =========================
   UPDATE PRODUCT
========================= */
const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id
    const data = req.body

    if (!productId) {
      return res.status(400).json({
        status: 'ERR',
        message: 'The productId is required',
      })
    }

    const response = await ProductService.updateProduct(productId, data)

    if (!response) {
      return res.status(404).json({
        status: 'ERR',
        message: 'Product not found',
      })
    }

    return res.status(200).json(response)
  } catch (e) {
    console.log('❌ Update product error:', e)
    return res.status(500).json({
      status: 'ERR',
      message: 'Update product failed',
    })
  }
}

/* =========================
   GET DETAILS
========================= */
const getDetailsProduct = async (req, res) => {
  try {
    const productId = req.params.id

    if (!productId) {
      return res.status(400).json({
        status: 'ERR',
        message: 'The productId is required',
      })
    }

    const response = await ProductService.getDetailsProduct(productId)

    if (!response) {
      return res.status(404).json({
        status: 'ERR',
        message: 'Product not found',
      })
    }

    return res.status(200).json(response)
  } catch (e) {
    return res.status(500).json({
      status: 'ERR',
      message: 'Get product details failed',
    })
  }
}

/* =========================
   DELETE PRODUCT
========================= */
const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id

    if (!productId) {
      return res.status(400).json({
        status: 'ERR',
        message: 'The productId is required',
      })
    }

    const response = await ProductService.deleteProduct(productId)

    if (!response) {
      return res.status(404).json({
        status: 'ERR',
        message: 'Product not found',
      })
    }

    return res.status(200).json(response)
  } catch (e) {
    return res.status(500).json({
      status: 'ERR',
      message: 'Delete product failed',
    })
  }
}

/* =========================
   DELETE MANY
========================= */
const deleteMany = async (req, res) => {
  try {
    const ids = req.body.ids

    if (!ids || !Array.isArray(ids)) {
      return res.status(400).json({
        status: 'ERR',
        message: 'The ids is required',
      })
    }

    const response = await ProductService.deleteManyProduct(ids)
    return res.status(200).json(response)
  } catch (e) {
    return res.status(500).json({
      status: 'ERR',
      message: 'Delete many product failed',
    })
  }
}

/* =========================
   GET ALL PRODUCT
========================= */
const getAllProduct = async (req, res) => {
  try {
    const { limit, page, sort, filter } = req.query

    const response = await ProductService.getAllProduct(
      Number(limit) || null,
      Number(page) || 0,
      sort,
      filter
    )

    return res.status(200).json(response)
  } catch (e) {
    console.log('❌ Controller error:', e)
    return res.status(500).json({
      status: 'ERR',
      message: 'Get all product failed',
    })
  }
}

/* =========================
   GET ALL TYPE
========================= */
const getAllType = async (req, res) => {
  try {
    const response = await ProductService.getAllType()
    return res.status(200).json(response)
  } catch (e) {
    return res.status(500).json({
      status: 'ERR',
      message: 'Get all type failed',
    })
  }
}

module.exports = {
  createProduct,
  updateProduct,
  getDetailsProduct,
  deleteProduct,
  getAllProduct,
  deleteMany,
  getAllType,
}


