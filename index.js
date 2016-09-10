require('./site/index.html');
require('./site/style.css');

global.DEBUG = false;

const url = 'ws://localhost:8011/stomp';
const client = window.Stomp.client(url);
client.debug = (msg) => {
	if (global.DEBUG) {
		console.info(msg);
	}
};

function connectCallback() {
	document.getElementById('stomp-status').innerHTML = 'It has now successfully connected to a stomp server ' +
		'serving price updates for some foreign exchange currency pairs.';
}

client.connect({}, connectCallback, (error) => {
	console.log(error.headers.message);
});

const exampleSparkline = document.getElementById('example-sparkline');
window.Sparkline.draw(exampleSparkline, [1, 2, 3, 6, 8, 20, 2, 2, 4, 2, 3]);
