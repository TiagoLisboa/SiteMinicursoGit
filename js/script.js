window.onload = function () {
	var i = 0; //contador global da função addLetter()
	var selected = "#console"; //variável que armazenará a string para o seltor atual
	
	var texto = $(selected).html(); //recupera o texto dentro do "console"
	$(selected).html(""); //apaga o texto dentro do "console"
	$(selected).css('visibility', 'visible'); //deixa o console visivel

	tagAtual = ""; //variável que armazenara as tags encontradas
	
	var seletor = $(selected); //objeto selecionado (para facilitar a sintaxe)

	function getTagName (tag) { //recuperar o nome da tag (sem classes, <>, e outras propriedades para complementar o seletro jquery)
		tagName = " >"; //variável que armazenara o nome da tag
		tag = tag.replace("<", ""); //remover <
		tag = tag.replace(">", ""); //remover >
		k = 0; //contador
		while (tag[k] != " "){ //loop até o primeiro espaço, ou seja, o nome da tag
			tagName += tag[k];
			k++;
		}
		return tagName;
	}

	function removeLastTag () { //remove a última tag do seletor jquery
		for(var zeta = selected.length-1; zeta>0; zeta--){
			if (selected[zeta] == " ") {
				selected = selected.substring(0,zeta);
				return selected;
			}
		}
	}

	function addLetter () { //faz um loop pela string do texto, inserindo letra a letra no documento html
		time=0; // tempo de espera para o próximo chamado da função
		nextChar = texto.substring(i,i+1); //próximo caractere em função do contador global
		
		if (nextChar == "<"){ //se o caractere for um "<" significa que é a abertura de uma tag
			tagAtual = nextChar;
		}

		if (tagAtual != ""){ //se a variável tiver algum valor, é por que está dentro de uma tag
			time = 0; //tempo de espera é setado para zero, já que o caractere não será impresso imediatamente
			tagAtual += nextChar; //adciona o valor do caratere a tag
			if (nextChar == ">") { //se o caractere for ">" é o fim da tag
				if(tagAtual.indexOf("/") > -1){ //se tiver "/" dentro da tag é uma tag de fechamento
					tagAtual = ""; //ela é descartada
					seletor = $(removeLastTag()); //é removida a última tag do seletor
				}else{ //se não tiver "/"
					tagAtual = tagAtual.substring(1); //o primeiro caractere da tag fica repetido (<<), então removemos o primeiro para corrigir a sintaxe da tag
					seletor.html(seletor.html() + tagAtual); //inserimos a tag no documento
					if (tagAtual!="<br>") { //se a tag não for uma quebra de linha
						selected += getTagName(tagAtual); //incrementamos o seletor com o nome da tag
					}else{ //se for uma quebra de linha
						time = 1000; //setamos o tempo como 1 segundo completo, para melhor apresentação
					}
					//if(selected == "#console span"){ //se for o ultimo span antes do elemento pai
					if(selected.substring(9) != "" && selected.substring(9).indexOf(" ") == "-1"){
						selected+=":last-child"; //colocamos um "last-child" para não inserirmos o valor em todas as tags
					}
					tagAtual = ""; //após inserir a tag, apagamos a variável para que o loop continue normalmente
					seletor = $(selected); //atualizamos o valor do seletor
					
				}
			}
		}else{ //caso não seja uma tag
			time = 20; //o tempo de espera é de 20ms
			seletor.append(nextChar);
		}
		
		i++; //incremento do contador
		if(texto.substring(i)) //verificar se o próximo caractere está fora do limite do texto
			setTimeout(addLetter, time); //se sim, novo chamado com o delay do tempo de espera
		
	}

	seletor.text("");

	addLetter();
};