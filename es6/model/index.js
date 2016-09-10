function sortList(list) {
	return list.sort((item1, item2) => item1.lastChangeBid - item2.lastChangeBid);
}

function computeMidPrice(item) {
	return (item.bestBid + item.bestAsk) / 2;
}

function getValidMidPriceList(list, currentTime) {
	return list.filter((item) => currentTime - item.time <= 30000);
}

function add(itemToAdd, list) {
	const currentItem = list.find((item) => item.name === itemToAdd.name);
	const currentTime = Date.now();
	let newList;
	let newItem;

	if (currentItem) {
		const index = list.indexOf(currentItem);
		newItem = Object.assign(
			{},
			currentItem,
			itemToAdd,
			{
				midPriceList: []
					.concat(getValidMidPriceList(currentItem.midPriceList, currentTime))
					.concat([
						{
							time: currentTime,
							value: computeMidPrice(itemToAdd)
						}
					])
			}
		);
		newList = [].concat(list.slice(0, index)).concat([newItem]).concat(list.slice(index + 1));
	} else {
		newItem = Object.assign(
			{},
			itemToAdd,
			{
				midPriceList: [
					{
						time: currentTime,
						value: computeMidPrice(itemToAdd)
					}
				]
			}
		);
		newList = list.concat([newItem]);
	}

	return sortList(newList);
}

export default function () {
	let list = [];

	return {
		addItem: (item) => {
			list = add(item, list);
		},
		getData: () => list
	};
}
