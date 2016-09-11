import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import * as api from './';

chai.use(sinonChai);

describe('Api', () => {
	const sandbox = sinon.sandbox.create();
	let connect;
	let subscribe;

	beforeEach(() => {
		connect = sandbox.spy();
		subscribe = sandbox.spy();
		window.Stomp = {
			client: sandbox.stub().returns({
				connect,
				subscribe
			})
		};
	});

	afterEach(() => {
		sandbox.restore();
	});

	describe('connect', () => {
		it('should create a Stomp client instance and connect to the url', () => {
			const callback = sandbox.spy();
			api.connect('/url', callback);
			expect(window.Stomp.client).to.have.been.calledWith('/url');
			expect(connect).to.have.been.calledWith({}, callback);
		});
	});

	describe('subscribe', () => {
		it('should subscribe to a topic', () => {
			const callback = sandbox.spy();
			api.connect('/url', sandbox.spy());
			api.subscribe('/topic', callback);
			expect(subscribe).to.have.been.calledWith('/topic', callback);
		});
	});
});
