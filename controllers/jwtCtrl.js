import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';

export const JWTCtrl = asyncHandler(async (req, res) => {
    const user = req.body;
    const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' })

    res.send({ token })
});
