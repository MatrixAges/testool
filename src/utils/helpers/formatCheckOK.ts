export default (data: any) => {
	if (!Array.isArray(data)) return false

	for (let item of data) {
		if (!item.hasOwnProperty('name') || !item.hasOwnProperty('data')) return false
		if (!Array.isArray(item.data)) return false
	}

	return true
}
