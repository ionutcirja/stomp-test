/* eslint-disable no-param-reassign */

function getRowHtml(rowData) {
	const name = `<td>${rowData.name}</td>`;
	const bestBid = `<td>${rowData.bestBid}</td>`;
	const bestAsk = `<td>${rowData.bestAsk}</td>`;
	const lastChangeBid = `<td>${rowData.lastChangeBid}</td>`;
	const lastChangeAsk = `<td>${rowData.lastChangeAsk}</td>`;
	const midPrice = `<td id="${rowData.name}"></td>`;

	return `<tr>${name}${bestBid}${bestAsk}${lastChangeBid}${lastChangeAsk}${midPrice}</tr>`;
}

function renderGraphs(list) {
	list.forEach((item) => {
		window.Sparkline.draw(
			document.getElementById(item.name),
			item.midPriceList.map((midPriceItem) => midPriceItem.value)
		);
	});
}

function render(el, data) {
	let html = '';

	data.forEach((item) => {
		html += getRowHtml(item);
	});

	el.innerHTML = html;
	renderGraphs(data);
}

export default function (containerEl) {
	const table = document.createElement('table');
	containerEl.appendChild(table);

	return {
		render: (data) => render(table, data)
	};
}
