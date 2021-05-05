const db = require('../db')
const utils = require('./utils')

const {
  getQueryWithLimitAndOffset,
  getQueryWithFilter,
  getQueryForCreate,
  getQueryForUpdate
} = utils


// change name
class CrudController {

  constructor(tableName) {
    this.tableName = tableName
  }

  create = async (req, res) => {
    try {
      const newValue = await db.query(getQueryForCreate(req.body, this.tableName))
      res.json(newValue.rows[0])
    } catch (error) {
      res.json(error)
    }
  }
  get = async (req, res) => {
    let values, queryString
    const { filter, offset, limit } = req.query

    if (filter) {
      queryString = getQueryWithFilter(filter, this.tableName)
    } else {
      queryString = `SELECT * FROM ${this.tableName}`
    }

    if (offset || limit) {
      queryString = getQueryWithLimitAndOffset(queryString, offset, limit)
    }

    values = await db.query(queryString)
    res.json(values.rows)
  }


  getOne = async (req, res) => {
    try {
      const id = req.params.id
      const query = req.query
      const value = await db.query(`SELECT * FROM ${this.tableName} where id = $1`, [id])
      res.json(value.rows)

    } catch (error) {
      res.json(error)
    }
  }
  update = async (req, res) => {
    const value = await db.query(getQueryForUpdate(req.body, this.tableName))

    res.json(value.rows[0])
  }
  delete = async (req, res) => {
    const id = req.params.id

    const value = await db.query(`DELETE FROM ${this.tableName} where id = $1`, [id])
    res.json(value)
  }
}

module.exports = CrudController
