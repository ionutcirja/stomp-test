/* eslint-disable no-param-reassign */

function getRowHtml(rowData) {
	const name = `<td>${rowData.name}</td>`;
	const bestBid = `<td>${rowData.bestBid}</td>`;
	const bestAsk = `<td>${rowData.bestAsk}</td>`;
	const lastChangeBid = `<td>${rowData.lastChangeBid}</td>`;
	const lastChangeAsk = `<td>${rowData.lastChangeAsk}</td>`;

	return `<tr>${name}${bestBid}${bestAsk}${lastChangeBid}${lastChangeAsk}</tr>`;
}

function render(el, data) {
	let html = '';

	data.forEach((item) => {
		html += getRowHtml(item);
	});

	el.innerHTML = html;
}

export default function (containerEl) {
	const list = document.createElement('table');
	containerEl.appendChild(list);

	return {
		render: (data) => render(list, data)
	};
}
