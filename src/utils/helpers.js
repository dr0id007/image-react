export function addLocalStorage(value) {
	const data = { label: value, value }
	let res = JSON.parse(localStorage.getItem('search-history')) || []
	if (res.some((r) => r.value === value)) {
		return
	} else {
		res.push(data)
		localStorage.setItem('search-history', JSON.stringify(res))
	}
}

export function getLocalStorage() {
	return JSON.parse(localStorage.getItem('search-history')) || []
}
