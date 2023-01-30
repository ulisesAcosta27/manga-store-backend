import { Router } from 'express'
import * as seriesController from '../controllers/serie.controllers.js'
import { verifyToken, isAdmin, isModerator } from '../middlewares/index.js'
import fileUpload from 'express-fileupload'

const router = Router();

const uploadFileExpress = fileUpload({
  useTempFiles: true,
  tempFileDir: "./images",
})

router.post('/', [verifyToken, isModerator, uploadFileExpress], seriesController.createSerie)
router.get('/', seriesController.getAllSeries)
router.delete('/:idSerie', [verifyToken, isModerator], seriesController.deleteOneSerie)

export default router;