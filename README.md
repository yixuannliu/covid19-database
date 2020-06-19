# covid19-database
A simple Node+Express+PostgresSql project with COVID-19 database

## Setup
Create a local PostgresSQL database, keep the record of database name, your username and password, then replace the `server/config/config.json` as the following:
```
{
  "database": {
    "dbName": "sample database name",
    "master": {
      "host": "localhost",
      "user": "sample username ",
      "password": "sample password" // if there is no password, then leave this field as blank
    },
    "protocol": "postgres"
  }
}
```

Then install and run the app with the following scripts:

1. Only for initialize:
```
npm install
```
2. Run without reload:
```
npm start
```
3. With reload:
```
npm start dev
```

## Basic Features

### Entity Relationship Diagram

### CRUD Endpoints

### Calculation Endpoints
