import express from 'express';
import { createAdmission, getAllAdmission } from '../controllers/createAdmission.js';
const router = express.Router();

router.post("/create", createAdmission)
router.get("/all", getAllAdmission)

export { router as admissionRoute };

