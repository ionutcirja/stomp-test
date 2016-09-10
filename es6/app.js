import * as api from './api';
import { API_URL, API_SUBSCRIBE_TOPIC } from './config';
import view from './view';
import model from './model';

const modelInstance = model();
const viewInstance = view(document.getElementsByClassName('content')[0]);

function messageReceived(message) {
	modelInstance.addItem(JSON.parse(message.body));
	viewInstance.render(modelInstance.getData());
}

function apiConnected() {
	api.subscribe(API_SUBSCRIBE_TOPIC, messageReceived);
}

api.connect(API_URL, apiConnected);
