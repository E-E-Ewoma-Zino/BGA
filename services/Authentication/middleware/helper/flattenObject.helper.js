// This function converts a nexted object to a first level properties object

module.exports = function flattenObject(obj, parentKey = '') {
	return Object.keys(obj).reduce((acc, key) => {
		const newKey = parentKey ? `${parentKey}.${key}` : key;

		if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
			const flattened = flattenObject(obj[key], newKey);
			return { ...acc, ...flattened };
		} else {
			return { ...acc, [newKey]: obj[key] };
		}
	}, {});
}