const db = require('../db')

const utils = require('./Utils')

const {
  getQueryWithFilter,
  getQueryForCreate,
  getQueryForUpdate
} = utils

class DriverController {
  async createDriver(req, res) {
    try {
      const driver = await db.query(getQueryForCreate(req.body, 'drivers'))
      res.json(driver.rows[0])
    } catch (error) {
      console.warn(error)
    }
  }

  async getDrivers(req, res) {
    let drivers
    const { filter } = req.query
    if (filter) {
      drivers = await db.query(getQueryWithFilter(filter, 'drivers'))
    } else {
      drivers = await db.query('SELECT * FROM drivers')
    }
    res.json(drivers.rows)
  }

  async updateDriver(req, res) {
    const { body } = req
    const driver = await db.query(getQueryForUpdate(body, 'drivers'))
    res.json(driver.rows[0])
  }
}

module.exports = new DriverController()
