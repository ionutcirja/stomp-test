import { expect } from 'chai';
import model from './';

describe('Model', () => {
	describe('addItem', () => {
		it('should add a new item if there is no item already with the same name', () => {
			const modelInstance = model();
			modelInstance.addItem({ name: 'n1' });
			modelInstance.addItem({ name: 'n2' });
			expect(modelInstance.getData()).to.eql([{ name: 'n1' }, { name: 'n2' }]);
		});

		it('should replace an item if there is already one with the same name', () => {
			const modelInstance = model();
			modelInstance.addItem({ name: 'n1', value: 1 });
			modelInstance.addItem({ name: 'n2', value: 1 });
			modelInstance.addItem({ name: 'n3', value: 1 });
			modelInstance.addItem({ name: 'n2', value: 2 });
			expect(modelInstance.getData()).to.eql([
				{ name: 'n1', value: 1 }, { name: 'n2', value: 2 }, { name: 'n3', value: 1 }
			]);
		});

		it('should sort data by lastChangeBid attribute when a new item is added', () => {
			const modelInstance = model();
			modelInstance.addItem({ name: 'n1', lastChangeBid: 3 });
			modelInstance.addItem({ name: 'n2', lastChangeBid: 4 });
			modelInstance.addItem({ name: 'n3', lastChangeBid: 1 });
			modelInstance.addItem({ name: 'n2', lastChangeBid: 2 });
			expect(modelInstance.getData()).to.eql([
				{ name: 'n3', lastChangeBid: 1 }, { name: 'n2', lastChangeBid: 2 }, { name: 'n1', lastChangeBid: 3 }
			]);
		});
	});
});
