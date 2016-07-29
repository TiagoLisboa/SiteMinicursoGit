window.onload = function () {
	var i = 0;
	var selected = "#console";
	var texto = $(selected).html();
	$(selected).html("");
	$(selected).css('visibility', 'visible');

	tagAtual = "";
	var seletor = $(selected);
	function getTagName (tag) {
		tagName = " ";
		tag = tag.replace("<", "");
		tag = tag.replace(">", "");
		k = 0;
		while (tag[k] != " "){
			tagName += tag[k];
			k++;
		}
		return tagName;
	}

	function removeLastTag () {
		for(var zeta = selected.length-1; zeta>0; zeta--){
			if (selected[zeta] == " ") {
				selected = selected.substring(0,zeta);
				return selected;
			}
		}
	}

	function addLetter () {
		nextChar = texto.substring(i,i+1);
		//get inside tags
		if (nextChar == "<"){
			tagAtual = nextChar;
		}

		if (tagAtual != ""){
			tagAtual += nextChar;
			if (nextChar == ">") {
				if(tagAtual.indexOf("/") > -1){
					tagAtual = "";
					seletor = $(removeLastTag());
					// console.log(i);
					// console.log (seletor);
				}else{
					tagAtual = tagAtual.substring(1);
					seletor.html(seletor.html() + tagAtual);
					if (tagAtual!="<br>") {
						selected += getTagName(tagAtual);
					}
					if(selected == "#console span"){
						selected+=":last-child";
					}
					console.log("asdf "+ selected);
					tagAtual = "";
					seletor = $(selected);
					
				}
			}
		}else{
			seletor.html(seletor.html() + nextChar);
		}
		
		i++;
		if(texto.substring(i))
			setTimeout(addLetter, 10);
		
	}

	seletor.text("");

	addLetter();
};