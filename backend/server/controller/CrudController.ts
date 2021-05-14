import express, { Request, Response } from 'express'
import db from '../db'

import {
  getQueryWithLimitAndOffset,
  getQueryWithFilter,
  getQueryForCreate,
  getQueryForUpdate,
} from './utils'

// change name
export default class CrudController {
  tableName: string

  constructor(tableName: string) {
    this.tableName = tableName
  }

  create = async (req: Request, res: Response): Promise<any> => {
    try {
      const newValue = await db.query(
        getQueryForCreate(req.body, this.tableName)
      )

      res.json(newValue.rows[0])
    } catch (error) {
      res.json(error)
    }
  }
  get = async (req: Request, res: Response): Promise<any> => {
    const selectCount = `SELECT COUNT (*) FROM ${this.tableName}`
    const selectAll = `SELECT * FROM ${this.tableName}`
    let queryString, onlyCount
    const { filter, offset, limit, count } = req.query
    console.log(typeof count, 'count')
    if (count) {
      onlyCount = Boolean(+count)
    }
    console.log(onlyCount, 'onlyCount')

    console.log(req.query)

    if (filter) {
      queryString = getQueryWithFilter(filter, this.tableName, onlyCount)
    } else {
      queryString = `SELECT * FROM ${this.tableName}`
    }

    if (offset || limit) {
      queryString = getQueryWithLimitAndOffset(queryString, offset, limit)
    }
    console.log(queryString)

    const values = await db.query(queryString)
    res.json(values.rows)
  }

  getOne = async (req: Request, res: Response) => {
    try {
      const id = req.params.id
      const query = req.query
      const value = await db.query(
        `SELECT * FROM ${this.tableName} where id = $1`,
        [id]
      )
      res.json(value.rows)
    } catch (error) {
      res.json(error)
    }
  }
  update = async (req: Request, res: Response) => {
    const value = await db.query(getQueryForUpdate(req.body, this.tableName))

    res.json(value.rows[0])
  }
  delete = async (req: express.Request, res: Response) => {
    const id = req.params.id

    const value = await db.query(
      `DELETE FROM ${this.tableName} where id = $1`,
      [id]
    )
    res.json(value)
  }
}
