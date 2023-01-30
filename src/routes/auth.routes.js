import { Router } from 'express'
import * as authController from '../controllers/auth.controller.js'
import { checkExistingUser, checkRolesExisted } from '../middlewares/index.js';

const router = Router();

router.post('/signup', [checkRolesExisted, checkExistingUser], authController.signUp)
router.post('/signin', [checkRolesExisted], authController.signIn)

export default router;