const express = require('express');
const {Pool} = require('pg');
const path = require('path');

/*Importação dos Roteadores*/
const pagesRouter = require('./routes/pages.js');
const cadastroUsuarioRouter = require('./routes/cadastroUsuario.js');
const loginUsuarioRouter = require('./routes/loginUsuario.js');
const inscricaoParticipante = require('./routes/inscricaoParticipante.js');
const relatorioTrilha = require('./routes/relatorioTrilha.js');

/*Configuração do Express*/
const app = express();
const PORT = 3000;

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
app.use('/', cadastroUsuarioRouter(pool));
app.use('/', loginUsuarioRouter(pool));
app.use('/', inscricaoParticipante(pool));
app.use('/', relatorioTrilha(pool));

pool.connect()
  .then(() => {
        console.log('Conexão com PostgreSQL estabelecida com sucesso!');
        app.listen(PORT, () => {
          console.log(`Servidor rodando em http://localhost:${PORT}`);
        });
    })
    .catch(err => {
      console.error('Erro ao conectar ao banco de dados:', err.message);
      console.log('Por favor, verifique se o PostgreSQL está rodando e suas credenciais.');
    });

