import asyncHandler from 'express-async-handler';
import { prisma } from '../config/prismaConfig.js';


export const createNotice = asyncHandler(async (req, res) => {
    try {
        const file = req.file.filename;
        const { title } = req.body;
        const data = {"title":title,"pdfUrl":file,"status":true}
        const newNotice = await prisma.notice.create({data});
        console.log(req.file);
        res.send(newNotice)
    } catch (error) {
        console.log(error);
        throw new Error("something wrong")
    }
});
export const getNotice = asyncHandler(async (req, res) => {
    const { id } = req.params
    console.log(id);
    try {
        const notice = await prisma.notice.findUnique({ where: { id } })
        if (!notice) throw new Error("No such notice found");
        return res.status(200).send(notice);
    } catch (error) {
        console.log(error.message);
        throw new Error('Something wrong in query')
    }
});
export const getAllNotice = asyncHandler(async (req, res) => {
     try {
        const notices = await prisma.notice.findMany(
            {
                orderBy: {
                    createdAt: 'desc',
                },
                where: { status: true },
                select: {
                    id: true,
                    title: true,
                    pdfUrl:true,
                    createdAt: true
                },
            });
        return res.status(200).send(notices);
    } catch (err) {
        throw new Error(err.message);
    }
});
export const deleteNotice = asyncHandler(async (req, res) => {
const { id } = req.params;
    try {
        const delRes = await prisma.notice.delete({ where: { id } })
        res.status(203).json({ message: "Notice delete successfully", delRes })
    } catch (error) {
        console.log(error.message);
    }
});
export const updateNotice = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const exists = await prisma.notice.findUnique({ where: { id } })
        if (!exists) {
            throw new Error("No such notice exists")
        }

        res.status(203).json({ message: "Notice update successfully",  })
    } catch (error) {
        console.log(error.message);
    }
});