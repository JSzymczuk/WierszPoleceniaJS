function write(content) {
	var newParagraph = document.createElement('p');
	newParagraph.textContent = content;
	var output = document.getElementById('output');
	output.appendChild(newParagraph);
	output.scrollTop = output.scrollHeight;
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
	
	write(value);
	
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

