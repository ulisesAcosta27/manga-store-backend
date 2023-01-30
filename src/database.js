import mongoose from 'mongoose'

const mongoURI = "mongodb+srv://manga-store:54SuZCSSy26V3iim@cluster0.r7jyr.mongodb.net/?retryWrites=true&w=majority"

mongoose.connect(mongoURI)
  .then(db => console.log('Db is connected'))
  .catch(error => console.log(error))