const express = require('express');
const {Pool} = require('pg');
const path = require('path');
const pagesRouter = require('./routes/pages');
const app = express();

/*Conexão com o banco de dados*/ 
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  port: "5432",
  database: "postgres",
  password: "682435"
});

app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));
app.use('/', pagesRouter);

app.listen(3000);