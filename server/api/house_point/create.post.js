import housePointModel from "@/server/models/house_point.model";

export default defineEventHandler(async (event) => {
	const body = await readBody(event);

	const { lat, lng, vicinity, name, place_id, photos } = body;
	const house_point = new housePointModel({
		lat,
		lng,
		vicinity,
		name,
		place_id,
		photos,
	});

	await house_point.save();

	return { status: 0, body };
});
