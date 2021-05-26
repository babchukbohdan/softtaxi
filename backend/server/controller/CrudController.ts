import express, { Request, Response } from 'express'
import db from '../db'

import {
  getQueryWithLimitAndOffset,
  getQueryWithFilter,
  getQueryForCreate,
  getQueryForUpdate,
  getQueryWithSort,
} from './utils'

export default class CrudController {
  tableName: string

  constructor(tableName: string) {
    this.tableName = tableName
  }

  create = async (req: Request, res: Response): Promise<any> => {
    try {
      const dbResponse = await db.query(
        getQueryForCreate(req.body, this.tableName)
      )

      let newValue = dbResponse.rows[0]

      if ('password' in newValue) {
        newValue = { ...newValue }
        delete newValue.password
        delete newValue.verify_code
      }
      res.json(newValue)
    } catch (error) {
      res.json(error)
    }
  }
  get = async (req: Request, res: Response): Promise<any> => {
    let queryString, onlyCount
    const { filter, offset, limit, count, sort } = req.query
    if (count) {
      onlyCount = Boolean(+count)
    }

    if (filter) {
      queryString = getQueryWithFilter(filter, this.tableName, onlyCount)
    } else {
      queryString = `SELECT * FROM ${this.tableName}`
    }

    if (sort) {
      queryString = getQueryWithSort(queryString, sort)
    }

    if (offset || limit) {
      queryString = getQueryWithLimitAndOffset(queryString, offset, limit)
    }

    const values = await db.query(queryString)
    const isUser = !!values.rows[0]?.phone_number
    if (isUser) {
      const maped = values.rows.map((user) => {
        const clearUser = { ...user }
        delete clearUser.password
        delete clearUser.verify_code
        return clearUser
      })

      return res.json(maped)
    }

    return res.json(values.rows)
  }

  getOne = async (req: Request, res: Response): Promise<any> => {
    try {
      const id = req.params.id
      const value = await db.query(
        `SELECT * FROM ${this.tableName} where id = $1`,
        [id]
      )
      res.json(value.rows)
    } catch (error) {
      res.json(error)
    }
  }
  update = async (req: Request, res: Response): Promise<any> => {
    const value = await db.query(getQueryForUpdate(req.body, this.tableName))

    res.json(value.rows[0])
  }
  delete = async (req: express.Request, res: Response): Promise<any> => {
    const id = req.params.id

    const value = await db.query(
      `DELETE FROM ${this.tableName} where id = $1`,
      [id]
    )
    res.json(value)
  }
}
