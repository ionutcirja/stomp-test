function sort(list) {
	return list.sort((item1, item2) => item1.lastChangeBid - item2.lastChangeBid);
}

function add(newItem, list) {
	const currentItem = list.find((item) => item.name === newItem.name);
	let newList;

	if (currentItem) {
		const index = list.indexOf(currentItem);
		newList = [].concat(list.slice(0, index)).concat([newItem]).concat(list.slice(index + 1));
	} else {
		newList = list.concat([newItem]);
	}

	return sort(newList);
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
