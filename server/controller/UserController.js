const db = require('../db')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const CreateController = require('./CreateController')
const { getQueryWithFilter } = require('./utils')

const generateJwt = (id, phone) => {
  return jwt.sign(
    { id, phone },
    process.env.SECRET_KEY,
    { expiresIn: '24h' }
  )
}

class UserController extends CreateController {
  constructor(tableName) {
    super(tableName)
  }
  registration = async (req, res, next) => {
    const { phone, password } = req.body;
    const query = getQueryWithFilter({ phone_number: phone }, 'users')
    const candidate = await db.query(query)

    console.log(`candidate`, candidate.rows)
    if (candidate.rows.length) {
      return res.json({ message: 'User with this phone number already exist' })
    }

    const hashPassword = await bcrypt.hash(password, 2)
    const response = await db.query(getQueryForCreate({ phone_number: phone, password: hashPassword }, 'users'))
    const user = response.rows[0]

    const token = generateJwt({ id: user.id, phone })
    res.json({ token })
  }

  login = async (req, res, next) => {
    const { phone, password } = req.body;

    const query = getQueryWithFilter({ phone_number: phone }, 'users')
    const response = await db.query(query)
    const user = response.rows[0]

    if (!user) {
      return res.json({ message: 'User not found' })
    }

    let comparePassword = await bcrypt.compare(password, user.password)

    if (!comparePassword) {
      return res.json({ message: 'Wrong password or phone' })
    }

    const token = generateJwt(user.id, user.phone_number)
    return res.json({ token })
  }
}
module.exports = new UserController('users')
