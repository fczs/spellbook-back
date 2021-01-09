var net = require('net');

var HOST = 'localhost';
var PORT = 8992;

var buffer = '';
var stack = 0;

var client = new net.Socket();
console.log('Connecting to ' + HOST + ':' + PORT);
client.connect(PORT, HOST, function () {
    console.log('Socket connected');
    client.write(JSON.stringify({ type: "SUBSCRIBE" }));
});

client.on('data', function (data) {
	for (var i = 0, len = data.length; i < len; i++) {
		var c = String.fromCodePoint(data[i]);
		if (c == '{') {
			stack++;
		} else if (c == '}') {
			stack--;
		}
		buffer = buffer + c;
		if (stack <= 0) {
			processMessage(buffer);
			buffer = '';
		}
	}
});

function processMessage(msg) {
	console.log('Received Msg: ' + msg);
	
	// Process the feed messages here
	// var payload = JSON.parse(msg);
}
