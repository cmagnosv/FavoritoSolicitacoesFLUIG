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


### IMPLEMENTAÇÃO NO FORMULÁRIO DO PROCESSO
1. O formulário deve ter o seguinte campo para que funcione bem: _"codProcesso"_  => este deve guardar o número da solicitação, pois a principio este número fica apenas no ambiente de processo, para capturar o número da solitação será feito via script de processo citado mais abaixo, exemplo do _html_:
   ~~~html
   <input type="hidden" name="codProcesso" id="codProcesso">

3. _JavaScript_ que carrega as variaveis que serão usadas:
   ~~~javascript
   	var codigodoformulario = '501799'; // codigo do formulário citado acima, o formuçário de favoritos que gera o dataset
	var situacao='1'; // padrão para ativo
	var mensagem = '';
	var usuario_logado = parent.WCMAPI.getUserCode(); //captura usuário logado
	var opcao = 'I'; // opção padrão para inserir
	var novo_cadastro = 'S' // opção que idenctifica como novo cadastro
	var codigo_ficha = 0; // indica que a mesma não possui registro
	var codigo = 0; // codigo da solicitação, indica se a mesma esta favoritada
	var codprocesso = document.getElementById("codProcesso").value; // pega o número da solcitação já gravado do processo
   	favoritos(); // carrega a consulta para ver se esta solicitação já esta favoritada

4. função _JavaScript_ que verifica se a solicitação já esta favoritada:
	~~~~javascript
 	function favoritos(){
			console.log("FAVORITOS: ENTRANDO NA FUNÇÃO ");
			var constraintProcessos_favoritos1 = DatasetFactory.createConstraint('id_usuario_fluig', this.usuario_logado, this.usuario_logado, ConstraintType.MUST); // pega o usuário logado para pegar a apenas a lista dele de favoritos
			var constraintProcessos_favoritos2 = DatasetFactory.createConstraint('cod_fluig', codprocesso, codprocesso, ConstraintType.MUST); // leva o codigo da solicitação para saber se a mesma já esta favoritada
			var constraintProcessos_favoritos3 = DatasetFactory.createConstraint('metadata#active', 'true', 'true', ConstraintType.MUST); // PEGA A ultima versão da ficha
			var colunasProcessos_favoritos = new Array('cod_fluig', 'documentid', 'id_usuario_fluig', 'metadata#active', 'situacao'); // os campos que iremos utilizar da ficha/dataset
			var datasetProcessos_favoritos = DatasetFactory.getDataset('processos_favoritos', colunasProcessos_favoritos, new Array(constraintProcessos_favoritos1, constraintProcessos_favoritos2, constraintProcessos_favoritos3), null); //chamada do dataset
			if (!datasetProcessos_favoritos || datasetProcessos_favoritos.values.length === 0){ // ver se esta vazio
				console.log("FAVORITOS: NÃO EXISTE REGISTRO, opção: "+this.opcao+', novo_cadstro: '+this.novo_cadastro);
				mensagem ="<i class='flaticon flaticon-star icon-xl' placeholder='Clique aqui para inserir esta solicitação aos seus favoritos' aria-hidden='true'>Favoritar</i>" // variavel que vai manipular o botão
			}else{ // encontrou a solicitação do usuário como faloritado
				var favorito = datasetProcessos_favoritos.values[0]; 
				console.log("FAVORITOS: EXISTE REGISTRO CODIGO DA FICHA: "+favorito["documentid"]);
				if(favorito["situacao"]=='1'){ // se a mesma estiver ativa
					this.opcao = 'A'; // habilita para alteração 
					console.log("FAVORITOS: REGISTRO ESTA ATIVO, opção: "+this.opcao);
					mensagem ="<i class='flaticon flaticon-star-active icon-xl' placeholder='Clique aqui para retirar esta solicitação dos seus favoritos' aria-hidden='true'>Favoritado</i>" // botão favoritado
					
				}else{
					this.opcao = 'I'; // existe, mas esta inativo
					console.log("FAVORITOS: REGISTRO ESTA INATIVO, opção: "+this.opcao);
					mensagem ="<i class='flaticon flaticon-star icon-xl' placeholder='Clique aqui para inserir esta solicitação aos seus favoritos' aria-hidden='true'>Favoritar</i>" // botão favoritar ? 
				}
				this.novo_cadastro = 'N'; // indica que existe registro de favoritos, então apenas atualiza
				this.codigo_ficha = favorito["documentid"]; // pega a o cadastro da solicitação
				this.codigo = favorito["cod_fluig"]; // pega o numero da solicitação
				console.log("FAVORITOS: FIM, novo_cadstro: "+this.novo_cadastro+", codigo_ficha: "+this.codigo_ficha+", codigo: "+this.codigo);
			}
			document.getElementById('id_favorito').innerHTML =mensagem; // escreve o resultado no botão
	};

5. função _JavaScript_ que insere/atualiza a solicitação em favoritos:<br>
~~~~
   ~~~javascript
	function gravar_favorito(){
		console.log("FAVORITOS: ENTRANDO NA FUNÇÃO ALTERANDO/INSERINDO ");
		if(this.novo_cadastro=='S'){ // indica novo cadastro, inserir em favoritos
			console.log("FAVORITOS: NÃO EXISTE, INSERINDO");
			situacao='1'; // coloca como ativo
			var tipo="POST";
			var link = '/ecm-forms/api/v2/cardindex/'+this.codigodoformulario+'/cards';
			mensagem = "<i class='flaticon flaticon-star-active icon-xl' placeholder='Clique aqui para remover esta solicitação dos seus favoritos' aria-hidden='true'>Favoritado</i>" // botão indicando que foi favoritado
			this.novo_cadastro='N'; // troca a variavél indicando que exite registro
		}else{

			console.log("FAVORITOS: EXISTE, ALTERANDO STATUS");
			if(this.opcao=='A'){ // considera que esta sendo alterado registro
				console.log("FAVORITOS: INATIVANDO ");
				situacao='2'; // inativa o favoritos
				mensagem ="<i class='flaticon flaticon-star icon-xl' placeholder='Clique aqui para inserir esta solicitação aos seus favoritos' aria-hidden='true'>Favoritar</i>" // botão de favoritar ?
			}else{
				console.log("FAVORITOS: ATIVANDO ");
				situacao='1'; // ativa o favoritos
				mensagem ="<i class='flaticon flaticon-star-active icon-xl' placeholder='Clique aqui para remover esta solicitação dos seus favoritos' aria-hidden='true'>Favoritado</i>" // botão de favoritado
			}
			
			var tipo="PUT";
			var link = '/ecm-forms/api/v2/cardindex/'+this.codigodoformulario+'/cards/'+this.codigo_ficha; 
				}
		//inicio de montagem do resumo da solicitação para ser guardado na ficha do favoritos, deve ser rvisto para adequar a cada processo
		var agora = moment(new Date(), "DD/MM/YYYY", "pt", true); // pega a adtaa atual do sistema
		var objetivo = agora.format("DD/MM/YYYY HH:mm")+' Cod.: '+	document.getElementById("codProcesso").value +', Interessado.: '+ document.getElementById("interessado").value +', Assunto.: ' + 	document.getElementById("Assunto").value;
		//fim de montagem de resumo
		console.log("FAVORITOS: GERANDO OBJETIVO: "+objetivo;
		// DEPARA entre a solicitação e a ficha de favoritos, deve ser ajustado conforme dados do dataset favoritos
		var dados={
	    		"values": [
    				{"fieldId": "usuario_fluig",
    				"value": document.getElementById("userLogado").value},
				{"fieldId": "id_usuario_fluig",
    				"value": usuario_logado},
                    		{"fieldId": "id_unidade",
    				"value": this.usuario_logado},
                    		{"fieldId": "login",
    				"value": this.usuario_logado},
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
					document.getElementById('id_favorito').innerHTML =mensagem; // atualiza o botão
				}
			});
	}
~~~

6. No formulário colocar um botão:
   ~~~hmtl
   <button id="id_favorito" onclick="gravar_favorito()"></button>
~~~~

### IMPLEMENTAÇÃO NOS PROCESSOS

Segue dica para colocar um botão que habilita/desabilitar uma solicitação para se favoritado.
1. Em script de processo _"afterTaskSave"_ poderia usar este codigo:<br>
~~~~
 ~~~javascript
		if (hAPI.getCardValue('codProcesso')  == undefined || hAPI.getCardValue('codProcesso')  == '' ) 
			{
			hAPI.setCardValue('hAPI.getCardValue('codProcesso')',getValue("WKNumProces"));
			}
~~~~
