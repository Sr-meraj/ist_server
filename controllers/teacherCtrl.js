import asyncHandler from 'express-async-handler';
import { prisma } from "../config/prismaConfig.js";

export const createTeacher = asyncHandler(async (req, res) => {

  const { email } = req.body;

  const teacherExists = await prisma.teacher.findUnique({ where: { email } });

  if (!teacherExists) {
    // const { firstName, lastName, contact, role, bio, avatarUrl,  } = req.body;
    
    const newTeacher = await prisma.teacher.create({
      data: req.body,
    });
      
    return res.status(201).json({ success: true, message: 'Teacher created', data: newTeacher });

  } else {
    res.status(409).json({ message: 'Email already registered' });
  }
});

