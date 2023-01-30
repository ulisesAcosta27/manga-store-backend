import { Router } from 'express'
import * as productControllers from '../controllers/products.controller.js'
import { verifyToken, isAdmin, isModerator } from '../middlewares/index.js'
import fileUpload from 'express-fileupload'

const router = Router();

const uploadFileExpress = fileUpload({
  useTempFiles: true,
  tempFileDir: "./uploads",
})

router.get('/', productControllers.getProduct)
router.post('/', [verifyToken, isModerator, uploadFileExpress], productControllers.createProduct)
router.get('/fiveProducts', productControllers.getFirstFiveProducts)
router.get('/:productId', productControllers.getProductById)
router.get('/category/:filters', productControllers.getProductByCategory)
router.put("/:productId", [verifyToken, isAdmin], productControllers.updateProductById);
router.delete("/:productId", [verifyToken, isModerator], productControllers.deleteProductById);


export default router;