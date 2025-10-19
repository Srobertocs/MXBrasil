/*Cadastro do usuário*/

document.getElementById('formularioCadastro').addEventListener('submit', function(event){
  event.preventDefault();

  /*Pegas os dados do formulario*/
  const form = event.target;
  const dadosFormulario = new FormData(form);


  /*Convere os dados para um objeto Javascript */
  const objetoDados = Object.fromEntries(dadosFormulario.entries());
  const jsonDados = JSON.stringify(objetoDados);

  enviarDadosJson(jsonDados, form);
});

function enviarDadosJson(jsonDados, form){

  fetch('/cadastrousuario', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: jsonDados
  })
  .then(response => {
    if(!response.ok){
      throw new Error(`Erro na requisição: Status ${response.status}`);
    }

    return response.json();
  })
  .then(data => {
    console.log('Resposta do servidor:', data);
    form.reset();
    window.location.href = '/login';
    // Aqui você pode exibir mensagem de sucesso ou limpar o formulário
  })
  .catch(error => {
    console.error('Erro ao enviar dados:', error);
    alert('Erro no cadastro: ' + error.message);
  });
};