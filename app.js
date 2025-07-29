const express = require('express')
const mysql = require('mysql');
const app = express()
const path = require('path')
require('dotenv').config();

// Import Middleware
const logger = require('./middleware/logger')
app.use(logger)
const connection = require('./middleware/db_connect');

// Dashboard
app.use('/', express.static(path.join(__dirname, 'public')));

app.get('/app1', (req, res) =>
{
  res.send('Hello this Apps 1!')
});

app.get('/app2', (req, res) =>
{
  res.send('Hello this App 2!')
});

app.get('/users', (req, res, next) =>
{
  connection.query("SELECT * FROM tb_data ORDER BY id desc", (error, fields) =>
  {
    if (!error) {
      return res.send(fields);
    }

    return res.send('error : ' + error);
  })
});

app.listen(process.env.APP_PORT, () =>
{
  console.log(`Example app listening on port ${process.env.APP_PORT}`)
})

module.exports = app