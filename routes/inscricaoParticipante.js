const express = require('express');

module.exports = (pool) => {
  const router = express.Router();

  router.post('/inscricaoParticipante', async(req,res) => {
    const {nome, sobrenome, modeloMoto, placa, cpf, email, trilha} = req.body;
    const id_trilha = parseInt(trilha);

    const sessao = await pool.connect();

    try{
      let id_participante;

      await sessao.query('BEGIN');
      /*Buscar Participante*/
      const queryBucasParticipante = 'SELECT id FROM site.participantes WHERE cpf = $1'
      const valuesBuscaParticipante = [cpf];

      const resultBuscaParticipantes = await sessao.query(queryBucasParticipante, valuesBuscaParticipante);

      /*Verifica se o participante existe*/
      if(resultBuscaParticipantes.rows.length > 0){
        id_participante = resultBuscaParticipantes.rows[0].id;

        const queryBuscaInscricao = 'SELECT 1 FROM site.inscricoes WHERE id_participante = $1 AND id_trilha = $2'
        const valuesBuscaInscricao = [id_participante, id_trilha];

        const resultBuscaInscricao = await sessao.query(queryBuscaInscricao, valuesBuscaInscricao);

        if(resultBuscaInscricao.rows.length > 0){
          await sessao.query('ROLLBACK');
          return res.status(409).json({
            mensagem: 'você ja esta inscrito nessa trilha',
            alerta: 'ja_inscrito_trilha'
          })
        }
        const queryAtualizaParticipante = 'UPDATE site.participantes SET nome = $1, sobrenome = $2, modelo_moto = $3, placa = $4 WHERE id = $5'
        const valuesAtualizaParticipante = [nome, sobrenome, modeloMoto, placa, id_participante];

        await sessao.query(queryAtualizaParticipante, valuesAtualizaParticipante);

      }else{

        const queryInsereNovoParticipante = 'INSERT INTO site.participantes (nome, sobrenome, modelo_moto, placa, cpf, email) VALUES ($1, $2, $3 , $4, $5, $6) RETURNING id '
        const valuesInsereNovoParticipante = [nome, sobrenome, modeloMoto, placa, cpf, email];

        const resultInsereParticipante = await sessao.query(queryInsereNovoParticipante, valuesInsereNovoParticipante);

        id_participante = resultInsereParticipante.rows[0].id;
      }

      const queryInsereNovaInscricao = 'INSERT INTO site.inscricoes (id_participante, id_trilha, data_inscricao) VALUES ($1, $2, NOW())';
      const valuesInsereNovaInscricao = [id_participante, id_trilha];

      await sessao.query(queryInsereNovaInscricao, valuesInsereNovaInscricao);

      await sessao.query('COMMIT');

      res.status(201).json({
        mensagem: 'Participante inscrito com sucesso !!'
      });
    }catch(error){
      await sessao.query('ROLLBACK');

     console.error('Erro ao cadastrar participante:', error);
     res.status(500).json({ mensagem: 'Erro interno no servidor ao tentar cadastrar.' });
    }finally {
      if (sessao) {
        sessao.release(); 
      }
    }
  });
  return router;
}