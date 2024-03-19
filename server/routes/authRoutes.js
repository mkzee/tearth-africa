import express from 'express';

const router = express.Router();

import authControllers from '../controllers/authControllers.js';
import verifyToken from '../middlewares/authMiddleware.js'

const {
    signUp,
    login,
    getUserInfo,
    setUserInfo
} = authControllers



router.route('/signup').post(signUp);
router.route('/login').post(login);
router.route('/get-user-info').post(verifyToken, getUserInfo)
router.route('/set-user-info').post(verifyToken, setUserInfo)

export default router