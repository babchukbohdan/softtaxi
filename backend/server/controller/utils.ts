export const getQueryWithLimitAndOffset = (
  query: string,
  offset?: any,
  limit?: any
): string => {
  if (limit) {
    query += ` LIMIT ${limit}`
  }
  if (offset) {
    query += ` OFFSET ${offset}`
  }
  return query
}

export const getQueryWithSort = (query: string, prop: string): string => {
  return (query += ` ORDER BY ${prop}`)
}

// add sort func
// add logger and linter

export const getQueryWithFilter = (filter: any, tableName: string): string => {
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

export const getQueryForCreate = (body: any, tableName: string): string => {
  const columns = Object.keys(body).join(', ')
  const values = Object.values(body)
    .map((val) => `'${val}'`)
    .join(', ')
  return `INSERT INTO ${tableName} (${columns}) VALUES (${values}) RETURNING *`
}

export const getQueryForUpdate = (body: any, tableName: string): string => {
  const columns = { ...body }
  delete columns.id
  const { id } = body

  const newValues = Object.entries(columns)
    .map((data) => `${data[0]} = '${data[1]}'`)
    .join(', ')
  return `UPDATE ${tableName} set ${newValues} WHERE id = ${id} RETURNING *`
}
