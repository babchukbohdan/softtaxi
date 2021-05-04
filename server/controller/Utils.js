const getQueryWithLimitAndOffset = (query, offset = null, limit = null) => {
  if (limit) {
    query += ` LIMIT ${limit}`
  }
  if (offset) {
    query += ` OFFSET ${offset}`
  }
  return query
}


const getQueryWithFilter = (filter, tableName) => {
  return Object.keys(filter).reduce((acc, key, i) => {
    let keyQuery
    if (!i) {
      keyQuery = ` ${key} IN ('${filter[key]}')`
    } else {
      keyQuery = ` AND ${key} IN ('${filter[key]}')`
    }
    return acc + keyQuery
  }, `SELECT * FROM ${tableName} WHERE`)
}

const getQueryForCreate = (body, tableName) => {
  const columns = Object.keys(body).join(', ')
  const values = Object.values(body).map(val => `'${val}'`).join(', ')
  return `INSERT INTO ${tableName} (${columns}) VALUES (${values}) RETURNING *`
}

const getQueryForUpdate = (body, tableName) => {
  const columns = { ...body }
  delete columns.id
  const { id } = body

  const newValues = Object.entries(columns).map(data => `${data[0]} = '${data[1]}'`).join(', ')
  return `UPDATE ${tableName} set ${newValues} WHERE id = ${id} RETURNING *`
}

module.exports.getQueryWithFilter = getQueryWithFilter
module.exports.getQueryForCreate = getQueryForCreate
module.exports.getQueryForUpdate = getQueryForUpdate
module.exports.getQueryWithLimitAndOffset = getQueryWithLimitAndOffset
