const express = require('express');

module.exports = (pool) => {
  const router = express.Router();

    
  router.get('/inscricaotrilha/:id_trilha', async (req, res) => {
    const id_trilha = parseInt(req.params.id_trilha);

    try {
     
      const query = `
        SELECT 
          t.trilha AS nome_da_trilha,
          p.nome AS nome_participante,
          p.sobrenome AS sobrenome_participante,
          p.modelo_moto,
          p.placa,
          i.data_inscricao
            FROM 
              site.trilhas t
            JOIN 
              site.inscricoes i ON i.id_trilha = t.id
            JOIN 
              site.participantes p ON i.id_participante = p.id
            WHERE 
              t.id = $1  
            ORDER BY
              p.nome;
      `;

      const values = [id_trilha];

      const result = await pool.query(query, values);

      const nome_trilha = result.rows.length > 0 ? result.rows[0].nome_da_trilha : null;

      res.status(200).json({
        trilha: nome_trilha,
        participantes: result.rows
      });

    } catch (error) {
      console.error('Erro ao buscar inscritos por trilha:', error);
      res.status(500).json({ mensagem: 'Erro interno ao buscar inscritos.' });
    }
  });
  return router;
};