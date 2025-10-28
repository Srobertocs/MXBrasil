const modalLista = document.getElementById('modalListaInscritos');
const modalTitulo = document.getElementById('modalTitulo');
const listaParticipantes = document.getElementById('listaParticipantes');
const botaoFecharModel = modalLista ? modalLista.querySelector('.botao-fechar') : null;

function fecharModel(){
  if(modalLista){
    modalLista.style.display = 'none';
  }
}

if(botaoFecharModel){
  botaoFecharModel.onclick = fecharModel;
}

window.onclick = function(event){
  if(event.target === modalLista){
    fecharModel();
  }
}

async function buscarInscritos(id_trilha, nome_trilha) {
  
  if(!modalLista){
    return;
  }

  modalTitulo.textContent = `Carregando Inscritos: ${nome_trilha}`;
  listaParticipantes.innerHTML = '<p>Buscando dado ...</p>'
  modalLista.style.display = 'block'

  try{
    const response = await fetch(`/inscricaotrilha/${id_trilha}`);
    const data = await response.json();
    

    if(!response.ok){
      throw new Error(data.mensagem || 'Falha ao buscar inscritos');
    }

    if(data.participantes.length === 0) {
      modalTitulo.textContent = 'Sem Incrições até o momento';
    }else{
      modalTitulo.textContent = `Visualização de Inscritos ${data.trilha}`;
    }

    let htmlList = '<ul>';
    data.participantes.forEach(p => {
      const dataFormatada = p.data_inscricao ? new Date(p.data_inscricao).toLocaleDateString() : 'N/A';
            
      htmlList += `
        <li style="margin-bottom: 10px; border-bottom: 1px solid #ccc; padding-bottom: 12px;">
          <strong>${p.nome_participante} ${p.sobrenome_participante}</strong><br>
          Moto: ${p.modelo_moto} / Placa: ${p.placa}<br>
          <small>Inscrito em: ${dataFormatada}</small>
        </li>
      `;
    });
    htmlList += '</ul>';
        
    listaParticipantes.innerHTML = htmlList;
  }
  catch (error) {
    modalTitulo.textContent = `Erro ao carregar lista de ${nome_trilha}`;
    listaParticipantes.innerHTML = `<p style="color: red;">${error.message}</p>`;
    console.error(error);
  }
} 

document.addEventListener('DOMContentLoaded', () => {
  // Captura os botões com as classes corretas
  const botoes = document.querySelectorAll('.visualizar-inscritos');

  botoes.forEach(botao => {
    botao.addEventListener('click', (e) => {
      e.preventDefault(); 
            
      const id_trilha = botao.getAttribute('data-id-trilha');
      const nome_trilha = botao.getAttribute('data-nome-trilha');
            
      if (id_trilha) {
        buscarInscritos(id_trilha, nome_trilha);
      }
    });
  });
});