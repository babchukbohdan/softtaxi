import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

const authMiddleware = (req: any, res: Response, next: NextFunction) => {
  if (req.method === 'OPTIONS') {
    next()
  }

  try {
    const token: string = req.headers.authorization!.split(' ')[1]

    if (!token) {
      return res.status(401).json({ message: 'Not authorized' })
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY!)
    req.user = decoded
    next()
  } catch (error) {
    res.status(403).json({ message: 'Not authorized' })
  }
}
export default authMiddleware
