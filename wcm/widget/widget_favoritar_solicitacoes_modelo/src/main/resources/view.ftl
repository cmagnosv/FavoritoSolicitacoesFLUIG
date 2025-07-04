<div id="fav_solicitacoes_${instanceId}" class="modal-verifybrowser wcm-widget-class super-widget fluig-style-guide" data-params="fav_solicitacoes.instance({})">
<script type="text/javascript" src="/webdesk/vcXMLRPC.js"></script>
	<div id="container" class="container-fluid">
<form name="form" role="form">
	<input type="hidden" name="titulo" id="titulo">
	<div  class="col-xs-12 col-sm-12 col-md-12">
		<label>Usuário Logado:</label>	
		<input type="text" class="form-control" name="usuario_logado" id="usuario_logado" onclick="usuario();" value="">
	</div>
	<div  class="col-xs-6 col-sm-6 col-md-6">
		<div class="form-group">
			<label>Favorito de:</label>	
			<input type="zoom" class="form-control" name="usuario_fluig" id="usuario_fluig"
																data-zoom="{												
																	'displayKey':'colleagueName',
																	'datasetId':'colleague',
																	'filterValues': 'active,true',
																	'fields':[													
																	{
																	'field':'colleagueId'
																	},
																	{
																	'field':'groupId',
																	'visible':'false'
																	},
																	{
																	'field':'login',
																	'visible':'false'
																	},
																	{
																	'field':'mail',
																	'visible':'false'
																	},
																	{
																	'field':'colleagueName',
																	'label':'NOME'
																	}
																	]
																}"
																/>
			<input type="hidden" name="id_usuario_fluig" id="id_usuario_fluig">
			<input type="hidden" name="id_unidade" id="id_unidade">
			<input type="hidden" name="login" id="login">
		</div>
	</div>
	<div  class="col-xs-3 col-sm-3 col-md-3">
		<div class="form-group">
			<label>Número da solicitação Fluig:</label>	
			<input class="form-control" type="text" name="cod_fluig"  id="cod_fluig">
		</div>
	</div>
	<div  class="col-xs-3 col-sm-3 col-md-3">
		<div class="form-group">
			<label>Situação Ativo:</label>	
			<select class="form-control" name="situacao"  id="situacao"> 
				<option value="1">Sim</option>
				<option value="2">Não</option>
			</select>
		</div>
	</div>
	<div class="col-xs-12 col-sm-12 col-md-12">
		<label for="objetivo">Resumo da solicitação</label>
		<div class="form-group">
			<textarea class="form-control" onchange="ajustaNome(this)" name="objetivo" id="objetivo" maxlength="250" rows="5" wrap="on" style="font: bold 18px Calibri, Helvetica, sans-serif; text-align: justify;"></textarea>
		</div>
	</div>
</form>
	<button data-gravar>
		Gravar
	</button>
</div>

</div>

