import { Schema, model } from 'mongoose'

const productSchema = new Schema({
  name: String,
  category: String,
  price: Number,
  inStock: Number,
  slug: String,
  description: String,
  author: String,
  seller: String,
  tags: [{ type: String }],
  imgUrl: {
    public_id: String,
    secure_url: String
  }
}, {
  timestamps: true,
  versionKey: false
})


productSchema.statics.toSlug = (reqSlug) => {
  return reqSlug.replace(/\s/g, '_').toLowerCase();
}

export default model('Product', productSchema)