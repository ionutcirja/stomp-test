function sortList(list) {
	return list.sort((item1, item2) => item1.lastChangeBid - item2.lastChangeBid);
}

function computeMidPrice(item) {
	return (item.bestBid + item.bestAsk) / 2;
}

function getValidMidPriceList(list, currentTime) {
	return list.filter((item) => currentTime - item.time <= 30000);
}

function computeNextItem(itemToAdd, currentItem) {
	const currentTime = Date.now();

	return Object.assign(
		{},
		currentItem || {},
		itemToAdd,
		{
			midPriceList: []
				.concat(currentItem ? getValidMidPriceList(currentItem.midPriceList, currentTime) : [])
				.concat([
					{
						time: currentTime,
						value: computeMidPrice(itemToAdd)
					}
				])
		}
	);
}

function add(itemToAdd, list) {
	const currentItem = list.find((item) => item.name === itemToAdd.name);
	let newList;

	if (currentItem) {
		const index = list.indexOf(currentItem);
		newList = []
			.concat(list.slice(0, index))
			.concat([computeNextItem(itemToAdd, currentItem)])
			.concat(list.slice(index + 1));
	} else {
		newList = list.concat([computeNextItem(itemToAdd)]);
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
