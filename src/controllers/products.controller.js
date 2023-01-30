import Products from '../models/Products.js'
import { deleteImage, uploadImage } from '../utils/cloudinary.js'
import fs from 'fs-extra'

export const createProduct = async (req, res) => {
  const { name, category, price, inStock, description, tags, author, seller } = req.body
  const { imgUrl } = req.files
  const newProduct = new Products({ 
    name, 
    category, 
    price, 
    inStock, 
    slug: Products.toSlug(name), 
    description, 
    tags, 
    author, 
    seller 
  })

  if (req.files?.imgUrl) {
    const result = await uploadImage(imgUrl.tempFilePath)
    newProduct.imgUrl = {
      public_id: result.public_id,
      secure_url: result.secure_url
    }
    await fs.unlink(req.files.imgUrl.tempFilePath)
  }

  const productSaved = await newProduct.save()
  return res.json({
    status: 200,
    message: "successfully created product",
    scope: "controllers/products.controllers.js",
    id: productSaved._id
  })
}

export const getProduct = async (req, res) => {
  const products = await Products.find()
  return res.status(200).json(products)
}

export const getProductById = async (req, res) => {
  const { productId } = req.params
  const products = await Products.findById(productId)
  return res.status(200).json(products)
};

export const getFirstFiveProducts = async (req, res) => {
  try {
    const products = await Products.find({}).limit(5).sort()
    return res.status(200).json(products)
  } catch (error) {
    console.log(error)
  }
}  

export const getProductByCategory = async (req, res) => {
  try {
    const { filters } = req.params
    const filterProducts = await Products.find({ category: filters })
    return res.status(200).json(filterProducts)
  } catch (error) {
    console.log(error)
  }
 
}

export const updateProductById = async (req, res) => {
  const { productId } = req.params
  const updateProduct = await Products.findByIdAndUpdate(productId, req.body, { new: true })
  return res.json({
    status: 201,
    message: "product successfully updated",
    scope: "controllers/products.controllers.js",
  })
};

export const deleteProductById = async (req, res) => {
  const { productId } = req.params
  const deleteProduct = await Products.findByIdAndDelete(productId)

  if (!deleteProduct) return res.status(400).json({ message: 'Product does not exist' })

  if (deleteImage.imgUrl?.public_id) {
    await deleteImage(deleteProduct.imgUrl.public_id)
  }
  return res.json({
    status: 200,
    message: "product successfully deleted",
    scope: "controllers/products.controllers.js",
  })
}