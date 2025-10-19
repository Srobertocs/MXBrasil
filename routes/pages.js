const express = require('express');
const path = require('path');

const router = express.Router();

const publicDir = path.join(__dirname, '..', 'public');


/* == ROTAS DE NAVEGAÇÃO == */

/*--Página Inicial--*/
router.get('/', (req, res) => {
  res.sendFile(path.join(publicDir, 'html', 'index.html'));
});

/*--Página de Login--*/
router.get('/login', (req, res) =>{
  res.sendFile(path.join(publicDir, 'html', 'login.html'));
});

/*--Página de Inscrição*/
router.get('/formularioInscricao', (req, res) =>{
  res.sendFile(path.join(publicDir, 'html', 'formularioInscricao.html'));
});

/*Página das Trilhas*/
router.get('/trilhas', (req, res) =>{
  res.sendFile(path.join(publicDir, 'html', 'trilhas.html'));
});

/*Página de Cadastro*/
router.get('/cadastro', (req, res) => {
  res.sendFile(path.join(publicDir, 'html', 'cadastro.html'));
});

module.exports = router;
