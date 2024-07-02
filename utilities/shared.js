import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';


export const verifyJWT = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization) {
    return res.status(401).send({ error: true, message: 'unauthorized access' });
  }
  // bearer token
  const token = authorization.split(' ')[1];

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({ error: true, message: 'unauthorized access' })
    }
    req.decoded = decoded;
    next();
  })
}


    // Warning: use verifyJWT before using verifyAdmin
export const verifyAdmin = async (req, res, next) => {
      const email = req.decoded.email;
      const query = { email: email }
      const user = await prisma.user.findUnique({ where: query });
      if (user?.role !== 'admin') {
        return res.status(403).send({ error: true, message: 'forbidden message' });
      }
      next();
}
    

export const checkUserRole = (role) => asyncHandler(async (req, res, next) => {
  try {
    const email = req.params.email;

    if (req.decoded.email !== email) {
      res.send({ [role]: false });
    }

    const query = { email: email };
    const user = await prisma.user.findUnique({ where: query });
    const result = { [role]: user?.role === role };
    res.status(200).send(result);
  } catch (err) {
    next(new Error(err.message));
  }
});