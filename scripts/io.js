function appendText(str) {
	var output = document.getElementById('output');
	var text = document.createTextNode(str);
	output.appendChild(text);	
}

function appendNewLine() {
	var output = document.getElementById('output');
	var lineBreak = document.createElement('br');
	output.appendChild(lineBreak);	
}

function write(content) {
	var strings = content.toString().split("\n");
	var n = strings.length;
	if (n > 0) {
		appendText(strings[0]);
		for (var i = 1; i < n; ++i) {
			appendNewLine();
			appendText(strings[1]);
		}
		output.scrollTop = output.scrollHeight;
	}
}

function writeLine(content) {
	write(content);
	appendNewLine();
}

var _readCompleted;
var _readValue;			

async function read() {
	_readCompleted = false;
	var value;
	
	var promise = new Promise((resolve, reject) => {
		var readCheck = setInterval(() => {
			if (_readCompleted === true) {
				clearInterval(readCheck);
				resolve(_readValue);
			}
		}, 250);
	});
	
	await promise.then((result) => { value = result; });
	
	writeLine(value);
	
	return value;
}			

function onConfirmInput() {
	if (_readCompleted === false) {
		_readCompleted = true;
		var input = document.getElementById('input');
		_readValue = input.value;
		input.value = "";
	}
}

