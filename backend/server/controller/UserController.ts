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
  generateVerifyCode,
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
    const { phone, password, verifyCode } = req.body

    const candidate = await getUserFromDbByPhone(phone)

    if (candidate) {
      // BUG: equel to string 'null' because i wrap all values in single quotes
      const isVerified = candidate.verify_code === 'null'
      if (isVerified) {
        console.log('User exist in DB and verified')
        return res.json({
          message: 'User with this phone number already exist',
        })
      } else {
        // Not verified user
        if (verifyCode) {
          const codeForVerify = candidate.verify_code
          const isCodesEquel = codeForVerify === verifyCode

          if (isCodesEquel) {
            const hashPassword = await bcrypt.hash(password, 2)
            await db.query(
              getQueryForUpdate(
                { id: candidate.id, password: hashPassword, verify_code: null },
                'users'
              )
            )

            const token = generateJwt(candidate.id, phone)

            const user = { ...candidate }
            delete user.password

            return res.status(200).json({ token, user })
          } else {
            return res.status(400).json({ message: 'Wrong verify code' })
          }
        }
        console.log('User exist in DB but not verified')

        return res.status(401).json({
          message: 'You should verify your account',
          status: 'NOT_VERIFIED',
          verifyCode: candidate.verify_code,
        })

        // const hashPassword = await bcrypt.hash(password, 2)
        // await db.query(
        //   getQueryForUpdate(
        //     { id: candidate.id, password: hashPassword },
        //     'users'
        //   )
        // )

        // const token = generateJwt(candidate.id, phone)

        // const user = { ...candidate }
        // delete user.password

        // return res.json({ token, user })
      }
    } else {
      console.log("User don't exist in DB")

      // const hashPassword = await bcrypt.hash(password, 2)
      const verifyCode = generateVerifyCode()

      const response = await db.query(
        getQueryForCreate(
          {
            phone_number: phone,
            // password: hashPassword,
            verify_code: verifyCode,
          },
          'users'
        )
      )
      // const user = { ...response.rows[0] }

      // const token = generateJwt(user.id, phone)
      // delete user.password
      // return res.json({ user: { token, ...user } })

      return res.status(401).json({
        message: 'You should verify your account',
        status: 'NOT_VERIFIED',
        verifyCode,
      })
    }
  }

  login = async (req: Request, res: Response) => {
    const { phone, password } = req.body
    console.log('body in login', req.body)

    const query = getQueryWithFilter({ phone_number: phone }, 'users')
    const response = await db.query(query)
    let user = response.rows[0]

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    const isVerified = user.verify_code === 'null'

    if (user && !isVerified) {
      return res.status(401).json({
        message: 'You should register in app first',
        status: 'NOT_VERIFIED',
      })
      // return code for registration
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
    const { userInfo, driverInfo } = req.body
    const { carType, carColor, carNumber, carModel } = driverInfo
    const { phone, password, email, name, verifyCode } = userInfo

    const userInDB = await getUserFromDbByPhone(phone)

    if (userInDB) {
      const isVerified = userInDB.verify_code === 'null'

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

        if (verifyCode) {
          const codeForVerify = userInDB.verify_code
          const isCodesEquel = codeForVerify === verifyCode

          if (isCodesEquel) {
            const hashPassword = await bcrypt.hash(password, 2)

            const response = await db.query(
              getQueryForUpdate(
                { id: userInDB.id, password: hashPassword, verify_code: null },
                'users'
              )
            )

            const token = generateJwt(userInDB.id, phone)
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
              user: { ...user, token, driverInfo: { ...driver } },
            })
          } else {
            return res.status(400).json({ message: 'Wrong verify code' })
          }
        }
        return res.status(401).json({
          message: 'You should verify your account',
          status: 'NOT_VERIFIED',
          verifyCode: userInDB.verify_code,
        })
      }
    } else {
      // const hashPassword = await bcrypt.hash(password, 2)
      const verifyCode = generateVerifyCode()

      const user = await createUserInDB({
        phone_number: phone,
        name,
        email,
        verify_code: verifyCode,
      })
      // const driver = await createDriverInDB({
      //   car_type: carType,
      //   car_color: carColor,
      //   car_number: carNumber,
      //   car_model: carModel,
      //   user_id: user.id,
      //   is_avaliable: false,
      // })

      // return res.json({ user: { ...user, driverInfo: { ...driver } } })

      return res.status(401).json({
        message: 'You should verify your account',
        status: 'NOT_VERIFIED',
        verifyCode,
      })
    }
  }
}
export default new UserController('users')
