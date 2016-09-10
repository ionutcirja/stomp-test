import * as api from './api';
import { API_URL, API_SUBSCRIBE_TOPIC } from './config';

function messageReceived(message) {
	console.log(message);
}

function apiConnected() {
	console.log('api connected');
	document.getElementById('stomp-status').innerHTML = 'It has now successfully connected to a stomp server ' +
		'serving price updates for some foreign exchange currency pairs.';
	api.subscribe(API_SUBSCRIBE_TOPIC, messageReceived);
}

api.connect(API_URL, apiConnected);

const exampleSparkline = document.getElementById('example-sparkline');
window.Sparkline.draw(exampleSparkline, [1, 2, 3, 6, 8, 20, 2, 2, 4, 2, 3]);

