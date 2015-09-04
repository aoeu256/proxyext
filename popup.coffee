dnd = new DnDFileController('body', (data) ->
	fileEntry = data.items[0].webkitGetAsEntry();
	displayPath(fileEntry);
