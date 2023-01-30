import Serie from '../models/Series.js'
import { deleteImageSerie, uploadImageSerie } from '../utils/cloudinary.js'
import fs from 'fs-extra'

export const createSerie = async (req, res) => {
  const { name, title, descrtion } = req.body;
  const { imgUrl } = req.files

  try {
    const createSerie = new Serie({ name, title, descrtion })
    
    if (req.files?.imgUrl) {
      const result = await uploadImageSerie(imgUrl.tempFilePath)
      createSerie.imgUrl = {
        public_id: result.public_id,
        secure_url: result.secure_url
      }
      await fs.unlink(req.files.imgUrl.tempFilePath)
    }
    
    await createSerie.save()

    return res.json({
      status: 200,
      message: "successfully created product",
      scope: "controllers/products.controllers.js",
      id: createSerie._id
    })
  } catch (error) {
    console.log(error)
  }
}

export const getAllSeries = async (req, res) => {
  try {
    const allSeries = await Serie.find()
    return res.status(200).json(allSeries)
  } catch (error) {
    console.log(erro)
  }
}

export const deleteOneSerie = async (req, res) => {
  try {
    const { idSerie } = req.params
    const deleteProduct = await Serie.findOneAndDelete(idSerie)

    if (!deleteProduct) return res.status(400).json({ message: 'Product does not exist' })

    if (deleteImageSerie.imgUrl?.public_id) {
      await deleteImageSerie(deleteProduct.imgUrl.public_id)
    }

    return res.json({
      status: 200,
      message: "product successfully deleted",
      scope: "controllers/serie.controllers.js",
    })
  } catch (error) {
    
  }
}
