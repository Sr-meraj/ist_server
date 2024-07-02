import express from 'express';
import { JWTCtrl } from '../controllers/jwtCtrl.js';
const router = express.Router();


router.post('/jwt', JWTCtrl)


export { router as JWTRoute };

