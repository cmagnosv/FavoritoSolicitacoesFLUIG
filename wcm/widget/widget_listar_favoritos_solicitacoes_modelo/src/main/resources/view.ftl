<div id="listarFavoritosSolicitacoes_${instanceId}" class="super-widget wcm-widget-class fluig-style-guide" data-params="listarFavoritosSolicitacoes.instance()">
<div id="container" class="container-fluid">
<script type="text/javascript" src="/webdesk/vcXMLRPC.js"></script>
<script type="text/javascript" src="/portal/resources/js/mustache/mustache-min.js"></script>
<br><strong>Favoritos de Solicitações</strong> <a href="https://fluig.ma.sebrae.com.br/portal/p/1/favoritos_solicitacoes"> Inserir </a></br>
PESQUISE
<div id="tb_favoritos_solicitacoes_${instanceId}"></div>
<script type="text/template" id="template_favoritos_solicitacoes" class="templateExemplo">
<tr>
<td><a href="/portal/p/1/pageworkflowview?app_ecm_workflowview_detailsProcessInstanceID={{cod_fluig}}" target="_blank">{{cod_fluig}}</a>  </td> <td>({{objetivo}})</td>
</tr>
</script>
</div>
<p>Fim de favoritos</p>
</div>

