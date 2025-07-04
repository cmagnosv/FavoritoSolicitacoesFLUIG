# FavoritoSolicitacoesFLUIG
KIT para criar solução para favoritar solicitações de Processos

## PASSO A PASSO
1. - criar um formulário que tenha o minimo de campos para guardar: matricula do usuário logado; numero da solicitação, breve descritivo da solicitação. Este deve ser exportado como precnhimento de ficha, não precisa criar processo.
como modelo segue arquivo: _"forms\frmfavoritos_modelo\frmfavoritos.html"_, nome do dataset utilizado: _"processos_favoritos"_;

2. - criar a widget para criar o favoritos para os casos de solicitações mais antigas em que não será possivel habilitar em seu formulário o o botão favoritar, neste modelo esta localizado em: _"wcm\widget\widget_favoritar_solicitacoes_modelo"_, ele é uma copia do formulário criado do item 1, adaptado para uso em widget;
  2.1 - Observar no arquivo: _"wcm\widget\widget_favoritar_solicitacoes_modelo\src\main\webapp\resources\js"_ ,na linha 4: trocar o codigo do formulário para o criado ao exportar o do item 1.
  2.2 - Observar na parte de dados, o depara que pega os dados digitados no formulário widget e armazenará os mesmo aos campos do dataset criado do formulário do item 1.   

3 - criar widget para listar as solicitações favoritadas, este deve cmo sugestão adicionar  apagina principal do FLUIG para ficar sempre visivel ao usuário, neste modelo esta localizado em: wcm\widget_listar_favoritos_solicitacoes_modelo;
  3.1 - observar no arquivo: _"wcm\widget\widget_listar_favoritos_solicitacoes_modelo\src\main\webapp\resources\js\widget_listar_favoritos_solicitacoes.js"_, 

4 - criar uma pagina com dois espaços para adiconar as duas widgets, sugestão: colocar a widget de adicionar no primeiro espaço e no segundo colocar a widget de listar;





