import UnityClient from './unity/UnityClient';

const unity = new UnityClient();

let buffer = '';
let stack = 0;

unity.client.on('data', data => {
  for (var i = 0, len = data.length; i < len; i++) {
		let symb = String.fromCodePoint(data[i]);

    if (symb === '{') {
			stack++;
		} else if (symb === '}') {
			stack--;
    }

		buffer = buffer + symb;

    if (stack <= 0) {
			processMessage(buffer);
			buffer = '';
		}
	}
});

function processMessage(msg: string) {
	console.log(`Received Msg: ${msg}`);

	// Process the feed messages here
	// var payload = JSON.parse(msg);
}
