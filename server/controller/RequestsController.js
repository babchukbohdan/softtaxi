const db = require('../db')

const utils = require('./Utils')

const {
  getQueryWithFilter,
  getQueryForCreate,
  getQueryForUpdate
} = utils


class RequestsController {
  async createRequest(req, res) {
    try {
      const request = await db.query(getQueryForCreate(req.body, 'requests'))
      res.json(request.rows[0])
    } catch (error) {
      console.warn(error)
    }
  }

  async getRequests(req, res) {
    let requests
    const { filter } = req.query
    if (filter) {
      requests = await db.query(getQueryWithFilter(filter, 'requests'))
    } else {
      requests = await db.query('SELECT * FROM requests')
    }
    res.json(requests.rows)
  }

  async updateRequest(req, res) {
    const { body } = req
    const request = await db.query(getQueryForUpdate(body, 'requests'))
    res.json(request.rows[0])
  }
}

module.exports = new RequestsController()
