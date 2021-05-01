const db = require('../db')

const CreateController = require('./CreateController')

const utils = require('./Utils')

const {
  getQueryWithFilter,
  getQueryForCreate,
  getQueryForUpdate
} = utils

class UserController {
  async createUser(req, res) {
    const newPerson = await db.query(getQueryForCreate(req.body, 'users'))
    res.json(newPerson.rows[0])
  }
  async getUser(req, res) {
    const users = await db.query('SELECT * FROM users')
    res.json(users.rows)
  }
  async getOneUser(req, res) {
    const id = req.params.id
    const user = await db.query('SELECT * FROM users where id = $1', [id])
    res.json(user.rows[0])
  }
  async updateUser(req, res) {
    const user = await db.query(getQueryForUpdate(req.body, 'users'))

    res.json(user.rows[0])
  }
  async deleteUser(req, res) {
    const id = req.params.id
    const user = await db.query('DELETE FROM users where id = $1', [id])
    res.json(user)
  }
}

module.exports = new CreateController('users')
