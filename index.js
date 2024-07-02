import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { admissionRoute } from './routes/admissionRoute.js';
import { courseRoute } from './routes/courseRoute.js';
import { JWTRoute } from './routes/JWTRoute.js';
import { noticeRoute } from './routes/noticeRoute.js';
import { userRoute } from './routes/userRoute.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(bodyParser.json());
app.use("/assets/files", express.static("assets/files"))


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.get('/', (req, res) => {
    return res.status(200).send( "Welcome to IST Server System" );
});


app.use("/api/j", JWTRoute)
app.use("/api/user", userRoute)
app.use("/api/course", courseRoute)
app.use("/api/notice", noticeRoute)
app.use("/api/admission", admissionRoute)