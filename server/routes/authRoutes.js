import express from 'express';

const router = express.Router();

import authControllers from '../controllers/authControllers.js';

const {
    signUp
} = authControllers

router.route('/signup').post(signUp)

export default router