import housePointModel from "@/server/models/house_point.model";

export default defineEventHandler(async () => {
	const house_point = await housePointModel.find({});
	return house_point;
});
