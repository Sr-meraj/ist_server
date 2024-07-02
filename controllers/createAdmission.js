import asyncHandler from 'express-async-handler';
import { prisma } from "../config/prismaConfig.js";


export const createAdmission = asyncHandler(async (req, res) => {
    const data  = req.body
     try {
         const newAdmission = await prisma.admission.create({ data });
        
         if (!newAdmission) throw "Failed to add Admission";
         return res.status(200).json({ message: `Successfully added ${data.value}`, data: newAdmission });
         
    } catch (err) {
        console.log('Error in creating a new Admission', err);
        if (err.code === "P2002") {
            throw new Error('Error in creating a new Admission')
        }
        throw new Error(err.message);
    }
});
 
export const getAllAdmission = asyncHandler(async (req, res) => {
    try {
        const admission = await prisma.admission.findMany();
        return res.status(200).send(admission);
    } catch (err) {
        throw new Error(err.message);
    }
});