import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import model from './';

chai.use(sinonChai);

describe('Model', () => {
	const sandbox = sinon.sandbox.create();

	beforeEach(() => {
		const timeStub = sandbox.stub(global.Date, 'now');
		timeStub.onCall(0).returns(1000);
		timeStub.onCall(1).returns(3000);
		timeStub.onCall(2).returns(4000);
		timeStub.onCall(3).returns(5000);
		timeStub.onCall(4).returns(24000);
		timeStub.onCall(5).returns(32000);
		timeStub.onCall(6).returns(34000);
	});

	afterEach(() => {
		sandbox.restore();
	});

	describe('addItem', () => {
		it('should add a new item if there is no item already with the same name', () => {
			const modelInstance = model();
			modelInstance.addItem({ name: 'n1', bestBid: 2, bestAsk: 4 });
			modelInstance.addItem({ name: 'n2', bestBid: 3, bestAsk: 5 });
			expect(modelInstance.getData()).to.eql([
				{ name: 'n1', bestBid: 2, bestAsk: 4, midPriceList: [{ time: 1000, value: 3 }] },
				{ name: 'n2', bestBid: 3, bestAsk: 5, midPriceList: [{ time: 3000, value: 4 }] }
			]);
		});

		it('should replace an item if there is already one with the same name', () => {
			const modelInstance = model();
			modelInstance.addItem({ name: 'n1', bestBid: 2, bestAsk: 4 });
			modelInstance.addItem({ name: 'n2', bestBid: 3, bestAsk: 5 });
			modelInstance.addItem({ name: 'n3', bestBid: 1, bestAsk: 1 });
			modelInstance.addItem({ name: 'n2', bestBid: 5, bestAsk: 7 });
			expect(modelInstance.getData()).to.eql([
				{ name: 'n1', bestBid: 2, bestAsk: 4, midPriceList: [{ time: 1000, value: 3 }] },
				{
					name: 'n2',
					bestBid: 5,
					bestAsk: 7,
					midPriceList: [
						{ time: 3000, value: 4 }, { time: 5000, value: 6 }
					]
				},
				{ name: 'n3', bestBid: 1, bestAsk: 1, midPriceList: [{ time: 4000, value: 1 }] }
			]);
		});

		it('should sort data by lastChangeBid attribute when a new item is added', () => {
			const modelInstance = model();
			modelInstance.addItem({ name: 'n1', lastChangeBid: 3, bestBid: 2, bestAsk: 4 });
			modelInstance.addItem({ name: 'n2', lastChangeBid: 4, bestBid: 1, bestAsk: 1 });
			modelInstance.addItem({ name: 'n3', lastChangeBid: 1, bestBid: 1, bestAsk: 3 });
			modelInstance.addItem({ name: 'n2', lastChangeBid: 2, bestBid: 6, bestAsk: 8 });
			expect(modelInstance.getData()).to.eql([
				{ name: 'n3', lastChangeBid: 1, bestBid: 1, bestAsk: 3, midPriceList: [{ time: 4000, value: 2 }] },
				{
					name: 'n2',
					lastChangeBid: 2,
					bestBid: 6,
					bestAsk: 8,
					midPriceList: [{ time: 3000, value: 1 }, { time: 5000, value: 7 }]
				},
				{ name: 'n1', lastChangeBid: 3, bestBid: 2, bestAsk: 4, midPriceList: [{ time: 1000, value: 3 }] }
			]);
		});

		it('should remove mid price list entries if they are older than 30 seconds', () => {
			const modelInstance = model();
			modelInstance.addItem({ name: 'n1', lastChangeBid: 3, bestBid: 2, bestAsk: 4 });
			expect(modelInstance.getData()).to.eql([
				{ name: 'n1', lastChangeBid: 3, bestBid: 2, bestAsk: 4, midPriceList: [{ time: 1000, value: 3 }] }
			]);

			modelInstance.addItem({ name: 'n1', lastChangeBid: 4, bestBid: 1, bestAsk: 1 });
			expect(modelInstance.getData()).to.eql([
				{
					name: 'n1',
					lastChangeBid: 4,
					bestBid: 1,
					bestAsk: 1,
					midPriceList: [{ time: 1000, value: 3 }, { time: 3000, value: 1 }]
				}
			]);

			modelInstance.addItem({ name: 'n1', lastChangeBid: 2, bestBid: 2, bestAsk: 2 });
			expect(modelInstance.getData()).to.eql([
				{
					name: 'n1',
					lastChangeBid: 2,
					bestBid: 2,
					bestAsk: 2,
					midPriceList: [{ time: 1000, value: 3 }, { time: 3000, value: 1 }, { time: 4000, value: 2 }]
				}
			]);

			modelInstance.addItem({ name: 'n1', lastChangeBid: 1, bestBid: 3, bestAsk: 7 });
			expect(modelInstance.getData()).to.eql([
				{
					name: 'n1',
					lastChangeBid: 1,
					bestBid: 3,
					bestAsk: 7,
					midPriceList: [
						{ time: 1000, value: 3 },
						{ time: 3000, value: 1 },
						{ time: 4000, value: 2 },
						{ time: 5000, value: 5 }
					]
				}
			]);

			modelInstance.addItem({ name: 'n1', lastChangeBid: 14, bestBid: 13, bestAsk: 7 });
			expect(modelInstance.getData()).to.eql([
				{
					name: 'n1',
					lastChangeBid: 14,
					bestBid: 13,
					bestAsk: 7,
					midPriceList: [
						{ time: 1000, value: 3 },
						{ time: 3000, value: 1 },
						{ time: 4000, value: 2 },
						{ time: 5000, value: 5 },
						{ time: 24000, value: 10 }
					]
				}
			]);

			modelInstance.addItem({ name: 'n1', lastChangeBid: 16, bestBid: 17, bestAsk: 7 });
			expect(modelInstance.getData()).to.eql([
				{
					name: 'n1',
					lastChangeBid: 16,
					bestBid: 17,
					bestAsk: 7,
					midPriceList: [
						{ time: 3000, value: 1 },
						{ time: 4000, value: 2 },
						{ time: 5000, value: 5 },
						{ time: 24000, value: 10 },
						{ time: 32000, value: 12 }
					]
				}
			]);

			modelInstance.addItem({ name: 'n1', lastChangeBid: 19, bestBid: 27, bestAsk: 3 });
			expect(modelInstance.getData()).to.eql([
				{
					name: 'n1',
					lastChangeBid: 19,
					bestBid: 27,
					bestAsk: 3,
					midPriceList: [
						{ time: 4000, value: 2 },
						{ time: 5000, value: 5 },
						{ time: 24000, value: 10 },
						{ time: 32000, value: 12 },
						{ time: 34000, value: 15 }
					]
				}
			]);
		});
	});
});
