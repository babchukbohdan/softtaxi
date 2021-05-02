const db = require('../db')
const utils = require('./Utils')

const {
  getQueryWithFilter,
  getQueryForCreate,
  getQueryForUpdate
} = utils

class CreateController {

  constructor(tableName) {
    this.tableName = tableName
  }

  create = async (req, res) => {
    const newValue = await db.query(getQueryForCreate(req.body, this.tableName))
    res.json(newValue.rows[0])
  }
  get = async (req, res) => {
    let values
    const { filter } = req.query
    if (filter) {
      values = await db.query(getQueryWithFilter(filter, this.tableName))
    } else {
      values = await db.query(`SELECT * FROM ${this.tableName}`)
    }
    res.json(values.rows)
  }
  getOne = async (req, res) => {
    const id = req.params.id
    const value = await db.query(`SELECT * FROM ${this.tableName} where id = $1`, [id])
    res.json(value.rows[0])
  }
  update = async (req, res) => {
    console.log(this)
    const value = await db.query(getQueryForUpdate(req.body, this.tableName))

    res.json(value.rows[0])
  }
  delete = async (req, res) => {
    const id = req.params.id
    const value = await db.query(`DELETE FROM ${this.name} where id = $1`, [id])
    res.json(value)
  }
}

module.exports = CreateController
