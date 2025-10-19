const express = require('express');
const bcrypt = require ('bcrypt');

const saltRounds = 10;

module.exports = (pool) => {
  const router = express.Router();
  

  router.post('/cadastrousuario', async(req, res) => {

    const {cadastroUsuario, cadastroSenha} = req.body;
    try{
      const hashSenha = await bcrypt.hash(cadastroSenha, saltRounds);

      const query = 'INSERT INTO site.usuarios (usuario, senha) VALUES ($1, $2)';
      const values = [cadastroUsuario, hashSenha];

      const result = await pool.query(query, values);


      res.status(201).json({
        mensagem: 'Usuário cadastrado com sucesso !!'
      });
    }catch(error){
      if(error.code == '23505'){ /*Código para usuários repetidos no banco de dados*/
        return res.status(409).json({mensagem: 'Nome de usuario já existente'});
      } 

      console.error('Erro ao cadastrar usuário:', error);
      res.status(500).json({mensagem: 'Erro interno no servidor ao tentar cadastrar.'});
    }
  });

  return router;
}