var listarFavoritosSolicitacoes = SuperWidget.extend({
    //variáveis da widget
	loading: FLUIGC.loading(window),
     
    //método iniciado quando a widget é carregada
    init: function() {
        this.loadTable();
    },
    loadTable: function(){
        var that = this;
            // pega o usuário logado para retornar apenas os favoritados dele
        	var constraintProcessos_favoritos1 = DatasetFactory.createConstraint('id_usuario_fluig', WCMAPI.getUserCode(), WCMAPI.getUserCode(), ConstraintType.MUST);
			var constraintProcessos_favoritos2 = DatasetFactory.createConstraint('metadata#active', 'true', 'true', ConstraintType.MUST);
            var constraintProcessos_favoritos3 = DatasetFactory.createConstraint('situacao', '1', '1', ConstraintType.MUST);
            var constraintProcessos_favoritos4 = DatasetFactory.createConstraint('sqlLimit', '10', '10', ConstraintType.MUST);
        
        that.tbFav = FLUIGC.datatable('#tb_favoritos_solicitacoes' + "_" + that.instanceId, {
            // dataset criado no formulário de criação de favoritos, deste rtorno apenas dois campos o numero da solicitação e resumo
            dataRequest: DatasetFactory.getDataset('processos_favoritos', null,[constraintProcessos_favoritos1, constraintProcessos_favoritos2, constraintProcessos_favoritos3,constraintProcessos_favoritos4],null).values,
            renderContent: '#template_favoritos_solicitacoes',
            header: [
                {'title': 'Codigo FLUIG'},
                {'title': 'Descrição'}],
            search: {
                enabled: true,
                onlyEnterkey: true,
                onSearch: function(res) {
                    // filtro da busca, apenas o campo resumo
                    var constraintProcessos_favoritos5 = DatasetFactory.createConstraint("objetivo", res, res, ConstraintType.MUST,true);
                    that.tbFav.reload(DatasetFactory.getDataset('processos_favoritos', null,[constraintProcessos_favoritos1, constraintProcessos_favoritos2, constraintProcessos_favoritos3,constraintProcessos_favoritos4,constraintProcessos_favoritos5],null).values);
                }
            },
            navButtons: {
                enabled: true,
            },
        }, function(err, data) {
            if(data) {
                dataInit = data;
            }
            else if (err) {
                FLUIGC.toast({
                    message: err,
                    type: 'danger'
                });
            }
        });
},
    //BIND de eventos
    bindings: {
        local: {
            'execute': ['click_executeAction']
        },
        global: {}
    },
 
    executeAction: function(htmlElement, event) {
    }

});

