import asyncHandler from 'express-async-handler';
import { prisma } from "../config/prismaConfig.js";


export const createCourse = asyncHandler(async (req, res) => {
    const { data } = req.body
    console.log(data);
     try {
         const newCourse = await prisma.course.create({ data });
        
         if (!newCourse) throw "Failed to add Course";
         return res.status(201).json({ message: `Successfully added ${data.value}`, data: newCourse });
         
    } catch (err) {
        console.log('Error in creating a new Course', err);
        if (err.code === "P2002") {
            throw new Error('Error in creating a new Course')
        }
        throw new Error(err.message);
    }
 });
// export const createCourse = asyncHandler(async (req, res) => {
//     const { data } = req.body;
//     try {
//         const newCourse = await prisma.course.create({ data });
        
//         if (!newCourse) {
//             throw new Error("Failed to add Course");
//         }
        
//         return res.status(201).json({ message: `Successfully added ${data.value}`, data: newCourse });
         
//     } catch (err) {
//         console.error('Error in creating a new Course', err);
        
//         if (err.code === "P2002") {
//             throw new Error('Error in creating a new Course');
//         }
        
//         throw new Error(err.message);
//     }
//  });

export const getAllCourses = asyncHandler(async (req, res) => {
    try {
        const courses = await prisma.course.findMany(
            {
                orderBy: {
                    createdAt: 'desc',
                },
                where: { status: true },
                select: {
                    id: true,
                    name: true,
                    value: true,
                    imageUrl: true
                },
            });
        return res.status(200).send(courses);
    } catch (err) {
        throw new Error(err.message);
    }
});

export const getCourse = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const course = await prisma.course.findUnique({ where: { id } });
        if (!course) {
            return res.status(404).json({ error: "No such course found" });
        }
        return res.status(200).json(course);
    } catch (error) {
        console.error("Error retrieving course:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});


export const deleteCourse = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const delRes = await prisma.course.delete({ where: { id } })
        res.status(203).json({ message: "Course delete successfully", delRes })
    } catch (error) {
        console.log(error.message);
    }
});

export const updateCourse = asyncHandler(async (req, res) => {
    const { id, newData } = req.body.data; // Assuming newData contains the fields to be updated
    try {
        // Check if the course with the given ID exists
        const existingCourse = await prisma.course.findUnique({ where: { id } });

        if (!existingCourse) {
            return res.status(404).json({ message: "No such Course found" });
        }

        // Update the existing course with the new data
        const updatedCourse = await prisma.course.update({
            where: { id },
            data: newData,
        });

        return res.status(200).json({ message: "Course updated successfully", data: updatedCourse });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: "Something went wrong in the update" });
    }
});
