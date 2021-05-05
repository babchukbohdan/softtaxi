module.exports.getQueryWithLimitAndOffset = (query, offset = null, limit = null) => {
  if (limit) {
    query += ` LIMIT ${limit}`
  }
  if (offset) {
    query += ` OFFSET ${offset}`
  }
  return query
}

module.exports.getQueryWithSort = (query, prop) => {
  return query += ` ORDER BY ${prop}`
}

// add sort func
// add logger and linter


module.exports.getQueryWithFilter = (filter, tableName) => {
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

module.exports.getQueryForCreate = (body, tableName) => {
  const columns = Object.keys(body).join(', ')
  const values = Object.values(body).map(val => `'${val}'`).join(', ')
  return `INSERT INTO ${tableName} (${columns}) VALUES (${values}) RETURNING *`
}

module.exports.getQueryForUpdate = (body, tableName) => {
  const columns = { ...body }
  delete columns.id
  const { id } = body

  const newValues = Object.entries(columns).map(data => `${data[0]} = '${data[1]}'`).join(', ')
  return `UPDATE ${tableName} set ${newValues} WHERE id = ${id} RETURNING *`
}
