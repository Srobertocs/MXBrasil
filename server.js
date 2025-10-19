const express = require('express');
const {Pool} = require('pg');
const path = require('path');
const pagesRouter = require('./routes/pages.js');
const app = express();

/*Conexão com o banco de dados*/ 
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  port: "5432",
  database: "postgres",
  password: "682435"
});
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

/*Chama todos os caminhos com / na página de rotas*/
app.use('/', pagesRouter);


app.listen(3000);