const express = require('express');
const bcrypt = require ('bcrypt');

const saltRounds = 10;

module.exports = (pool) =>{
  const router = express.Router();
    
  router.post('/loginusuario', async(req, res) => {
  
    const {loginUsuario, loginSenha} = req.body;

    try{
      const query = 'SELECT  usuario, senha FROM site.usuarios WHERE usuario = $1';
      const result = await pool.query(query, [loginUsuario]);
      
      if(result.rows.length === 0){
        return res.status(401).json({mensagem: 'Usuário ou senha inválidos.'});
      }

      const usuarioDB = result.rows[0];
      const hashSalva = usuarioDB.senha;

      const comparaSenhaHash = await bcrypt.compare(loginSenha, hashSalva);

      if(!comparaSenhaHash){
        return res.status(401).json({mensagem: 'Usuário ou senha inválidos.'});
      }

      return res.status(200).json({
        mensagem: 'Login efetuado com sucesso!',
      });

    } catch (error) {
      console.error('Erro ao tentar logar:', error);
      res.status(500).json({ mensagem: 'Erro interno no servidor ao tentar logar.' });
    }
  });
  return router;
};