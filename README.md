# FavoritoSolicitacoesFLUIG
KIT para criar solução para favoritar solicitações de Processos

## PASSO A PASSO
1. Criar um formulário que tenha o minimo de campos para guardar: matricula do usuário logado; numero da solicitação, breve descritivo da solicitação. Este deve ser exportado como precnhimento de ficha, não precisa criar processo.
como modelo segue arquivo: _"forms\frmfavoritos_modelo\frmfavoritos.html"_, nome do dataset utilizado: _"processos_favoritos"_;<br>

2. Criar a widget para criar o favoritos para os casos de solicitações mais antigas em que não será possivel habilitar em seu formulário o o botão favoritar, neste modelo esta localizado em: _"wcm\widget\widget_favoritar_solicitacoes_modelo"_, ele é uma copia do formulário criado do item 1, adaptado para uso em widget;<br>
  2.1 Observar no arquivo: _"wcm\widget\widget_favoritar_solicitacoes_modelo\src\main\webapp\resources\js"_ ,na linha 4: trocar o codigo do formulário para o criado ao exportar o do item 1.<br>
  2.2 Observar na parte de dados, o depara que pega os dados digitados no formulário widget e armazenará os mesmo aos campos do dataset criado do formulário do item 1.<br>

3 Criar widget para listar as solicitações favoritadas, este deve cmo sugestão adicionar  apagina principal do FLUIG para ficar sempre visivel ao usuário, neste modelo esta localizado em: wcm\widget_listar_favoritos_solicitacoes_modelo;<br>
  3.1 Observar no arquivo: _"wcm\widget\widget_listar_favoritos_solicitacoes_modelo\src\main\webapp\resources\js\widget_listar_favoritos_solicitacoes.js"_, neste observar as lihas(19 e 30) de chamada do dataset, adaptar se for o caso.<br>

4 - Criar uma pagina com dois espaços para adiconar as duas widgets, sugestão: colocar a widget de adicionar no primeiro espaço e no segundo colocar a widget de listar;<br>

### IMPLEMENTAÇÃO NOS PROCESSOS

Segue dica para colocar um botão que habilita/desabilitar uma solicitação para se favoritado.
1. O formulário deve ter os seguintes campos para que funcione bem:<br>
  1.1 _"codProcesso"_  => este deve guardar o número da solicitação, pois a principio este número fica apenas no ambiente de processo, para capturar o número da solitação:
   1.1.1 Em script de processo _"afterTaskSave"_ poderia usar este codigo:<br>
   	~~~javascript
    	  if (hAPI.getCardValue('codProcesso')  == undefined || hAPI.getCardValue('codProcesso')  == '' ) 
		{
		hAPI.setCardValue('hAPI.getCardValue('codProcesso')',getValue("WKNumProces"));
    		}

2. No formulário colocar um botão:
   ~~~hmtl
   <button id="id_favorito" onclick="gravar_favorito()"></button>

3. função _JavaScript_ que executa o botão:
  ~~~javascript
	function gravar_favorito(){
		console.log("FAVORITOS: ENTRANDO NA FUNÇÃO ALTERANDO/INSERINDO ");
		//if(document.getElementById("novo_cadastro").value=='S'){
		if(this.novo_cadastro=='S'){
			console.log("FAVORITOS: NÃO EXISTE, INSERINDO");
			situacao='1';
			var tipo="POST";
			var link = '/ecm-forms/api/v2/cardindex/'+this.codigodoformulario+'/cards';
			mensagem = "<i class='flaticon flaticon-star-active icon-xl' placeholder='Clique aqui para remover esta solicitação dos seus favoritos' aria-hidden='true'>Favoritado</i>"
			//document.getElementById("novo_cadastro").value='N';
			this.novo_cadastro='N';
		}else{

			console.log("FAVORITOS: EXISTE, ALTERANDO STATUS");
			//if(document.getElementById("opcao").value=='A'){
			if(this.opcao=='A'){
				console.log("FAVORITOS: INATIVANDO ");
				situacao='2';
				mensagem ="<i class='flaticon flaticon-star icon-xl' placeholder='Clique aqui para inserir esta solicitação aos seus favoritos' aria-hidden='true'>Favoritar</i>"
			}else{
				console.log("FAVORITOS: ATIVANDO ");
				situacao='1';
				mensagem ="<i class='flaticon flaticon-star-active icon-xl' placeholder='Clique aqui para remover esta solicitação dos seus favoritos' aria-hidden='true'>Favoritado</i>"
			}
			
			var tipo="PUT";
			var link = '/ecm-forms/api/v2/cardindex/'+this.codigodoformulario+'/cards/'+this.codigo_ficha;
			
				}
				
		var agora = moment(new Date(), "DD/MM/YYYY", "pt", true); 
		var objetivo = agora.format("DD/MM/YYYY HH:mm")+' Cod.: '+	document.getElementById("codProcesso").value +', Interessado.: '+ document.getElementById("interessado").value +', Assunto.: ' + 	document.getElementById("Assunto").value;
		console.log("FAVORITOS: GERANDO OBJETIVO: "+objetivo+", CODPROCESSO:"+codprocesso+", "+document.getElementById("userLogado").value+", idunidade: "+document.getElementById("unidadeLogado").value);
		console.log("FAVORITOS: idusuariofluig: "+document.getElementById("usuarioTarefa").value+", usuario_fluig: "+document.getElementById("userLogado").value);
		var dados={
	    		"values": [
    				{"fieldId": "usuario_fluig",
    				"value": document.getElementById("userLogado").value},
					{"fieldId": "id_usuario_fluig",
    				"value": usuario_logado},
                    {"fieldId": "id_unidade",
    				"value": document.getElementById("unidadeLogado").value},
                    {"fieldId": "login",
    				"value": document.getElementById("userLogado").value},
                    {"fieldId": "cod_fluig",
    				"value": this.codprocesso},
                    {"fieldId": "objetivo",
    				"value": objetivo},
					{"fieldId": "situacao",
    				"value": situacao}
    			]}
console.log("FAVORITOS: dados: "+dados);
console.log("FAVORITOS: tipo: "+tipo);
console.log("FAVORITOS: link: "+link);


			parent.WCMAPI.Read({
				type: tipo,
				async: true,
				url: link,
				contentType: "application/json",
				dataType: "json",
				data: JSON.stringify(dados),
				success: function(data){
					// código a ser executado em caso de sucesso
					//alert("Dados gravados: "+$("#usuario_fluig").val());
					//alert(mensagem);
					document.getElementById('id_favorito').innerHTML =mensagem;
				}
			});
	}
