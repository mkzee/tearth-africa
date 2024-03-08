import express from 'express';

const router = express.Router();

import authControllers from '../controllers/authControllers.js';

const {
    signUp,
    login
} = authControllers

router.route('/signup').post(signUp);
router.route('/login').post(login);

export default router