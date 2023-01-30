import Express from "express";
import morgan from "morgan";
// import pkg from "../package.json";
import productsRoutes from './routes/products.routes.js'
import authRoutes from './routes/auth.routes.js'
import userRoutes from './routes/user.routes.js'
import serieRoutes from './routes/serie.routes.js'
import { createRoles } from './libs/initialSetup.js'
import cors from 'cors'

const app = Express();
createRoles()

// app.set("pkg", pkg);

app.use(Express.json())
app.use(morgan("dev"));
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));

// app.get("/", (req, res) => {
//   res.json({
//     author: app.get("pkg").name,
//     description: app.get("pkg").description,
//     version: app.get("pkg").version,
//   });
// });

app.use('/api/v1/products', productsRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/series', serieRoutes);

export default app;
