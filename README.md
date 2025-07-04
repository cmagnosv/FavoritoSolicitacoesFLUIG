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
1. o formulário deve ter os seguintes campos para que funcione bem:
  1.1 _"codProcesso"_  => este deve guardar o número da solicitação, pois a principio este número fica apenas no ambiente de processo, para capturar o número da solitação:
   1.1.1 em script de processo _"afterTaskSave"_ poderia usar este codigo:<br>
   	~~~ <br> if (hAPI.getCardValue('codProcesso')  == undefined || hAPI.getCardValue('codProcesso')  == '' ) <br>
	~~~	{hAPI.setCardValue('hAPI.getCardValue('codProcesso')',getValue("WKNumProces"));}
