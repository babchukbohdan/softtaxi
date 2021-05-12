
\c перейти к базе
\conninfo показать адресс
\d показать таблицы
\d tableName показать таблицу
\dt tablename изменения в табл
\i import table from file .sql

CREATE TABLE
DROP TABLE

id BIGSERIAL NOT NULL PRIMARY KEY


=====SELECT=====

SELECT FROM tableName; return quantuty of rows
SELECT columnName, columnName2  from users; return all values in columnName

SELECT DISTINCT column (different values)
SELECT LIMIT 2 (limit for number of rows)

SELECT id AS "ID"

SELECT * from users ORDER BY rating; soreted list

ASC(from smallest) DESC()

SELECT * FROM users WHERE name LIKE "%ov"
SELECT * FROM users WHERE age BETWEEN 35 AND 45

SELECT UNION

{
  SELECT drivers.rating, users.name FROM drivers
  INNER JOIN users
  ON users.id = drivers.user_id
} => return 2 column where drivers.user_id = (users.name = users.id)

{
  SELECT car_type, COUNT(car_type) FROM requests GROUP BY(car_type);
} => return 2 column - car_type and count of each value

{
  SELECT drivers.car_color, drivers.car_model, drivers.car_number, drivers.is_avaliable, drivers.request_id, drivers.user_id,users.id, users.name, users.email, users.password, users.phone_number  FROM drivers
  INNER JOIN users
  ON users.id = drivers.user_id
  WHERE users.id = '19';
}





{
  SELECT drivers.car_color, drivers.car_model, drivers.car_number, drivers.rating, users.name, users.phone_number FROM drivers
  INNER JOIN users
  ON users.id = drivers.user_id
} => message for customer about driver

SELECT

==FUNCTION==
  - AVG
  - MAX
  - MIN
  - SUM
  - COUNT


====ALTER====
creqte new column

ALTER TABLE users ADD age INT
