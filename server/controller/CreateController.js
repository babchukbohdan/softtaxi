const db = require('../db')
const utils = require('./utils')

const {
  getQueryWithLimitAndOffset,
  getQueryWithFilter,
  getQueryForCreate,
  getQueryForUpdate
} = utils



class CreateController {

  constructor(tableName) {
    this.tableName = tableName
  }

  create = async (req, res) => {
    try {
      const newValue = await db.query(getQueryForCreate(req.body, this.tableName))
      console.log(getQueryForCreate(req.body, this.tableName))
      res.json(newValue.rows[0])
    } catch (error) {
      res.json(error)
    }
  }
  get = async (req, res) => {
    let values, queryString
    const { filter, offset, limit } = req.query
    // console.log(req.user);

    if (filter) {
      queryString = getQueryWithFilter(filter, this.tableName)
    } else {
      queryString = `SELECT * FROM ${this.tableName}`
    }

    if (offset || limit) {
      queryString = getQueryWithLimitAndOffset(queryString, offset, limit)
    }

    console.log(queryString)
    values = await db.query(queryString)
    res.json(values.rows)
  }


  getOne = async (req, res) => {
    try {
      const id = req.params.id
      const query = req.query
      console.log(query);
      console.log(req.params, ' req.params');
      const value = await db.query(`SELECT * FROM ${this.tableName} where id = $1`, [id])
      res.json(value.rows)
      console.log(`SELECT * FROM ${this.tableName} where id = ${id}`)

    } catch (error) {
      res.json(error)
    }
  }
  update = async (req, res) => {
    const value = await db.query(getQueryForUpdate(req.body, this.tableName))
    console.log(getQueryForUpdate(req.body, this.tableName),)

    res.json(value.rows[0])
  }
  delete = async (req, res) => {
    const id = req.params.id

    console.log(`DELETE FROM ${this.tableName} where id = ${id}`)
    const value = await db.query(`DELETE FROM ${this.tableName} where id = $1`, [id])
    res.json(value)
  }
}

module.exports = CreateController
