var fav_solicitacoes = SuperWidget.extend({
    //variáveis da widget
	loading: FLUIGC.loading(window),
	// codigo do formulário que guardara estes dados como uma ficha
	codigodoformulario : '501799',
    
	//método iniciado quando a widget é carregada
    init: function() {
		// esta funcão esta em main.js
		usuario();
    },
  
    //BIND de eventos
    bindings: {
        local: {
            'execute': ['click_executeAction']
        },
        global: {
        	'gravar':['click_executeGravar']
        }
    },
 
    executeAction: function(htmlElement, event) {
    },
    
    executeGravar: function(){
   		var dados={
			// o de para que pega os campos que são digitados neste formulário widget e armazenará no dataset criado pelo formulário idnicado na linha 4
    		"values": [
    			{	"fieldId": "usuario_fluig",
    				"value": document.getElementById("usuario_fluig").value},
				{   "fieldId": "id_usuario_fluig",
    				"value": document.getElementById("id_usuario_fluig").value},
                    {"fieldId": "id_unidade",
    				"value": document.getElementById("id_unidade").value},
                    {"fieldId": "login",
    				"value": document.getElementById("login").value},
                    {"fieldId": "cod_fluig",
    				"value": document.getElementById("cod_fluig").value},
                    {"fieldId": "objetivo",
    				"value": document.getElementById("objetivo").value},
					{"fieldId": "situacao",
    				"value": document.getElementById("situacao").value}
    		]
    	}
    	WCMAPI.Read({
    		type: "POST",
    		async: true,
    		url: '/ecm-forms/api/v2/cardindex/'+this.codigodoformulario+'/cards',
    	    contentType: "application/json",
    	    dataType: "json",
    	    data: JSON.stringify(dados),
    	    success: function(data){
    	    	alert("Favorito criado com sucesso");
    	    }
    	});
    } 

});

