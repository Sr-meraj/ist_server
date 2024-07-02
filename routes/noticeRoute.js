
import express from 'express';
import fs from 'fs';
import multer from "multer";
import { createNotice, deleteNotice, getAllNotice, getNotice, updateNotice } from '../controllers/noticeCtrl.js';

const router = express.Router();



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const destinationPath = './assets/files';

        // Check if the directory exists, create it if not
        if (!fs.existsSync(destinationPath)) {
            fs.mkdirSync(destinationPath, { recursive: true });
        }

        cb(null, destinationPath);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now();
        cb(null,  uniqueSuffix + '-' + file.originalname )
    }
});


const upload = multer({ storage: storage })


router.get("/all", getAllNotice)
router.get("/:id", getNotice)
router.post("/create", upload.single('file'), createNotice)
router.delete("/:id", deleteNotice)
router.put("/:id", updateNotice)

export { router as noticeRoute };

