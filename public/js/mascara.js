document.getElementById('cpf').addEventListener('input', function(campoCPF){
  /*Captura o valor do input e remove todos os dígitos que não sejam números*/
  var mascaraCPF = campoCPF.target.value.replace(/\D/g, '');

  /*Aplicando a máscara
  xxx.xxx*/
  mascaraCPF = mascaraCPF.replace(/(\d{3})(\d)/, '$1.$2');
  /*xxx.xxx.xxx*/
  mascaraCPF = mascaraCPF.replace(/(\d{3})(\d)/, '$1.$2');
  /*xxx.xxx.xxx-xx*/
  mascaraCPF = mascaraCPF.replace(/(\d{3})(\d{2}$)/, '$1-$2');

  campoCPF.target.value = mascaraCPF;
});

document.getElementById('placa').addEventListener('input', function(campoPlaca){
  
  var mascaraPlaca = campoPlaca.target.value.toUpperCase();
 
  mascaraPlaca = mascaraPlaca.replace(/[^A-Z0-9]/g, '');
  mascaraPlaca = mascaraPlaca.replace(/^[^A-Z]{1,3}/g, '');
  
  /*Aplicando mascara*/
  /*xxx-xxxx*/
  mascaraPlaca = mascaraPlaca.replace(/^([A-Z]{3})([A-Z0-9]+)/, '$1-$2');


  campoPlaca.target.value = mascaraPlaca;;
});