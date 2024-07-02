import express from 'express';
import { createTeacher } from '../controllers/teacherCtrl.js';
const router = express.Router();

router.post("/createUser", createTeacher)



export { router as teacherRoute };
