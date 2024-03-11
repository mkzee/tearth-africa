import express from 'express';

const router = express.Router();

import authControllers from '../controllers/authControllers.js';
import verifyToken from '../middlewares/authMiddleware.js'

const {
    signUp,
    login,
    getUserInfo
} = authControllers



router.route('/signup').post(signUp);
router.route('/login').post(login);
router.route('/get-user-info').post(verifyToken, getUserInfo)

export default router