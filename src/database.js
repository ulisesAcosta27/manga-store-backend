import dotenv from 'dotenv'
import mongoose from 'mongoose'
dotenv.config()

const opciones = {
  user: process.env.MONGODB_USER,
  pass: process.env.MONGODB_PASSWORD,
  useNewUrlParser: true,
  useUnifiedTopology: true
};

mongoose.connect(process.env.MONGODB_URI, opciones)
  .then(db => console.log('Db is connected'))
  .catch(error => console.log(error))