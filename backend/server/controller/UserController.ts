import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import db from '../db'
import { MobizonResponse, sendSMS } from './../notification/mobizon'
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
  User,
  DriverInfo,
  removePropsFromUser,
  generateJwt,
} from './utils'

class UserController extends CrudController {
  constructor(tableName: string) {
    super(tableName)
  }
  registration = async (req: Request, res: Response) => {
    const { phone, password, verifyCode } = req.body

    const candidate: User = await getUserFromDbByPhone(phone)

    if (candidate) {
      const isVerified: boolean = candidate.verify_code === 'null'
      if (isVerified) {
        return res.json({
          message: 'User with this phone number already exist',
        })
      } else {
        if (verifyCode) {
          const codeForVerify = candidate.verify_code
          const isCodesEquel: boolean = codeForVerify === verifyCode

          if (isCodesEquel) {
            const hashPassword = await bcrypt.hash(password, 2)
            await db.query(
              getQueryForUpdate(
                { id: candidate.id, password: hashPassword, verify_code: null },
                'users'
              )
            )

            const token = generateJwt(candidate.id, phone)

            const user = removePropsFromUser({ ...candidate })
            return res.status(200).json({ token, user })
          } else {
            return res.status(400).json({ message: 'Wrong verify code.' })
          }
        }

        const noteServiceRes: MobizonResponse = await sendSMS(
          candidate.phone_number,
          `Softtaxi: your verify code ${candidate.verify_code}`
        )
        return res.status(401).json({
          message: 'You should verify your account',
          status: 'NOT_VERIFIED',
          verifyCode: noteServiceRes,
        })
      }
    } else {
      const verifyCode = generateVerifyCode()

      await db.query(
        getQueryForCreate(
          {
            phone_number: phone,
            verify_code: verifyCode,
          },
          'users'
        )
      )

      const noteServiceRes: MobizonResponse = await sendSMS(
        phone,
        `Softtaxi: your verify code ${verifyCode}`
      )

      return res.status(401).json({
        message: 'You should verify your account',
        status: 'NOT_VERIFIED',
        verifyCode: noteServiceRes,
      })
    }
  }

  login = async (req: Request, res: Response) => {
    const { phone, password } = req.body

    const query = getQueryWithFilter({ phone_number: phone }, 'users')
    const response = await db.query(query)
    let user: User = response.rows[0]

    if (!user) {
      return res
        .status(404)
        .json({ message: 'User not found', status: 'NOT_REGISTERED' })
    }

    const isVerified: boolean = user.verify_code === 'null'

    if (user && !isVerified) {
      return res.status(401).json({
        message: 'You should register in app first',
        status: 'NOT_VERIFIED',
      })
    }

    const comparePassword = await bcrypt.compare(password, user.password)

    if (!comparePassword) {
      return res.status(400).json({ message: 'Wrong password or phone' })
    }

    const driver: DriverInfo = await getDriverByFilter({ user_id: user.id })

    user = removePropsFromUser({ ...user })

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

    const userInDB: User = await getUserFromDbByPhone(phone)

    if (userInDB) {
      const isVerified: boolean = userInDB.verify_code === 'null'

      if (isVerified) {
        const driver: DriverInfo = await getDriverByFilter({
          user_id: userInDB.id,
        })

        if (driver) {
          return res.json({
            message: 'User with this phone number already registred as driver',
          })
        } else {
          const comparePassword = await bcrypt.compare(
            password,
            userInDB.password
          )
          if (!comparePassword) {
            return res.status(400).json({ message: 'Wrong password or phone' })
          }

          const driver = await createDriverInDB({
            car_type: carType,
            car_color: carColor,
            car_number: carNumber,
            car_model: carModel,
            user_id: userInDB.id,
            is_avaliable: false,
          })
          const user = removePropsFromUser({ ...userInDB })

          return res.json({
            user: { ...user, driverInfo: { ...driver } },
          })
        }
      } else {
        if (verifyCode) {
          const codeForVerify = userInDB.verify_code
          const isCodesEquel: boolean = codeForVerify === verifyCode

          if (isCodesEquel) {
            const hashPassword = await bcrypt.hash(password, 2)

            const response = await db.query(
              getQueryForUpdate(
                { id: userInDB.id, password: hashPassword, verify_code: null },
                'users'
              )
            )

            const token = generateJwt(userInDB.id, phone)
            const user = removePropsFromUser({ ...response.rows[0] })
            const driver: DriverInfo = await createDriverInDB({
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

        const noteServiceRes: MobizonResponse = await sendSMS(
          userInDB.phone_number,
          `Softtaxi: your verify code ${userInDB.verify_code}`
        )

        return res.status(401).json({
          message: 'You should verify your account',
          status: 'NOT_VERIFIED',
          verifyCode: noteServiceRes,
        })
      }
    } else {
      // const hashPassword = await bcrypt.hash(password, 2)
      const verifyCode = generateVerifyCode()

      await createUserInDB({
        phone_number: phone,
        name,
        email,
        verify_code: verifyCode,
      })

      const noteServiceRes: MobizonResponse = await sendSMS(
        phone,
        `Softtaxi: your verify code ${verifyCode}`
      )

      return res.status(401).json({
        message: 'You should verify your account',
        status: 'NOT_VERIFIED',
        verifyCode: noteServiceRes,
      })
    }
  }
}
export default new UserController('users')
