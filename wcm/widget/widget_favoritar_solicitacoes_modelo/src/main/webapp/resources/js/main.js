var loading = FLUIGC.loading(window);

function ajustaNome(campo) {
		//ajusta e trocar caracteres espéciais digitados no campo

		document.getElementById(campo.name).value = corrigirNome(campo.value);
		document.getElementById("titulo").value = document.getElementById('cod_fluig').value+', '+document.getElementById(campo.name).value; 
	}

	function corrigirNome(nome){
		var letraspermitidas = "ABCEDFGHIJKLMNOPQRSTUVXWYZ abcdefghijklmnopqrstuvxwyzáàâãéèêíóôõúçÁÀÂÃÉÈÍÓÔÕÚÇ 1234567890";
		var texto1 = "";
		for (var i = 0; i < nome.length; i++) {
			var letra = nome[i];
			if (letraspermitidas.includes(letra)) {
				texto1 += letra;
			}
		}
		return texto1.replace(/[&']/g,' ');
	}

	function usuario(){
		// pega o usuário logado
		return $("#usuario_logado").val(parent.WCMAPI.getUserCode()+'-'+parent.WCMAPI.getUser()) ; //Código do usuário

	}
	

