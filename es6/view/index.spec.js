import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import view from './';

chai.use(sinonChai);

describe('View', () => {
	const sandbox = sinon.sandbox.create();
	let container;
	let el;

	beforeEach(() => {
		container = {
			appendChild: sandbox.spy()
		};
		el = { tag: 'table-el' };
		document.createElement = sandbox.stub().returns(el);
	});

	afterEach(() => {
		sandbox.restore();
	});

	describe('render', () => {
		it('should create a table', () => {
			view(container);
			expect(document.createElement).to.have.been.calledWith('table');
			expect(container.appendChild).to.have.been.calledWith(el);
		});

		it('should render table rows when render method is called', () => {
			const data = [
				{
					name: 'n1',
					bestBid: 1,
					bestAsk: 1,
					lastChangeBid: 1,
					lastChangeAsk: 1
				},
				{
					name: 'n2',
					bestBid: 2,
					bestAsk: 2,
					lastChangeBid: 2,
					lastChangeAsk: 2
				}
			];
			const viewInstance = view(container);
			viewInstance.render(data);
			expect(el.innerHTML).to.equal(
				'<tr><td>n1</td><td>1</td><td>1</td><td>1</td><td>1</td></tr>' +
				'<tr><td>n2</td><td>2</td><td>2</td><td>2</td><td>2</td></tr>'
			);
		});
	});
});
