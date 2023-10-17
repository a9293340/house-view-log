import houseForumModel from "@/server/models/house_forum.model";
import adminModel from "@/server/models/admin.model";

export default defineEventHandler(async (event) => {
	const body = await readBody(event);
	const { place_id } = body;
	let house_forum = await houseForumModel.find({ place_id });
	const admin = await adminModel.find({});
	house_forum = house_forum.map((x) => ({
		title: x.title,
		time: x.time,
		author: x.author,
		place_id: x.place_id,
		content: x.content,
		author_name: admin.find((el) => el._id.toString() === x.author)?.account,
	}));
	return house_forum;
});
