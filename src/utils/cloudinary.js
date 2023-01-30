import { v2 as cloudinary } from 'cloudinary'
import config from '../config.js'

cloudinary.config({
  cloud_name: config.CLOUDINARY_CLOUD_NAME,
  api_key: config.CLOUDINARY_API_KEY,
  api_secret: config.CLOUDINARY_API_SECRET,
  secure: true
})

export async function uploadImage(filePath) {
  return await cloudinary.uploader.upload(filePath, {
    folder: 'replit'
  })
}

export async function deleteImage(publicId) {
  return await cloudinary.uploader.destroy(publicId)
}

export async function uploadImageSerie(filePath) {
  return await cloudinary.uploader.upload(filePath, {
    folder: 'serie'
  })
}

export async function deleteImageSerie(publicId) {
  return await cloudinary.uploader.destroy(publicId)
}