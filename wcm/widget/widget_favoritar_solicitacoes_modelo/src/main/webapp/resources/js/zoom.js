function setSelectedZoomItem(selectedItem) {
	console.log('setSelectedZoomItem | selectedItem');
	console.dir(selectedItem);

	if (selectedItem.inputId == "usuario_fluig") {
		$('#id_usuario_fluig').val(selectedItem["colleagueId"]);
		$('#id_unidade').val(selectedItem["groupId"]);
		$('#login').val(selectedItem["login"]);

	}
 }
 