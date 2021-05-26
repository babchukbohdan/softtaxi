# Softtaxi - is an application that allows you to order a taxi and / or work as a driver.
## Before start app you should
### Install:
* [Postgresql](https://www.postgresql.org/download)
* [Node.js](https://nodejs.org/)
### Register in SMS notification service:
* [Mobizon](https://mobizon.ua)
  
### Create database in postgresql:

You can use postgresql shell.

* Connect to postgresql (you can press enter to init default values): 
```Shell Session
Server [localhost]:
Database [postgres]:
Port [5432]:
Username [postgres]:
Пароль пользователя postgres: <your password>
```
* Create database.

```Shell Session
postgres=# create database softtaxi;
```

* Connect to database.

```Shell Session
postgres=# \c softtaxi;
```
* Create tables.

```Shell Session
softtaxi=# \i path/to/.../project/postgresql/tables.sql;
```

* Check if tables created.
```Shell Session
softtaxi=# \dt;
```
Output should look like this:
| Schema | Name     | Type  | Owner    |
| ------ |:--------:| -----:| --------:|
| public | drivers  | table | postgres |
| public | requests | table | postgres |
| public | users    | table | postgres |
---
### Create .env file in backend folder:

```.properties
SERVER_PORT=8080 # server port
SECRET_KEY=LtACBRUK5n9cp1E3oafH # any string
DB_USER=postgres # postgres user name
DB_PASSWORD=123456 # postgres user password
DB_HOST=localhost # postgres host
DB_DATABASE=softtaxi # postgres database name
DB_PORT=5432 # postgres port
SMS_SERVICE_KEY=uaec5d896aa501b05bdcab39 # key in Mobizon API
SMS_SERVICE_URL=http://api.mobizon.ua/service/ # Mobizon URL
```
### Install dependencies:
Go to backend and frontend folders and type in terminal:
```Shell Session
$ npm install
```

### Start server in backend folder: 
```Shell Session
$ npm run dev
```
### Start server in frontend folder: 
```Shell Session
$ npm run start
```

If everything goes good you can see app on [http://localhost:4200](http://localhost:4200)
