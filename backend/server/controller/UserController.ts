import { Request, Response } from 'express'
import db from '../db'
import bcrypt from 'bcrypt'
import jwt, { Secret } from 'jsonwebtoken'

import CrudController from './CrudController'
import { getQueryWithFilter, getQueryForCreate } from './utils'

const secret: Secret = process.env.SECRET_KEY!

const generateJwt = (id: string, phone: string) => {
  return jwt.sign({ id, phone }, secret, { expiresIn: '24h' })
}

class UserController extends CrudController {
  constructor(tableName: string) {
    super(tableName)
  }
  registration = async (req: Request, res: Response) => {
    const { phone, password } = req.body
    const query = getQueryWithFilter({ phone_number: phone }, 'users')
    const candidate = await db.query(query)

    if (candidate.rows.length) {
      return res.json({ message: 'User with this phone number already exist' })
    }

    const hashPassword = await bcrypt.hash(password, 2)
    const response = await db.query(
      getQueryForCreate(
        { phone_number: phone, password: hashPassword },
        'users'
      )
    )
    const user = response.rows[0]

    const token = generateJwt(user.id, phone)
    res.json({ token, user })
  }

  login = async (req: Request, res: Response) => {
    const { phone, password } = req.body

    const query = getQueryWithFilter({ phone_number: phone }, 'users')
    const response = await db.query(query)
    const user = response.rows[0]

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    const comparePassword = await bcrypt.compare(password, user.password)

    if (!comparePassword) {
      return res.status(400).json({ message: 'Wrong password or phone' })
    }

    const token = generateJwt(user.id, user.phone_number)
    return res.status(200).json({ token, user })
  }
}
export default new UserController('users')
