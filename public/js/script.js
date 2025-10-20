/*Cadastro do usuário*/

const formCadastro = document.getElementById('formularioCadastro');

if(formCadastro){
  formCadastro.addEventListener('submit', function(event){
    event.preventDefault();

    /*Pega o formulário que disparou o evento*/
    const form = event.target;

    /*Cria um objeto FormData com todos os inputs do formulario */
    const dadosFormulario = new FormData(form);

    /*Converte os dados para um objeto Javascript */
    const objetoDados = Object.fromEntries(dadosFormulario.entries());

    /*Transforma o objeto em json*/
    const jsonDados = JSON.stringify(objetoDados);

    enviarDadosJson(jsonDados, form);
  });
}

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

  .then(data =>{
    console.log('Cadastro efetuado:', data.mensagem);
    form.reset();
    window.location.href = '/login';
  })

  .catch(error => {
    console.error('Erro ao enviar dados:', error);
    alert('Erro no cadastro: ' + error.message);
  });
};

/*Login do usuário*/

const formLogin = document.getElementById('formularioLogin');
if(formLogin){
  formLogin.addEventListener('submit', function(event){
    event.preventDefault();

    /*Pega o formulário que disparou o evento*/
    const form = event.target;

    /*Cria um objeto FormData com todos os inputs do formulario */
    const dadosFormulario = new FormData(form);

    /*Converte os dados em um objeto Javascript*/ 
    const objetoDados = Object.fromEntries(dadosFormulario.entries());

    /*Transforma o objeto em json*/
    const jsonDados = JSON.stringify(objetoDados);

    /*Pega o elemento onde será mostrado erro*/
    const elementoErro = document.getElementById('mensagemErroLogin');
    elementoErro.textContent  = '';

    loginUsuario(jsonDados, form, elementoErro);
  });
}

function loginUsuario(jsonDados, form, elementoErro){
  fetch('/loginusuario', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: jsonDados
  })

  .then(async response => {

    if (!response.ok) {
      let mensagemErro = ''

      try {
        const erroData = await response.json();
            
        // Verifica se o back-end enviou uma mensagem específica
        if (erroData && erroData.mensagem) {
          mensagemErro = erroData.mensagem;
        } else if (erroData && erroData.error) {
          // Caso seu back-end use 'error' em vez de 'mensagem'
          mensagemErro = erroData.error;
        }
      } catch (e) {
    
      }
      throw new Error(mensagemErro);
    }
    return response.json();
  })

  .then(data => {
    console.log('Cadastro feito:', data.mensagem);
    window.location.href = '/';
  })
  .catch(error => {
    console.error('Erro de Login:', error);
        
    
    elementoErro.textContent = error.message;
    form.reset(); 
  });
};
