export const mapArray2To1 = (arr) => [].concat.apply([], arr);

export const mapNearByStation = async (arr) => {
	const station = mapArray2To1(arr);

	let nearDepartment = [];
	for (let i = 0; i < station.length; i++) {
		if (await station[i]) nearDepartment.push(await station[i]);
	}
	nearDepartment = [].concat.apply([], nearDepartment);

	return nearDepartment;
};
