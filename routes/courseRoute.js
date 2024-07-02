import express from 'express';
import { createCourse, deleteCourse, getAllCourses, getCourse } from '../controllers/courseCtrl.js';
const router = express.Router();

router.get("/all", getAllCourses)
router.get("/:id", getCourse)
router.post("/create", createCourse)
router.delete("/:id", deleteCourse)

export { router as courseRoute };

