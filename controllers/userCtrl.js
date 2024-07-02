import asyncHandler from 'express-async-handler';
import { prisma } from "../config/prismaConfig.js";

export const createUser = asyncHandler(async (req, res) => {

  const { email } = req.body;

  console.log(req.body)
  const userExists = await prisma.user.findUnique({ where: { email } });

  if (!userExists) {
    // const { firstName, lastName, contact, role, bio, avatarUrl,  } = req.body;
    
    const newUser = await prisma.user.create({
      data: req.body,
    });
      
    return res.status(201).json({ success: true, message: 'User created', data: newUser });

  } else {
    res.status(409).json({ message: 'Email already registered' });
  }
});

export const users = asyncHandler(async (req, res) => {
     try {
       const users = await prisma.user.findMany();
       return res.status(200).send(users);
        
    } catch (err) {
        throw new Error(err.message);
    }
});

export const getUser = asyncHandler(async (req, res) => {
    const { email } = req.params
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


 // security layer: verifyJWT
    // email same
    // check admin
// export const getAdmin = asyncHandler(async (req, res) => {
//      try {
//        const email = req.params.email;
       
//       if (req.decoded.email !== email) {
//         res.send({ admin: false })
//       }

//       const query = { email: email }
//       const user = await prisma.user.findUnique({ where: query });
//       const result = { admin: user?.role === 'ADMIN' }
//       return res.status(200).send(result);
       
//     } catch (err) {
//         throw new Error(err.message);
//     }
// });
// export const getTeacher = asyncHandler(async (req, res) => {
//      try {
//        const email = req.params.email;
       
//       if (req.decoded.email !== email) {
//         res.send({ teacher: false })
//       }

//       const query = { email: email }
//       const user = await prisma.user.findUnique({ where: query });
//       const result = { teacher: user?.role === 'TEACHER' }
//       return res.status(200).send(result);
       
//     } catch (err) {
//         throw new Error(err.message);
//     }
// });

const getUserRole = asyncHandler(async (req, res, role) => {
  try {
    const email = req.params.email;

    if (req.decoded.email !== email) {
      res.send({ [role.toLowerCase()]: false });
    }

    const query = { email: email };
    const user = await prisma.user.findUnique({ where: query });
    const result = { [role.toLowerCase()]: user?.role === role };
    res.status(200).send(result);
  } catch (err) {
    throw new Error(err.message);
  }
});

export const getAdmin = asyncHandler(async (req, res) => {
  await getUserRole(req, res, 'ADMIN');
});

export const getTeacher = asyncHandler(async (req, res) => {
  await getUserRole(req, res, 'TEACHER');
});


const updateUserRole = asyncHandler(async (req, res, role) => {
  const id = req.params.id;

  const result = await prisma.user.update({
    where: { id: id },
    data: {
      role: role,
    },
  });

  res.status(201).json({ status: 'success', data: result });
});

export const makeAdmin = asyncHandler(async (req, res) => {
  await updateUserRole(req, res, 'ADMIN');
});

export const makeTeacher = asyncHandler(async (req, res) => {
  await updateUserRole(req, res, 'TEACHER');
});

export const userDelete = asyncHandler(async (req, res) => {
  const id = req.params.id;
  
  const deleteUser = await prisma.user.delete({
    where: {
      id: id,
    },
  })
  res.send({success:true,data:deleteUser});
  
})