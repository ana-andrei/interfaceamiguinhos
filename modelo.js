class Cliente{
  constructor(codigo, nomeanimal, raca, porte, sexo){ 
  this.codigo= codigo;
  this.nomeanimal= nomeanimal;
  this.raca= raca;
  this.porte= porte;
  this.sexo = sexo;
  }
}

listaClientes = [];
posicao = '';

function adicionarCliente(lista,cliente) {
  lista.push(cliente);
}

function atualizarCliente(lista,cliente,pos) {
  lista[pos] = cliente;
}

function excluirCliente(lista,pos) {
  lista.splice(pos,1);
}

function listarCliente(lista){
  var auxHtml = '<tr>'+
              '<th>Código</th>'+
              '<th>Nome do animal</th>'+
              '<th>Raça</th></th>'+
              '<th>Porte</th>'+
              '<th>Sexo</th>'+
              '<th>Alterar</th>'+
              '<th>Excluir</th>'+
              '</tr>';
  for (var i = 0; i < lista.length; i++) {
    auxHtml += '<tr>'+
              '<td>'+ lista[i].codigo + '</td>'+
              '<td>'+ lista[i].nomeanimal +'</td>'+
              '<td>'+ lista[i].raca +'</td>'+
              '<td>'+ lista[i].porte +'</td>'+
              '<td>'+ lista[i].sexo +'</td>'+
              '<td><a class="btn btn-warning btAlterar" rel="'+ i +'">A</a></td>'+
              '<td><a class="btn btn-danger btExcluir" rel="'+ i +'">X</a></td>'+
              '</tr>';
  }
  return auxHtml;
}

$(document).ready(function(){
  $('#btSalvar').click(function(){
    var codigo = $('#codigo').val();
    if (codigo == ''){
      alert('Informe o código');
    }else{
    var nomeanimal = $('#nomeanimal').val();
    var raca = $('#raca').val();
    var porte = $('#porte').val();
    var sexo = $('#sexo').val();

    cliente = new Cliente( codigo, nomeanimal, raca, porte, sexo)

    if (posicao == ''){
      adicionarCliente (listaClientes, cliente);
    }else{
      atualizarCliente (listaClientes,cliente, posicao);
      posicao = '';
    }
    $('#tabela').html(listarCliente(listaClientes));

    $('input').val('');
    }
  });

  
  $('#btJSON').click(function() {
    var listagem = JSON.stringify(listaClientes);
	alert(listagem);
  });
  
  $('#btAJAX').click(function() {
    $.ajax({
	  method: 'GET',
	  url: 'http://date.jsontest.com/'
	}).done(function(retorno) {
	  for (propriedade in retorno) {
		console.log(propriedade);
	  }
	  //alert(retorno.date);
	  $('#dados').html(retorno.date +' - '+ retorno.time);
	});
  });
  
  
  $('body').on('click', '.btAlterar', function(evento) {
	  var elemento = evento.target || evento.SrcElement;
    posicao = elemento.rel;
    $('#codigo').val(listaClientes[posicao].codigo);
	  $('#nomeanimal').val(listaClientes[posicao].nomeanimal);
	  $('#raca').val(listaClientes[posicao].raca);
	  $('#sexo').val(listaClientes[posicao].sexo);
	  $('#porte').val(listaClientes[posicao].porte);
  });

  
  $('body').on('click', '.btExcluir', function(evento) {
    var elemento = evento.target || evento.SrcElement;
      if (confirm('Confirma a exclusão?')) {
      excluirCliente(listaClientes, elemento.rel);
      $('#tabela').html(listarCliente(listaClientes));
    }
    });
    
    $('#btCancelar').click(function() {
    $('input').val('');
    posicao = '';
    });
  });
