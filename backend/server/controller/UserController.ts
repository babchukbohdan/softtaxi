import { Request, Response } from 'express'
import db from '../db'
import bcrypt from 'bcrypt'
import jwt, { Secret } from 'jsonwebtoken'

import CrudController from './CrudController'
import {
  getQueryWithFilter,
  getQueryForCreate,
  getQueryForUpdate,
  getUserFromDbByPhone,
  getDriverByFilter,
  createDriverInDB,
  createUserInDB,
} from './utils'

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

    const candidate = await getUserFromDbByPhone(phone)
    console.log('candidate', candidate)

    if (candidate) {
      const isVerified = Boolean(candidate?.password)
      if (isVerified) {
        console.log('User exist in DB and verified')
        return res.json({
          message: 'User with this phone number already exist',
        })
      } else {
        console.log('User exist in DB but not verified')

        const hashPassword = await bcrypt.hash(password, 2)
        await db.query(
          getQueryForUpdate(
            { id: candidate.id, password: hashPassword },
            'users'
          )
        )

        const token = generateJwt(candidate.id, phone)

        const user = { ...candidate }
        delete user.password

        return res.json({ token, user })
      }
    }

    console.log("User don't exist in DB")

    const hashPassword = await bcrypt.hash(password, 2)
    const response = await db.query(
      getQueryForCreate(
        { phone_number: phone, password: hashPassword },
        'users'
      )
    )
    const user = { ...response.rows[0] }

    const token = generateJwt(user.id, phone)
    delete user.password
    return res.json({ user: { token, ...user } })
  }

  login = async (req: Request, res: Response) => {
    const { phone, password } = req.body

    const query = getQueryWithFilter({ phone_number: phone }, 'users')
    const response = await db.query(query)
    let user = response.rows[0]

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    if (user && !user.password) {
      return res.status(401).json({ message: 'You should verify your account' })
    }

    const comparePassword = await bcrypt.compare(password, user.password)

    if (!comparePassword) {
      return res.status(400).json({ message: 'Wrong password or phone' })
    }

    const driver = await getDriverByFilter({ user_id: user.id })
    console.log('isDriver', driver)

    user = { ...user }

    delete user.password

    if (driver) {
      user.driverInfo = driver
    }

    const token = generateJwt(user.id, user.phone_number)
    return res.status(200).json({ user: { token, ...user } })
  }

  registrationDriver = async (req: Request, res: Response) => {
    //  Check if user exist in db
    //  1 If exist =>  check if user registred
    //    2 If registred check if user already exist as driver
    //      2.1 If not exist as driver => create driver in driver table
    //      2.2 If exist return error message.

    //  2. If not exist create user in user table

    //  1.4 IF exist but not registred

    const { userInfo, driverInfo } = req.body
    const { carType, carColor, carNumber, carModel } = driverInfo
    const { phone, password, email, name } = userInfo

    const userInDB = await getUserFromDbByPhone(phone)

    if (userInDB) {
      const isVerified = Boolean(userInDB.password)

      if (isVerified) {
        console.log('User exist in DB and verified')

        const driver = await getDriverByFilter({ user_id: userInDB.id })

        if (driver) {
          return res.json({
            message: 'User with this phone number already registred as driver',
          })
        } else {
          const driver = await createDriverInDB({
            car_type: carType,
            car_color: carColor,
            car_number: carNumber,
            car_model: carModel,
            user_id: userInDB.id,
            is_avaliable: false,
          })
          const user = { ...userInDB }
          delete user.password
          return res.json({
            user: { ...user, driverInfo: { ...driver } },
          })
        }
      } else {
        // NOT VERIFIED
        const hashPassword = await bcrypt.hash(password, 2)
        const response = await db.query(
          getQueryForUpdate(
            { id: userInDB.id, password: hashPassword },
            'users'
          )
        )
        const user = { ...response.rows[0] }
        delete user.password
        const driver = await createDriverInDB({
          car_type: carType,
          car_color: carColor,
          car_number: carNumber,
          car_model: carModel,
          user_id: userInDB.id,
          is_avaliable: false,
        })
        return res.json({
          user: { ...user, driverInfo: { ...driver } },
        })
      }
    } else {
      const hashPassword = await bcrypt.hash(password, 2)
      const user = await createUserInDB({
        phone_number: phone,
        name,
        email,
        password: hashPassword,
      })
      const driver = await createDriverInDB({
        car_type: carType,
        car_color: carColor,
        car_number: carNumber,
        car_model: carModel,
        user_id: user.id,
        is_avaliable: false,
      })

      return res.json({ user: { ...user, driverInfo: { ...driver } } })
    }
  }
}
export default new UserController('users')
