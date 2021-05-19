import db from '../db'

interface UserFromDb {
  id: string
  name: null | string
  email: null | string
  password?: null | string
  phone_number: string
  rating: null | string
  verify_code: null | string
}

export function randomInteger(min: number, max: number): number {
  const rand = min - 0.5 + Math.random() * (max - min + 1)
  return Math.round(rand)
}

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

export const getQueryWithSort = (query: string, prop: any): string => {
  return query + ` ORDER BY ${prop} DESC`
}

// add sort func
// add logger and linter

export const getQueryWithFilter = (
  filter: any,
  tableName: string,
  onlyCount?: boolean
): string => {
  let acc = `SELECT * FROM ${tableName} WHERE`
  if (onlyCount) {
    acc = `SELECT COUNT (*) FROM ${tableName} WHERE`
  }
  return Object.keys(filter).reduce((acc, key, i) => {
    let keyQuery
    let value = filter[key]
    if (Array.isArray(value)) {
      value = value.join("','")
    }

    if (!i) {
      keyQuery = ` ${key} IN ('${value}')`
    } else {
      keyQuery = ` AND ${key} IN ('${value}')`
    }
    return acc + keyQuery
  }, acc)
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

// export const getVerifyCodeFromDB = async (id: string) => {
//   const code = await getQueryWithFilter()
// }

export const generateVerifyCode = (): number => {
  return randomInteger(1000, 9999)
}

export const getUserFromDbByPhone = async (phone: string) => {
  const query = getQueryWithFilter({ phone_number: phone }, 'users')
  const userInDB = await db.query(query)
  const candidate: UserFromDb = userInDB.rows[0]
  return candidate
}

// export const getDriverByUserID = async (id: string) => {
//   const query = getQueryWithFilter({ user_id: id }, 'drivers')

//   const res = await db.query(query)

//   const driver = res.rows[0]

//   return driver
// }

export const getDriverByFilter = async (filter: any) => {
  const query = getQueryWithFilter(filter, 'drivers')

  const res = await db.query(query)
  const driver = res.rows[0]

  return driver
}
export const createUserInDB = async (body: any) => {
  const query = getQueryForCreate(body, 'users')
  const res = await db.query(query)
  const newUser = res.rows[0]

  return newUser
}
export const createDriverInDB = async (body: any) => {
  const query = getQueryForCreate(body, 'drivers')
  const res = await db.query(query)
  const newDriver = res.rows[0]

  return newDriver
}
