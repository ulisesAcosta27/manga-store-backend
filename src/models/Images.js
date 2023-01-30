import { Schema, model } from 'mongoose'

const imageSchema = new Schema({
  public_id: {
    type: String,
    unique: true
  },
  secure_url: {
    type: String,
    unique: true
  } 
}, { 
  timestamps: true, 
  versionKey: false 
})

export default model('Image', imageSchema)