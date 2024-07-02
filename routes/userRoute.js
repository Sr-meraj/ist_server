import express from 'express';
import { createUser, getAdmin, getTeacher, makeAdmin, makeTeacher, userDelete, users } from '../controllers/userCtrl.js';
import { verifyJWT } from '../utilities/shared.js';
const router = express.Router();


router.get("/users", verifyJWT, users)
router.get("/admin/:email", verifyJWT, getAdmin)
router.get("/teacher/:email", verifyJWT, getTeacher)

router.post("/createUser", createUser)

router.patch('/admin/:id', verifyJWT, makeAdmin)
router.patch('/teacher/:id',verifyJWT, makeTeacher)

router.delete("/:id", userDelete)
    

export { router as userRoute };

