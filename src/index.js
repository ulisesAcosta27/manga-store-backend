import dotenv from 'dotenv'
import app from "./app.js";
import './database.js'
dotenv.config()

app.listen(process.env.PORT_SERVER);
console.log('Server listening')