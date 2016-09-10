let client;

export function connect(url, callback) {
	client = window.Stomp.client(url);
	client.connect({}, callback);
}

export function subscribe(topic, callback) {
	client.subscribe(topic, callback);
}
