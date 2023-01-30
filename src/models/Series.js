import { model, Schema } from 'mongoose'

const seriesSchema = new Schema({
  name: String,
  title: String,
  imgUrl: {
    public_id: String,
    secure_url: String
  },
  descrtion: String
})

export default model('Serie', seriesSchema)