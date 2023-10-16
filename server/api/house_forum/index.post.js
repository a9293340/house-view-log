import houseForumModel from "@/server/models/house_forum.model";

export default defineEventHandler(async (event) => {
	const body = await readBody(event);
	const { place_id } = body;
	const house_forum = await houseForumModel.find({ place_id });
	return house_forum;
});
